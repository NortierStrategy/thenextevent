"use client";

import { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const textareaId = props.id || props.name || undefined;
    const errorId = error && textareaId ? `${textareaId}-error` : undefined;
    return (
      <div className="space-y-2">
        <label htmlFor={textareaId} className="block font-outfit text-sm font-semibold uppercase tracking-[3px] text-text-muted">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          aria-required={props.required}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`w-full bg-medium border border-red/[0.07] rounded-[2px] px-3.5 py-3 font-outfit text-base text-text placeholder:text-text-muted/40 focus:outline-none focus:border-red/30 focus:ring-2 focus:ring-red/20 transition-colors duration-300 resize-none ${
            error ? "border-red" : ""
          } ${className}`}
          rows={props.rows || 5}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-red text-xs font-outfit">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
