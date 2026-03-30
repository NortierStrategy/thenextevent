"use client";

import Image from "next/image";
import Link from "next/link";
import InView from "@/components/ui/InView";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Realisation } from "@/data/realisations";
import type { Dictionary } from "@/lib/i18n";

interface RealisationsListingProps {
  items: Realisation[];
  dict: Dictionary;
  locale: string;
}

export default function RealisationsListing({ items, dict, locale }: RealisationsListingProps) {
  const isEN = locale === "en";

  return (
    <div className="bg-black min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
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
              <InView key={item.slug} stagger={(i % 3) + 1}>
                <Link
                  href={`/${locale}/realisations/${item.slug}`}
                  className="group relative aspect-[4/3] rounded-[4px] border border-red/[0.08] overflow-hidden block hover:border-red/25 transition-all duration-500 hover:-translate-y-[3px]"
                >
                  <Image
                    src={item.image}
                    alt={data.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <span className="font-outfit text-[9px] font-semibold uppercase tracking-[4px] text-text/60 mb-2">
                      {data.category} &mdash; {data.location}
                    </span>
                    <h2 className="font-playfair text-[18px] text-text font-normal">
                      {data.title}
                    </h2>
                  </div>
                </Link>
              </InView>
            );
          })}
        </div>
      </div>
    </div>
  );
}
