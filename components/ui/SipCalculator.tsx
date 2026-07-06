"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./Button";

const sipSchema = z.object({
  monthlyAmount: z.number({ message: "Must be a number" }).min(500, "Minimum ₹500").max(10000000, "Amount too large"),
  expectedReturn: z.number({ message: "Must be a number" }).min(1, "Minimum 1%").max(30, "Maximum 30%"),
  durationYears: z.number({ message: "Must be a number" }).min(1, "Minimum 1 year").max(50, "Maximum 50 years"),
});

type SipFormData = z.infer<typeof sipSchema>;

export function SipCalculator() {
  const [projectedCorpus, setProjectedCorpus] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SipFormData>({
    resolver: zodResolver(sipSchema),
    defaultValues: {
      monthlyAmount: 10000,
      expectedReturn: 12,
      durationYears: 10,
    },
  });

  const onSubmit = (data: SipFormData) => {
    const r = data.expectedReturn / 12 / 100;
    const n = data.durationYears * 12;
    const m = data.monthlyAmount;
    
    // Future value of SIP (Annuity due)
    const corpus = m * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    setProjectedCorpus(corpus);
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
      <h3 className="font-serif text-2xl text-deep-green mb-6 text-center">SIP Calculator</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Monthly Investment (₹)</label>
          <input
            type="number"
            {...register("monthlyAmount", { valueAsNumber: true })}
            className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
          />
          {errors.monthlyAmount && <p className="text-red-500 text-xs mt-1">{errors.monthlyAmount.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Expected Annual Return (%)</label>
          <input
            type="number"
            {...register("expectedReturn", { valueAsNumber: true })}
            className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
          />
          {errors.expectedReturn && <p className="text-red-500 text-xs mt-1">{errors.expectedReturn.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Duration (Years)</label>
          <input
            type="number"
            {...register("durationYears", { valueAsNumber: true })}
            className="w-full border border-sage/40 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-gold bg-white"
          />
          {errors.durationYears && <p className="text-red-500 text-xs mt-1">{errors.durationYears.message}</p>}
        </div>

        <Button type="submit" variant="primary" className="mt-4 w-full justify-center">
          Calculate
        </Button>
      </form>

      {projectedCorpus !== null && (
        <div className="mt-8 text-center bg-white p-6 rounded-sm border-t-4 border-gold shadow-sm">
          <p className="text-sm uppercase tracking-wider text-charcoal/70 mb-2 font-semibold">Projected Corpus</p>
          <p className="text-4xl font-serif text-deep-green mb-4">{formatCurrency(projectedCorpus)}</p>
          <div className="bg-ivory py-2 px-4 rounded-sm">
            <p className="text-sm font-medium text-charcoal flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Illustrative only — not a guarantee of returns.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
