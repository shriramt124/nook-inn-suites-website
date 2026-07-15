export interface RoomPricing {
  base: number; // single-occupancy base rate (per night)
  doubleSupplement: number; // added when 2+ guests (per night)
  breakfastPerPerson: number; // charged per person (per night)
  extraPerson: number; // charged per guest beyond 2 (per night)
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  price: number; // single-occupancy base rate (mirrors pricing.base) — used for card display & sorting
  pricing: RoomPricing;
  rating: number;
  reviewsCount: number;
  description: string;
  amenities: string[];
  images: string[];
  bedType: string;
  size: string; // e.g. "450 sq ft"
  maxGuests: number;
  availability: boolean;
  features: string[];
  category: "standard" | "deluxe" | "executive" | "family" | "luxury-suite" | "presidential";
}

export interface Guest {
  name: string;
  email: string;
  phone: string;
  country: string;
}

export interface Booking {
  id: string;
  roomSlug: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  numberOfRooms: number;
  specialRequests?: string;
  guest: Guest;
  couponCode?: string;
  nightsCount: number;
  baseTotal: number;
  taxes: number;
  discount: number;
  grandTotal: number;
  createdAt: string;
}

export interface Review {
  id: string;
  guestName: string;
  guestCountry: string;
  guestAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: "rooms" | "dining" | "exterior" | "interior";
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  iconName: string; // Used to match with Lucide icons dynamically
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
