"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, MapPin, Maximize2, Clock, Star } from "lucide-react";
import { SectionTitle } from "../shared/SectionTitle";

/**
 * Property Tour section — showcases the Nook Inn property walk-through video.
 *
 * The YouTube iframe is only mounted after the user clicks the thumbnail
 * (facade pattern). This keeps the homepage light and avoids loading the
 * full YouTube player until someone actually wants to watch.
 */
const VIDEO_ID = "AXoBw01q9nM";
const THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

const TOUR_HIGHLIGHTS = [
  { icon: Maximize2, label: "22 Thoughtfully Designed Rooms" },
  { icon: Star, label: "4-Star Certified Property" },
  { icon: MapPin, label: "Heart of DLF Phase 2, Gurugram" },
  { icon: Clock, label: "24×7 Reception & Check-in" },
];

export const PropertyTour: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    // Move focus into the iframe for accessibility once it mounts
    requestAnimationFrame(() => {
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionTitle
          subtitle="Step Inside Nook Inn"
          title="A Virtual Property Tour"
          description="Take a guided walk-through of our rooms, banquet hall, rooftop venue, and garden breakfast area — all from the comfort of your screen."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Video Player (facade) ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-8 order-1"
          >
            <div
              ref={playerRef}
              className="relative w-full aspect-video overflow-hidden border border-stone-200 shadow-xl group bg-stone-900"
            >
              {playing ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                  title="Nook Inn & Suites — Property Tour"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={handlePlay}
                  aria-label="Play property tour video"
                  className="absolute inset-0 w-full h-full cursor-pointer block"
                >
                  {/* Thumbnail */}
                  <Image
                    src={THUMBNAIL}
                    alt="Nook Inn & Suites property tour"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

                  {/* Play button */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex items-center justify-center">
                      {/* Pulsing ring */}
                      <span className="absolute inline-flex h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gold-600/40 animate-ping opacity-60" />
                      <span className="relative inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gold-600 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-6 w-6 sm:h-8 sm:w-8 fill-white ml-1" />
                      </span>
                    </span>
                  </span>

                  {/* Caption */}
                  <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 text-left">
                    <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-gold-300 font-semibold mb-1">
                      Watch the Tour
                    </span>
                    <span className="block font-serif text-lg sm:text-2xl text-white leading-tight">
                      Explore Nook Inn &amp; Suites in 4K
                    </span>
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          {/* ── Tour highlights ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-4 order-2 space-y-5"
          >
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              From the moment you arrive, our property is designed to make you
              feel at home. The video walks you through our{" "}
              <span className="text-primary-900 font-medium">Comfort, Premium &amp; Suite rooms</span>,
              private cottages, lush garden breakfast area, and our versatile
              event spaces.
            </p>

            <ul className="space-y-3">
              {TOUR_HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 text-sm sm:text-base text-stone-700 font-sans"
                >
                  <span className="shrink-0 mt-0.5 inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 bg-gold-50 border border-gold-100 text-gold-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="leading-relaxed pt-1">{label}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-stone-500 font-sans italic leading-relaxed pt-2 border-t border-stone-100">
              Prefer to see it in person? Drop by anytime — our team would be
              delighted to show you around.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
