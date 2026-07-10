"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MOCK_ROOMS } from "../../constants/data";
import { SectionTitle } from "../shared/SectionTitle";
import { RoomCard } from "../shared/RoomCard";
import { Button } from "../ui/Button";

export const FeaturedRooms: React.FC = () => {
  // Select the 3 featured real room types
  const featuredRooms = MOCK_ROOMS.filter((room) =>
    ["standard-room", "deluxe-room", "family-suite"].includes(room.id)
  );

  return (
    <section className="py-20 md:py-28 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Designed for Ultimate Comfort"
          subtitle="Our Featured Rooms"
          description="Explore our handpicked selection of top-tier residences. Each suite features curated interiors, world-class amenities, and breathtaking viewpoints."
        />

        {/* Rooms Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <RoomCard room={room} />
            </motion.div>
          ))}
        </div>

        {/* Call to action at bottom */}
        <div className="text-center mt-12 md:mt-16">
          <Link href="/rooms">
            <Button variant="outline" className="border-primary-500 text-primary-900 px-8 py-3.5">
              View All Accommodations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
