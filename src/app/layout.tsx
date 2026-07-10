import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nook Inn & Suites | Luxury Boutique Hotel",
  description: "Experience luxury beyond expectations at Nook Inn & Suites. Indulge in premium rooms, world-class spas, fine dining, and personalized hospitality.",
  keywords: "luxury hotel, boutique hotel, suites, premium rooms, fine dining, spa, vacation, hotel booking",
  openGraph: {
    title: "Nook Inn & Suites | Luxury Boutique Hotel",
    description: "Experience luxury beyond expectations. Indulge in premium rooms, world-class spas, and fine dining.",
    type: "website",
    locale: "en_US",
    siteName: "Nook Inn & Suites",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nook Inn & Suites | Luxury Boutique Hotel",
    description: "Experience luxury beyond expectations.",
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
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${jakarta.variable} font-sans antialiased bg-background text-foreground selection:bg-gold-200 selection:text-primary-900`}
      >
        {children}
      </body>
    </html>
  );
}
