# Action Items — Code Quality Audit
**From:** 2026-03-28-CODE-QUALITY-AUDIT.md
**Status:** Ready to Execute

---

## PRIORITY P1 (This Week — Security & Maintenance)

### P1.1 — Fix npm Vulnerabilities
**Time:** 1 hour
**Command:**
```bash
npm audit fix --force
```
**What it fixes:**
- glob@10.2.0 → resolves CLI command injection CVE
- Updates next@14.2.35 → 16.2.1 (fixes 4 security issues)
- Updates eslint-config-next@14.2.35 → 16.2.1

**Post-action:**
```bash
npm run build  # Verify no breaking changes
npm run dev   # Test locally
```

---

### P1.2 — Refactor Duplicated API Routes
**Time:** 2 hours
**Files affected:**
- src/app/api/contact/route.ts (195 lines)
- src/app/api/recruit/route.ts (123 lines)

**Steps:**

1. **Create** `src/lib/api/handlers.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkCsrf, checkRateLimit, getClientIp } from "./security";

export interface ValidateRequestResult {
  data: Record<string, unknown>;
  error?: null;
}

export interface ValidateRequestError {
  error: NextResponse;
  data?: null;
}

export type ValidateRequestOutput = ValidateRequestResult | ValidateRequestError;

export async function validateAndCheckRequest(
  req: NextRequest,
  schema: z.ZodSchema
): Promise<ValidateRequestOutput> {
  // CSRF check
  const csrfError = checkCsrf(req);
  if (csrfError) return { error: csrfError };

  // Rate limiting
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return {
      error: NextResponse.json(
        { success: false, error: "Trop de requêtes. Réessayez dans 1 minute." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "Retry-After": String(
              Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
            ),
          },
        }
      ),
    };
  }

  // Zod validation
  const raw = await req.json();
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Données invalides";
    return {
      error: NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      ),
    };
  }

  return { data: parsed.data };
}
```

2. **Update** `src/app/api/contact/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateAndCheckRequest } from "@/lib/api/handlers";
import { escapeHtml } from "@/lib/api/security";

const contactSchema = z.object({
  name: z.string().min(1, "Nom requis").max(200),
  email: z.string().email("Format email invalide").max(320),
  // ... rest of schema
});

type ContactData = z.infer<typeof contactSchema>;

// ... sendEmails, pushToHubSpot, forwardToMake functions

export async function POST(req: NextRequest) {
  try {
    const validation = await validateAndCheckRequest(req, contactSchema);
    if (validation.error) return validation.error;

    const data = validation.data as ContactData;

    // ... rest of logic (unchanged)
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

3. **Update** `src/app/api/recruit/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateAndCheckRequest } from "@/lib/api/handlers";
import { escapeHtml } from "@/lib/api/security";

const recruitSchema = z.object({
  // ... schema definition
});

