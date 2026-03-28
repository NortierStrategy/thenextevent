"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import InView from "@/components/ui/InView";
import ImageSkeleton from "@/components/ui/ImageSkeleton";
import { trackEvent } from "@/components/layout/Analytics";
import { getAllRealisations } from "@/data/realisations";
import type { Dictionary } from "@/lib/i18n";

interface RealisationsProps {
  dict: Dictionary;
  locale: string;
}

export default function Realisations({ dict, locale }: RealisationsProps) {
  const isEN = locale === "en";
  const items = getAllRealisations();

  return (
    <Section id="realisations" variant="dark">
      <SectionTitle
        label={dict.realisations.label}
        title={dict.realisations.title}
        italicWord={dict.realisations.italicWord}
      />

      <div className="text-center mb-10">
        <span className="font-outfit text-[11px] font-semibold uppercase tracking-[4px] text-text-muted">
          {dict.realisations.counter}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => {
          const data = isEN ? item.en : item.fr;
          return (
            <InView key={item.slug}>
              <Link
                href={`/${locale}/realisations/${item.slug}`}
                onClick={() => trackEvent("realisation_click", { project: data.title })}
                className="group relative aspect-[4/3] rounded-[4px] border border-red/[0.08] overflow-hidden block cursor-pointer hover:border-red/25 transition-all duration-500 hover:-translate-y-[3px]"
              >
                <ImageSkeleton />
                <Image
                  src={item.image}
                  alt={data.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 relative z-[1]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  {...(i < 3 ? { priority: true } : {})}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <span className="font-outfit text-[9px] font-semibold uppercase tracking-[4px] text-text/80 mb-2">
                    {data.category} &mdash; {data.location}
                  </span>
                  <h3 className="font-playfair text-[18px] text-text font-normal">
                    {data.title}
                  </h3>
                </div>
              </Link>
            </InView>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          href={`/${locale}/realisations`}
          className="inline-flex items-center gap-2 px-6 py-3 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-text border border-red/20 rounded-[2px] hover:border-red/40 hover:bg-red/5 transition-all duration-300"
        >
          {(dict.realisations as { cta?: string }).cta || (isEN ? "View all projects" : "Voir toutes nos r\u00e9alisations")}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}
