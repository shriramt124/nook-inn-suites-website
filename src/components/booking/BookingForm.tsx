"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Users, Home, ClipboardList, User, Mail, Phone, Globe, Tag, Printer, CheckCircle } from "lucide-react";
import { MOCK_ROOMS } from "../../constants/data";
import { Room } from "../../types";
import { formatPrice, calculateRoomRate } from "../../lib/utils";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Toast } from "../ui/Toast";

// Zod validation schema
const bookingSchema = z
  .object({
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
    adults: z.coerce.number().min(1, "At least 1 adult is required").max(6, "Max 6 adults per room"),
    children: z.coerce.number().min(0, "Invalid number of children").max(6, "Max 6 children per room"),
    roomType: z.string().min(1, "Room type selection is required"),
    numberOfRooms: z.coerce.number().min(1, "At least 1 room is required").max(3, "Max 3 rooms per booking"),
    specialRequests: z.string().optional(),
    guestName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone number must be at least 7 digits"),
    country: z.string().min(2, "Country name is required"),
    couponCode: z.string().optional(),
  })
  .refine(
    (data) => {
      const checkInDate = new Date(data.checkIn);
      const checkOutDate = new Date(data.checkOut);
      return checkOutDate > checkInDate;
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOut"],
    }
  );

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  initialRoomSlug?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialRoomSlug = "" }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [pricing, setPricing] = useState({
    nights: 0,
    ratePerNight: 0,
    baseTotal: 0,
    discount: 0,
    taxes: 0,
    grandTotal: 0,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormValues | null>(null);
  const [bookingId, setBookingId] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      adults: 2,
      children: 0,
      roomType: initialRoomSlug || MOCK_ROOMS[0].slug,
      numberOfRooms: 1,
      specialRequests: "",
      guestName: "",
      email: "",
      phone: "",
      country: "",
      couponCode: "",
    },
  });

  // Watch form fields to trigger price calculations
  const watchedCheckIn = watch("checkIn");
  const watchedCheckOut = watch("checkOut");
  const watchedRoomType = watch("roomType");
  const watchedRoomsCount = watch("numberOfRooms");
  const watchedAdults = watch("adults");
  const watchedChildren = watch("children");
  const watchedCoupon = watch("couponCode");

  // Sync selected room details
  useEffect(() => {
    const room = MOCK_ROOMS.find((r) => r.slug === watchedRoomType) || null;
    setSelectedRoom(room);
  }, [watchedRoomType]);

  // Sync calculations on field change
  useEffect(() => {
    if (!watchedCheckIn || !watchedCheckOut || !selectedRoom) {
      setPricing({ nights: 0, ratePerNight: 0, baseTotal: 0, discount: 0, taxes: 0, grandTotal: 0 });
      return;
    }

    const checkInDate = new Date(watchedCheckIn);
    const checkOutDate = new Date(watchedCheckOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights <= 0) {
      setPricing({ nights: 0, ratePerNight: 0, baseTotal: 0, discount: 0, taxes: 0, grandTotal: 0 });
      return;
    }

    const roomsCount = Number(watchedRoomsCount) || 1;
    const adults = Number(watchedAdults) || 1;
    const children = Number(watchedChildren) || 0;

    const rateBreakdown = calculateRoomRate(selectedRoom, adults, children);
    const baseTotal = rateBreakdown.perNight * nights * roomsCount;

    // Apply Coupon Code: LUXURY10 gives 10%, WELCOME500 gives ₹500 off
    let discount = 0;
    if (watchedCoupon?.toUpperCase() === "LUXURY10") {
      discount = baseTotal * 0.1;
    } else if (watchedCoupon?.toUpperCase() === "WELCOME500") {
      discount = Math.min(500 * roomsCount, baseTotal);
    }

    const taxRate = 0.12; // 12% Hotel Room Taxes
    const taxes = (baseTotal - discount) * taxRate;
    const grandTotal = baseTotal - discount + taxes;

    setPricing({
      nights,
      ratePerNight: rateBreakdown.perNight,
      baseTotal,
      discount,
      taxes,
      grandTotal,
    });
  }, [watchedCheckIn, watchedCheckOut, selectedRoom, watchedRoomsCount, watchedAdults, watchedChildren, watchedCoupon]);

  const onSubmit = async (data: BookingFormValues) => {
    const generatedId = `NKS-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: generatedId,
          guestName: data.guestName,
          email: data.email,
          phone: data.phone,
          country: data.country,
          roomName: selectedRoom?.name,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          adults: data.adults,
          children: data.children,
          numberOfRooms: data.numberOfRooms,
          specialRequests: data.specialRequests,
          couponCode: data.couponCode,
          pricing,
        }),
      });
    } catch {
      // Don't block the UI — booking ID is still shown even if email fails
      console.error("Email notification failed");
    }
    setSubmittedData(data);
    setBookingId(generatedId);
    setIsSubmitted(true);
    setShowToast(true);
  };

  // Success view block
  if (isSubmitted && submittedData && selectedRoom) {
    return (
      <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <Toast
          isVisible={showToast}
          message={`Reservation confirmed successfully. ID: ${bookingId}`}
          type="success"
          onClose={() => setShowToast(false)}
        />
        <Card variant="default" className="border border-stone-200 shadow-2xl rounded-none p-5 sm:p-8 md:p-12 bg-white">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-wide text-primary-900">
              Reservation Confirmed
            </h2>
            <p className="text-stone-600 font-sans font-normal text-sm max-w-md">
              Thank you, <span className="font-medium text-primary-900">{submittedData.guestName}</span>. Your luxury stay is officially secured. A confirmation receipt has been sent to your email.
            </p>
          </div>

          <hr className="border-stone-100 my-6" />

          {/* Invoice Summary Details */}
          <div className="space-y-6 font-sans">
            <div className="flex justify-between items-center text-xs uppercase tracking-widest text-stone-600">
              <span>Booking Reference</span>
              <span className="font-bold text-primary-900">{bookingId}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50 p-6 border border-stone-100">
              <div className="space-y-3 text-xs md:text-sm">
                <p className="text-stone-600">
                  <span className="font-semibold uppercase text-[10px] tracking-wider text-stone-500 block mb-0.5">Guest Info</span>
                  {submittedData.guestName} <br />
                  {submittedData.email} | {submittedData.phone} <br />
                  {submittedData.country}
                </p>
                <p className="text-stone-600">
                  <span className="font-semibold uppercase text-[10px] tracking-wider text-stone-500 block mb-0.5">Room Selection</span>
                  <span className="font-serif text-primary-900 font-semibold">{selectedRoom.name}</span> <br />
                  {selectedRoom.bedType} | {selectedRoom.size}
                </p>
              </div>

              <div className="space-y-3 text-xs md:text-sm">
                <p className="text-stone-600">
                  <span className="font-semibold uppercase text-[10px] tracking-wider text-stone-500 block mb-0.5">Stay Dates</span>
                  {submittedData.checkIn} to {submittedData.checkOut} <br />
                  ({pricing.nights} Nights)
                </p>
                <p className="text-stone-600">
                  <span className="font-semibold uppercase text-[10px] tracking-wider text-stone-500 block mb-0.5">Rooms & Guests</span>
                  {submittedData.numberOfRooms} Room(s) | {submittedData.adults} Adult(s) {submittedData.children > 0 && `, ${submittedData.children} Child(ren)`}
                </p>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 pt-4 text-sm font-sans">
              {(() => {
                const breakdown = calculateRoomRate(selectedRoom, submittedData.adults, submittedData.children);
                return (
                  <>
                    {breakdown.lines.map((line) => (
                      <div key={line.label} className="flex justify-between text-stone-600">
                        <span>{line.label}</span>
                        <span>{formatPrice(line.amount)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-stone-800 font-medium">
                      <span>Rate per Night</span>
                      <span>{formatPrice(breakdown.perNight)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal ({pricing.nights} nights × {submittedData.numberOfRooms} room)</span>
                      <span>{formatPrice(pricing.baseTotal)}</span>
                    </div>
                  </>
                );
              })()}
              {pricing.discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Promo Discount Applied</span>
                  <span>-{formatPrice(pricing.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>State Hotel Tax (12%)</span>
                <span>{formatPrice(pricing.taxes)}</span>
              </div>
              <hr className="border-stone-100" />
              <div className="flex justify-between text-base font-semibold text-primary-900 uppercase tracking-wide">
                <span>Grand Total</span>
                <span className="text-xl font-serif text-gold-600 font-bold">{formatPrice(pricing.grandTotal)}</span>
              </div>
            </div>

            {submittedData.specialRequests && (
              <div className="text-xs bg-gold-50/50 p-4 border border-gold-200/40 text-stone-600 italic">
                <span className="font-semibold block uppercase text-[9px] tracking-wider text-gold-700 not-italic mb-1">Special Requests</span>
                &ldquo;{submittedData.specialRequests}&rdquo;
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2"
            >
              <Printer className="h-4 w-4" /> Print Invoice
            </Button>
            <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
              Book Another Stay
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Room selections options
  const roomTypeOptions = MOCK_ROOMS.map((room) => ({
    value: room.slug,
    label: `${room.name} (from ${formatPrice(room.price)} / night)`,
  }));

  const roomCountOptions = [
    { value: 1, label: "1 Room" },
    { value: 2, label: "2 Rooms" },
    { value: 3, label: "3 Rooms" },
  ];

  const guestCountOptions = [
    { value: 1, label: "1 Adult" },
    { value: 2, label: "2 Adults" },
    { value: 3, label: "3 Adults" },
    { value: 4, label: "4 Adults" },
    { value: 5, label: "5 Adults" },
    { value: 6, label: "6 Adults" },
  ];

  const childCountOptions = [
    { value: 0, label: "No Children" },
    { value: 1, label: "1 Child" },
    { value: 2, label: "2 Children" },
    { value: 3, label: "3 Children" },
    { value: 4, label: "4 Children" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Left side: Booking details input fields */}
      <div className="lg:col-span-8 bg-white border border-stone-200/60 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 shadow-sm">
        {/* Step 1: Stay & Suite Selection */}
        <div className="space-y-5 sm:space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="h-6 w-6 rounded-full bg-gold-500 text-white flex items-center justify-center text-xs font-bold font-sans">
              1
            </span>
            <h3 className="font-serif text-lg md:text-xl text-primary-900 font-semibold tracking-wide">
              Select Stay & Suite
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Check-In Date */}
            <Input
              type="date"
              label="Check-In Date"
              error={errors.checkIn?.message}
              icon={<Calendar className="h-4 w-4" />}
              {...register("checkIn")}
            />

            {/* Check-Out Date */}
            <Input
              type="date"
              label="Check-Out Date"
              error={errors.checkOut?.message}
              icon={<Calendar className="h-4 w-4" />}
              {...register("checkOut")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Room Type */}
            <div className="sm:col-span-2">
              <Select
                label="Room or Suite Type"
                options={roomTypeOptions}
                error={errors.roomType?.message}
                icon={<Home className="h-4 w-4" />}
                {...register("roomType")}
              />
            </div>

            {/* Rooms Quantity */}
            <Select
              label="Number of Rooms"
              options={roomCountOptions}
              error={errors.numberOfRooms?.message}
              icon={<Home className="h-4 w-4" />}
              {...register("numberOfRooms")}
            />

            {/* Adults Count */}
            <Select
              label="Adult Guests"
              options={guestCountOptions}
              error={errors.adults?.message}
              icon={<Users className="h-4 w-4" />}
              {...register("adults")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Children Count */}
            <Select
              label="Child Guests"
              options={childCountOptions}
              error={errors.children?.message}
              icon={<Users className="h-4 w-4" />}
              {...register("children")}
            />

            {/* Promo coupon input */}
            <Input
              placeholder="e.g. LUXURY10"
              label="Coupon Code"
              error={errors.couponCode?.message}
              icon={<Tag className="h-4 w-4" />}
              {...register("couponCode")}
            />
          </div>
        </div>

        <hr className="border-stone-100" />

        {/* Step 2: Guest Information */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="h-6 w-6 rounded-full bg-gold-500 text-white flex items-center justify-center text-xs font-bold font-sans">
              2
            </span>
            <h3 className="font-serif text-lg md:text-xl text-primary-900 font-semibold tracking-wide">
              Guest Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Guest Name */}
            <Input
              placeholder="Enter your full name"
              label="Full Name"
              error={errors.guestName?.message}
              icon={<User className="h-4 w-4" />}
              {...register("guestName")}
            />

            {/* Guest Email */}
            <Input
              placeholder="name@domain.com"
              type="email"
              label="Email Address"
              error={errors.email?.message}
              icon={<Mail className="h-4 w-4" />}
              {...register("email")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Guest Phone */}
            <Input
              placeholder="e.g. +1 (555) 000-0000"
              label="Phone Number"
              error={errors.phone?.message}
              icon={<Phone className="h-4 w-4" />}
              {...register("phone")}
            />

            {/* Guest Country */}
            <Input
              placeholder="Country of Residence"
              label="Country"
              error={errors.country?.message}
              icon={<Globe className="h-4 w-4" />}
              {...register("country")}
            />
          </div>

          {/* Special Requests */}
          <div className="flex flex-col space-y-1.5 w-full">
            <label className="text-xs uppercase tracking-widest text-primary-900 font-medium flex items-center gap-1.5">
              <ClipboardList className="h-3.5 w-3.5" /> Special Requests
            </label>
            <textarea
              placeholder="Any airport transport arrangements, dietary needs, or accessibility requests?"
              rows={4}
              className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-800 text-sm font-sans placeholder:text-stone-400 transition-all duration-300 rounded-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30"
              {...register("specialRequests")}
            />
          </div>
        </div>
      </div>

      {/* Right side: Dynamic Pricing breakdown panel */}
      <div className="lg:col-span-4 lg:sticky lg:top-28">
        <Card variant="default" className="border border-stone-200 bg-white rounded-none p-6 shadow-md space-y-6">
          <h3 className="font-serif text-lg text-primary-900 font-semibold tracking-wide border-b border-stone-100 pb-3">
            Stay Pricing Summary
          </h3>

          {/* Room info preview */}
          {selectedRoom ? (
            <div className="flex gap-4 items-center">
              <div className="relative h-16 w-16 overflow-hidden shrink-0 border border-stone-100">
                <Image
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-sm font-bold text-primary-900">
                  {selectedRoom.name}
                </h4>
                <p className="text-xs text-stone-500">
                  {selectedRoom.bedType} | {selectedRoom.size}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-500 font-normal">Loading suite preview...</p>
          )}

          <hr className="border-stone-100" />

          {/* Checkout pricing breakdowns list */}
          <div className="space-y-3.5 text-xs sm:text-sm font-sans font-normal">
            {(() => {
              if (!selectedRoom) return null;
              const adults = Number(watchedAdults) || 1;
              const children = Number(watchedChildren) || 0;
              const breakdown = calculateRoomRate(selectedRoom, adults, children);
              return (
                <>
                  {breakdown.lines.map((line) => (
                    <div key={line.label} className="flex justify-between text-stone-600">
                      <span>{line.label}</span>
                      <span>{formatPrice(line.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-stone-800 font-medium">
                    <span>Rate / Night</span>
                    <span>{formatPrice(breakdown.perNight)}</span>
                  </div>
                </>
              );
            })()}
            <div className="flex justify-between text-stone-600">
              <span>Nights × Rooms</span>
              <span>{pricing.nights} night(s) × {watchedRoomsCount || 1}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Nights Count</span>
              <span>{pricing.nights} Night(s)</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Base Subtotal</span>
              <span>{formatPrice(pricing.baseTotal)}</span>
            </div>
            {pricing.discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Coupon Discount</span>
                <span>-{formatPrice(pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>State & Resort Tax (12%)</span>
              <span>{formatPrice(pricing.taxes)}</span>
            </div>
            <hr className="border-stone-100" />
            <div className="flex justify-between items-center text-primary-900 font-bold uppercase tracking-wider">
              <span className="text-xs font-semibold">Grand Total</span>
              <span className="text-xl font-serif text-gold-600">
                {formatPrice(pricing.grandTotal)}
              </span>
            </div>
          </div>

          {/* Action Trigger Button */}
          <Button
            type="submit"
            variant="secondary"
            className="w-full text-center py-4 font-bold"
            isLoading={isSubmitting}
          >
            Confirm Reservation
          </Button>

          <p className="text-[10px] text-stone-500 font-sans tracking-wide leading-relaxed text-center">
            * By clicking Confirm Reservation you agree to the 48-hour flexible cancellation policy terms.
          </p>
        </Card>
      </div>
    </form>
  );
};
