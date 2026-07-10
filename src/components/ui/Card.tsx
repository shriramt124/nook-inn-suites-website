import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "dark" | "outline";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-300 shadow-sm",
          {
            "bg-white border border-stone-200/60": variant === "default",
            "glass-panel": variant === "glass",
            "bg-primary-900 border border-primary-800 text-white": variant === "dark",
            "border border-stone-200/80 bg-transparent": variant === "outline",
          },
          hoverEffect && "hover:shadow-md hover:-translate-y-1 duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pb-4 border-b border-stone-100/60", className)} {...props}>
    {children}
  </div>
);

export const CardBody = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-4 border-t border-stone-100/60", className)} {...props}>
    {children}
  </div>
);
