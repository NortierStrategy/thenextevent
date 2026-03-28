"use client";

import Image from "next/image";
import Link from "next/link";
import InView from "@/components/ui/InView";
import type { Realisation } from "@/data/realisations";
import type { Dictionary } from "@/lib/i18n";

const SERVICE_LABELS: Record<string, { fr: string; en: string }> = {
  regisseurs: { fr: "R\u00e9gisseurs \u00c9v\u00e9nementiels", en: "Event Stage Managers" },
  logistique: { fr: "Logistique Haut de Gamme", en: "Premium Logistics" },
  production: { fr: "Direction de Production", en: "Production Management" },
};

interface RealisationArticleProps {
  item: Realisation;
  others: Realisation[];
  dict: Dictionary;
  locale: string;
}

export default function RealisationArticle({ item, others, dict, locale }: RealisationArticleProps) {
  const isEN = locale === "en";
  const data = isEN ? item.en : item.fr;
  const baseUrl = "https://thenextevent.fr";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEN ? "Home" : "Accueil",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEN ? "Portfolio" : "R\u00e9alisations",
        item: `${baseUrl}/${locale}/realisations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: `${baseUrl}/${locale}/realisations/${item.slug}`,
      },
    ],
  };

  const paragraphs = data.description.split("\n\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="bg-black min-h-screen pt-24">
        {/* Breadcrumb */}
        <div className="max-w-[1200px] mx-auto px-6 mb-8">
          <nav aria-label="Breadcrumb" className="font-outfit text-[11px] text-text-muted tracking-[1px]">
            <Link href={`/${locale}`} className="hover:text-text transition-colors duration-200">
              {isEN ? "Home" : "Accueil"}
            </Link>
            <span className="mx-2 text-red/30">/</span>
            <Link href={`/${locale}/realisations`} className="hover:text-text transition-colors duration-200">
              {isEN ? "Portfolio" : "R\u00e9alisations"}
            </Link>
            <span className="mx-2 text-red/30">/</span>
            <span className="text-text">{data.title}</span>
          </nav>
        </div>

        {/* Hero image */}
        <InView className="max-w-[1200px] mx-auto px-6 mb-12">
          <div className="relative aspect-[16/9] rounded-[4px] overflow-hidden border border-red/[0.08]">
            <Image
              src={item.image}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </InView>

        {/* Header */}
        <InView className="max-w-[800px] mx-auto px-6 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-red">
              {data.category}
            </span>
            <span className="text-red/30 text-[8px]">\u25C6</span>
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-text-muted">
              {data.location}
            </span>
          </div>
          <h1 className="font-playfair text-[clamp(32px,5vw,52px)] font-light text-text leading-[1.15] mb-6">
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 font-outfit text-[12px] text-text-muted">
            <span>
              <span className="font-semibold uppercase tracking-[2px] text-text-muted/60 text-[10px]">
                {isEN ? "Client" : "Client"}
              </span>
              <br />
              {item.client}
            </span>
            <span>
              <span className="font-semibold uppercase tracking-[2px] text-text-muted/60 text-[10px]">
                {isEN ? "Date" : "Date"}
              </span>
              <br />
              {item.date}
            </span>
          </div>
        </InView>

        {/* Description */}
        <InView className="max-w-[800px] mx-auto px-6 mb-12">
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-outfit text-[15px] text-text/80 font-light leading-[1.9]">
                {p}
              </p>
            ))}
          </div>
        </InView>

        {/* Services */}
        <InView className="max-w-[800px] mx-auto px-6 mb-16">
          <h2 className="font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-text-muted mb-4">
            {isEN ? "Services Deployed" : "Services D\u00e9ploy\u00e9s"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {item.services.map((s) => {
              const label = SERVICE_LABELS[s];
              return (
                <span
                  key={s}
                  className="px-4 py-2 font-outfit text-[12px] font-medium text-text border border-red/15 rounded-[2px] tracking-[0.5px]"
                >
                  {label ? (isEN ? label.en : label.fr) : s}
                </span>
              );
            })}
          </div>
        </InView>

        {/* CTA */}
        <InView className="max-w-[800px] mx-auto px-6 mb-20">
          <div className="p-8 border border-red/[0.08] rounded-[4px] bg-dark/50 text-center">
            <h2 className="font-playfair text-[24px] text-text font-light mb-3">
              {isEN ? "Let\u2019s discuss your project" : "Discutons de votre projet"}
            </h2>
            <p className="font-outfit text-[14px] text-text-muted font-light mb-6">
              {isEN
                ? "We bring the same level of excellence to every event."
                : "Nous apportons le m\u00eame niveau d\u2019excellence \u00e0 chaque \u00e9v\u00e9nement."}
            </p>
            <Link
              href={`/${locale}/#contact`}
              className="inline-flex items-center gap-2 px-6 py-3 font-outfit text-[11px] font-bold uppercase tracking-[3px] text-white bg-gradient-to-br from-red to-red-dark rounded-[2px] hover:from-red-light hover:to-red hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] transition-all duration-300"
            >
              {dict.nav.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </InView>

        {/* Other realisations */}
        {others.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-6 pb-20">
            <InView>
              <h2 className="font-outfit text-[10px] font-semibold uppercase tracking-[4px] text-text-muted mb-8 text-center">
                {isEN ? "Other Projects" : "Autres R\u00e9alisations"}
              </h2>
            </InView>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((other) => {
                const otherData = isEN ? other.en : other.fr;
                return (
                  <InView key={other.slug}>
                    <Link
                      href={`/${locale}/realisations/${other.slug}`}
                      className="group relative aspect-[4/3] rounded-[4px] border border-red/[0.08] overflow-hidden block hover:border-red/25 transition-all duration-500 hover:-translate-y-[3px]"
                    >
                      <Image
                        src={other.image}
                        alt={otherData.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
                      <div className="relative z-10 h-full flex flex-col justify-end p-6">
                        <span className="font-outfit text-[9px] font-semibold uppercase tracking-[4px] text-text/60 mb-2">
                          {otherData.category} &mdash; {otherData.location}
                        </span>
                        <h3 className="font-playfair text-[18px] text-text font-normal">
                          {otherData.title}
                        </h3>
                      </div>
                    </Link>
                  </InView>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
