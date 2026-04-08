"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { forwardRef } from "react";

const MotionLink = motion.create(Link);

const baseStyles =
  "group relative overflow-hidden isolate inline-flex items-center justify-center rounded-[4px] font-ui uppercase tracking-[0.28em] transition-[transform,color,background-color,border-color,box-shadow,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 disabled:pointer-events-none";

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
  ghost: "relative text-stone-200 hover:text-accent",
};

const sweepStyles = {
  signal: "bg-white/14",
  quiet: "bg-white/8",
  light: "bg-crimson-100/70",
  outline: "bg-white/10",
};

const glowStyles = {
  signal: "bg-accent/35",
  quiet: "bg-stone-300/15",
  light: "bg-crimson-200/35",
  outline: "bg-white/12",
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
          whileHover:
            resolvedVariant === "ghost"
              ? { x: 0.5 }
              : {
                  y: -2,
                  scale: 1.01,
                },
          transition: {
            type: "spring",
            stiffness: 280,
            damping: 24,
            mass: 0.22,
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
        {!loading && Icon && iconPosition === "left" && (
          <Icon className="h-5 w-5" />
        )}
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
          <span className="pointer-events-none absolute bottom-1 left-3 right-3 h-px origin-center scale-x-0 bg-linear-to-r from-transparent via-accent to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
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
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-px -z-10 rounded-[inherit] opacity-0 blur-md transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100",
            glowStyles[resolvedVariant],
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ring-white/20"
        />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0",
            sweepStyles[resolvedVariant],
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 z-1 w-1/3 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/35 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[360%] group-hover:opacity-100"
        />
        {content}
      </Component>
    );
  },
);

Button.displayName = "Button";
