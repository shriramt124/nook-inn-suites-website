import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
