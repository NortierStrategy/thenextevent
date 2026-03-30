"use client";

import { useEffect, useRef, useState, createElement } from "react";

interface InViewProps {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "nav";
  className?: string;
  id?: string;
  margin?: string;
  stagger?: number;
}

/**
 * Lightweight scroll-triggered fade-in using IntersectionObserver.
 * Elements already in the viewport on load appear instantly (no flash).
 * Elements below the fold fade in smoothly when scrolled into view.
 */
export default function InView({
  children,
  as = "div",
  className = "",
  id,
  margin = "-80px",
  stagger,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"pending" | "instant" | "animated">("pending");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in the viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Already visible — show instantly, no animation
      setState("instant");
      return;
    }

    // Below the fold — observe and animate when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("animated");
          observer.unobserve(el);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  const staggerCls = stagger && stagger >= 1 && stagger <= 5 ? ` in-view-stagger-${stagger}` : "";

  const cls =
    state === "pending"
      ? "in-view-hidden"
      : state === "instant"
        ? "in-view-instant"
        : `in-view-visible${staggerCls}`;

  return createElement(
    as,
    { ref, id, className: `${cls} ${className}` },
    children
  );
}
