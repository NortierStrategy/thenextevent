"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "@/lib/animations";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "black" | "dark";
  compact?: boolean;
}

export default function Section({
  children,
  className = "",
  id,
  variant = "black",
  compact = false,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`${compact ? "py-14 md:py-16" : "py-16 md:py-24"} px-6 md:px-8 ${variant === "dark" ? "bg-dark" : "bg-black"} ${className}`}
    >
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </motion.section>
  );
}
