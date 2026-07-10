import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { SectionTitle } from "../../components/shared/SectionTitle";
import { StatsCard } from "../../components/shared/StatsCard";
import { Button } from "../../components/ui/Button";
import { ShieldCheck, Heart, Leaf, Award } from "lucide-react";
import { Card, CardBody } from "../../components/ui/Card";

export default function AboutPage() {
  const coreValues = [
    {
      title: "Integrity & Discretion",
      description: "We safeguard the absolute privacy of all distinguished visitors with secure check-ins and private butler coordinates.",
      icon: ShieldCheck,
    },
    {
      title: "Bespoke Hospitality",
      description: "Nothing is standardized. We adapt every detail of your room temperature, pillows, and dining menus to your personal preferences.",
      icon: Heart,
    },
    {
      title: "Environmental Stewardship",
      description: "Luxury and nature coexist. Our resort operates with green energy grids, locally sourced ingredients, and plastic-free guidelines.",
      icon: Leaf,
    },
    {
      title: "Award-winning Excellence",
      description: "Voted Gurugram's finest boutique retreat five years running, we maintain an unyielding commitment to premium experiences.",
      icon: Award,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 bg-[#faf9f6] font-sans">
        {/* Banner Section */}
        <div className="bg-primary-950 py-16 text-center relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,35,64,0.6),rgba(0,0,0,0.8))]" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.45em] text-gold-500 font-semibold block">
              The Nook Legacy
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
              Our Story & Heritage
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm font-sans font-light max-w-md mx-auto leading-relaxed">
              Carving out a sanctuary of rest and luxury in Gurugram since 2014. Fusing style and warmth.
            </p>
          </div>
        </div>

        {/* Narrative Split */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <SectionTitle
              title="A Philosophy of Sanctuary"
              subtitle="Design Concept"
              align="left"
              className="mb-6"
            />
            <p className="text-stone-700 font-normal leading-relaxed text-sm md:text-base">
              The architectural lines of Nook Inn & Suites were conceived by renowned design team, drafting structures that seamlessly blend inside comfort with external beachfront tranquility. Large glass panels frame panoramic ocean views, creating fluid transitions between the sea breeze and polished travertine floors.
            </p>
            <p className="text-stone-600 font-normal leading-relaxed text-xs md:text-sm">
              We seek to move away from the traditional, institutionalized feeling of standard luxury hotels. Rather than a cold lobby and structured lines, we welcome guests with personal lifestyle managers, custom lounge settings, and complete spatial privacy.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <StatsCard value="120+" label="Luxury Rooms" />
              <StatsCard value="4" label="Fine Dining" />
              <StatsCard value="98%" label="Satisfaction" />
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] w-full border border-stone-200/40">
            <Image
              src="/Nook GGN/_A3A1203-HDR.jpg"
              alt="Luxury hotel sunset exterior poolside view"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Values grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
          <SectionTitle
            title="Values That Guide Us"
            subtitle="Hotel Philosophy"
            description="Our service culture is built upon four fundamental values to guarantee an unforgettable retreat experience."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val) => (
              <Card key={val.title} className="bg-white border border-stone-200/40 rounded-none h-full shadow-sm hover:shadow-md transition-all duration-300">
                <CardBody className="p-8 space-y-4">
                  <div className="p-3 bg-gold-50 text-gold-600 w-fit">
                    <val.icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-lg text-primary-900 font-medium">{val.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">{val.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-primary-900">
            Let Us Arrange Your Arrival
          </h2>
          <p className="text-stone-700 text-xs sm:text-sm font-normal leading-relaxed max-w-md mx-auto">
            Book directly or speak to our Concierge Team to customize your flight transfer, special dietary parameters, and room view packages.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/bookings">
              <Button variant="secondary">Book Stay</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Concierge</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