export async function POST(req: NextRequest) {
  try {
    const validation = await validateAndCheckRequest(req, recruitSchema);
    if (validation.error) return validation.error;

    const data = validation.data as z.infer<typeof recruitSchema>;

    // ... rest of logic (unchanged)
  } catch (err) {
    console.error("[Recruit API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

**Benefit:** Saves ~80 lines, reduces maintenance burden.

---

### P1.3 — Fix Silent Failures in Contact API
**Time:** 1.5 hours
**File:** src/app/api/contact/route.ts (line 173-186)

**Current (Problematic):**
```typescript
const results = await Promise.allSettled([
  sendEmails(data),
  pushToHubSpot(data),
  forwardToMake(data),
]);

results.forEach((r, i) => {
  if (r.status === "rejected") {
    const services = ["Resend", "HubSpot", "Make"];
    console.error(`[Contact API] ${services[i]} failed:`, r.reason);
  }
});

return NextResponse.json({ success: true }); // Always returns success!
```

**Problem:** User sees "success: true" even if Resend/HubSpot fail. Leads lost.

**Fixed:**
```typescript
const results = await Promise.allSettled([
  sendEmails(data),
  pushToHubSpot(data),
  forwardToMake(data),
]);

const failures: string[] = [];
results.forEach((r, i) => {
  if (r.status === "rejected") {
    const services = ["Resend", "HubSpot", "Make"];
    const serviceName = services[i];
    failures.push(serviceName);
    console.error(`[Contact API] ${serviceName} failed:`, r.reason);

    // Optional: Send alert to admin
    // await alertAdmin(`Lead submission failed for ${serviceName}`);
  }
});

// Return appropriate response
if (failures.includes("Resend")) {
  // Critical: Email not sent to prospect or Nicola
  return NextResponse.json(
    { success: false, error: "Erreur serveur — votre message n'a pas pu être envoyé." },
    { status: 500 }
  );
}

// If only HubSpot failed (non-critical), still return success
if (failures.length > 0) {
  console.warn(`[Contact API] Partial failure for contact ${data.email}: ${failures.join(", ")}`);
}

return NextResponse.json({ success: true });
```

---

## PRIORITY P2 (This Sprint — Code Quality)

### P2.1 — Fix `as any` in Analytics
**Time:** 30 minutes
**File:** src/components/layout/Analytics.tsx

**Before:**
```typescript
const w = typeof window !== "undefined" ? (window as any) : null;
```

**After:**
1. Create `src/types/window.d.ts`:
```typescript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
```

2. Update Analytics.tsx (remove `as any`):
```typescript
const w = typeof window !== "undefined" ? window : null;

// Now properly typed without casting
if (w?.gtag) w.gtag("event", eventName, params);
```

---

### P2.2 — Add Error Boundaries
**Time:** 45 minutes

**Create** `src/app/error.tsx`:
```typescript
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark px-4">
      <div className="text-center">
        <h1 className="text-6xl font-cormorant text-gold mb-4">Oops!</h1>
        <p className="text-xl text-off-white/60 mb-8">
          Une erreur inattendue s'est produite.
        </p>
        {error.message && (
          <p className="text-sm text-off-white/40 mb-8">
            {error.message}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-gold text-dark font-poppins font-semibold rounded hover:bg-gold/90"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gold text-gold font-poppins font-semibold rounded hover:bg-gold/10"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Create** `src/app/[locale]/error.tsx`:
```typescript
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark px-4">
      <h1 className="text-6xl font-cormorant text-gold mb-4">Erreur</h1>
      <p className="text-off-white/60 mb-8">Une erreur s'est produite.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-gold text-dark rounded font-semibold"
      >
        Réessayer
      </button>
    </div>
  );
}
```

---

### P2.3 — Validate Environment Variables at Startup
**Time:** 30 minutes

**Create** `src/lib/env.ts`:
```typescript
/**
 * Environment variable validation at startup
 * Fails fast if required vars are missing in production
 */

function validateEnv() {
  const errors: string[] = [];

  // Server-side required vars
  if (process.env.NODE_ENV === "production") {
    if (!process.env.RESEND_API_KEY) {
      errors.push("RESEND_API_KEY is required in production");
    }
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      errors.push("HUBSPOT_ACCESS_TOKEN is required in production");
    }
  }

  if (errors.length > 0) {
    console.error("❌ Missing environment variables:");
    errors.forEach((e) => console.error(`  - ${e}`));
    throw new Error("Environment configuration is incomplete");
  }

  console.log("✅ Environment variables validated");
}

// Call at module load time
if (typeof window === "undefined") {
  validateEnv();
}
```

**Update** `src/app/layout.tsx` (root layout):
```typescript
// Add at top
import "@/lib/env"; // Validates env vars on startup

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ... rest unchanged
}
```

---

### P2.4 — Split Constants File
**Time:** 1 hour
**File:** src/lib/constants.ts (178 lines)

**Create** `src/lib/constants/metadata.ts`:
```typescript
// SEO metadata, og tags, etc.
export const SITE_METADATA = {
  title: "The Next Event",
  // ... move metadata related constants
};
```

**Create** `src/lib/constants/content.ts`:
```typescript
// Page content, copy, etc.
export const TEAM_MEMBERS = [
  // ...
];
export const CLIENT_LOGOS = [
  // ...
];
```

**Update** `src/lib/constants/index.ts`:
```typescript
export * from "./metadata";
export * from "./content";
```

---

## PRIORITY P3 (Nice to Have — Cleanup)

### P3.1 — Delete Unused Files
**Time:** 5 minutes
```bash
rm src/components/forms/ContactForm.tsx
# (Already has comment: "DEPRECATED — This component is unused")
```

### P3.2 — Remove Tiny Unused File
**Time:** 5 minutes
```bash
# Check usage
grep -r "from.*logo" src/

# If nothing found:
rm src/lib/logo.ts
```

### P3.3 — Fix Unescaped Quotes in CGV
**Time:** 15 minutes
**File:** src/app/[locale]/cgv/page.tsx (line 38)

Replace unescaped `"` with `&quot;` in HTML content.

---

## TESTING CHECKLIST

After all fixes, run:

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Build
npm run build

# 4. Test locally
npm run dev
# Visit http://localhost:3000
# Test contact form submission
# Test recruit form submission
# Check console for errors
```

---

## DEPLOYMENT CHECKLIST

Before merging to main:

- [ ] All P1 items completed
- [ ] All P2 items completed
- [ ] npm audit shows 0 vulnerabilities
- [ ] Build succeeds without warnings
- [ ] No console errors in dev
- [ ] Forms still work end-to-end
- [ ] Error boundaries display correctly

---

## ESTIMATED TOTAL TIME

| Priority | Tasks | Est. Time |
|----------|-------|-----------|
| P1 | 3 fixes | 4.5 hours |
| P2 | 4 fixes | 2.75 hours |
| P3 | 4 cleanup | 0.5 hours |
| **Testing** | Full suite | 1 hour |
| **TOTAL** | | **~8.75 hours** |

**Recommended:** Split across 2 sprints (4h + 4h) to avoid fatigue.

