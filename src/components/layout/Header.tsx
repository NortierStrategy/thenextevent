"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { trackEvent } from "@/components/layout/Analytics";

interface HeaderProps {
  dict: Dictionary;
  locale: string;
}

export default function Header({ dict, locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    if (isMobileOpen) {
      // Focus first focusable element in drawer
      requestAnimationFrame(() => {
        const firstLink = drawerRef.current?.querySelector<HTMLElement>("a, button");
        firstLink?.focus();
      });
    } else {
      // Return focus to hamburger on close
      hamburgerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Trap focus inside drawer + close on Escape
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  const alternateLocale = locale === "fr" ? "en" : "fr";
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";
  const alternateHref = `/${alternateLocale}${pathnameWithoutLocale === "/" ? "" : pathnameWithoutLocale}`;

  const navLinks = dict.nav.links.map((link) => ({
    ...link,
    href: `/${locale}${link.href}`,
  }));

  const handlePhoneClick = () => {
    trackEvent("phone_click");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[rgba(10,10,10,0.92)] backdrop-blur-[20px] border-b border-red/15"
          : "bg-transparent"
      }`}
      style={{ padding: isScrolled ? "14px 32px" : "22px 32px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link href={`/${locale}`} aria-label="The Next Event - Home">
            <Image
              src="/images/logo.png"
              alt="The Next Event"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-outfit text-[11px] font-medium uppercase tracking-[2.5px] text-text-muted hover:text-text transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={alternateHref}
              className="font-outfit text-[11px] font-medium uppercase tracking-[2.5px] text-text-muted hover:text-red transition-colors duration-300 border border-red/20 px-4 py-2.5 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[2px]"
            >
              {alternateLocale.toUpperCase()}
            </Link>

            <a
              href="tel:+33660388027"
              onClick={handlePhoneClick}
              className="inline-flex items-center gap-2 font-outfit text-[11px] font-medium uppercase tracking-[2px] text-text-muted hover:text-text transition-colors duration-300"
              aria-label="Nous appeler"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Appeler
            </a>

            <Link
              href={`/${locale}/#contact`}
              className="ml-4 px-[22px] py-[9px] font-outfit text-[10px] font-semibold uppercase tracking-[2.5px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:from-red-light hover:to-red hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] hover:scale-[1.03] transition-all duration-300 active:scale-[0.97]"
            >
              {dict.nav.cta}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={hamburgerRef}
            className="lg:hidden relative flex flex-col gap-1.5 w-11 h-11 items-center justify-center -mr-1"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <span
              className={`w-6 h-[1.5px] bg-text rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ${
                isMobileOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-text rounded-full transition-all duration-300 ease-out ${
                isMobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-text rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ${
                isMobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
              onClick={closeMobile}
            />
            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={locale === "en" ? "Navigation menu" : "Menu de navigation"}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-black/95 backdrop-blur-xl z-40 lg:hidden border-l border-red/10"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8 pb-20 [padding-bottom:max(5rem,calc(env(safe-area-inset-bottom)+1rem))]">
                {/* Phone link in mobile drawer */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href="tel:+33660388027"
                    onClick={() => {
                      handlePhoneClick();
                      closeMobile();
                    }}
                    aria-label="Nous appeler"
                    className="flex items-center gap-3 px-5 py-2.5 min-h-[44px] border border-red/20 rounded-[2px] font-outfit text-[13px] font-medium text-text-muted hover:text-text hover:border-red/40 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Nous appeler
                  </a>
                </motion.div>

                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        trackEvent("nav_link_click", { link: link.label });
                        closeMobile();
                      }}
                      className="font-playfair text-2xl text-text-muted hover:text-text transition-colors duration-300 block py-2 min-h-[44px]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={alternateHref}
                    onClick={closeMobile}
                    className="font-outfit text-[13px] font-medium uppercase tracking-[3px] text-text-muted hover:text-red transition-colors duration-300 border border-red/20 px-5 py-3 min-h-[44px] inline-flex items-center rounded-[2px]"
                  >
                    {alternateLocale === "en" ? "English" : "Fran\u00e7ais"}
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/${locale}/#contact`}
                    onClick={closeMobile}
                    className="px-8 py-3 font-outfit text-[11px] font-semibold uppercase tracking-[3px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] transition-all duration-300"
                  >
                    {dict.nav.cta}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
