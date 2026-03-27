"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { fadeInUp } from "@/lib/animations";
import type { Dictionary } from "@/lib/i18n";

interface ExpertisesProps {
  dict: Dictionary;
  locale?: string;
}

export default function Expertises({ dict, locale }: ExpertisesProps) {
  const [active, setActive] = useState(0);
  const services = dict.expertises.services;
  const service = services[active];

  return (
    <Section id="services">
      <SectionTitle
        label={dict.expertises.label}
        title={dict.expertises.title}
        italicWord={dict.expertises.italicWord}
      />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8"
      >
        {/* Tabs */}
        <div className="space-y-2">
          {services.map((s, i) => (
            <button
              key={s.number}
              onClick={() => setActive(i)}
              className={`w-full text-left p-5 rounded-[4px] transition-all duration-300 border ${
                i === active
                  ? "border-l-2 border-l-red border-red/15 bg-red/[0.04]"
                  : "border-red/[0.06] hover:border-red/15 hover:bg-red/[0.02]"
              }`}
            >
              <span className="font-outfit text-[10px] font-semibold uppercase tracking-[4px] text-red block mb-1">
                {s.number}
              </span>
              <span className="font-playfair text-[20px] text-text font-normal">
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="p-8 md:p-10 border border-red/[0.08] rounded-[4px] bg-dark/50">
          <span className="font-outfit text-[11px] font-semibold uppercase tracking-[4px] text-red block mb-3">
            {service.subtitle}
          </span>
          <h3 className="font-playfair text-[28px] text-text font-normal mb-6">
            {service.title}
          </h3>
          <p className="font-outfit text-[15px] text-text/70 font-light leading-[1.9] mb-8">
            {service.description}
          </p>
          {/* Bullet points */}
          {service.bullets && (
            <ul className="space-y-2 mb-8">
              {service.bullets.map((bullet: string) => (
                <li key={bullet} className="flex items-start gap-3 font-outfit text-[13px] text-text/60 font-light">
                  <span className="text-red mt-0.5 text-[8px]">●</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 font-outfit text-[12px] font-medium text-text border border-red/15 rounded-[2px] tracking-[0.5px]"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/${locale || "fr"}/#contact`}
            className="inline-flex items-center gap-2 mt-6 font-outfit text-[10px] font-semibold uppercase tracking-[2px] text-red hover:text-red-light transition-colors duration-300"
          >
            Demander un devis
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </Section>
  );
}
