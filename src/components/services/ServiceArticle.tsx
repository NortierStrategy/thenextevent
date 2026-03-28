"use client";

import Image from "next/image";
import Link from "next/link";
import InView from "@/components/ui/InView";
import type { Service } from "@/data/services";
import type { Dictionary } from "@/lib/i18n";
import type { BlogPost } from "@/lib/blog";

interface ServiceArticleProps {
  service: Service;
  related: Service[];
  relatedPosts: BlogPost[];
  dict: Dictionary;
  locale: string;
}

export default function ServiceArticle({ service, related, relatedPosts, dict, locale }: ServiceArticleProps) {
  const isEN = locale === "en";
  const data = isEN ? service.en : service.fr;
  const baseUrl = "https://thenextevent.fr";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEN ? "Home" : "Accueil", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/${locale}/services` },
      { "@type": "ListItem", position: 3, name: data.title, item: `${baseUrl}/${locale}/services/${service.slug}` },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.metaDescription,
    provider: {
      "@type": "Organization",
      name: "The Next Event",
      url: baseUrl,
    },
    areaServed: ["Paris", "France", "Europe"],
    serviceType: data.title,
  };

  const paragraphs = data.description.split("\n\n");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <article className="bg-black min-h-screen pt-24">
        {/* Breadcrumb */}
        <div className="max-w-[1200px] mx-auto px-6 mb-8">
          <nav aria-label="Breadcrumb" className="font-outfit text-[11px] text-text-muted tracking-[1px]">
            <Link href={`/${locale}`} className="hover:text-text transition-colors duration-200">
              {isEN ? "Home" : "Accueil"}
            </Link>
            <span className="mx-2 text-red/30">/</span>
            <Link href={`/${locale}/services`} className="hover:text-text transition-colors duration-200">
              Services
            </Link>
            <span className="mx-2 text-red/30">/</span>
            <span className="text-text">{data.title}</span>
          </nav>
        </div>

        {/* Hero */}
        <InView className="max-w-[800px] mx-auto px-6 mb-16 text-center">
          <span className="text-4xl block mb-6">{service.icon}</span>
          <h1 className="font-playfair text-[clamp(32px,5vw,52px)] font-light text-text leading-[1.15] mb-4">
            {data.title}
          </h1>
          <p className="font-outfit text-[16px] text-text-muted font-light leading-[1.8] max-w-[600px] mx-auto">
            {data.heroSubtitle}
          </p>
        </InView>

        {/* Description */}
        <InView className="max-w-[800px] mx-auto px-6 mb-16">
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-outfit text-[15px] text-text/80 font-light leading-[1.9]">
                {p}
              </p>
            ))}
          </div>
        </InView>

        {/* Benefits */}
        <InView className="max-w-[1000px] mx-auto px-6 mb-16">
          <h2 className="font-outfit text-[10px] font-semibold uppercase tracking-[4px] text-red mb-8 text-center">
            {isEN ? "Key Benefits" : "Avantages Cl\u00e9s"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-4 border border-red/[0.08] rounded-[4px] bg-dark/30">
                <svg className="w-4 h-4 text-red mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-outfit text-[14px] text-text/80 font-light leading-[1.7]">{benefit}</span>
              </div>
            ))}
          </div>
        </InView>

        {/* Use cases */}
        <InView className="max-w-[800px] mx-auto px-6 mb-16">
          <h2 className="font-outfit text-[10px] font-semibold uppercase tracking-[4px] text-red mb-8 text-center">
            {isEN ? "Typical Events" : "\u00c9v\u00e9nements Types"}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.useCases.map((uc) => (
              <span key={uc} className="px-4 py-2 font-outfit text-[12px] font-medium text-text border border-red/15 rounded-[2px] tracking-[0.5px]">
                {uc}
              </span>
            ))}
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

        {/* Related blog articles */}
        {relatedPosts.length > 0 && (
          <section className="max-w-[1000px] mx-auto px-6 mb-16">
            <InView>
              <h2 className="font-outfit text-[10px] font-semibold uppercase tracking-[4px] text-text-muted mb-8 text-center">
                {isEN ? "Related Articles" : "Articles Associ\u00e9s"}
              </h2>
            </InView>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <InView key={post.slug}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="group block border border-red/[0.08] rounded-[4px] overflow-hidden hover:border-red/20 transition-colors duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-dark">
                      <Image
                        src={post.image}
                        alt={isEN ? post.titleEN : post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <span className="font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-red mb-2 block">
                        {post.category}
                      </span>
                      <h3 className="font-playfair text-[16px] text-text font-normal group-hover:text-red/90 transition-colors duration-300 leading-snug">
                        {isEN ? post.titleEN : post.title}
                      </h3>
                      <span className="font-outfit text-[11px] text-text-muted mt-2 block">{post.date}</span>
                    </div>
                  </Link>
                </InView>
              ))}
            </div>
          </section>
        )}

        {/* Related services */}
        {related.length > 0 && (
          <section className="max-w-[1000px] mx-auto px-6 pb-20">
            <InView>
              <h2 className="font-outfit text-[10px] font-semibold uppercase tracking-[4px] text-text-muted mb-8 text-center">
                {isEN ? "Related Services" : "Services Associ\u00e9s"}
              </h2>
            </InView>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rel) => {
                const relData = isEN ? rel.en : rel.fr;
                return (
                  <InView key={rel.slug}>
                    <Link
                      href={`/${locale}/services/${rel.slug}`}
                      className="group p-7 border border-red/[0.08] rounded-[4px] hover:border-red/20 hover:bg-red/[0.03] transition-all duration-300 block"
                    >
                      <span className="text-2xl block mb-3">{rel.icon}</span>
                      <h3 className="font-playfair text-[19px] text-text font-normal mb-2">{relData.title}</h3>
                      <p className="font-outfit text-[13px] text-text-muted font-light leading-[1.7]">
                        {relData.heroSubtitle}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-4 font-outfit text-[10px] font-semibold uppercase tracking-[2px] text-red group-hover:text-red-light transition-colors duration-300">
                        {isEN ? "Learn more" : "En savoir plus"}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
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
