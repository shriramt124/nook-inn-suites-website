"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { HOTEL_CONTACT_INFO, NAVIGATION_ITEMS } from "../../constants/data";
import { Button } from "../ui/Button";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#111111] border-t border-white/10 text-stone-300 font-sans">
      {/* Top Banner: Brand and Newsletter */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <Link href="/" className="inline-flex items-center text-white">
            <Image
              src="/logo2.png"
              alt="Nook Inn Logo"
              width={240}
              height={80}
              className="w-36 md:w-56 h-auto object-contain"
            />
          </Link>
          <p className="text-sm font-normal text-stone-400 max-w-md leading-relaxed">
            Enter a world of refined elegance, where bespoke service satisfies every desire and luxury knows no bounds.
          </p>
        </div>

        {/* Newsletter Signup Form */}
        <div className="lg:col-span-6 w-full">
          <h4 className="text-xs uppercase tracking-widest text-white font-medium mb-3">
            Subscribe to our newsletter
          </h4>
          <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-stone-200 text-sm placeholder:text-stone-500 transition-colors focus:outline-none focus:border-red-500 rounded-none"
              />
            </div>
            <Button type="submit" variant="secondary" size="sm" className="sm:w-auto h-full py-3.5 px-6">
              {subscribed ? (
                "Subscribed"
              ) : (
                <span className="flex items-center gap-2">
                  Subscribe <ArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </form>
          {subscribed && (
            <p className="text-xs text-red-400 mt-2 animate-fade-in font-light">
              Thank you for subscribing to Nook Inn updates.
            </p>
          )}
        </div>
      </div>

      {/* Main Grid: Info, Navigation, Socials */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        {/* Contact info column */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4">
            Contact Reservations
          </h4>
          <ul className="space-y-3.5 text-sm font-normal text-stone-400">
            <li>
              <span className="text-red-400 font-normal uppercase tracking-wider text-[10px] block mb-0.5">
                Address
              </span>
              {HOTEL_CONTACT_INFO.address}
            </li>
            <li className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-red-400 font-normal uppercase tracking-wider text-[10px] block mb-0.5">
                  Direct Lines
                </span>
                <div className="flex flex-col space-y-1">
                  <a href={`tel:${HOTEL_CONTACT_INFO.phone}`} className="hover:text-red-400 transition-colors block">
                    {HOTEL_CONTACT_INFO.phone}
                  </a>
                  <a href={`tel:${HOTEL_CONTACT_INFO.emergencyContact}`} className="hover:text-red-400 transition-colors block">
                    {HOTEL_CONTACT_INFO.emergencyContact}
                  </a>
                </div>
              </div>
              <div>
                <span className="text-red-400 font-normal uppercase tracking-wider text-[10px] block mb-0.5">
                  General Inquiries
                </span>
                <a href={`mailto:${HOTEL_CONTACT_INFO.email}`} className="hover:text-red-400 transition-colors">
                  {HOTEL_CONTACT_INFO.email}
                </a>
              </div>
            </li>
            <li>
              <span className="text-red-400 font-normal uppercase tracking-wider text-[10px] block mb-0.5">
                Reception Timing
              </span>
              {HOTEL_CONTACT_INFO.receptionTiming}
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4">
            Explore
          </h4>
          <div className="flex flex-col space-y-3 text-sm font-normal text-stone-400">
            {NAVIGATION_ITEMS.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-red-400 transition-colors w-fit">
                {item.name}
              </Link>
            ))}
            <Link href="/rooms" className="hover:text-red-400 transition-colors w-fit">
              Luxury Suites
            </Link>
            <Link href="/contact" className="hover:text-red-400 transition-colors w-fit">
              Frequently Asked Questions
            </Link>
          </div>
        </div>

        {/* Social / Experience Media Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold">
              The Luxury Experience
            </h4>
            <p className="text-sm font-normal text-stone-400 leading-relaxed">
              Connect with us on social media to explore virtual walkthroughs, culinary events, and VIP suite packages.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="p-2.5 bg-white/5 border border-white/10 rounded-none text-stone-400 hover:text-red-400 hover:border-red-500 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-white/5 border border-white/10 rounded-none text-stone-400 hover:text-red-400 hover:border-red-500 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-white/5 border border-white/10 rounded-none text-stone-400 hover:text-red-400 hover:border-red-500 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="p-2.5 bg-white/5 border border-white/10 rounded-none text-stone-400 hover:text-red-400 hover:border-red-500 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Local SEO Text Block */}
      <div className="bg-[#111111] py-8 border-t border-white/5 text-stone-500 text-[10px] font-sans text-center px-6">
        <p className="max-w-4xl mx-auto leading-relaxed">
          Nook Inn &amp; Suites is a premier budget and luxury hotel located in DLF Phase 2, Gurugram. 
          Conveniently situated near MG Road Metro Station, Cyber City, and Ambience Mall, we offer 
          the perfect blend of comfort and connectivity for both business travelers and families. 
          Experience world-class hospitality, 24x7 reception, and premium banqueting in the heart of Gurgaon.
        </p>
      </div>

      {/* Bottom Legal / Copyright Section */}
      <div className="bg-[#0a0a0a] py-6 border-t border-white/5 text-stone-600 text-xs font-normal font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Nook Inn &amp; Suites. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-stone-300 transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-stone-300 transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
