"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./Button";
import Link from "next/link";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9+\-\s()]{10,15}$/, "Valid phone number required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
  // Honeypot field - must remain empty
  _honey: z.string().max(0, "Invalid submission"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      _honey: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      setStatus("success");
      reset();
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-sage-mist/30 p-8 rounded-sm border-l-4 border-gold w-full max-w-xl mx-auto shadow-sm text-center">
        <h3 className="font-serif text-2xl text-deep-green mb-4">Message Sent</h3>
        <p className="text-charcoal/80 mb-6">
          Thank you for reaching out to Honworth. We have received your message and will get back to you shortly.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-sm border border-sage/20 w-full max-w-xl mx-auto shadow-sm">
      <h3 className="font-serif text-2xl text-deep-green mb-6">Send us a Message</h3>
      
      {status === "error" && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* HONEYPOT - Visually Hidden */}
        <div aria-hidden="true" className="hidden">
          <label>Don't fill this out if you're human: <input type="text" {...register("_honey")} tabIndex={-1} /></label>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Full Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-ivory/50"
            disabled={status === "submitting"}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-ivory/50"
              disabled={status === "submitting"}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Phone Number</label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-ivory/50"
              disabled={status === "submitting"}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Message</label>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-ivory/50 resize-none"
            disabled={status === "submitting"}
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <div className="flex items-start gap-3 mt-2">
          <input
            type="checkbox"
            id="consent"
            {...register("consent")}
            className="mt-1 h-4 w-4 rounded border-sage/40 text-gold focus:ring-gold"
            disabled={status === "submitting"}
          />
          <label htmlFor="consent" className="text-sm text-charcoal/80">
            I agree to the <Link href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link> and consent to being contacted by Honworth.
          </label>
        </div>
        {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

        <Button type="submit" variant="primary" className="mt-4 justify-center" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Submit Message"}
        </Button>
      </form>
    </div>
  );
}
