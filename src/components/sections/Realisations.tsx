"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { Dictionary } from "@/lib/i18n";

interface RealisationsProps {
  dict: Dictionary;
}

export default function Realisations({ dict }: RealisationsProps) {
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

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {dict.realisations.items.map((item, i) => (
          <motion.div
            key={`${item.title}-${i}`}
            variants={fadeInUp}
            className="group relative aspect-[4/3] rounded-[4px] border border-red/[0.08] overflow-hidden cursor-pointer hover:border-red/25 transition-all duration-500 hover:-translate-y-[3px]"
          >
            {/* Photo */}
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
            {/* Text */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <span className="font-outfit text-[9px] font-semibold uppercase tracking-[4px] text-text/60 mb-2">
                {item.category} &mdash; {item.location}
              </span>
              <h3 className="font-playfair text-[18px] text-text font-normal">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
