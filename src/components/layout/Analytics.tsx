"use client";

import Script from "next/script";
import { useState, useEffect, useRef } from "react";

/**
 * Analytics & Tracking — RGPD Compliant
 * ──────────────────────────────────────
 * Scripts are ONLY loaded after user consent (localStorage "tne_cookie_consent" === "accepted").
 * Without consent, ZERO tracking scripts are injected.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "";
const CONTENTSQUARE_ID = process.env.NEXT_PUBLIC_CONTENTSQUARE_ID || "";
const LINKEDIN_CONVERSION_ID = process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID || "";

const CONSENT_KEY = "tne_cookie_consent";

export default function Analytics() {
  const [hasConsent, setHasConsent] = useState(false);

  const hasGA = GA_ID.length > 0;
  const hasGTM = GTM_ID.length > 0;
  const hasMeta = META_PIXEL_ID.length > 0;
  const hasLinkedIn = LINKEDIN_PARTNER_ID.length > 0;
  const hasContentsquare = CONTENTSQUARE_ID.length > 0;
  const hasAny = hasGA || hasGTM || hasMeta || hasLinkedIn || hasContentsquare;

  const scrollTrackedRef = useRef<{ half: boolean; full: boolean }>({
    half: false,
    full: false,
  });

  // Check consent from localStorage + listen for consent changes
  useEffect(() => {
    if (!hasAny) return;
    const check = () => setHasConsent(localStorage.getItem(CONSENT_KEY) === "accepted");
    check();
    window.addEventListener("tne-consent-change", check);
    return () => window.removeEventListener("tne-consent-change", check);
  }, [hasAny]);

  // GTM noscript iframe — only after consent
  useEffect(() => {
    if (!hasConsent || !hasGTM) return;

    const noscript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);

    return () => {
      noscript.remove();
    };
  }, [hasConsent, hasGTM]);

  // Scroll depth tracking — only after consent
  useEffect(() => {
    if (!hasConsent) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight <= 0) return;

      const scrollPercent = (scrollTop / docHeight) * 100;

      if (!scrollTrackedRef.current.half && scrollPercent >= 50) {
        scrollTrackedRef.current.half = true;
        trackEvent("scroll_depth", { depth: "50" });
      }

      if (!scrollTrackedRef.current.full && scrollPercent >= 98) {
        scrollTrackedRef.current.full = true;
        trackEvent("scroll_depth", { depth: "100" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasConsent]);

  // No tracking IDs or no consent → render nothing
  if (!hasAny || !hasConsent) return null;

  return (
    <>
      {/* ── Google Tag Manager ── */}
      {hasGTM && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {/* ── Google Analytics 4 ── */}
      {hasGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
              });
            `}
          </Script>
        </>
      )}

      {/* ── Meta Pixel ── */}
      {hasMeta && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* ── LinkedIn Insight Tag ── */}
      {hasLinkedIn && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      )}

      {/* ── Contentsquare (ex-Hotjar) ── */}
      {hasContentsquare && (
        <Script
          id="contentsquare"
          src={`https://t.contentsquare.net/uxa/${CONTENTSQUARE_ID}.js`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

/**
 * Allowed event names — ensures consistency across the codebase.
 * "Lead" is a standard Meta Pixel event, the rest are custom.
 */
export type TrackEventName =
  | "Lead"
  | "phone_click"
  | "calendly_click"
  | "whatsapp_click"
  | "cta_hero_click"
  | "nav_link_click"
  | "expertise_tab_click"
  | "metier_cta_click"
  | "realisation_click"
  | "form_step1_complete"
  | "form_submission_error"
  | "scroll_depth";

/**
 * Track custom events (form submissions, CTA clicks, etc.)
 * Safe to call anytime — silently no-ops if scripts aren't loaded.
 */
export function trackEvent(eventName: TrackEventName, params?: Record<string, string>) {
  if (typeof window === "undefined") return;

  // GA4
  if (window.gtag) window.gtag("event", eventName, params);

  // GTM dataLayer
  if (window.dataLayer) window.dataLayer.push({ event: eventName, ...params });

  // Meta Pixel — standard "Lead" event vs custom
  if (window.fbq) {
    if (eventName === "Lead") {
      window.fbq("track", "Lead", params);
    } else {
      window.fbq("trackCustom", eventName, params);
    }
  }

  // LinkedIn — only track Lead conversions with proper conversion ID
  if (window.lintrk && eventName === "Lead" && LINKEDIN_CONVERSION_ID) {
    window.lintrk("track", { conversion_id: LINKEDIN_CONVERSION_ID });
  }
}
