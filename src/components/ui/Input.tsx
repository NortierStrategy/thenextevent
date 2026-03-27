"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-text-muted">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full bg-medium border border-red/[0.07] rounded-[2px] px-3.5 py-3 font-outfit text-[13px] text-text placeholder:text-text-muted/40 focus:outline-none focus:border-red/30 transition-colors duration-300 ${
            error ? "border-red" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-red text-xs font-outfit">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
