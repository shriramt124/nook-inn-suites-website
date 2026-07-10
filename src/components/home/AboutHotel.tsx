"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "../shared/SectionTitle";
import { StatsCard } from "../shared/StatsCard";

export const AboutHotel: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Image grid overlay */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 relative aspect-[4/3] w-full"
        >
          {/* Main Image */}
          <div className="relative w-[90%] h-[90%] overflow-hidden border border-stone-200/40">
            <Image
              src="/Nook GGN/_A3A1203-HDR.jpg"
              alt="Bespoke Lobby Lounge"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Floating Second Image */}
          <div className="absolute right-0 bottom-0 w-[45%] h-[55%] overflow-hidden border-4 border-white shadow-2xl hidden sm:block">
            <Image
              src="/Nook GGN/_A3A1007-HDR.jpg"
              alt="Luxury Spa Treatment Room"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>

          {/* Crimson red frame accent detail */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-red-500/50 -z-10" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-red-500/30 -z-10" />
        </motion.div>

        {/* Right Side: Text details and stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col space-y-6"
        >
          <SectionTitle
            title="A Heritage of Refined Hospitality"
            subtitle="The Nook Story"
            align="left"
            className="mb-6"
          />

          <p className="text-stone-700 font-sans font-normal leading-relaxed text-sm md:text-base">
            Since our inception, Nook Inn &amp; Suites has redefined boutique hospitality by fusing modern architectural lines with highly personalized, warm service. We believe that true luxury is not simply about premium materials—it is about carving out a personal sanctuary.
          </p>

          <p className="text-stone-500 font-sans font-normal leading-relaxed text-xs md:text-sm">
            Whether sipping crafted vintage cognacs in our glass lounge, relaxing in our eucalyptus-infused hot spas, or having a private dinner prepared in-suite by our Michelin chefs, we ensure that every memory created here stands the test of time.
          </p>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <StatsCard value="12+" label="Years Active" description="Of premium hospitality service" />
            <StatsCard value="5★" label="Luxury Rating" description="Forbes travel star guide" />
            <StatsCard value="98%" label="Satisfaction" description="Based on verified reviews" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
