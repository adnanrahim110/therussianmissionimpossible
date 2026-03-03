"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

export function FormInput({
  label,
  type = "text",
  name,
  placeholder,
  required,
  error,
  textarea = false,
  className,
  ...props
}) {
  const id = useId();

  const baseInputStyles =
    "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-shadow duration-200 font-body";
  const stateStyles = error
    ? "border-crimson-500 focus:ring-crimson-500/50"
    : "border-stone-300 focus:border-stone-400 focus:ring-stone-200";

  const inputStyles = cn(baseInputStyles, stateStyles, className);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-semibold text-stone-700 text-sm tracking-wide"
        >
          {label} {required && <span className="text-crimson-600">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          className={cn(inputStyles, "resize-y min-h-30")}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={inputStyles}
          {...props}
        />
      )}

      {error && <span className="text-crimson-600 text-sm mt-1">{error}</span>}
    </div>
  );
}
