"use client";

import { cn } from "@/lib/utils";
import { useId, useState } from "react";

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
  const [focused, setFocused] = useState(false);

  const baseInputStyles =
    "w-full px-4 py-3 bg-white border-0 border-b-2 rounded-[2px] focus:outline-none transition-colors duration-200 font-body";
  const stateStyles = error
    ? "border-crimson-500"
    : "border-stone-300 focus:border-crimson-600";

  const inputStyles = cn(baseInputStyles, stateStyles, className);

  return (
    <div className="flex flex-col gap-2 relative">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "font-semibold text-sm tracking-wide transition-colors duration-200",
            focused ? "text-crimson-600" : "text-stone-700",
          )}
        >
          {label} {required && <span className="text-crimson-600">*</span>}
        </label>
      )}

      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            className={cn(inputStyles, "resize-y min-h-30")}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
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
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        )}

        {/* Bottom border wipe overlay */}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-0.5 bg-crimson-600 transition-all duration-300 ease-out",
            focused ? "w-full" : "w-0",
          )}
        />
      </div>

      {error && (
        <span role="alert" className="text-crimson-600 text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
}
