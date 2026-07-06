"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./Button";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  // Honeypot field - must remain empty
  _honey: z.string().max(0, "Invalid submission"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      _honey: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe");
      }

      setStatus("success");
      reset();
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-sage-mist/30 p-6 rounded-sm border border-sage/20 shadow-sm text-center">
        <h4 className="font-serif text-xl text-deep-green mb-2">Subscribed</h4>
        <p className="text-charcoal/80 text-sm">Thank you for subscribing to our insights.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
        {/* HONEYPOT - Visually Hidden */}
        <div aria-hidden="true" className="hidden">
          <input type="text" {...register("_honey")} tabIndex={-1} />
        </div>

        <div className="flex-grow">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full border border-sage/40 rounded-sm px-4 py-3 h-full focus:outline-none focus:ring-2 focus:ring-gold bg-white"
            disabled={status === "submitting"}
          />
        </div>
        
        <Button type="submit" variant="primary" disabled={status === "submitting"} className="whitespace-nowrap h-full py-3">
          {status === "submitting" ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      
      {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
      {status === "error" && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
    </div>
  );
}
