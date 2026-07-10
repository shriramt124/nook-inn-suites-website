import React from "react";
import { cn } from "../../lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "primary" | "white";
}

export const Loader: React.FC<LoaderProps> = ({ className, size = "md", variant = "gold" }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-t-2 border-r-2 border-b-0 border-l-0",
          {
            "h-6 w-6 border-t-2": size === "sm",
            "h-12 w-12 border-t-2": size === "md",
            "h-20 w-20 border-t-3": size === "lg",
          },
          {
            "border-t-gold-500 border-r-gold-500": variant === "gold",
            "border-t-primary-500 border-r-primary-500": variant === "primary",
            "border-t-white border-r-white": variant === "white",
          }
        )}
      />
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("animate-shimmer rounded-none bg-stone-200", className)} />;
};

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <Loader size="lg" />
      <h3 className="mt-6 font-serif text-xl font-light tracking-widest text-primary-900 uppercase animate-pulse">
        Nook Inn & Suites
      </h3>
      <p className="mt-2 text-xs uppercase tracking-widest text-gold-500">
        Loading Luxury Experience
      </p>
    </div>
  );
};
