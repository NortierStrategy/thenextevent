"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function Counter({
  value,
  suffix = "",
  label,
  duration = 4000,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    setVisible(true);
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quint: starts fast, slows down dramatically near the end
      const eased = 1 - Math.pow(1 - progress, 5);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };
    requestAnimationFrame(tick);
  }, [value, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <div
      ref={ref}
      className="text-center transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="font-playfair text-[36px] md:text-[42px] font-light text-text mb-1">
        {count}
        {suffix}
      </div>
      <div className="font-outfit text-[10px] md:text-[11px] font-semibold uppercase tracking-[2px] md:tracking-[3px] text-text/80">
        {label}
      </div>
    </div>
  );
}
