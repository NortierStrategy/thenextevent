"use client";

import { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block font-outfit text-[10px] font-semibold uppercase tracking-[3px] text-text-muted">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full bg-medium border border-red/[0.07] rounded-[2px] px-3.5 py-3 font-outfit text-[13px] text-text placeholder:text-text-muted/40 focus:outline-none focus:border-red/30 transition-colors duration-300 resize-none ${
            error ? "border-red" : ""
          } ${className}`}
          rows={5}
          {...props}
        />
        {error && (
          <p className="text-red text-xs font-outfit">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
