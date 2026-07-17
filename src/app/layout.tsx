import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Near MG Road Metro Station | Nook Inn & Suites Gurgaon",
  description: "Book affordable rooms at Nook Inn & Suites near MG Road Metro Station, DLF Phase 2, Gurgaon. Free WiFi, AC Rooms, 24x7 Check-in.",
  icons: {
    icon: "/logo.png?v=2",
    shortcut: "/logo.png?v=2",
    apple: "/logo.png?v=2",
  },
  keywords: "hotel near mg road metro, hotel in dlf phase 2, budget hotel gurgaon, hotel near cyber city, hotel near ambience mall, business hotel gurgaon, best hotel in dlf phase 2, affordable hotel gurgaon",
  openGraph: {
    title: "Nook Inn & Suites | Budget Hotel in DLF Phase 2, Gurgaon",
    description: "Book affordable rooms at Nook Inn & Suites near MG Road Metro Station, DLF Phase 2, Gurgaon. Free WiFi, AC Rooms, 24x7 Check-in.",
    type: "website",
    locale: "en_US",
    siteName: "Nook Inn & Suites",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Near MG Road Metro | Nook Inn & Suites Gurgaon",
    description: "Experience luxury and budget stays near Cyber City and MG Road, Gurugram.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Nook Inn & Suites",
    "image": "https://nookinnsuites.com/Nook%20GGN/_A3A1254-HDR.jpg",
    "telephone": "+919310411885",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "L-32/4, DLF Phase 2, M.G. Road Service Lane",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "postalCode": "122002",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.4816",
      "longitude": "77.0858"
    },
    "url": "https://nookinnsuites.com",
    "priceRange": "₹₹",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
