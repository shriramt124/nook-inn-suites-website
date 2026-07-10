"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { BookingForm } from "../../components/booking/BookingForm";
import { Loader } from "../../components/ui/Loader";

function BookingContent() {
  const searchParams = useSearchParams();
  const roomSlug = searchParams.get("room") || "";
  return <BookingForm initialRoomSlug={roomSlug} />;
}

export default function BookingsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 pb-20 bg-[#faf9f6]">
        {/* Page header banner */}
        <div className="bg-primary-950 py-16 text-center relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,35,64,0.6),rgba(0,0,0,0.8))]" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.45em] text-gold-500 font-semibold block">
              Reservation System
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
              Secure Your Stay
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-sans font-normal max-w-md mx-auto leading-relaxed">
              Complete our secure reservation form. Rates are dynamic and rooms are locked only upon checkout submission.
            </p>
          </div>
        </div>

        {/* Dynamic Booking form wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="flex flex-col justify-center items-center py-32 bg-white max-w-7xl mx-auto px-6 border border-stone-200/60 shadow-sm">
              <Loader size="md" />
              <p className="mt-4 text-sm text-stone-600 font-sans tracking-wide">Loading reservation wizard...</p>
            </div>
          }
        >
          <BookingContent />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
