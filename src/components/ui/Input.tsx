import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label className="text-xs uppercase tracking-widest text-primary-900 font-medium">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && <div className="absolute left-4 text-stone-500">{icon}</div>}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full px-4 py-3 bg-white border border-stone-200 text-stone-800 text-sm font-sans placeholder:text-stone-400 transition-all duration-300 rounded-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30",
              icon && "pl-11",
              error && "border-gold-500 focus:border-gold-500 focus:ring-gold-500/30",
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-gold-500 mt-0.5 font-medium">{error}</span>}
        {!error && helperText && <span className="text-xs text-stone-500 mt-0.5">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
