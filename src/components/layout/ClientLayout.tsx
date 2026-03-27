"use client";

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
    <>
      <Header dict={dict} locale={locale} />
      <main>{children}</main>
      <Footer dict={dict} locale={locale} />
      <WhatsApp dict={dict} />
      <Analytics />
      <CookieBanner />
    </>
  );
}
