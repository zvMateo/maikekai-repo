"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  variant?: "default" | "surf" | "glass" | "elevated";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseClasses =
      "rounded-xl transition-all duration-300 hover:-translate-y-1";

    const variants = {
      default: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
      surf: "bg-gradient-to-br from-surf-light to-white border border-surf-blue/20 shadow-lg hover:shadow-xl",
      glass:
        "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl",
      elevated: "bg-white shadow-xl hover:shadow-2xl border border-gray-100",
    };

    const cardClasses = cn(baseClasses, variants[variant], className);

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)}>
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
