"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/components/layout/Analytics";
import type { Dictionary } from "@/lib/i18n";

interface HeroProps {
  dict: Dictionary;
  locale: string;
}

export default function Hero({ dict, locale }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: string) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(40px)",
    transition: `all 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}`,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Radial gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(155,27,36,0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(155,27,36,0.05)_0%,_transparent_50%)]" />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-[20%] left-[10%] w-[1px] h-[150px] bg-red/10 rotate-[25deg] hidden lg:block" />
      <div className="absolute bottom-[25%] right-[8%] w-[1px] h-[200px] bg-red/10 -rotate-[20deg] hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[1000px] mx-auto">
        {/* Badge */}
        <div
          className="flex items-center justify-center gap-4 mb-10"
          style={anim("0.3s")}
        >
          <div className="w-10 h-[1px] bg-red" />
          <span className="font-outfit text-[11px] font-semibold uppercase tracking-[6px] text-red">
            {dict.hero.badge}
          </span>
          <div className="w-10 h-[1px] bg-red" />
        </div>

        {/* H1 */}
        <h1
          className="font-playfair text-[clamp(36px,6vw,72px)] font-light text-text leading-[1.1] mb-8 tracking-[-1px]"
          style={anim("0.5s")}
        >
          {dict.hero.title1}
          <br />
          <em className="text-gradient-red font-normal not-italic">
            {dict.hero.title2}
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="font-outfit text-text-muted text-base max-w-[600px] mx-auto mb-12 font-light leading-[1.8]"
          style={anim("0.7s")}
        >
          {dict.hero.subtitle}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={anim("0.9s")}
        >
          <span onClick={() => trackEvent("cta_hero_click", { cta: "realisations" })}>
            <Button href={`/${locale}#realisations`} variant="primary">
              {dict.hero.cta1}
            </Button>
          </span>
          <span onClick={() => trackEvent("cta_hero_click", { cta: "devis" })}>
            <Button href={`/${locale}#contact`} variant="secondary">
              {dict.hero.cta2}
            </Button>
          </span>
        </div>

        {/* Urgency badge */}
        <div
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20"
          style={anim("1.1s")}
        >
          <span className="text-[13px]">📅</span>
          <span className="font-outfit text-[11px] font-medium tracking-[1px] text-gold/80">
            {dict.hero.urgencyBadge}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 1s ease 1.5s",
        }}
      >
        <span className="font-outfit text-[10px] uppercase tracking-[3px] text-text-muted">
          {dict.hero.scroll}
        </span>
        <div
          className="w-[1px] h-8 bg-red/50"
          style={{ animation: "pulse-line 2s ease infinite" }}
        />
      </div>
    </section>
  );
}
