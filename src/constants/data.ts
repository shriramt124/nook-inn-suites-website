import { Room, Review, Facility, GalleryImage, FAQItem, NavigationItem } from "../types";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Rooms & Suites", href: "/rooms" },
  { name: "Bookings", href: "/bookings" },
  { name: "Contact Us", href: "/contact" },
];

export const HOTEL_CONTACT_INFO = {
  address:
    "L-32/4, Mehrauli-Gurgaon Road, near MG Road, DLF Phase 2, Sector 25, Gurugram, Haryana 122002",
  phone: "+91 124 000 0000",
  email: "reservations@nookinnsuites.com",
  receptionTiming: "24 Hours / 7 Days a week",
  businessHours: "Monday - Sunday: 9:00 AM - 10:00 PM (Spa & Dining)",
  emergencyContact: "+91 124 000 0009",
  mapUrl: "https://maps.app.goo.gl/6e87fnNYiDdhA5Xg7",
};

const LOCAL_IMAGES = {
  // Classic Deluxe Room (standard)
  standard1: "/Nook GGN/_A3A0551-HDR.jpg",
  standard2: "/Nook GGN/_A3A0569-HDR.jpg",
  standard3: "/Nook GGN/_A3A0581-HDR.jpg",
  // Elite Ocean View Room (deluxe)
  deluxe1: "/Nook GGN/_A3A0584-HDR.jpg",
  deluxe2: "/Nook GGN/_A3A0605-HDR.jpg",
  deluxe3: "/Nook GGN/_A3A0608-HDR.jpg",
  // Signature Executive Suite (executive)
  executive1: "/Nook GGN/_A3A0623-HDR.jpg",
  executive2: "/Nook GGN/_A3A0638-HDR.jpg",
  executive3: "/Nook GGN/_A3A0677-HDR.jpg",
  // Haven Family Suite (family)
  family1: "/Nook GGN/_A3A0692-HDR.jpg",
  family2: "/Nook GGN/_A3A0716-HDR.jpg",
  family3: "/Nook GGN/_A3A0743-HDR.jpg",
  // Nook Sanctuary Suite (luxury-suite)
  luxury1: "/Nook GGN/_A3A0746-HDR.jpg",
  luxury2: "/Nook GGN/_A3A0782-HDR.jpg",
  luxury3: "/Nook GGN/_A3A0965-HDR.jpg",
  // The Royal Presidential Residence (presidential)
  presidential1: "/Nook GGN/_A3A0971-HDR.jpg",
  presidential2: "/Nook GGN/_A3A0974-HDR.jpg",
  presidential3: "/Nook GGN/_A3A1001-HDR.jpg",
  // Gallery / Hero / About / CTA
  gallery1: "/Nook GGN/_A3A1004-HDR.jpg",
  gallery2: "/Nook GGN/_A3A1007-HDR.jpg",
  gallery3: "/Nook GGN/_A3A1073-HDR.jpg",
  gallery4: "/Nook GGN/_A3A1203-HDR.jpg",
  gallery5: "/Nook GGN/_A3A1209-HDR.jpg",
  gallery6: "/Nook GGN/_A3A1212-HDR.jpg",
  heroMain: "/Nook GGN/_A3A1254-HDR.jpg",
  aboutHero: "/Nook GGN/_A3A1203-HDR.jpg",
  ctaBackground: "/Nook GGN/_A3A1254-HDR.jpg",
};

