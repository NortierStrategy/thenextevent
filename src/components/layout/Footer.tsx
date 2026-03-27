"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

interface FooterProps {
  dict: Dictionary;
  locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
  const navLinks = dict.nav.links.map((link) => ({
    ...link,
    href: `/${locale}${link.href}`,
  }));

  return (
    <footer className="bg-dark border-t border-red/[0.08]">
      <div className="max-w-[1200px] mx-auto px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="font-playfair text-[17px] text-text tracking-[2.5px] mb-2">
              THE NEXT EVENT
            </div>
            <p className="font-outfit text-[13px] text-text-muted font-light leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-outfit text-[10px] font-semibold uppercase tracking-[4px] text-text-muted mb-5">
              {dict.footer.navTitle}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-outfit text-[13px] text-text hover:text-red transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit text-[10px] font-semibold uppercase tracking-[4px] text-text-muted mb-5">
              {dict.footer.contactTitle}
            </h4>
            <ul className="space-y-3 font-outfit text-[13px] text-text font-light">
              <li>
                <a
                  href={`tel:${dict.contact.phone.value.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-red transition-colors duration-300"
                  aria-label="Nous appeler"
                >
                  <svg className="w-3.5 h-3.5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Nous appeler
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${dict.contact.email.value}`}
                  className="hover:text-red transition-colors duration-300"
                >
                  {dict.contact.email.value}
                </a>
              </li>
              <li>{dict.contact.address.value}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-red/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="font-outfit text-[12px] text-text-muted/50 font-light">
              &copy; 2007-{new Date().getFullYear()} {dict.footer.copyright}
            </p>
            <span className="text-text-muted/20">|</span>
            <Link
              href={`/${locale}/cgv`}
              className="font-outfit text-[11px] text-text-muted/50 hover:text-text transition-colors duration-300 font-light"
            >
              {locale === "en" ? "Terms & Conditions" : "CGV"}
            </Link>
            <span className="text-text-muted/20">|</span>
            <Link
              href={`/${locale}/mentions-legales`}
              className="font-outfit text-[11px] text-text-muted/50 hover:text-text transition-colors duration-300 font-light"
            >
              {locale === "en" ? "Legal Notice" : "Mentions légales"}
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/company/thenextevent/" },
              { label: "Instagram", href: "https://www.instagram.com/thenextevent.fr/" },
              { label: "Facebook", href: "https://www.facebook.com/thenextevent.fr/" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-outfit text-[11px] uppercase tracking-[2px] text-text hover:text-red transition-colors duration-300"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
