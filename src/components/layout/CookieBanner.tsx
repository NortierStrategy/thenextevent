"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * RGPD Cookie Consent Banner
 * Only renders when at least one tracking ID is configured.
 * Uses localStorage to remember the user's choice.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "";

const HAS_TRACKING = GA_ID.length > 0 || GTM_ID.length > 0 || META_PIXEL_ID.length > 0 || LINKEDIN_PARTNER_ID.length > 0;
const CONSENT_KEY = "tne_cookie_consent";

type ConsentState = "pending" | "accepted" | "rejected";

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>("accepted"); // default to hide
  const [isEN, setIsEN] = useState(false);

  useEffect(() => {
    if (!HAS_TRACKING) return;
    setIsEN(document.documentElement.lang === "en");
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored as ConsentState);
    } else {
      setConsent("pending");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    // Reload to activate tracking scripts
    window.location.reload();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
  };

  if (!HAS_TRACKING || consent !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6">
      <div className="max-w-[800px] mx-auto bg-dark/95 backdrop-blur-xl border border-red/10 rounded-[4px] p-5 md:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="font-outfit text-[13px] text-text/80 font-light leading-[1.7] flex-1">
            {isEN
              ? "We use cookies to measure audience and improve your experience. "
              : "Nous utilisons des cookies pour mesurer l\u2019audience et am\u00e9liorer votre exp\u00e9rience. "}
            <Link
              href={isEN ? "/en/mentions-legales" : "/fr/mentions-legales"}
              className="text-red hover:text-red-light underline underline-offset-2 transition-colors duration-200"
            >
              {isEN ? "Learn more" : "En savoir plus"}
            </Link>
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleReject}
              aria-label={isEN ? "Reject cookies" : "Refuser les cookies"}
              className="px-5 py-2.5 min-h-[44px] font-outfit text-[11px] font-medium uppercase tracking-[2px] text-text-muted border border-red/15 rounded-[2px] hover:border-red/30 hover:text-text transition-all duration-300"
            >
              {isEN ? "Reject" : "Refuser"}
            </button>
            <button
              onClick={handleAccept}
              aria-label={isEN ? "Accept cookies" : "Accepter les cookies"}
              className="px-5 py-2.5 min-h-[44px] font-outfit text-[11px] font-bold uppercase tracking-[2px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:from-red-light hover:to-red hover:shadow-[0_0_15px_rgba(155,27,36,0.3)] transition-all duration-300"
            >
              {isEN ? "Accept" : "Accepter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Check if user has given cookie consent.
 * Use this in Analytics.tsx to conditionally load scripts.
 */
export function hasUserConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}
