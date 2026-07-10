"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, UtensilsCrossed, Wifi, Briefcase, Car, Salad, ArrowUpDown, Accessibility } from "lucide-react";
import { HOTEL_FACILITIES } from "../../constants/data";
import { SectionTitle } from "../shared/SectionTitle";
import { Card, CardBody } from "../ui/Card";

// Map string keys to Lucide React component objects
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  UtensilsCrossed,
  Wifi,
  Briefcase,
  Car,
  Salad,
  ArrowUpDown,
  Accessibility,
};

export const Facilities: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Everything You Need, Under One Roof"
          subtitle="Hotel Facilities"
          description="Nook Inn & Suites is designed for comfort, convenience, and celebration — from a fully equipped conference room and rooftop party venue to a lush garden breakfast area and accessible facilities for all guests."
        />

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOTEL_FACILITIES.map((facility, index) => {
            const IconComponent = iconMap[facility.iconName] || Sparkles;
            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              >
                <Card
                  variant="default"
                  className="h-full border border-stone-100 hover:border-red-300 bg-white hover:bg-white text-center rounded-none group transition-all duration-300 hover:shadow-md"
                >
                  <CardBody className="p-8 flex flex-col items-center">
                    {/* Icon Wrapper */}
                    <div className="p-4 bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 rounded-none mb-5">
                      <IconComponent className="h-6 w-6 stroke-[1.5]" />
                    </div>

                    <h3 className="font-serif text-lg md:text-xl text-[#111111] mb-2 font-medium group-hover:text-red-600 transition-colors duration-300">
                      {facility.name}
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm font-sans font-normal leading-relaxed">
                      {facility.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
