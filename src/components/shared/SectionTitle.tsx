import React from "react";
import { cn } from "../../lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
  align = "center",
  className,
  dark = false,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-3 mb-12 md:mb-16",
        {
          "items-start text-left": align === "left",
          "items-center text-center max-w-3xl mx-auto": align === "center",
          "items-end text-right": align === "right",
        },
        className
      )}
    >
      {subtitle && (
        <span
          className={cn(
            "text-xs uppercase tracking-[0.3em] font-sans font-semibold",
            dark ? "text-gold-300" : "text-gold-600"
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide",
          dark ? "text-white" : "text-[#111111]"
        )}
      >
        {title}
      </h2>
      <div className={cn("w-12 h-[1px] my-1", dark ? "bg-gold-400/50" : "bg-gold-600/40")} />
      {description && (
        <p
          className={cn(
            "text-sm sm:text-base font-normal font-sans leading-relaxed mt-2",
            dark ? "text-stone-300" : "text-stone-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
