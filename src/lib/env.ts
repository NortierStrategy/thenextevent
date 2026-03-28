/**
 * Environment variable validation — fail fast in production.
 * Import this module in layout.tsx to validate at startup.
 */

const REQUIRED_SERVER_VARS = [
  "RESEND_API_KEY",
  "HUBSPOT_ACCESS_TOKEN",
] as const;

const OPTIONAL_WARN_VARS = [
  "NEXT_PUBLIC_GA_ID",
  "NEXT_PUBLIC_GTM_ID",
  "NEXT_PUBLIC_META_PIXEL_ID",
] as const;

export function validateEnv(): void {
  // Only validate server-side
  if (typeof window !== "undefined") return;

  const missing: string[] = [];
  const warnings: string[] = [];

  for (const key of REQUIRED_SERVER_VARS) {
    if (!process.env[key]) missing.push(key);
  }

  for (const key of OPTIONAL_WARN_VARS) {
    if (!process.env[key]) warnings.push(key);
  }

  if (warnings.length > 0 && process.env.NODE_ENV === "production") {
    console.warn(`⚠️  [TNE] Optional env vars missing: ${warnings.join(", ")}`);
  }

  if (missing.length > 0 && process.env.NODE_ENV === "production") {
    console.error(`❌ [TNE] Required env vars missing: ${missing.join(", ")}`);
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
