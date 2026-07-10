"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Maximize2, Users, BedDouble, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Room } from "../../types";
import { cn, formatPrice } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

interface RoomCardProps {
  room: Room;
  onCompareToggle?: (room: Room) => void;
  isCompared?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onCompareToggle, isCompared = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  return (
    <Card className="flex flex-col group overflow-hidden border border-stone-200/50 bg-white rounded-none h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      {/* Dynamic Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <Image
          src={room.images[currentImageIndex]}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={room.category === "luxury-suite"}
        />

        {/* Top Floating Badge Info */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {!room.availability && <Badge variant="secondary" className="bg-red-500 text-white border-none">Sold Out</Badge>}
          {room.rating >= 4.9 && <Badge variant="gold">Signature Series</Badge>}
        </div>

        {/* Carousel Navigation Arrows */}
        {room.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handlePrevImage}
              className="p-1.5 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-none transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="p-1.5 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-none transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Dot Indicators */}
        {room.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-1.5">
            {room.images.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  "h-1.5 transition-all duration-300 rounded-full",
                  idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Details Container */}
      <div className="p-6 flex flex-col flex-1">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-xl md:text-2xl text-primary-900 group-hover:text-gold-500 transition-colors duration-300">
            {room.name}
          </h3>
          <div className="flex items-center space-x-1 shrink-0 mt-1">
            <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
            <span className="text-xs font-semibold text-stone-700">{room.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-stone-600 text-xs sm:text-sm font-sans font-normal leading-relaxed mb-5 line-clamp-2">
          {room.description}
        </p>

        {/* Dimensions/Key Grid */}
        <div className="grid grid-cols-3 gap-2 border-y border-stone-100 py-3.5 mb-5 text-[10px] md:text-xs text-stone-600 font-sans tracking-wide uppercase">
          <div className="flex items-center space-x-1.5">
            <Maximize2 className="h-3.5 w-3.5 text-stone-500 shrink-0" />
            <span>{room.size}</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-center border-x border-stone-100">
            <Users className="h-3.5 w-3.5 text-stone-500 shrink-0" />
            <span>Max {room.maxGuests} guests</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-end">
            <BedDouble className="h-3.5 w-3.5 text-stone-500 shrink-0" />
            <span className="truncate">{room.bedType}</span>
          </div>
        </div>

        {/* Amenities Icons Row */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {room.amenities.slice(0, 4).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-[9px] px-2 py-0.5 tracking-wider">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 4 && (
            <Badge variant="outline" className="text-[9px] px-2 py-0.5 tracking-wider bg-stone-50">
              +{room.amenities.length - 4} More
            </Badge>
          )}
        </div>

        {/* Price and Buttons */}
        <div className="mt-auto pt-4 border-t border-stone-100 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-sans">
              Rates starting at
            </span>
            <span className="font-serif text-2xl font-light text-primary-900">
              {formatPrice(room.price)}
              <span className="text-xs font-sans text-stone-600"> / night</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Compare Button */}
            {onCompareToggle && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onCompareToggle(room);
                }}
                className={cn(
                  "p-2.5 border border-stone-200/80 rounded-none transition-all duration-300 hover:border-gold-500 cursor-pointer",
                  isCompared ? "bg-gold-50 text-gold-600 border-gold-400" : "bg-transparent text-stone-400"
                )}
                title={isCompared ? "Remove from comparison" : "Add to comparison"}
              >
                {isCompared ? <Check className="h-4 w-4" /> : <Maximize2 className="h-4 w-4 rotate-45" />}
              </button>
            )}

            {/* Book Now */}
            <Link href={`/bookings?room=${room.slug}`}>
              <Button variant="primary" size="sm" className="py-2.5 px-4 font-semibold text-[10px]">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
