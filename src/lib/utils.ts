import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Room } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format raw numbers into currency values.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Single line item in the rate breakdown (e.g. "Room Base", 2200).
 */
export interface RateLineItem {
  label: string;
  amount: number;
}

/**
 * Full per-night rate breakdown for a room + guest combination.
 */
export interface RoomRateBreakdown {
  base: number;
  doubleSupplement: number;
  breakfast: number;
  extraPerson: number;
  perNight: number;
  totalPersons: number;
  lines: RateLineItem[];
}

/**
 * Calculate the occupancy-based nightly rate for a room.
 *
 * Formula (per night):
 *   base
 *   + (guests ≥ 2 ? doubleSupplement : 0)
 *   + (max(guests − 2, 0) × extraPerson)
 *   + (allPersons × breakfastPerPerson)
 *
 * `totalPersons` = adults + children.
 */
export function calculateRoomRate(
  room: Room,
  adults: number,
  children: number,
): RoomRateBreakdown {
  const { pricing } = room;
  const totalPersons = adults + children;

  const doubleSupplement = totalPersons >= 2 ? pricing.doubleSupplement : 0;
  const extraGuests = Math.max(totalPersons - 2, 0);
  const extraPerson = extraGuests * pricing.extraPerson;
  const breakfast = totalPersons * pricing.breakfastPerPerson;

  const perNight = pricing.base + doubleSupplement + extraPerson + breakfast;

  const lines: RateLineItem[] = [
    { label: "Room Base (Single)", amount: pricing.base },
  ];
  if (doubleSupplement > 0) {
    lines.push({ label: "Double Supplement", amount: doubleSupplement });
  }
  if (extraPerson > 0) {
    lines.push({
      label: `Extra Guest${extraGuests > 1 ? "s" : ""} (₹${pricing.extraPerson} × ${extraGuests})`,
      amount: extraPerson,
    });
  }
  lines.push({
    label: `Breakfast (₹${pricing.breakfastPerPerson} × ${totalPersons})`,
    amount: breakfast,
  });

  return {
    base: pricing.base,
    doubleSupplement,
    breakfast,
    extraPerson,
    perNight,
    totalPersons,
    lines,
  };
}
