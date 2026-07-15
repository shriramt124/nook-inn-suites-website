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
  phone: "+91 93104 11885",
  email: "reservations@nookinnsuites.com",
  receptionTiming: "24 Hours / 7 Days a week",
  businessHours: "Monday - Sunday: 9:00 AM - 10:00 PM (Spa & Dining)",
  emergencyContact: "+91 98718 86306",
  mapUrl: "https://maps.app.goo.gl/6e87fnNYiDdhA5Xg7",
};

const LOCAL_IMAGES = {
  // Classic Deluxe Room (standard)
  standard1: "/Nook GGN/_A3A0608-HDR.jpg",
  standard2: "/Nook GGN/_A3A0677-HDR.jpg",
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
  gallery7: "/Nook GGN/_A3A0584-HDR.jpg",
  gallery8: "/Nook GGN/_A3A0605-HDR.jpg",
  heroMain: "/Nook GGN/_A3A1254-HDR.jpg",
  aboutHero: "/Nook GGN/_A3A1203-HDR.jpg",
  ctaBackground: "/Nook GGN/_A3A1254-HDR.jpg",
};

export const MOCK_ROOMS: Room[] = [
  {
    id: "standard-room",
    name: "Comfort Room",
    slug: "comfort-room",
    price: 2200,
    pricing: { base: 2200, doubleSupplement: 200, breakfastPerPerson: 300, extraPerson: 500 },
    rating: 4.6,
    reviewsCount: 124,
    description: "Our Comfort Rooms are thoughtfully designed to offer a peaceful and restful stay. Featuring modern furnishings, plush bedding, and all the essential amenities — perfect for solo travelers and couples.",
    amenities: ["Free WiFi", "Smart TV", "AC", "Room Service", "Daily Housekeeping", "Premium Toiletries"],
    images: [LOCAL_IMAGES.standard1, LOCAL_IMAGES.standard2, LOCAL_IMAGES.standard3],
    bedType: "Queen Bed",
    size: "280 sq ft",
    maxGuests: 2,
    availability: true,
    features: ["In-house Lift Access", "Breakfast Area Access", "Garden View"],
    category: "standard",
  },
  {
    id: "deluxe-room",
    name: "Premium Room",
    slug: "premium-room",
    price: 2500,
    pricing: { base: 2500, doubleSupplement: 200, breakfastPerPerson: 300, extraPerson: 500 },
    rating: 4.7,
    reviewsCount: 98,
    description: "Step into elevated comfort with our Premium Rooms, offering extra space, upgraded furnishings, and premium amenities. Ideal for business travelers and guests seeking a refined stay.",
    amenities: ["Free WiFi", "Smart TV", "AC", "Mini Fridge", "Work Desk", "Room Service", "Premium Toiletries"],
    images: [LOCAL_IMAGES.deluxe1, LOCAL_IMAGES.deluxe2, LOCAL_IMAGES.deluxe3],
    bedType: "King Bed",
    size: "360 sq ft",
    maxGuests: 2,
    availability: true,
    features: ["Lift Access", "Breakfast Included", "Work Desk Setup"],
    category: "deluxe",
  },
  {
    id: "family-suite",
    name: "Suite",
    slug: "suite",
    price: 2800,
    pricing: { base: 2800, doubleSupplement: 200, breakfastPerPerson: 300, extraPerson: 500 },
    rating: 4.8,
    reviewsCount: 76,
    description: "Spacious and family-friendly, our Family Suites offer ample room for everyone. Featuring a separate living area, multiple beds, and all the comforts of home — perfect for family getaways.",
    amenities: ["Free WiFi", "Smart TV", "AC", "Kitchenette", "Sofa Bed", "2 Bathrooms", "Room Service"],
    images: [LOCAL_IMAGES.family2, LOCAL_IMAGES.family1, LOCAL_IMAGES.family3],
    bedType: "1 King + 2 Single Beds",
    size: "650 sq ft",
    maxGuests: 5,
    availability: true,
    features: ["Separate Living Area", "Lift Access", "Garden Area Access"],
    category: "family",
  },
  {
    id: "luxury-suite",
    name: "Cottage Room",
    slug: "cottage-room",
    price: 2300,
    pricing: { base: 2300, doubleSupplement: 200, breakfastPerPerson: 300, extraPerson: 500 },
    rating: 4.9,
    reviewsCount: 42,
    description: "Experience a unique and private cottage-style stay within the hotel premises. Our Cottage Rooms blend rustic charm with modern comfort, offering a standalone retreat surrounded by greenery.",
    amenities: ["Free WiFi", "Smart TV", "AC", "Private Seating Area", "Room Service", "Premium Toiletries", "Garden Access"],
    images: [LOCAL_IMAGES.luxury1, LOCAL_IMAGES.luxury2, LOCAL_IMAGES.luxury3],
    bedType: "King Bed",
    size: "420 sq ft",
    maxGuests: 3,
    availability: true,
    features: ["Private Courtyard", "Garden & Breakfast Area Access", "Quiet & Secluded Setting"],
    category: "luxury-suite",
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
    id: "conference",
    name: "Conference Room",
    description: "Modern conference room equipped with presentation tech, ideal for corporate meetings and business events.",
    iconName: "Briefcase",
  },
  {
    id: "rooftop",
    name: "Rooftop Party Venue",
    description: "An open-air rooftop venue perfect for cocktail evenings, private parties, and sunset celebrations.",
    iconName: "Sparkles",
  },
  {
    id: "banquet",
    name: "Banquet Hall (200–250 Persons)",
    description: "Spacious banquet hall accommodating up to 250 guests, ideal for weddings, receptions, and large events.",
    iconName: "UtensilsCrossed",
  },
  {
    id: "parking",
    name: "In-House Parking (10 Cars)",
    description: "Secure and convenient on-site parking available for up to 10 vehicles within the hotel premises.",
    iconName: "Car",
  },
  {
    id: "breakfast",
    name: "Breakfast & Garden Area",
    description: "Start your mornings with a wholesome breakfast served in our lush garden dining area, open-air and serene.",
    iconName: "Salad",
  },
  {
    id: "lift",
    name: "Lift / Elevator",
    description: "Easy access across all floors with our modern in-house elevator for guests with luggage or mobility needs.",
    iconName: "ArrowUpDown",
  },
  {
    id: "wheelchair",
    name: "Wheelchair Assistance",
    description: "Fully accessible facilities with wheelchair support and dedicated staff assistance available around the clock.",
    iconName: "Accessibility",
  },
  {
    id: "wifi",
    name: "High-Speed WiFi",
    description: "Complimentary high-speed internet access throughout all rooms and common areas of the hotel.",
    iconName: "Wifi",
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
    title: "Breakfast & Garden Area",
    category: "exterior",
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
  {
    id: "g7",
    url: LOCAL_IMAGES.gallery7,
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
