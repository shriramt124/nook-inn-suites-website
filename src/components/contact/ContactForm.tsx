"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, Bookmark, FileText } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Toast } from "../ui/Toast";

// Zod Validation Schema
const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number must be at least 7 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Mocking an inquiry submission API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setToastMsg(`Thank you, ${data.name}. Your inquiry has been sent to our reception desk.`);
    setShowToast(true);
    reset();
  };

  return (
    <div className="w-full">
      <Toast
        isVisible={showToast}
        message={toastMsg}
        type="success"
        onClose={() => setShowToast(false)}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Guest Name */}
          <Input
            placeholder="Your full name"
            label="Name"
            error={errors.name?.message}
            icon={<User className="h-4 w-4" />}
            {...register("name")}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Guest Phone */}
          <Input
            placeholder="e.g. +1 (555) 000-0000"
            label="Phone Number"
            error={errors.phone?.message}
            icon={<Phone className="h-4 w-4" />}
            {...register("phone")}
          />

          {/* Inquiry Subject */}
          <Input
            placeholder="Inquiry Topic"
            label="Subject"
            error={errors.subject?.message}
            icon={<Bookmark className="h-4 w-4" />}
            {...register("subject")}
          />
        </div>

        {/* Guest Message */}
        <div className="flex flex-col space-y-1.5 w-full">
          <label className="text-xs uppercase tracking-widest text-primary-900 font-medium flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-stone-500" /> Message
          </label>
          <textarea
            placeholder="How can we assist you with your upcoming stay?"
            rows={5}
            className="w-full px-4 py-3 bg-white border border-stone-200 text-stone-800 text-sm font-sans placeholder:text-stone-400 transition-all duration-300 rounded-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30"
            {...register("message")}
          />
          {errors.message && <span className="text-xs text-red-500 mt-0.5 font-medium">{errors.message.message}</span>}
        </div>

        {/* Submit */}
        <Button type="submit" variant="secondary" className="w-full py-4 font-bold" isLoading={isSubmitting}>
          Send Message
        </Button>
      </form>
    </div>
  );
};
