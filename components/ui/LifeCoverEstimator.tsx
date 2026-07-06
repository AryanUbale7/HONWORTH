"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./Button";

const lifeCoverSchema = z.object({
  annualIncome: z.number({ message: "Must be a number" }).min(100000, "Minimum ₹1,00,000"),
  existingCover: z.number({ message: "Must be a number" }).min(0, "Cannot be negative"),
});

type LifeCoverFormData = z.infer<typeof lifeCoverSchema>;

export function LifeCoverEstimator() {
  const [estimatedCover, setEstimatedCover] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LifeCoverFormData>({
    resolver: zodResolver(lifeCoverSchema),
    defaultValues: {
      annualIncome: 1500000,
      existingCover: 0,
    },
  });

  const onSubmit = (data: LifeCoverFormData) => {
    // Simplified HLV (Human Life Value): 15x Annual Income - Existing Cover
    const requiredCover = (data.annualIncome * 15) - data.existingCover;
    setEstimatedCover(Math.max(requiredCover, 0));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-sage-mist/30 p-8 rounded-sm border border-sage/20 w-full max-w-xl mx-auto shadow-sm">
      <h3 className="font-serif text-2xl text-deep-green mb-6 text-center">Life Cover Estimator</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Annual Income (₹)</label>
          <input
            type="number"
            {...register("annualIncome", { valueAsNumber: true })}
            className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
          />
          {errors.annualIncome && <p className="text-red-500 text-xs mt-1">{errors.annualIncome.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Existing Life Cover (₹)</label>
          <input
            type="number"
            {...register("existingCover", { valueAsNumber: true })}
            className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
          />
          {errors.existingCover && <p className="text-red-500 text-xs mt-1">{errors.existingCover.message}</p>}
        </div>

        <Button type="submit" variant="primary" className="mt-4 w-full justify-center">
          Estimate Requirement
        </Button>
      </form>

      {estimatedCover !== null && (
        <div className="mt-8 text-center bg-white p-6 rounded-sm border-t-4 border-gold shadow-sm">
          <p className="text-sm uppercase tracking-wider text-charcoal/70 mb-2 font-semibold">Estimated Cover Needed</p>
          <p className="text-4xl font-serif text-deep-green mb-4">{formatCurrency(estimatedCover)}</p>
          <div className="bg-ivory py-2 px-4 rounded-sm">
            <p className="text-sm font-medium text-charcoal flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Illustrative only — based on a simplified multiple of income.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