export const MOCK_ROOMS: Room[] = [
  {
    id: "standard-room",
    name: "Classic Deluxe Room",
    slug: "classic-deluxe-room",
    price: 249,
    rating: 4.7,
    reviewsCount: 124,
    description: "The Classic Deluxe Room strikes a perfect balance between functional design and mid-century modern styling, featuring luxury linens and curated local artwork.",
    amenities: ["Free WiFi", "Smart TV", "Mini Bar", "Premium Toiletries", "Coffee Maker", "AC"],
    images: [LOCAL_IMAGES.standard1, LOCAL_IMAGES.standard2, LOCAL_IMAGES.standard3],
    bedType: "King Bed",
    size: "380 sq ft",
    maxGuests: 2,
    availability: true,
    features: ["City Skyline View", "Writing Desk", "Plush Bathrobes"],
    category: "standard",
  },
  {
    id: "deluxe-room",
    name: "Elite Ocean View Room",
    slug: "elite-ocean-view-room",
    price: 379,
    rating: 4.8,
    reviewsCount: 98,
    description: "Immerse yourself in spectacular ocean vistas. Our Elite Ocean View Room offers a spacious layout, premium furnishing, and a private step-out balcony.",
    amenities: ["Private Balcony", "Ocean View", "Smart TV", "Premium Espresso Machine", "Mini Bar", "Free WiFi", "AC"],
    images: [LOCAL_IMAGES.deluxe1, LOCAL_IMAGES.deluxe2, LOCAL_IMAGES.deluxe3],
    bedType: "California King",
    size: "450 sq ft",
    maxGuests: 2,
    availability: true,
    features: ["Panoramic Ocean View", "Glass Balcony", "Walk-in Rain Shower"],
    category: "deluxe",
  },
  {
    id: "executive-suite",
    name: "Signature Executive Suite",
    slug: "signature-executive-suite",
    price: 499,
    rating: 4.9,
    reviewsCount: 84,
    description: "Specifically designed for the modern business leader, featuring a dedicated workspace, an expansive living parlor, and access to the VIP Executive Lounge.",
    amenities: ["Executive Lounge Access", "High-speed Wifi", "Workspace", "Wine Cooler", "Smart TV", "Mini Bar", "Luxury Bathrobe"],
    images: [LOCAL_IMAGES.executive1, LOCAL_IMAGES.executive2, LOCAL_IMAGES.executive3],
    bedType: "King Bed",
    size: "620 sq ft",
    maxGuests: 3,
    availability: true,
    features: ["VIP Lounge Entry", "Workspace with ergonomic chair", "Marble Soaking Tub"],
    category: "executive",
  },
  {
    id: "family-suite",
    name: "Haven Family Suite",
    slug: "haven-family-suite",
    price: 599,
    rating: 4.7,
    reviewsCount: 76,
    description: "A gorgeous, two-bedroom configuration offering generous space, child-friendly security elements, a dining table, and premium kitchen amenities.",
    amenities: ["2 Bedrooms", "Kitchenette", "Dining Area", "2 Bathrooms", "Smart TV", "Mini Bar", "Free WiFi"],
    images: [LOCAL_IMAGES.family1, LOCAL_IMAGES.family2, LOCAL_IMAGES.family3],
    bedType: "1 King + 2 Twin Beds",
    size: "850 sq ft",
    maxGuests: 5,
    availability: true,
    features: ["Connecting Rooms", "Full Dining Table", "In-Suite Laundry"],
    category: "family",
  },
  {
    id: "luxury-suite",
    name: "Nook Sanctuary Suite",
    slug: "nook-sanctuary-suite",
    price: 799,
    rating: 4.9,
    reviewsCount: 112,
    description: "Our signature luxury suite features wrap-around glass panels, an outdoor hot tub, premium integrated sound systems, and a fully stocked private bar.",
    amenities: ["Private Hot Tub", "Wrap-around Balcony", "Sound System", "Fully-stocked Bar", "Butler Service", "Free WiFi", "AC"],
    images: [LOCAL_IMAGES.luxury1, LOCAL_IMAGES.luxury2, LOCAL_IMAGES.luxury3],
    bedType: "Grand California King",
    size: "1100 sq ft",
    maxGuests: 4,
    availability: true,
    features: ["Private Terrace Jacuzzi", "24/7 Butler Service", "Walk-in Closet"],
    category: "luxury-suite",
  },
  {
    id: "presidential-suite",
    name: "The Royal Presidential Residence",
    slug: "the-royal-presidential-residence",
    price: 1899,
    rating: 5.0,
    reviewsCount: 42,
    description: "The pinnacle of lavishness. A double-story suite featuring standard-setting design, private infinity plunge pool, full chef pantry, secure private entrance, and round-the-clock bespoke service.",
    amenities: ["Infinity Plunge Pool", "Chef Pantry", "Private Entrance", "Bespoke Concierge", "Sauna & Steam Room", "Grand Piano", "Free WiFi"],
    images: [LOCAL_IMAGES.presidential1, LOCAL_IMAGES.presidential2, LOCAL_IMAGES.presidential3],
    bedType: "Imperial King",
    size: "2200 sq ft",
    maxGuests: 6,
    availability: true,
    features: ["Private Rooftop Pool", "Personal In-house Chef", "Dedicated Secure Elevator Access"],
    category: "presidential",
  },
];

export const MOCK_TESTIMONIALS: Review[] = [
  {
    id: "1",
    guestName: "Victoria Sterling",
    guestCountry: "London, UK",
    rating: 5,
    comment: "An absolute masterclass in hospitality. The attention to detail, from the butler service to the custom aromatherapy scents in our room, was unmatched.",
    date: "June 14, 2026",
  },
  {
    id: "2",
    guestName: "Marc-André Girard",
    guestCountry: "Paris, France",
    rating: 5,
    comment: "The Nook Sanctuary Suite exceeded all expectations. Waking up to the floor-to-ceiling ocean view is something my family will never forget.",
    date: "May 28, 2026",
  },
  {
    id: "3",
    guestName: "Sophia Tanaka",
    guestCountry: "Tokyo, Japan",
    rating: 5,
    comment: "Exceptional dining experiences. The Michelin-starred restaurant on-site was incredible. A true luxury retreat in a pristine location.",
    date: "April 19, 2026",
  },
];

