"use client";

import Link from "next/link";
import InView from "@/components/ui/InView";
import type { Service } from "@/data/services";
import type { Dictionary } from "@/lib/i18n";

interface ServicesListingProps {
  items: Service[];
  dict: Dictionary;
  locale: string;
}

export default function ServicesListing({ items, dict, locale }: ServicesListingProps) {
  const isEN = locale === "en";

  return (
    <div className="bg-black min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <InView className="text-center mb-16">
          <span className="font-outfit text-[11px] font-semibold uppercase tracking-[6px] text-red block mb-4">
            {isEN ? "Our Expertise" : "Nos Expertises"}
          </span>
          <h1 className="font-playfair text-[clamp(32px,5vw,52px)] font-light text-text leading-[1.15] mb-4">
            {isEN ? (
              <>Services d&apos;<em className="text-gradient-red font-normal not-italic">excellence</em></>
            ) : (
              <>Services d&apos;<em className="text-gradient-red font-normal not-italic">excellence</em></>
            )}
          </h1>
          <p className="font-outfit text-[15px] text-text-muted font-light leading-[1.8] max-w-[600px] mx-auto">
            {isEN
              ? "Discover our premium event management services, designed for the most demanding brands."
              : "D\u00e9couvrez nos services de r\u00e9gie \u00e9v\u00e9nementielle premium, con\u00e7us pour les marques les plus exigeantes."}
          </p>
        </InView>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {items.map((item) => {
            const data = isEN ? item.en : item.fr;
            return (
              <InView key={item.slug}>
                <Link
                  href={`/${locale}/services/${item.slug}`}
                  className="group p-8 border border-red/[0.08] rounded-[4px] hover:border-red/20 hover:bg-red/[0.03] transition-all duration-300 block h-full"
                >
                  <span className="text-3xl block mb-4">{item.icon}</span>
                  <h2 className="font-playfair text-[22px] text-text font-normal mb-3">{data.title}</h2>
                  <p className="font-outfit text-[14px] text-text-muted font-light leading-[1.8] mb-5">
                    {data.heroSubtitle}
                  </p>
                  <span className="inline-flex items-center gap-2 font-outfit text-[10px] font-semibold uppercase tracking-[2px] text-red group-hover:text-red-light transition-colors duration-300">
                    {isEN ? "Learn more" : "En savoir plus"}
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </InView>
            );
          })}
        </div>

        {/* CTA */}
        <InView className="text-center">
          <Link
            href={`/${locale}/#contact`}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:from-red-light hover:to-red hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] transition-all duration-300"
          >
            {dict.nav.cta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </InView>
      </div>
    </div>
  );
}
