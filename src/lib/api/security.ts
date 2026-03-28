import { NextRequest, NextResponse } from "next/server";

/* ── CSRF Protection (Origin check) ── */
const ALLOWED_ORIGINS = [
  "https://thenextevent.fr",
  "https://www.thenextevent.fr",
];

// In development, also allow localhost
if (process.env.NODE_ENV === "development") {
  ALLOWED_ORIGINS.push("http://localhost:3000");
}

/**
 * Validates the request Origin header to prevent CSRF attacks.
 * Returns null if valid, or a NextResponse with 403 if invalid.
 */
export function checkCsrf(req: NextRequest): NextResponse | null {
  const origin = req.headers.get("origin");

  // No origin header = non-browser request (curl, Postman, etc.) — block in production
  if (!origin) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, error: "Requête non autorisée." },
        { status: 403 }
      );
    }
    return null; // Allow in dev
  }

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { success: false, error: "Origine non autorisée." },
      { status: 403 }
    );
  }

  return null;
}

/* ── XSS Protection ── */
const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
};

export function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (m) => HTML_ESCAPE_MAP[m]);
}

/* ── Rate Limiting (in-memory, bounded) ── */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000; // 1 minute
const MAX_MAP_SIZE = 10_000; // Prevent OOM — evict all expired entries, then cap

function cleanupRateLimitMap(now: number): void {
  rateLimitMap.forEach((val, key) => {
    if (val.resetTime < now) rateLimitMap.delete(key);
  });
  // Hard cap: if still over limit after cleanup, clear oldest entries
  if (rateLimitMap.size > MAX_MAP_SIZE) {
    const toDelete = rateLimitMap.size - MAX_MAP_SIZE;
    const keys = rateLimitMap.keys();
    for (let i = 0; i < toDelete; i++) {
      const next = keys.next();
      if (!next.done) rateLimitMap.delete(next.value);
    }
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  cleanupRateLimitMap(now);

  const record = rateLimitMap.get(ip);
  if (!record || record.resetTime < now) {
    const resetTime = now + RATE_WINDOW_MS;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetTime };
  }
  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count, resetTime: record.resetTime };
}

/**
 * Extract client IP — prefers x-real-ip (set by Vercel),
 * falls back to x-forwarded-for first entry, then "unknown".
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
