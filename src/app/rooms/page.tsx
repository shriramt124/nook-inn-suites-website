"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { RoomFilter } from "../../components/rooms/RoomFilter";
import { RoomCard } from "../../components/shared/RoomCard";
import { MOCK_ROOMS } from "../../constants/data";
import { Room } from "../../types";
import { SectionTitle } from "../../components/shared/SectionTitle";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { X, Check } from "lucide-react";
import { formatPrice } from "../../lib/utils";

export default function RoomsPage() {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    guests: "any",
    sortBy: "popularity",
  });

  const [comparedRooms, setComparedRooms] = useState<Room[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 3;

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset page on filter changes
  };

  // Compare toggles
  const handleCompareToggle = (room: Room) => {
    setComparedRooms((prev) => {
      const isAlreadyAdded = prev.find((r) => r.id === room.id);
      if (isAlreadyAdded) {
        return prev.filter((r) => r.id !== room.id);
      }
      if (prev.length >= 3) {
        alert("You can compare a maximum of 3 suites at a time.");
        return prev;
      }
      return [...prev, room];
    });
  };

  // Filtered & Sorted list
  const processedRooms = useMemo(() => {
    let result = [...MOCK_ROOMS];

    // Search Filter
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.features.some((f) => f.toLowerCase().includes(query)) ||
          r.amenities.some((a) => a.toLowerCase().includes(query))
      );
    }

    // Category Filter
    if (filters.category !== "all") {
      result = result.filter((r) => r.category === filters.category);
    }

    // Guest Occupancy Filter
    if (filters.guests !== "any") {
      const minGuests = Number(filters.guests);
      result = result.filter((r) => r.maxGuests >= minGuests);
    }

    // Sort Sorting logic
    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Popularity default sort
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [filters]);

  // Paginated rooms
  const paginatedRooms = useMemo(() => {
    const startIdx = (currentPage - 1) * roomsPerPage;
    return processedRooms.slice(startIdx, startIdx + roomsPerPage);
  }, [processedRooms, currentPage]);

  const totalPages = Math.ceil(processedRooms.length / roomsPerPage);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 bg-[#faf9f6]">
        {/* Banner header */}
        <div className="bg-primary-950 py-16 text-center relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,35,64,0.6),rgba(0,0,0,0.8))]" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.45em] text-gold-500 font-semibold block">
              Curated Stays
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
              Suites & Residences
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-sans font-normal max-w-md mx-auto leading-relaxed">
              Explore our selection of classic, oceanfront, and presidential suites tailored for high-end boutique experiences.
            </p>
          </div>
        </div>

        {/* Filter bar segment */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <RoomFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            resultsCount={processedRooms.length}
          />
        </div>

        {/* Rooms list grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {paginatedRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onCompareToggle={handleCompareToggle}
                  isCompared={!!comparedRooms.find((r) => r.id === room.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-stone-200/60 p-8">
              <p className="text-stone-600 font-serif text-xl font-normal">No available residences fit your current criteria.</p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "all",
                    guests: "any",
                    sortBy: "popularity",
                  })
                }
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Pagination buttons */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-12 font-sans text-xs">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 border transition-all duration-300 font-medium cursor-pointer ${
                    currentPage === idx + 1
                      ? "border-gold-500 bg-gold-50 text-gold-600"
                      : "border-stone-200 text-stone-600 hover:border-stone-400 bg-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Floating comparison bar at screen bottom */}
      {comparedRooms.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-primary-900 border-t border-primary-800 text-white py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl font-sans">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold">
              Comparing ({comparedRooms.length}/3)
            </span>
            <div className="flex gap-2">
              {comparedRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center space-x-2 bg-primary-800 border border-primary-700/60 px-3 py-1 text-xs"
                >
                  <span className="truncate max-w-[120px] font-medium">{room.name}</span>
                  <button
                    onClick={() => handleCompareToggle(room)}
                    className="text-stone-400 hover:text-white cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setComparedRooms([])}
              className="text-xs uppercase tracking-wider text-stone-400 hover:text-white underline cursor-pointer"
            >
              Clear All
            </button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowComparisonModal(true)}
              className="font-bold py-2 px-5 text-[10px]"
            >
              Compare Now
            </Button>
          </div>
        </div>
      )}

      {/* Comparison Modal Overlay */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white p-6 md:p-10 shadow-2xl relative rounded-none font-sans">
            <button
              onClick={() => setShowComparisonModal(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            <SectionTitle
              title="Suite Comparison Sheet"
              subtitle="Detailed Metrics"
              align="center"
              className="mb-8"
            />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-600 min-w-[600px]">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="py-4 font-serif text-base text-primary-900">Suite Spec</th>
                    {comparedRooms.map((room) => (
                      <th key={room.id} className="py-4 font-serif text-lg text-primary-900 font-semibold">
                        {room.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-light">
                  <tr>
                    <td className="py-3.5 font-medium text-stone-800">Starting Price</td>
                    {comparedRooms.map((room) => (
                      <td key={room.id} className="py-3.5 font-semibold text-gold-600 text-base">
                        {formatPrice(room.price)} / night
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-800">Room Size</td>
                    {comparedRooms.map((room) => (
                      <td key={room.id} className="py-3.5">
                        {room.size}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-800">Bed Type</td>
                    {comparedRooms.map((room) => (
                      <td key={room.id} className="py-3.5">
                        {room.bedType}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-800">Maximum Guests</td>
                    {comparedRooms.map((room) => (
                      <td key={room.id} className="py-3.5">
                        {room.maxGuests} guests
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-800">Rating</td>
                    {comparedRooms.map((room) => (
                      <td key={room.id} className="py-3.5">
                        {room.rating} ★ ({room.reviewsCount} Reviews)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 font-medium text-stone-800">Notable Features</td>
                    {comparedRooms.map((room) => (
                      <td key={room.id} className="py-3.5">
                        <ul className="list-none space-y-1">
                          {room.features.map((f) => (
                            <li key={f} className="flex items-center gap-1.5 text-xs">
                              <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-medium text-stone-800">Reserve Suite</td>
                    {comparedRooms.map((room) => (
                      <td key={room.id} className="py-4">
                        <Link href={`/bookings?room=${room.slug}`} onClick={() => setShowComparisonModal(false)}>
                          <Button variant="secondary" size="sm" className="w-full text-center">
                            Book Now
                          </Button>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </>
  );
}
