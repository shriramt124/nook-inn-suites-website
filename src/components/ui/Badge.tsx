import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "gold";
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "outline", children, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider",
        {
          "bg-primary-500 text-white": variant === "primary",
          "bg-stone-100 text-stone-800 border border-stone-200": variant === "secondary",
          "bg-transparent text-stone-600 border border-stone-200": variant === "outline",
          "bg-gold-50 text-gold-700 border border-gold-300": variant === "gold",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
