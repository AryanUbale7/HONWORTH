export interface PageBlock {
  heading: string;
  text: string;
}

export interface PageContent {
  title: string;
  headline: string;
  description: string;
  disclaimer?: string;
  blocks?: PageBlock[];
}

export const homeContent = {
  hero: {
    headline: "Your wealth, honoured for generations.",
    subheading: "A calm, structured approach to managing your family's assets and aspirations. We act as stewards for those who value steady, long-term growth.",
    cta: "Start a conversation"
  },
  services: [
    {
      title: "Wealth Creation",
      description: "Long-term goal-based investing philosophy for steady, disciplined growth.",
      link: "/wealth-creation"
    },
    {
      title: "Wealth Protection",
      description: "Term-first protection philosophy to safeguard what matters most.",
      link: "/wealth-protection"
    },
    {
      title: "Wealth Legacy",
      description: "Succession and estate facilitation for a seamless generational transition.",
      link: "/wealth-legacy"
    }
  ]
};

export const aboutContent: PageContent = {
  title: "About Honworth",
  headline: "From IT Leadership to Wealth Stewardship",
  description: "After 26 years in the IT industry, Honworth was founded on a simple philosophy: wealth should be managed with both honour and a deep understanding of its true worth.",
  blocks: [
    {
      heading: "The Meaning of Honworth",
      text: "Our name stems from two core pillars: Honour and Worth. We believe that wealth is more than just numbers—it is the worth of your life's work, which must be honoured with integrity and calm discipline."
    },
    {
      heading: "Our Philosophy",
      text: "We act as stewards of your wealth, bringing the same rigorous, structured approach from the technology sector to personal finance."
    },
    {
      heading: "Credentials",
      text: "[NISM Placeholder] · [ARN Placeholder] · [IRDAI Placeholder]"
    }
  ]
};

export const wealthCreationContent: PageContent = {
  title: "Wealth Creation",
  headline: "Long-Term Goal-Based Investing",
  description: "Our philosophy is rooted in long-term, goal-based investing. We focus on steady, disciplined asset allocation rather than chasing short-term market trends.",
  disclaimer: "Mutual fund investments are subject to market risks; read all scheme-related documents carefully.",
  blocks: [
    {
      heading: "Our Approach to Growth",
      text: "We believe in a structured approach to wealth creation. By mapping investments to specific life goals, we remove the noise and anxiety often associated with the markets."
    },
    {
      heading: "Our Offerings",
      text: "Honworth distributes mutual funds tailored to your financial objectives. Additionally, Portfolio Management Services (PMS) and Strategic Investment Funds (SIF) are available to eligible investors only."
    }
  ]
};

export const wealthProtectionContent: PageContent = {
  title: "Wealth Protection",
  headline: "Term-First Protection Philosophy",
  description: "We believe that insurance is strictly for protection, not investment. Our term-first philosophy ensures that your family and assets are safeguarded against unforeseen circumstances.",
  disclaimer: "Insurance is the subject matter of solicitation.",
  blocks: [
    {
      heading: "Empanelled Partners",
      text: "We are proudly empanelled with Bajaj Life and TATA AIA [CONFIRM] to provide robust, reliable protection solutions for our clients."
    }
  ]
};

export const wealthLegacyContent: PageContent = {
  title: "Wealth Legacy",
  headline: "Succession and Estate Facilitation",
  description: "A comprehensive wealth strategy isn't complete without a plan for the future. We facilitate succession and estate planning, including Wills, nominations, and private trusts.",
  disclaimer: "Succession services involve facilitation and coordination; Honworth is not a law firm and does not provide legal advice.",
  blocks: [
    {
      heading: "Collaborative Approach",
      text: "We work alongside trusted legal professionals to ensure your legacy is structured properly and transitions seamlessly to the next generation. We coordinate the process so you have peace of mind."
    }
  ]
};

export const approachContent: PageContent = {
  title: "Our Approach",
  headline: "A Structured Process",
  description: "We believe in a methodical, calm approach to wealth management that prioritizes understanding you before offering any solutions.",
  blocks: [
    {
      heading: "1. Listen",
      text: "We start by simply listening. Understanding your family's unique dynamics, values, and concerns is the absolute foundation of our work."
    },
    {
      heading: "2. Understand the Family",
      text: "We take the time to grasp the full picture of your family's aspirations and current financial standing."
    },
    {
      heading: "3. Suitability-Based Solutions",
      text: "We propose solutions that are strictly suitable for your specific goals and risk appetite, never pushing unnecessary products."
    },
    {
      heading: "4. Ongoing Service",
      text: "Wealth management is a continuous journey. We provide ongoing support and structured reviews to keep you on track as your life evolves."
    },
    {
      heading: "Transparency Note",
      text: "Please note that Honworth acts as a distributor of financial products, not a fee-only adviser."
    }
  ]
};

export const disclaimerContent: PageContent = {
  title: "Disclaimer",
  headline: "Legal Disclaimer",
  description: "Important legal and regulatory information regarding Honworth's services.",
  blocks: [
    {
      heading: "General Disclaimer",
      text: "[FINAL DISCLAIMER TEXT TO BE INSERTED — DO NOT PUBLISH WITHOUT COMPLIANCE REVIEW]"
    }
  ]
};

export const privacyPolicyContent: PageContent = {
  title: "Privacy Policy",
  headline: "Privacy Policy",
  description: "How we collect, use, and protect your personal data.",
  blocks: [
    {
      heading: "Data We Collect",
      text: "[FINAL PRIVACY POLICY TEXT TO BE INSERTED — DO NOT PUBLISH WITHOUT COMPLIANCE REVIEW]"
    },
    {
      heading: "How We Use It",
      text: "[FINAL PRIVACY POLICY TEXT TO BE INSERTED — DO NOT PUBLISH WITHOUT COMPLIANCE REVIEW]"
    },
    {
      heading: "Your Rights",
      text: "[FINAL PRIVACY POLICY TEXT TO BE INSERTED — DO NOT PUBLISH WITHOUT COMPLIANCE REVIEW]"
    },
    {
      heading: "Contact for Privacy Queries",
      text: "[FINAL PRIVACY POLICY TEXT TO BE INSERTED — DO NOT PUBLISH WITHOUT COMPLIANCE REVIEW]"
    }
  ]
};

export const disclosuresContent: PageContent = {
  title: "Disclosures",
  headline: "Regulatory Disclosures",
  description: "Mandatory disclosures regarding our role as a distributor, conflicts of interest, and grievance redressal mechanisms.",
  blocks: [
    {
      heading: "Role as a Distributor",
      text: "[FINAL DISCLOSURES TEXT TO BE INSERTED — DO NOT PUBLISH WITHOUT COMPLIANCE REVIEW]"
    },
    {
      heading: "Conflict of Interest",
      text: "[FINAL DISCLOSURES TEXT TO BE INSERTED — DO NOT PUBLISH WITHOUT COMPLIANCE REVIEW]"
    },
    {
      heading: "Grievance Redressal (AMFI / SEBI SCORES / Insurer)",
      text: "[FINAL DISCLOSURES TEXT TO BE INSERTED — DO NOT PUBLISH WITHOUT COMPLIANCE REVIEW]"
    }
  ]
};
