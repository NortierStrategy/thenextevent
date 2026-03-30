"use client";

import { useParams } from "next/navigation";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import RecruitForm from "@/components/forms/RecruitForm";
import InView from "@/components/ui/InView";

const advantages = {
  fr: [
    {
      title: "Événements Prestigieux",
      description:
        "Travaillez pour les plus grandes marques du luxe, de la tech et de la culture à Paris et à l'international.",
    },
    {
      title: "Rémunération Attractive",
      description:
        "Des missions bien rémunérées avec paiement rapide et transparent.",
    },
    {
      title: "Flexibilité Totale",
      description:
        "Choisissez vos missions selon votre disponibilité et vos préférences.",
    },
    {
      title: "Réseau Premium",
      description:
        "Intégrez un réseau de régisseurs et professionnels d'exception haut de gamme.",
    },
  ],
  en: [
    {
      title: "Prestigious Events",
      description:
        "Work for the biggest luxury, tech and culture brands in Paris and internationally.",
    },
    {
      title: "Attractive Pay",
      description:
        "Well-paid assignments with fast and transparent payment.",
    },
    {
      title: "Total Flexibility",
      description:
        "Choose your assignments based on your availability and preferences.",
    },
    {
      title: "Premium Network",
      description:
        "Join a network of exceptional high-end event managers and professionals.",
    },
  ],
};

export default function RejoindrePage() {
  const { locale } = useParams<{ locale: string }>();
  const isEn = locale === "en";
  const items = isEn ? advantages.en : advantages.fr;

  return (
    <>
      <section className="relative pt-40 pb-20 px-8 bg-black">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="hero-anim hero-anim-1">
            <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-light text-text leading-tight mb-6">
              {isEn ? (
                <>Join the <em className="text-gradient-red">elite</em></>
              ) : (
                <>Rejoignez <em className="text-gradient-red">l&apos;élite</em></>
              )}
            </h1>
            <p className="font-outfit text-text-muted text-base max-w-2xl mx-auto font-light">
              {isEn
                ? "Join our network of event managers and exceptional professionals to take part in the most prestigious luxury events in Paris and internationally."
                : "Intégrez notre réseau de régisseurs et professionnels d\u2019exception pour participer aux événements de luxe les plus prestigieux à Paris et à l\u2019international."}
            </p>
          </div>
        </div>
      </section>

      <Section variant="dark">
        <SectionTitle
          label={isEn ? "Benefits" : "Avantages"}
          title={isEn ? "Why join us" : "Pourquoi nous rejoindre"}
          italicWord={isEn ? "join" : "rejoindre"}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <InView
              key={item.title}
              className="p-7 border border-red/[0.08] rounded-[4px] hover:border-red/20 transition-all duration-300"
            >
              <h3 className="font-playfair text-[19px] text-text font-normal mb-3">
                {item.title}
              </h3>
              <p className="font-outfit text-[13px] text-text-muted font-light leading-[1.8]">
                {item.description}
              </p>
            </InView>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle
          label={isEn ? "Application" : "Candidature"}
          title={isEn ? "Join the network" : "Rejoindre le réseau"}
          italicWord={isEn ? "network" : "réseau"}
        />
        <div className="max-w-2xl mx-auto">
          <RecruitForm locale={locale} />
        </div>
      </Section>
    </>
  );
}
