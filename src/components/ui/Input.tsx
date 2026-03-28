"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const inputId = props.id || props.name || undefined;
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block font-outfit text-sm font-semibold uppercase tracking-[3px] text-text-muted">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-required={props.required}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`w-full bg-medium border border-red/[0.07] rounded-[2px] px-3.5 py-3 font-outfit text-base text-text placeholder:text-text-muted/40 focus:outline-none focus:border-red/30 focus:ring-2 focus:ring-red/20 transition-colors duration-300 ${
            error ? "border-red" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-red text-xs font-outfit">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
