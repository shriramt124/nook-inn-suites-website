"use client";

import React from "react";
import { Phone } from "lucide-react";

const TICKER_ITEMS = [
  { emoji: "🏨", text: "Luxury Stays — Comfort, Premium & Cottage Rooms available" },
  { emoji: "💍", text: "Banquet Hall · Up to 250 guests for Ring Ceremonies & Weddings" },
  { emoji: "💼", text: "Corporate Conference Room · Equipped for your next big meeting" },
  { emoji: "🎉", text: "Rooftop Party Venue · Celebrate under the open sky with friends" },
  { emoji: "🏢", text: "Bulk Corporate Bookings · Special group rates for teams & off-sites" },
  { emoji: "🌿", text: "Breakfast & Garden Area · Start your mornings beautifully" },
  { emoji: "📶", text: "High-Speed WiFi · Seamless connectivity across the entire property" },
  { emoji: "♿", text: "Wheelchair Accessible · Inclusive hospitality for every guest" },
  { emoji: "🚗", text: "In-House Parking · Secure parking for up to 10 cars" },
];

// Duplicate for seamless infinite loop
const DOUBLED = [...TICKER_ITEMS, ...TICKER_ITEMS];

export const AnnouncementTicker: React.FC = () => {
  return (
    <div className="w-full bg-[#111111] border-b border-white/8 overflow-hidden z-50 relative select-none">
      <div className="flex items-center">
        {/* Static left label */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-[9px] uppercase tracking-[0.3em] font-semibold whitespace-nowrap z-10">
          <Phone className="h-3 w-3" />
          <span className="hidden sm:inline">Nook Inn</span>
        </div>

        {/* Scrolling strip */}
        <div className="relative overflow-hidden flex-1">
          <div className="flex animate-ticker whitespace-nowrap">
            {DOUBLED.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-6 py-2 text-[10px] text-stone-300 font-sans tracking-wider uppercase shrink-0"
              >
                <span>{item.emoji}</span>
                <span>{item.text}</span>
                <span className="text-red-600 mx-2 text-xs">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
