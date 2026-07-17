"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  X,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Car,
  UtensilsCrossed,
  Briefcase,
  Sparkles,
  ArrowUpDown,
  Accessibility,
  Check,
} from "lucide-react";

// ─── Slide Data ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: "stay",
    badge: "Luxury Stays",
    heading: "Your Perfect",
    headingAccent: "Home Away From Home",
    subtext:
      "Unwind in one of our 22 thoughtfully designed rooms — Comfort, Premium, Family Suites & private Cottages tailored for every kind of traveller.",
    image: "/Nook GGN/first_slide.png",
    intent: "Luxury Stay",
    perks: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: UtensilsCrossed, label: "Breakfast & Garden" },
      { icon: ArrowUpDown, label: "In-house Lift" },
      { icon: Accessibility, label: "Wheelchair Accessible" },
    ],
    cta: "/bookings",
    ctaLabel: "Book Your Stay",
  },
  {
    id: "conference",
    badge: "Corporate Events",
    heading: "Power Your",
    headingAccent: "Next Big Meeting",
    subtext:
      "Host impactful corporate conferences and business meets in our fully equipped conference room with modern AV setup and high-speed connectivity.",
    image: "/Nook GGN/_A3A1203-HDR.jpg",
    intent: "Corporate Conference",
    perks: [
      { icon: Briefcase, label: "Conference Room" },
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: Car, label: "In-House Parking" },
      { icon: ArrowUpDown, label: "Lift Access" },
    ],
    cta: null,
    ctaLabel: "Request a Callback",
  },
  {
    id: "banquet",
    badge: "Celebrations & Weddings",
    heading: "Make Every",
    headingAccent: "Moment Unforgettable",
    subtext:
      "From ring ceremonies to grand receptions — our banquet hall hosts up to 250 guests with an ambiance that turns events into lifelong memories.",
    image: "/Nook GGN/_A3A0965-HDR.jpg",
    intent: "Banquet / Ring Ceremony",
    perks: [
      { icon: UtensilsCrossed, label: "Banquet (250 Pax)" },
      { icon: Sparkles, label: "Rooftop Venue" },
      { icon: Car, label: "10-Car Parking" },
      { icon: Wifi, label: "High-Speed WiFi" },
    ],
    cta: null,
    ctaLabel: "Request a Callback",
  },
  {
    id: "rooftop",
    badge: "Rooftop Parties",
    heading: "Celebrate Under",
    headingAccent: "The Open Sky",
    subtext:
      "Plan an unforgettable rooftop bash with your friends. Our open-air rooftop party venue sets the perfect stage for cocktail nights and birthday bashes.",
    image: "/Nook GGN/_A3A0971-HDR.jpg",
    intent: "Rooftop Party with Friends",
    perks: [
      { icon: Sparkles, label: "Rooftop Party Venue" },
      { icon: UtensilsCrossed, label: "Breakfast & Garden" },
      { icon: Car, label: "In-House Parking" },
      { icon: Wifi, label: "High-Speed WiFi" },
    ],
    cta: null,
    ctaLabel: "Request a Callback",
  },
  {
    id: "corporate-bulk",
    badge: "Bulk Corporate Bookings",
    heading: "Accommodate Your",
    headingAccent: "Entire Team",
    subtext:
      "Travelling with a corporate group? Book multiple rooms at special bulk rates. Our 4-star property is perfect for off-sites, team-building retreats, and training stays.",
    image: "/Nook GGN/_A3A1004-HDR.jpg",
    intent: "Bulk Corporate Booking",
    perks: [
      { icon: Briefcase, label: "Conference Room" },
      { icon: Car, label: "10-Car Parking" },
      { icon: ArrowUpDown, label: "Lift Access" },
      { icon: Wifi, label: "High-Speed WiFi" },
    ],
    cta: "/bookings",
    ctaLabel: "Get Group Rates",
  },
];

const INTENT_OPTIONS = [
  "Luxury Stay",
  "Corporate Conference",
  "Banquet / Ring Ceremony",
  "Rooftop Party with Friends",
  "Bulk Corporate Booking",
  "Other",
];

// ─── Callback Modal ───────────────────────────────────────────────────────────
interface CallbackModalProps {
  isOpen: boolean;
  defaultIntent: string;
  onClose: () => void;
}

