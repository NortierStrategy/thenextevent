"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const isEN = pathname?.startsWith("/en");
  const locale = isEN ? "en" : "fr";

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-8 bg-black">
      <div className="text-center max-w-lg">
        <span className="font-outfit text-[11px] font-semibold uppercase tracking-[6px] text-red mb-6 block">
          {isEN ? "Error 404" : "Erreur 404"}
        </span>
        <h1 className="font-playfair text-[clamp(48px,8vw,96px)] font-light text-text leading-none mb-6">
          404
        </h1>
        <p className="font-outfit text-text-muted text-base font-light leading-relaxed mb-10">
          {isEN
            ? "This page doesn\u2019t exist or has been moved."
            : "Cette page n\u2019existe pas ou a \u00e9t\u00e9 d\u00e9plac\u00e9e."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="px-8 py-3.5 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:from-red-light hover:to-red hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] transition-all duration-300"
          >
            {isEN ? "Home" : "Accueil"}
          </Link>
          <Link
            href={`/${locale}/#contact`}
            className="px-8 py-3.5 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-text-muted border border-red/20 rounded-[2px] hover:border-red/40 hover:text-text transition-all duration-300"
          >
            {isEN ? "Contact us" : "Nous contacter"}
          </Link>
        </div>
      </div>
    </section>
  );
}
