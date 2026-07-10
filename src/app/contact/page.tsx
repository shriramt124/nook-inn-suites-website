import React from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { ContactForm } from "../../components/contact/ContactForm";
import { FAQ } from "../../components/contact/FAQ";
import { HOTEL_CONTACT_INFO } from "../../constants/data";
import { MapPin, Phone, Mail, Clock, ShieldAlert, Navigation } from "lucide-react";
import { Card } from "../../components/ui/Card";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 bg-[#faf9f6]">
        {/* Banner Section */}
        <div className="bg-primary-950 py-16 text-center relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,35,64,0.6),rgba(0,0,0,0.8))]" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.45em] text-gold-500 font-semibold block">
              Contact Desk
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
              Get in Touch
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm font-sans font-light max-w-md mx-auto leading-relaxed">
              Have any questions or special requests regarding suite packages or events? We are available 24/7.
            </p>
          </div>
        </div>

        {/* Contact details & Form */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start font-sans">
          {/* Left: Contact Info and Map */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="default" className="border border-stone-200/60 p-6 md:p-8 bg-white space-y-6">
              <h3 className="font-serif text-xl text-primary-900 font-semibold tracking-wide border-b border-stone-100 pb-3">
                Concierge Coordinates
              </h3>

              <div className="space-y-4 text-xs sm:text-sm font-normal text-stone-700">
                {/* Address */}
                <div className="flex items-start space-x-3.5">
                  <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary-900 uppercase text-[10px] tracking-wider block">Address</span>
                    {HOTEL_CONTACT_INFO.address}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <Phone className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary-900 uppercase text-[10px] tracking-wider block">Reservations</span>
                    <a href={`tel:${HOTEL_CONTACT_INFO.phone}`} className="hover:text-gold-500 transition-colors">
                      {HOTEL_CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <Mail className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary-900 uppercase text-[10px] tracking-wider block">Email Address</span>
                    <a href={`mailto:${HOTEL_CONTACT_INFO.email}`} className="hover:text-gold-500 transition-colors">
                      {HOTEL_CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start space-x-3.5">
                  <Clock className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary-900 uppercase text-[10px] tracking-wider block">Reception Timing</span>
                    {HOTEL_CONTACT_INFO.receptionTiming}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="flex items-start space-x-3.5 border-t border-stone-100 pt-4">
                  <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-600 uppercase text-[10px] tracking-wider block">VIP Priority Line</span>
                    {HOTEL_CONTACT_INFO.emergencyContact}
                  </div>
                </div>
              </div>
            </Card>

            {/* Embedded Google Maps */}
            <Card variant="default" className="border border-stone-200/60 overflow-hidden bg-white shadow-sm">
              <div className="relative h-[260px] w-full">
                <iframe
                  title="Nook Inn & Suites Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    HOTEL_CONTACT_INFO.address
                  )}&output=embed`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border-t border-stone-100">
                <p className="text-[11px] text-stone-600 uppercase tracking-widest text-center sm:text-left">
                  {HOTEL_CONTACT_INFO.address}
                </p>
                <a
                  href={HOTEL_CONTACT_INFO.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gold-600 hover:text-gold-700 underline font-semibold cursor-pointer shrink-0"
                >
                  <Navigation className="h-3.5 w-3.5" /> Open in Google Maps
                </a>
              </div>
            </Card>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <Card variant="default" className="border border-stone-200/60 p-6 md:p-8 bg-white shadow-sm space-y-6">
              <h3 className="font-serif text-xl text-primary-900 font-semibold tracking-wide border-b border-stone-100 pb-3">
                Send an Inquiry Message
              </h3>
              <ContactForm />
            </Card>
          </div>
        </div>

        {/* FAQ Accordion block */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FAQ />
        </div>
      </main>

      <Footer />
    </>
  );
}