const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  defaultIntent,
  onClose,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    intent: defaultIntent,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, intent: defaultIntent }));
    setSubmitted(false);
  }, [defaultIntent, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white w-full max-w-md rounded-none shadow-2xl overflow-hidden relative"
          >
            {/* Red accent top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700" />

            <div className="p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-gold-500 font-semibold">
                    Nook Inn & Suites
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-primary-900 mt-1 mb-1">
                    Request a Callback
                  </h2>
                  <p className="text-stone-500 text-xs font-sans mb-6 leading-relaxed">
                    Fill in your details and our team will reach out within a few
                    hours to assist you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        Full Name <span className="text-gold-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-gold-500 transition-colors placeholder:text-stone-400 rounded-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        Email Address <span className="text-gold-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-gold-500 transition-colors placeholder:text-stone-400 rounded-none"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        Phone Number <span className="text-gold-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-gold-500 transition-colors placeholder:text-stone-400 rounded-none"
                      />
                    </div>

                    {/* City (optional) */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        City{" "}
                        <span className="text-stone-400 normal-case tracking-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. New Delhi"
                        value={form.city}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, city: e.target.value }))
                        }
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-gold-500 transition-colors placeholder:text-stone-400 rounded-none"
                      />
                    </div>

                    {/* Intent dropdown */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        I&apos;m Interested In <span className="text-gold-500">*</span>
                      </label>
                      <select
                        required
                        value={form.intent}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, intent: e.target.value }))
                        }
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-gold-500 transition-colors bg-white rounded-none cursor-pointer"
                      >
                        {INTENT_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 bg-white hover:bg-stone-100 active:bg-stone-200 text-[#111111] font-semibold text-sm uppercase tracking-widest py-3.5 transition-colors duration-200 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? "Sending…" : "Request Callback →"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <Check className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary-900 mb-2">
                    Thank You, {form.name.split(" ")[0]}!
                  </h3>
                  <p className="text-stone-500 text-sm font-sans leading-relaxed max-w-xs">
                    Your callback request has been received. Our team will contact
                    you at{" "}
                    <span className="font-semibold text-primary-900">
                      {form.phone}
                    </span>{" "}
                    within a few hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 text-xs uppercase tracking-widest text-gold-500 hover:text-gold-700 font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Hero Component ───────────────────────────────────────────────────────────
export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState(SLIDES[0].intent);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const SLIDE_DURATION = 5500; // ms

  const goToSlide = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentSlide(index);
    },
    []
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % SLIDES.length, 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [currentSlide, goToSlide]);

  // Auto-advance
  useEffect(() => {
    if (modalOpen) return;
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide, modalOpen]);

  const openModal = (intent: string) => {
    setModalIntent(intent);
    setModalOpen(true);
  };

  const slide = SLIDES[currentSlide];

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "5%" : "-5%",
      opacity: 0,
      scale: 1.05,
    }),
    center: { x: "0%", opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-5%" : "5%",
      opacity: 0,
      scale: 0.98,
    }),
  };

  const textVariants = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -15, opacity: 0 },
  };

  return (
    <>
      <section className="relative w-full min-h-[100svh] h-screen overflow-hidden flex items-center justify-center bg-[#0f0f0f]">
        {/* ── Background Image Slideshow ── */}
        <AnimatePresence custom={direction} mode="sync">
          <motion.div
            key={slide.id + "-bg"}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={slide.image}
              alt={slide.headingAccent}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-85 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/55 via-black/45 to-black/65 z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        {/* ── Hero Content ── */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slide.id + "-content"}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 max-w-5xl mx-auto px-4 max-[360px]:px-3 sm:px-6 md:px-12 text-center flex flex-col items-center space-y-3 sm:space-y-5 max-[360px]:mt-16 mt-20 sm:mt-28"
          >
            {/* Badge */}
            <span className="inline-block px-3 max-[360px]:px-2.5 sm:px-4 py-1 sm:py-1.5 bg-gold-600/90 text-white text-[9px] max-[360px]:text-[8px] sm:text-[10px] uppercase tracking-[0.2em] max-[360px]:tracking-[0.14em] sm:tracking-[0.35em] font-semibold backdrop-blur-sm">
              {slide.badge}
            </span>

            {/* Heading */}
            <h1 className="font-serif text-3xl max-[360px]:text-[1.85rem] xs:text-4xl sm:text-5xl md:text-7xl font-extralight tracking-wide text-white leading-tight">
              {slide.heading}
              <br className="hidden sm:inline" />
              <span className="italic font-normal text-gold-400">
                {slide.headingAccent}
              </span>
            </h1>

            {/* Divider */}
            <div className="w-12 sm:w-16 h-[1px] bg-gold-500/60" />

            {/* Subtext */}
            <p className="text-xs sm:text-base md:text-lg text-stone-200 font-normal font-sans max-w-2xl leading-relaxed px-2 sm:px-0">
              {slide.subtext}
            </p>

            {/* Perks row */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 w-full sm:w-auto">
              {slide.perks.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 px-2 sm:px-3 py-1 sm:py-1.5 text-white text-[9px] max-[360px]:text-[8px] sm:text-[10px] uppercase tracking-widest max-[360px]:tracking-wide font-sans"
                >
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gold-400 shrink-0" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4 w-full sm:w-auto">
              {/* Callback button — always shown */}
              <button
                onClick={() => openModal(slide.intent)}
                className="flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-[#111111] font-semibold uppercase tracking-widest text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 transition-colors duration-200 w-full sm:w-auto cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                Request a Callback
              </button>

              {/* Slide-specific secondary button */}
              {slide.cta ? (
                <Link href={slide.cta} className="w-full sm:w-auto">
                  <button className="flex items-center justify-center gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-[#111111] font-semibold uppercase tracking-widest text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200 w-full cursor-pointer">
                    {slide.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              ) : (
                <Link href="/rooms" className="w-full sm:w-auto">
                  <button className="flex items-center justify-center gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-[#111111] font-semibold uppercase tracking-widest text-[10px] sm:text-xs px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200 w-full cursor-pointer">
                    Explore Rooms
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Prev / Next arrows ── */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-2.5 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 transition-all duration-200 cursor-pointer max-[360px]:hidden"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-2.5 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 transition-all duration-200 cursor-pointer max-[360px]:hidden"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* ── Dot indicators ── */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goToSlide(idx, idx > currentSlide ? 1 : -1)}
              className={`h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
                idx === currentSlide
                  ? "w-6 sm:w-8 bg-gold-500"
                  : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* ── Slide counter ── */}
        <div className="absolute bottom-5 sm:bottom-8 right-4 sm:right-6 md:right-10 z-30 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 font-sans select-none">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </div>
      </section>

      {/* ── Callback Modal ── */}
      <CallbackModal
        isOpen={modalOpen}
        defaultIntent={modalIntent}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
