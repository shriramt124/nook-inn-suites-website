"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { MOCK_TESTIMONIALS } from "../../constants/data";
import { SectionTitle } from "../shared/SectionTitle";

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === MOCK_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? MOCK_TESTIMONIALS.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 md:py-28 bg-[#111111] relative overflow-hidden text-white">
      {/* Background Decorative Glow — subtle red */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-700/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <SectionTitle
          title="What Our Guests Have to Say"
          subtitle="Testimonials"
          dark
          className="mb-8"
        />

        {/* Quote Icon detail */}
        <Quote className="h-10 w-10 text-red-500/40 mb-8 stroke-[1]" />

        {/* Carousel Slider */}
        <div className="relative min-h-[220px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Rating stars */}
              <div className="flex items-center justify-center space-x-1.5">
                {Array.from({ length: MOCK_TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-red-500 text-red-500" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="font-serif text-xl md:text-2xl font-light italic leading-relaxed text-stone-200">
                &ldquo;{MOCK_TESTIMONIALS[activeIndex].comment}&rdquo;
              </blockquote>

              {/* Author Credits */}
              <div>
                <p className="font-sans font-semibold text-white tracking-widest uppercase text-xs">
                  {MOCK_TESTIMONIALS[activeIndex].guestName}
                </p>
                <p className="text-[10px] text-red-400 uppercase tracking-widest mt-1">
                  {MOCK_TESTIMONIALS[activeIndex].guestCountry}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Indicators */}
        <div className="flex items-center space-x-6 mt-10">
          <button
            onClick={handlePrev}
            className="p-2 border border-white/15 hover:border-red-500 rounded-none text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex space-x-2">
            {MOCK_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? "w-6 bg-red-500" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="p-2 border border-white/15 hover:border-red-500 rounded-none text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
