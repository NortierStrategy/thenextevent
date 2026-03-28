"use client";

import { useEffect, useRef, useState, createElement } from "react";

interface InViewProps {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "nav";
  className?: string;
  id?: string;
  margin?: string;
}

/**
 * Lightweight scroll-triggered fade-in using IntersectionObserver.
 * Replaces framer-motion whileInView for simple fade-up animations.
 * Uses CSS classes from globals.css (.in-view-hidden / .in-view-visible).
 */
export default function InView({
  children,
  as = "div",
  className = "",
  id,
  margin = "-80px",
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return createElement(
    as,
    {
      ref,
      id,
      className: `${visible ? "in-view-visible" : "in-view-hidden"} ${className}`,
    },
    children
  );
}
