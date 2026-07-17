"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, ShieldAlert, MapPin, Users, Lock, Leaf, HelpCircle } from "lucide-react";
import { WHY_CHOOSE_US_ITEMS } from "../../constants/data";
import { SectionTitle } from "../shared/SectionTitle";

// Map keys to Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown,
  ShieldAlert,
  MapPin,
  Users,
  Lock,
  Leaf,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Distinguished in Every Detail"
          subtitle="Why Choose Nook Inn"
          description="We take proud strides to elevate your experience. Uncompromising service standards, prime beach entries, and secure bookings are just the starting points."
        />

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_ITEMS.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || HelpCircle;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="flex items-start p-6 bg-[#fafafa] border border-stone-100 hover:border-gold-300 hover:shadow-md transition-all duration-300 group"
              >
                {/* Icon wrapper */}
                <div className="p-3 bg-gold-50 text-gold-600 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500 mr-5 shadow-sm rounded-none">
                  <IconComponent className="h-5 w-5" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg text-[#111111] group-hover:text-gold-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
