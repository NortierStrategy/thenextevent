"use client";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import InView from "@/components/ui/InView";

const values = [
  {
    title: "Excellence",
    description:
      "Chaque mission est une occasion de d\u00e9passer les attentes. Nous visons la perfection dans chaque d\u00e9tail.",
  },
  {
    title: "R\u00e9activit\u00e9",
    description:
      "Dans l'\u00e9v\u00e9nementiel haut de gamme, chaque minute compte. Notre \u00e9quipe est mobilisable sous 48h.",
  },
  {
    title: "Confiance",
    description:
      "Nous construisons des relations durables avec les plus grandes marques de luxe \u00e0 Paris et \u00e0 l'international.",
  },
  {
    title: "Passion",
    description:
      "L'\u00e9v\u00e9nementiel est notre ADN. Nos r\u00e9gisseurs d'exception partagent cette passion de l'excellence.",
  },
];

const timeline = [
  { year: "2007", event: "Cr\u00e9ation de The Next Event \u00e0 Paris" },
  { year: "2010", event: "Premier contrat avec une maison de luxe du groupe LVMH" },
  { year: "2014", event: "Expansion nationale et premiers \u00e9v\u00e9nements internationaux" },
  { year: "2017", event: "Cap des 500 \u00e9v\u00e9nements r\u00e9alis\u00e9s" },
  { year: "2020", event: "Adaptation et innovation face aux nouveaux formats \u00e9v\u00e9nementiels" },
  { year: "2024", event: "500+ \u00e9v\u00e9nements par an et un r\u00e9seau de 300+ r\u00e9gisseurs d'exception" },
];

export default function AProposPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 px-8 bg-black">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="hero-anim hero-anim-1">
            <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-light text-text leading-tight mb-6">
              Notre <em className="text-gradient-red">histoire</em>
            </h1>
            <p className="font-outfit text-text-muted text-base max-w-2xl mx-auto font-light">
              Depuis 2007, nous mettons l&apos;excellence et la passion au
              service des \u00e9v\u00e9nements de luxe les plus prestigieux \u00e0 Paris et
              \u00e0 l&apos;international.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <InView className="max-w-3xl mx-auto">
          <div className="space-y-6 font-outfit text-[14px] text-text-muted font-light leading-[1.9]">
            <p>
              Fond\u00e9e \u00e0 Paris en 2007, The Next Event est n\u00e9e d&apos;une
              conviction simple : chaque \u00e9v\u00e9nement de luxe m\u00e9rite les
              meilleurs r\u00e9gisseurs et professionnels d&apos;exception. Notre
              agence de staffing \u00e9v\u00e9nementiel premium s&apos;est construite
              autour de cette exigence haut de gamme.
            </p>
            <p>
              Au fil des ann\u00e9es, nous avons b\u00e2ti un r\u00e9seau de plus de 300
              r\u00e9gisseurs, directeurs techniques, chefs de projet et
              coordinateurs d&apos;exception, tri\u00e9s sur le volet pour leur
              expertise et leur capacit\u00e9 \u00e0 performer dans l&apos;univers du
              luxe.
            </p>
            <p>
              Aujourd&apos;hui, les plus grandes marques &mdash; Porsche, Dior,
              Google, LinkedIn, Veuve Clicquot &mdash; nous font confiance pour
              leurs \u00e9v\u00e9nements les plus exigeants \u00e0 Paris, en France et \u00e0
              l&apos;international.
            </p>
          </div>
        </InView>
      </Section>

      <Section variant="dark">
        <SectionTitle label="Nos valeurs" title="Les piliers de l'excellence" italicWord="l'excellence" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <InView key={v.title}>
              <div className="p-7 border border-red/[0.08] rounded-[4px]">
                <h3 className="font-playfair text-[19px] text-red font-normal mb-3">{v.title}</h3>
                <p className="font-outfit text-[13px] text-text-muted font-light leading-[1.8]">{v.description}</p>
              </div>
            </InView>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle label="Parcours" title="Notre timeline" italicWord="timeline" />
        <div className="max-w-2xl mx-auto">
          {timeline.map((item) => (
            <InView key={item.year}>
              <div className="flex gap-8 mb-10 last:mb-0">
                <div className="flex-shrink-0 w-16">
                  <span className="font-playfair text-xl font-light text-red">{item.year}</span>
                </div>
                <div className="relative pl-8 border-l border-red/20">
                  <div className="absolute -left-[4px] top-1.5 w-2 h-2 rounded-full bg-red" />
                  <p className="font-outfit text-[13px] text-text-muted font-light leading-relaxed">{item.event}</p>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </Section>

      <Section variant="dark" className="text-center">
        <InView>
          <div className="w-20 h-20 rounded-full bg-dark border border-red/15 mx-auto mb-6 flex items-center justify-center">
            <span className="font-playfair text-2xl text-red font-light">NN</span>
          </div>
          <h2 className="font-playfair text-2xl text-text font-light mb-1">Nicola Nortier</h2>
          <p className="font-outfit text-[12px] text-red uppercase tracking-[3px] mb-6">Fondateur & Directeur</p>
          <p className="font-outfit text-[14px] text-text-muted font-light leading-[1.9] max-w-lg mx-auto mb-10">
            Fort de plus de 18 ans d&apos;exp\u00e9rience dans l&apos;\u00e9v\u00e9nementiel haut de gamme et de luxe, Nicola a cr\u00e9\u00e9
            The Next Event avec la vision de professionnaliser le staffing \u00e9v\u00e9nementiel \u00e0 Paris et \u00e0 l&apos;international.
          </p>
          <Button href="/#contact" variant="primary">Nous contacter</Button>
        </InView>
      </Section>
    </>
  );
}
