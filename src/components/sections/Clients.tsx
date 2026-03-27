"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { Dictionary } from "@/lib/i18n";

/**
 * Client logos mapped to SVG files in /public/images/clients/
 * Each entry: [filename, display width, display height]
 * Replace SVGs with official brand assets for production.
 */
const clientLogos: [string, number, number][] = [
  ["porsche",        120, 24],
  ["givenchy",       120, 22],
  ["veuve-clicquot", 150, 20],
  ["qatar-airways",  140, 20],
  ["google",          80, 28],
  ["linkedin",       120, 26],
  ["lacoste",        110, 22],
  ["mastercard",      50, 30],
  ["audi",           100, 28],
  ["dior",            70, 22],
  ["chanel",          48, 30],
  ["starbucks",       32, 32],
  ["youtube",         44, 30],
  ["bouygues",       120, 22],
];

interface ClientsProps {
  dict: Dictionary;
}

export default function Clients({ /* dict */ }: ClientsProps) {
  const tripled = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="bg-dark border-y border-red/[0.08] py-7 overflow-hidden">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center whitespace-nowrap"
          style={{ animation: "ticker 45s linear infinite" }}
        >
          {tripled.map(([name, w, h], i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center shrink-0 mx-8"
            >
              <Image
                src={`/images/clients/${name}.svg`}
                alt={name}
                width={w}
                height={h}
                className="opacity-30 hover:opacity-55 transition-opacity duration-500 select-none"
                style={{
                  filter: "brightness(0) invert(0.85)",
                  height: `${h}px`,
                  width: "auto",
                }}
              />
              <span className="text-red/25 text-[5px] ml-8">&#9670;</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
