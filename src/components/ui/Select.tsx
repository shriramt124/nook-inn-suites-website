import React from "react";
import { cn } from "../../lib/utils";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  icon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label className="text-xs uppercase tracking-widest text-primary-900 font-medium">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && <div className="absolute left-4 text-stone-500 pointer-events-none">{icon}</div>}
          <select
            ref={ref}
            className={cn(
              "w-full px-4 py-3 bg-white border border-stone-200 text-stone-800 text-sm font-sans transition-all duration-300 rounded-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 appearance-none cursor-pointer",
              icon && "pl-11",
              error && "border-gold-500 focus:border-gold-500 focus:ring-gold-500/30",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 pointer-events-none text-stone-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <span className="text-xs text-gold-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
