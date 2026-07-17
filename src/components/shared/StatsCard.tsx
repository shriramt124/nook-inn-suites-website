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
        "flex flex-col p-6 max-[380px]:p-3 max-[340px]:p-2.5 md:p-8 bg-white border border-stone-100 text-center relative rounded-none shadow-sm hover:shadow-md transition-all duration-300 group",
        className
      )}
    >
      {/* Decorative corner accents */}
      <span className="absolute top-0 left-0 w-3 h-[2px] bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute top-0 left-0 w-[2px] h-3 bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-3 h-[2px] bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-[2px] h-3 bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="font-serif text-4xl max-[380px]:text-3xl max-[340px]:text-[1.75rem] sm:text-5xl font-light tracking-tight text-[#111111] mb-2 max-[380px]:mb-1 group-hover:text-gold-600 transition-colors duration-300">
        {value}
      </span>
      <span className="text-xs max-[380px]:text-[10px] max-[340px]:text-[9px] uppercase tracking-widest max-[380px]:tracking-[0.18em] text-gold-600 font-semibold mb-1 max-[380px]:mb-0.5">
        {label}
      </span>
      {description && (
        <span className="text-[11px] max-[380px]:text-[10px] max-[340px]:text-[9px] sm:text-xs text-stone-500 leading-relaxed max-[380px]:leading-snug font-sans font-normal mt-1 max-[380px]:mt-0.5">
          {description}
        </span>
      )}
    </div>
  );
};
