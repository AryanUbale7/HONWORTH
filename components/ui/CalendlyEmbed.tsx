"use client";

import { InlineWidget } from "react-calendly";

export function CalendlyEmbed() {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/honworth";
  
  return (
    <div className="w-full h-[700px] border border-sage/20 rounded-sm overflow-hidden bg-white shadow-sm">
      <InlineWidget 
        url={url} 
        styles={{ height: "100%", width: "100%" }} 
        pageSettings={{
          backgroundColor: 'ffffff',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: 'B8923E', // brand gold
          textColor: '36403B' // brand charcoal
        }}
      />
    </div>
  );
}
