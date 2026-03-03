"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { forwardRef } from "react";

const baseStyles =
  "inline-flex items-center justify-center rounded-lg font-body font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-500 focus-visible:ring-offset-2";

const buttonVariants = {
  primary: "bg-crimson-600 text-white hover:bg-crimson-700",
  secondary: "bg-stone-900 text-stone-50 hover:bg-stone-800",
  outline: "border-2 border-stone-300 text-stone-900 hover:bg-stone-100",
  ghost: "text-stone-700 hover:text-crimson-600 hover:bg-stone-100",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      href,
      children,
      icon: Icon,
      iconPosition = "right",
      disabled = false,
      loading = false,
      className,
      fullWidth,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();

    // Magnetic Hook configuration
    const { ref: magneticRef, position, handleMouse, reset } = useMagnetic(0.2);

    const Component = href ? motion.create(Link) : motion.button;

    const classes = cn(
      baseStyles,
      buttonVariants[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      (disabled || loading) && "opacity-50 cursor-not-allowed",
      className,
    );

    const inner = (
      <>
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : Icon && iconPosition === "left" ? (
          <Icon className="mr-2 h-5 w-5" />
        ) : null}

        {children}

        {!loading && Icon && iconPosition === "right" && (
          <Icon className="ml-2 h-5 w-5" />
        )}
      </>
    );

    const motionProps = prefersReducedMotion
      ? {}
      : {
          whileHover: {
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 10 },
          },
          whileTap: { scale: 0.98 },
          animate: { x: position.x, y: position.y },
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          },
          onMouseMove: handleMouse,
          onMouseLeave: reset,
        };

    const commonProps = {
      ref: magneticRef, // Apply magnetic ref to the component
      className: classes,
      disabled: disabled || loading,
      ...props,
      ...motionProps,
    };

    if (href) {
      return (
        <Component
          href={href}
          aria-disabled={disabled || loading}
          {...commonProps}
        >
          {inner}
        </Component>
      );
    }

    return <Component {...commonProps}>{inner}</Component>;
  },
);

Button.displayName = "Button";
