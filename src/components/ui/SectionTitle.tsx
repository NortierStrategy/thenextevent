"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionTitleProps {
  label?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  label,
  title,
  italicWord,
  subtitle,
  className = "",
}: SectionTitleProps) {
  const renderTitle = () => {
    if (!italicWord) return title;
    const parts = title.split(italicWord);
    return (
      <>
        {parts[0]}
        <em className="text-gradient-red">{italicWord}</em>
        {parts[1] || ""}
      </>
    );
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`text-center mb-16 ${className}`}
    >
      {label && (
        <span className="font-outfit text-[11px] font-semibold uppercase tracking-[6px] text-red mb-4 block">
          {label}
        </span>
      )}
      <h2 className="font-playfair text-[clamp(28px,4vw,48px)] font-light text-text leading-tight">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="font-outfit text-text-muted text-sm mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
