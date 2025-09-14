"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";

    const variants = {
      primary:
        "bg-logo-teal-500 hover:bg-logo-teal-600 text-white shadow-lg hover:shadow-xl focus:ring-logo-teal-500",
      secondary:
        "bg-surf-blue hover:bg-surf-navy text-white shadow-lg hover:shadow-xl focus:ring-surf-blue",
      outline:
        "border-2 border-logo-teal-500 text-logo-teal-500 hover:bg-logo-teal-500 hover:text-white focus:ring-logo-teal-500",
      ghost:
        "text-logo-teal-500 hover:bg-logo-teal-50 focus:ring-logo-teal-500",
      destructive:
        "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl",
    };

    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