export const HOTEL_FACILITIES: Facility[] = [
  {
    id: "pool",
    name: "Infinity Pool",
    description: "Temperature-controlled swimming pool with cascading ocean-view edges and custom cabanas.",
    iconName: "Waves",
  },
  {
    id: "spa",
    name: "Luxury Sanctuary Spa",
    description: "Rejuvenate with custom organic hot-stone therapies, cold-plunge treatments, and dynamic saunas.",
    iconName: "Sparkles",
  },
  {
    id: "restaurant",
    name: "Epicurean Fine Dining",
    description: "Enjoy gourmet, farm-to-table menus designed by world-renowned culinary master chefs.",
    iconName: "UtensilsCrossed",
  },
  {
    id: "gym",
    name: "Hyper-Modern Gym",
    description: "Fully equipped with advanced Technogym cardio machines, weights, and private training support.",
    iconName: "Dumbbell",
  },
  {
    id: "wifi",
    name: "Gigabit High-Speed WiFi",
    description: "Ultra-fast, fiber-optic internet connection coverage spanning the entire hotel property limits.",
    iconName: "Wifi",
  },
  {
    id: "hall",
    name: "Grand Ballroom & Conference",
    description: "Sleek presentation tech and seating setups perfect for executive seminars and luxury weddings.",
    iconName: "Briefcase",
  },
  {
    id: "parking",
    name: "Complimentary Valet Parking",
    description: "Secure, subterranean garage with EV supercharging docks and standard premium detailing service.",
    iconName: "Car",
  },
  {
    id: "pickup",
    name: "Luxury Airport Chauffeur",
    description: "Rolls-Royce or Mercedes-Maybach transfer directly from/to regional international terminals.",
    iconName: "Plane",
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    url: LOCAL_IMAGES.gallery1,
    title: "Imperial Grand Lobby",
    category: "exterior",
  },
  {
    id: "g2",
    url: LOCAL_IMAGES.gallery2,
    title: "Aromatherapy Spa Sanctuary",
    category: "spa",
  },
  {
    id: "g3",
    url: LOCAL_IMAGES.gallery3,
    title: "Michelin-starred dining",
    category: "dining",
  },
  {
    id: "g4",
    url: LOCAL_IMAGES.gallery4,
    title: "Classic Deluxe Bedroom Setup",
    category: "rooms",
  },
  {
    id: "g5",
    url: LOCAL_IMAGES.gallery5,
    title: "Oceanfront Lounge & Lounge",
    category: "interior",
  },
  {
    id: "g6",
    url: LOCAL_IMAGES.gallery6,
    title: "Sanctuary Penthouse Suite Parlor",
    category: "rooms",
  },
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    title: "Unmatched Premium Service",
    description: "Your personalized lifestyle manager is assigned to curate every segment of your stay seamlessly.",
    iconName: "Crown",
  },
  {
    title: "24x7 Custom Concierge",
    description: "Dedicated assistance for booking helicopter tours, private yacht charters, and local dinners.",
    iconName: "ShieldAlert",
  },
  {
    title: "Breathtaking Prime Locations",
    description: "Perched beautifully at the water's edge, giving you immediate beachfront entries and panoramic sunrises.",
    iconName: "MapPin",
  },
  {
    title: "World-Class Experienced Staff",
    description: "A handpicked crew trained under international boutique luxury standards to guarantee satisfaction.",
    iconName: "Users",
  },
  {
    title: "Secure & Flexible Bookings",
    description: "Zero cancellation fees up to 48 hours prior to check-in, alongside seamless payment gateways.",
    iconName: "Lock",
  },
  {
    title: "Luxury Eco-Friendly Focus",
    description: "Combining high-end comfort with deep environmental stewardship via zero-plastic and solar grids.",
    iconName: "Leaf",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What are the standard check-in and check-out timings?",
    answer: "Standard check-in is at 3:00 PM, and check-out is at 12:00 PM. Early check-in or late check-out options can be requested during booking and are subject to room availability.",
  },
  {
    id: "faq-2",
    question: "Does the hotel provide complimentary airport transfers?",
    answer: "Yes, airport transfers in our luxury fleet (including Mercedes-Maybach and BMW i7) are complimentary for all guests booking Executive Suites, Sanctuary Suites, or the Presidential Residence.",
  },
  {
    id: "faq-3",
    question: "Are pets allowed in the resort?",
    answer: "We support pet-friendly stays in specific designated rooms. A deposit and registration with our concierge are required upon booking to arrange custom pet bedding, bowls, and menu options.",
  },
  {
    id: "faq-4",
    question: "Can I modify or cancel my booking online?",
    answer: "Absolutely. Bookings can be canceled or rescheduled without charge up to 48 hours prior to the scheduled check-in date. Refund processing takes 3-5 banking days.",
  },
  {
    id: "faq-5",
    question: "Do you accommodate special dietary requirements?",
    answer: "Yes, our world-class culinary chefs are fully prepared to cater to gluten-free, vegan, nut-free, keto, and kosher diets. Please mention details inside your booking form special requests field.",
  },
];
