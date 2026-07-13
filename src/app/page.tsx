import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { AboutHotel } from "../components/home/AboutHotel";
import { FeaturedRooms } from "../components/home/FeaturedRooms";
import { Facilities } from "../components/home/Facilities";
import { Gallery } from "../components/home/Gallery";
import { Testimonials } from "../components/home/Testimonials";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { Button } from "../components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Hotel Near MG Road Metro & Cyber City | Nook Inn & Suites Gurgaon",
  description: "Looking for a luxury or budget hotel near Cyber City or DLF Phase 2? Nook Inn & Suites offers premium rooms, banquets, and corporate booking deals in Gurugram.",
  keywords: "hotel near mg road metro, best hotel in dlf phase 2, hotel near cyber city gurgaon, luxury hotel gurgaon, corporate booking hotel gurugram",
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Full-width interactive Hero Banner */}
        <Hero />

        {/* About Resort Intro & Counters */}
        <AboutHotel />

        {/* Featured Premium Suites Grid */}
        <FeaturedRooms />

        {/* Facilities Dynamic Icons Row */}
        <Facilities />

        {/* Grid Gallery with Lightbox Popups */}
        <Gallery />

        {/* Guest Testimonials Slideshow */}
        <Testimonials />

        {/* Value Prop Columns */}
        <WhyChooseUs />

        {/* Call to Action Reservation Section */}
        <section className="relative py-28 overflow-hidden bg-[#0f0f0f]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/Nook GGN/_A3A1254-HDR.jpg"
              alt="Luxury suite ocean sunset balcony"
              fill
              className="object-cover opacity-25 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/70 to-transparent" />
            {/* Red warmth overlay */}
            <div className="absolute inset-0 bg-red-900/10" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.45em] text-red-400 font-semibold">
              Bespoke Escape
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white leading-tight">
              Reserve Your Dream Stay
            </h2>
            <div className="w-12 h-[1px] bg-red-500/50" />
            <p className="text-stone-300 text-sm md:text-base font-sans font-light max-w-xl leading-relaxed">
              Book directly with Nook Inn & Suites to receive priority room upgrades, complementary airport chauffeurs, and access to VIP pool cabanas.
            </p>
            <div className="pt-4">
              <Link href="/bookings">
                <Button variant="secondary" size="lg" className="font-semibold px-10 py-4 shadow-2xl">
                  Book Your Sanctuary
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
