"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { staggerContainer, fadeInUp } from "@/lib/animations";

/* @todo Remplacer par les vrais témoignages — Nicola */
const testimonials = [
  {
    quote:
      "Une exécution impeccable du début à la fin. Leurs régisseurs sont d'un professionnalisme rare.",
    name: "Sophie M.",
    title: "Directrice événementiel",
    company: "Maison de luxe parisienne",
  },
  {
    quote:
      "Mobilisation en 48h pour notre lancement produit. 200 invités, zéro accroc.",
    name: "Alexandre D.",
    title: "Responsable communication",
    company: "Groupe international",
  },
  {
    quote:
      "Cela fait 5 ans que nous travaillons exclusivement avec TNE. La qualité est constante.",
    name: "Marie-Claire L.",
    title: "CEO",
    company: "Agence événementielle",
  },
];

export default function ClientTestimonials() {
  return (
    <Section id="temoignages" variant="dark" compact>
      <SectionTitle
        label="Témoignages"
        title="Ils nous font confiance"
        italicWord="confiance"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeInUp}
            className="p-7 border border-red/[0.08] rounded-[4px] bg-black/30 hover:border-red/20 transition-all duration-300 flex flex-col"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 text-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-playfair text-[16px] font-light italic text-text/80 leading-[1.7] mb-6 flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red/10 border border-gold/20 flex items-center justify-center">
                <span className="font-outfit text-[12px] font-semibold text-gold">
                  {t.name.charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-outfit text-[13px] text-text font-medium block">
                  {t.name}
                </span>
                <span className="font-outfit text-[11px] text-text-muted font-light">
                  {t.title}, {t.company}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
