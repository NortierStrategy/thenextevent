"use client";

import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-red to-red-dark text-white border border-transparent hover:from-red-light hover:to-red hover:shadow-[0_0_25px_rgba(155,27,36,0.4)] hover:scale-[1.03]",
  secondary:
    "bg-transparent text-text border border-red/25 hover:border-red/50 hover:bg-red/5 hover:shadow-[0_0_20px_rgba(155,27,36,0.15)] hover:scale-[1.03]",
  ghost:
    "bg-transparent text-text-muted border border-text-muted/20 hover:border-text-muted/40 hover:text-text hover:scale-[1.02]",
};

export default function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3.5 min-h-[44px] font-outfit text-[11px] font-semibold tracking-[3px] rounded-[2px] transition-all duration-300 ease-out uppercase active:scale-[0.97]";

  const classes = `${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
