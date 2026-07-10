"use client";

import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface FilterState {
  search: string;
  category: string;
  guests: string;
  sortBy: string;
}

interface RoomFilterProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  resultsCount: number;
}

export const RoomFilter: React.FC<RoomFilterProps> = ({ filters, onFilterChange, resultsCount }) => {
  const categoryOptions = [
    { value: "all", label: "All Suites & Rooms" },
    { value: "standard", label: "Classic Rooms" },
    { value: "deluxe", label: "Ocean View Rooms" },
    { value: "executive", label: "Executive Suites" },
    { value: "family", label: "Family Suites" },
    { value: "luxury-suite", label: "Sanctuary Suites" },
    { value: "presidential", label: "Presidential Residences" },
  ];

  const guestOptions = [
    { value: "any", label: "Any Occupancy" },
    { value: "2", label: "Up to 2 Guests" },
    { value: "4", label: "Up to 4 Guests" },
    { value: "6", label: "Up to 6 Guests" },
  ];

  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div className="w-full bg-white border border-stone-200/60 p-6 md:p-8 flex flex-col space-y-6 shadow-sm">
      {/* Top row: search & stats */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <Input
            placeholder="Search rooms by name or key features..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            icon={<Search className="h-4 w-4" />}
            className="w-full"
          />
        </div>
        <div className="text-xs uppercase tracking-widest text-stone-600 font-semibold shrink-0 font-sans">
          Showing <span className="text-primary-900 font-bold">{resultsCount}</span> available residences
        </div>
      </div>

      <hr className="border-stone-100" />

      {/* Filters Form Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category Filter */}
        <Select
          label="Category"
          options={categoryOptions}
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          icon={<SlidersHorizontal className="h-4 w-4" />}
        />

        {/* Guests Occupancy Filter */}
        <Select
          label="Occupancy Limit"
          options={guestOptions}
          value={filters.guests}
          onChange={(e) => onFilterChange({ guests: e.target.value })}
          icon={<SlidersHorizontal className="h-4 w-4" />}
        />

        {/* Sorting Dropdown */}
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          icon={<ArrowUpDown className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};
