import React from "react";
import { cn } from "../../lib/utils";

interface StatsCardProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ value, label, description, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col p-6 md:p-8 bg-white border border-stone-100 text-center relative rounded-none shadow-sm hover:shadow-md transition-all duration-300 group",
        className
      )}
    >
      {/* Decorative corner accents */}
      <span className="absolute top-0 left-0 w-3 h-[2px] bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute top-0 left-0 w-[2px] h-3 bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-3 h-[2px] bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-[2px] h-3 bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-[#111111] mb-2 group-hover:text-gold-600 transition-colors duration-300">
        {value}
      </span>
      <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-1">
        {label}
      </span>
      {description && (
        <span className="text-[11px] sm:text-xs text-stone-500 leading-relaxed font-sans font-normal mt-1">
          {description}
        </span>
      )}
    </div>
  );
};
