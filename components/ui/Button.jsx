"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { forwardRef } from "react";

const MotionLink = motion.create(Link);

const baseStyles =
  "group inline-flex items-center justify-center rounded-[2px] font-ui uppercase tracking-[0.28em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:ring-offset-2";

const sizeStyles = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-[11px]",
  lg: "px-8 py-4 text-xs",
};

export const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      href,
      type,
      children,
      icon: Icon,
      iconPosition = "right",
      disabled = false,
      loading = false,
      className,
      fullWidth,
      onClick,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const isDisabled = disabled || loading;
    const isLink = Boolean(href);

    const Component = isLink ? MotionLink : motion.button;

    const motionProps = prefersReducedMotion
      ? {}
      : {
          whileTap: { scale: 0.98 },
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          },
        };

    const handleClick = (event) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    const sharedProps = {
      ref,
      ...(isLink ? { href } : { type: type ?? "button", disabled: isDisabled }),
      ...(isLink && isDisabled ? { tabIndex: -1 } : {}),
      "aria-disabled": isDisabled || undefined,
      "aria-busy": loading || undefined,
      onClick: isLink || onClick ? handleClick : undefined,
      ...props,
      ...motionProps,
    };

    const content = (
      <span className="relative z-10 inline-flex items-center gap-2">
        {loading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        )}
        {!loading && Icon && iconPosition === "left" && <Icon className="h-5 w-5" />}
        {children}
        {!loading && Icon && iconPosition === "right" && (
          <Icon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </span>
    );

    // Primary - wipe-fill from left (transparent -> crimson)
    if (variant === "primary") {
      return (
        <Component
          {...sharedProps}
          className={cn(
            baseStyles,
            sizeStyles[size],
            "relative overflow-hidden border border-crimson-600 text-crimson-400 hover:text-white",
            fullWidth && "w-full",
            isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className,
          )}
        >
          <span className="absolute inset-0 bg-crimson-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          {content}
        </Component>
      );
    }

    // Secondary - wipe-fill stone-900
    if (variant === "secondary") {
      return (
        <Component
          {...sharedProps}
          className={cn(
            baseStyles,
            sizeStyles[size],
            "relative overflow-hidden border border-stone-800 bg-stone-900 text-stone-300 hover:text-stone-50",
            fullWidth && "w-full",
            isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className,
          )}
        >
          <span className="absolute inset-0 bg-stone-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          {content}
        </Component>
      );
    }

    // Outline
    if (variant === "outline") {
      return (
        <Component
          {...sharedProps}
          className={cn(
            baseStyles,
            sizeStyles[size],
            "border-2 border-stone-700 text-stone-50 hover:bg-stone-800",
            fullWidth && "w-full",
            isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
            className,
          )}
        >
          {content}
        </Component>
      );
    }

    // Ghost - animated underline draws from left
    return (
      <Component
        {...sharedProps}
        className={cn(
          "group relative inline-flex items-center rounded-[2px] font-ui uppercase tracking-[0.28em] text-stone-200 hover:text-crimson-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-500",
          sizeStyles[size],
          fullWidth && "w-full justify-center",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className,
        )}
      >
        {content}
        <span className="absolute bottom-1 left-3 right-3 h-px bg-crimson-600 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      </Component>
    );
  },
);

Button.displayName = "Button";
