"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { Dictionary } from "@/lib/i18n";

interface TestimonialsProps {
  dict: Dictionary;
}

export default function Testimonials({ dict }: TestimonialsProps) {
  return (
    <section className="bg-gradient-to-br from-dark to-black py-16 md:py-20 px-8">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative text-center"
        >
          {/* Decorative quote */}
          <span className="absolute -top-14 left-1/2 -translate-x-1/2 font-serif text-[72px] text-red/25 leading-none select-none">
            &ldquo;
          </span>

          <blockquote className="font-playfair text-[clamp(20px,3vw,30px)] font-light italic text-text leading-[1.6] mt-12 mb-8">
            {dict.testimonial.quote}
          </blockquote>

          <cite className="font-outfit text-[12px] not-italic uppercase tracking-[2px] text-text-muted">
            {dict.testimonial.author} &mdash; {dict.testimonial.role}
          </cite>
        </motion.div>
      </div>
    </section>
  );
}
