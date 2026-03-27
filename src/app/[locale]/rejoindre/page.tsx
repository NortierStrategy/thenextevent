"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import RecruitForm from "@/components/forms/RecruitForm";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const advantages = [
  {
    title: "\u00c9v\u00e9nements Prestigieux",
    description:
      "Travaillez pour les plus grandes marques du luxe, de la tech et de la culture \u00e0 Paris et \u00e0 l'international.",
  },
  {
    title: "R\u00e9mun\u00e9ration Attractive",
    description:
      "Des missions bien r\u00e9mun\u00e9r\u00e9es avec paiement rapide et transparent.",
  },
  {
    title: "Flexibilit\u00e9 Totale",
    description:
      "Choisissez vos missions selon votre disponibilit\u00e9 et vos pr\u00e9f\u00e9rences.",
  },
  {
    title: "R\u00e9seau Premium",
    description:
      "Int\u00e9grez un r\u00e9seau de r\u00e9gisseurs et professionnels d'exception haut de gamme.",
  },
];

export default function RejoindrePage() {
  return (
    <>
      <section className="relative pt-40 pb-20 px-8 bg-black">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-light text-text leading-tight mb-6">
              Rejoignez <em className="text-gradient-red">l&apos;\u00e9lite</em>
            </h1>
            <p className="font-outfit text-text-muted text-base max-w-2xl mx-auto font-light">
              Int\u00e9grez notre r\u00e9seau de r\u00e9gisseurs et professionnels
              d&apos;exception pour participer aux \u00e9v\u00e9nements de luxe les plus
              prestigieux \u00e0 Paris et \u00e0 l&apos;international.
            </p>
          </motion.div>
        </div>
      </section>

      <Section variant="dark">
        <SectionTitle
          label="Avantages"
          title="Pourquoi nous rejoindre"
          italicWord="rejoindre"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {advantages.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="p-7 border border-red/[0.08] rounded-[4px] hover:border-red/20 transition-all duration-300"
            >
              <h3 className="font-playfair text-[19px] text-text font-normal mb-3">
                {item.title}
              </h3>
              <p className="font-outfit text-[13px] text-text-muted font-light leading-[1.8]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section>
        <SectionTitle
          label="Candidature"
          title="Rejoindre le r\u00e9seau"
          italicWord="r\u00e9seau"
        />
        <div className="max-w-2xl mx-auto">
          <RecruitForm />
        </div>
      </Section>
    </>
  );
}
