"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "../../hooks/useScroll";
import { NAVIGATION_ITEMS } from "../../constants/data";
import { Button } from "../ui/Button";
import { AnnouncementTicker } from "./AnnouncementTicker";

export const Navbar: React.FC = () => {
  const scrolled = useScroll(80);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  const drawerVariants = {
    closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "tween", duration: 0.4, ease: "easeOut" } },
  } as const;

  return (
    <>
      {/* Announcement ticker strip — pinned at very top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementTicker />
      </div>

      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-[30px] left-0 right-0 z-40 transition-all duration-300 w-full ${scrolled || pathname !== "/"
          ? "bg-[#111111]/97 backdrop-blur-md border-b border-white/10 shadow-md py-2 sm:py-3"
          : "bg-gradient-to-b from-black/70 to-transparent py-3 sm:py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center text-white group" onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="Nook Inn Logo"
              width={80}
              height={80}
              className="w-28 sm:w-36 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation Link Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-xs uppercase tracking-widest transition-all duration-300 hover:text-white px-3 py-2 rounded-full ${isActive
                    ? "text-[#111111] bg-white font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.55)]"
                    : "text-stone-200 hover:bg-white/10"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Reservation Call to Action */}
          <div className="hidden lg:block">
            <Link href="/bookings">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-[#111111] border-white hover:bg-stone-100 hover:text-[#111111] hover:border-stone-100"
              >
                Reserve a Room
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu Toggle Trigger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white hover:text-gold-400 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black"
            />

            {/* Menu Drawer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] bg-[#111111] p-8 flex flex-col justify-between shadow-2xl border-l border-white/10"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center text-white">
                    <Image
                      src="/logo.png"
                      alt="Nook Inn Logo"
                      width={150}
                      height={50}
                      className="w-32 h-auto object-contain"
                    />
                  </div>
                  <button
                    onClick={closeMenu}
                    className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  {NAVIGATION_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        className={`text-sm uppercase tracking-widest font-sans font-normal transition-all duration-300 px-3 py-2 rounded-md ${isActive
                          ? "text-[#111111] bg-white font-semibold"
                          : "text-stone-200 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/bookings" onClick={closeMenu} className="block w-full">
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full bg-white text-[#111111] border-white hover:bg-stone-100 hover:text-[#111111] hover:border-stone-100"
                  >
                    Book Your Stay
                  </Button>
                </Link>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest text-center">
                  Enjoy Luxury Hospitality
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
