"use client";

import { MotionConfig } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsApp from "@/components/sections/WhatsApp";
import Analytics from "@/components/layout/Analytics";
import CookieBanner from "@/components/layout/CookieBanner";
import type { Dictionary } from "@/lib/i18n";

interface ClientLayoutProps {
  children: React.ReactNode;
  dict: Dictionary;
  locale: string;
}

export default function ClientLayout({
  children,
  dict,
  locale,
}: ClientLayoutProps) {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-red focus:text-white focus:rounded-[2px] focus:font-outfit focus:text-sm focus:font-semibold focus:uppercase focus:tracking-[2px] focus:outline-none"
      >
        {locale === "en" ? "Skip to content" : "Aller au contenu"}
      </a>
      <Header dict={dict} locale={locale} />
      <main id="main-content">{children}</main>
      <Footer dict={dict} locale={locale} />
      <WhatsApp dict={dict} />
      <Analytics />
      <CookieBanner />
    </MotionConfig>
  );
}
