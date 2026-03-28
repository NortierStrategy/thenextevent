"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer, index }: AccordionItemProps & { index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `accordion-panel-${index}`;
  const triggerId = `accordion-trigger-${index}`;

  return (
    <div className="border-b border-red/[0.08]">
      <h3>
        <button
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full py-6 flex items-center justify-between text-left group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-outfit text-text text-sm md:text-base pr-8 font-normal">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={`text-red text-xl transition-transform duration-300 flex-shrink-0 ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-outfit text-text-muted text-sm pb-6 leading-relaxed font-light">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: readonly { question: string; answer: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  return (
    <div className="border-t border-red/[0.08]">
      {items.map((item, i) => (
        <AccordionItem key={i} index={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
