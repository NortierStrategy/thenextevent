"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { trackEvent } from "@/components/layout/Analytics";
import type { Dictionary } from "@/lib/i18n";

interface MetiersProps {
  dict: Dictionary;
  locale?: string;
}

export default function Metiers({ dict, locale = "fr" }: MetiersProps) {
  const ctaLabel = locale === "en" ? "Select this profile" : "Sélectionner ce profil";

  return (
    <Section id="metiers">
      <SectionTitle
        label={dict.metiers.label}
        title={dict.metiers.title}
        italicWord={dict.metiers.italicWord}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {dict.metiers.items.map((metier) => (
          <motion.div
            key={metier.title}
            variants={fadeInUp}
            className="group p-7 border border-red/[0.08] rounded-[4px] hover:border-red/20 hover:bg-red/[0.03] transition-all duration-300 flex flex-col"
          >
            <span className="text-red text-2xl block mb-4">{metier.icon}</span>
            <h3 className="font-playfair text-[19px] text-text font-normal mb-3">
              {metier.title}
            </h3>
            <p className="font-outfit text-[13px] text-text-muted font-light leading-[1.8] mb-5 flex-1">
              {metier.description}
            </p>
            <Link
              href={`/${locale}/#contact`}
              aria-label={`${locale === "en" ? "Select a" : "Sélectionner un"} ${metier.title.toLowerCase()}`}
              onClick={() => trackEvent("metier_cta_click", { metier: metier.title })}
              className="inline-flex items-center gap-2 font-outfit text-[10px] font-semibold uppercase tracking-[2px] text-red hover:text-red-light transition-colors duration-300 group/cta"
            >
              {ctaLabel}
              <svg
                className="w-3.5 h-3.5 transform group-hover/cta:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
