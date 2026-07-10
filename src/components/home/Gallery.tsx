"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES } from "../../constants/data";
import { SectionTitle } from "../shared/SectionTitle";

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = ["all", "rooms", "dining", "exterior"];

  // Filter images
  const filteredImages = GALLERY_IMAGES.filter((img) =>
    filter === "all" ? true : img.category === filter
  );

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev! + 1));
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Capturing Our Signature Moments"
          subtitle="Visual Gallery"
          description="Immerse yourself in Nook Inn & Suites through our curated gallery. Explore the intricate designs, scenic garden areas, and bespoke culinary creations."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-10 text-xs uppercase tracking-widest font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 border-b transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? "border-gold-500 text-gold-500 font-semibold"
                  : "border-transparent text-stone-500 hover:text-primary-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(index)}
                className="relative aspect-square overflow-hidden group cursor-pointer border border-stone-200/40"
              >
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                  <Maximize2 className="h-5 w-5 text-gold-500 absolute top-6 right-6" />
                  <span className="text-[10px] text-gold-500 uppercase tracking-widest font-sans mb-1">
                    {img.category}
                  </span>
                  <h4 className="font-serif text-lg text-white font-light tracking-wide">
                    {img.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Pop-up Component */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Close trigger */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-none cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Main Lightbox Frame */}
            <div className="relative max-w-5xl w-full max-h-[80vh] aspect-video flex flex-col items-center justify-center select-none">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={filteredImages[activeImageIndex].url}
                  alt={filteredImages[activeImageIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="absolute bottom-[-40px] text-center w-full">
                <p className="text-white text-sm font-serif tracking-wide">
                  {filteredImages[activeImageIndex].title}
                </p>
                <p className="text-[10px] text-gold-500 uppercase tracking-widest mt-1">
                  {filteredImages[activeImageIndex].category}
                </p>
              </div>
            </div>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-none cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
