"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { forwardRef } from "react";

const MotionLink = motion.create(Link);

const baseStyles =
  "group inline-flex items-center justify-center rounded-[4px] font-ui uppercase tracking-[0.28em] transition-[transform,color,background-color,border-color,box-shadow] duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 disabled:pointer-events-none";

const sizeStyles = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-[11px]",
  lg: "px-8 py-4 text-xs",
};

const variantMap = {
  primary: "signal",
  secondary: "quiet",
};

const variants = {
  signal:
    "relative overflow-hidden border border-accent bg-accent text-white shadow-[0_18px_45px_rgba(242,13,13,0.3)] hover:border-accent-hover hover:bg-accent",
  quiet:
    "relative overflow-hidden border border-stone-700/90 bg-stone-900/78 text-stone-100 shadow-[0_20px_55px_rgba(0,0,0,0.22)] hover:border-stone-500 hover:bg-stone-800/88",
  light:
    "relative overflow-hidden border border-stone-200 bg-white text-stone-950 shadow-[0_20px_55px_rgba(31,41,55,0.12)] hover:border-stone-300 hover:bg-stone-100",
  outline:
    "border border-stone-500/90 bg-transparent text-stone-50 hover:border-stone-300 hover:bg-white/8",
  ghost:
    "relative text-stone-200 hover:text-accent",
};

const sweepStyles = {
  signal: "bg-white/14",
  quiet: "bg-white/8",
  light: "bg-crimson-100/70",
};

export const Button = forwardRef(
  (
    {
      variant = "signal",
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
    const resolvedVariant = variantMap[variant] ?? variant;
    const Component = isLink ? MotionLink : motion.button;

    const motionProps = prefersReducedMotion
      ? {}
      : {
          whileTap: { scale: 0.985 },
          whileHover: resolvedVariant === "ghost" ? undefined : { y: -1 },
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 0.18,
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

    if (resolvedVariant === "ghost") {
      return (
        <Component
          {...sharedProps}
          className={cn(
            baseStyles,
            sizeStyles[size],
            variants.ghost,
            fullWidth && "w-full justify-center",
            isDisabled && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          {content}
          <span className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
        </Component>
      );
    }

    return (
      <Component
        {...sharedProps}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variants[resolvedVariant] ?? variants.signal,
          fullWidth && "w-full",
          isDisabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        {resolvedVariant !== "outline" && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0",
              sweepStyles[resolvedVariant],
            )}
          />
        )}
        {content}
      </Component>
    );
  },
);

Button.displayName = "Button";
