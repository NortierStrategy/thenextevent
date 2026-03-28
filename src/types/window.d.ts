/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Augment Window with third-party tracking globals
 * injected at runtime by Analytics <Script> tags.
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    lintrk?: (...args: any[]) => void;
    dataLayer?: Record<string, unknown>[];
    _linkedin_data_partner_ids?: string[];
  }
}

export {};
