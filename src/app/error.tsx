"use client";

import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring tools
    console.error("Global app error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-primary-950 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
      <div className="p-4 bg-red-500/10 text-red-400 border border-red-500/20 mb-6">
        <AlertTriangle className="h-10 w-10 animate-pulse" />
      </div>

      <span className="text-xs uppercase tracking-[0.35em] text-gold-500 font-semibold mb-2">
        An Error Occurred
      </span>

      <h2 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide max-w-md leading-snug">
        Something Went Wrong Unexpectedly
      </h2>

      <p className="mt-3 text-xs sm:text-sm text-stone-300 font-normal max-w-sm leading-relaxed">
        Our concierge desk has been notified. Please retry or navigate back to the home page.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[280px] sm:max-w-none">
        <Button variant="secondary" onClick={() => reset()} className="w-full sm:w-auto px-8 py-3.5">
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/")}
          className="w-full sm:w-auto border-stone-500 text-stone-200 hover:bg-white hover:text-primary-950 px-8 py-3.5"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
