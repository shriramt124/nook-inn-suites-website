import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", size = "md", isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium tracking-wide uppercase text-xs transition-all duration-300 rounded-none focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          // Variants
          {
            "bg-[#111111] text-white hover:bg-red-600 border border-[#111111] hover:border-red-600 shadow-md":
              variant === "primary",
            "bg-red-600 text-white hover:bg-red-700 border border-red-600 hover:border-red-700 shadow-md":
              variant === "secondary",
            "bg-transparent text-red-600 border border-red-600 hover:bg-red-600 hover:text-white":
              variant === "outline",
            "bg-transparent text-[#111111] hover:bg-red-50 hover:text-red-700": variant === "ghost",
            "bg-red-700 text-white hover:bg-red-800 border border-red-700 hover:border-red-800": variant === "danger",
          },
          // Sizes
          {
            "px-4 py-2 text-[10px]": size === "sm",
            "px-6 py-3.5": size === "md",
            "px-8 py-4.5 text-sm": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
