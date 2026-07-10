"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0f0f0f]">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Nook GGN/_A3A1254-HDR.jpg"
          alt="Luxury Resort Horizon View"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/30 via-black/20 to-black/55 z-10" />
        {/* Subtle red vignette at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/20 to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center space-y-6 mt-16"
      >
        {/* Subtitle Badge */}
        <motion.span
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.45em] text-red-400 font-semibold mb-2"
        >
          Welcome to Nook Inn &amp; Suites
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-extralight tracking-wide text-white leading-tight"
        >
          Experience Luxury <br className="hidden sm:inline" />
          <span className="italic font-normal text-red-400">Beyond Expectations</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-16 h-[1px] bg-red-500/60 my-2"
        />

        {/* Sub-text */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg text-stone-200 font-normal font-sans max-w-2xl leading-relaxed"
        >
          Indulge in our sanctuary of modern styling and tailored hospitality, nestled beautifully at the edge of pristine ocean breezes.
        </motion.p>

        {/* Interactive Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto"
        >
          <Link href="/bookings" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold px-8 py-4">
              Book Your Stay
            </Button>
          </Link>
          <Link href="/rooms" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-semibold border-white text-white hover:bg-white hover:text-[#111111] px-8 py-4"
            >
              <span className="flex items-center gap-2">
                Explore Rooms &amp; Suites <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
