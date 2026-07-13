"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

export const INTENT_OPTIONS = [
  "Luxury Stay",
  "Corporate Conference",
  "Banquet / Ring Ceremony",
  "Rooftop Party with Friends",
  "Bulk Corporate Booking",
  "Other",
];

export interface CallbackModalProps {
  isOpen: boolean;
  defaultIntent?: string;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  defaultIntent = "Luxury Stay",
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
            <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-700" />

            <div className="p-6 sm:p-8 overflow-y-auto max-h-[85vh]">
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
                  <span className="text-[10px] uppercase tracking-[0.35em] text-red-500 font-semibold">
                    Nook Inn &amp; Suites
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-primary-900 mt-1 mb-1">
                    Request a Callback
                  </h2>
                  <p className="text-stone-500 text-xs font-sans mb-6 leading-relaxed">
                    Fill in your details and our team will reach out within a few hours to assist you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-red-500 transition-colors placeholder:text-stone-400 rounded-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-red-500 transition-colors placeholder:text-stone-400 rounded-none"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-red-500 transition-colors placeholder:text-stone-400 rounded-none"
                      />
                    </div>

                    {/* City optional */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        City{" "}
                        <span className="text-stone-400 normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. New Delhi"
                        value={form.city}
                        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-red-500 transition-colors placeholder:text-stone-400 rounded-none"
                      />
                    </div>

                    {/* Intent dropdown */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans mb-1">
                        I&apos;m Interested In <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={form.intent}
                        onChange={(e) => setForm((f) => ({ ...f, intent: e.target.value }))}
                        className="w-full border border-stone-200 px-4 py-2.5 text-sm font-sans text-primary-900 outline-none focus:border-red-500 transition-colors bg-white rounded-none cursor-pointer"
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
                      className="w-full mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm uppercase tracking-widest py-3.5 transition-colors duration-200 disabled:opacity-60 cursor-pointer"
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
                    Your callback request has been received. Our team will contact you at{" "}
                    <span className="font-semibold text-primary-900">{form.phone}</span> within a few hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 text-xs uppercase tracking-widest text-red-500 hover:text-red-700 font-semibold transition-colors cursor-pointer"
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
