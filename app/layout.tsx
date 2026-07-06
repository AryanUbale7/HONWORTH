import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { InitialSplashScreen } from "@/components/ui/InitialSplashScreen";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://honworth.in'),
  title: "Honworth | Your wealth, honoured for generations.",
  description: "A calm, structured approach to managing your family's assets, aspirations, and legacy.",
  openGraph: {
    title: "Honworth",
    description: "Your wealth, honoured for generations. A calm, structured approach to managing your family's assets.",
    url: "https://honworth.in",
    siteName: "Honworth",
    images: [
      {
        url: "/icon.png", // Next.js automatically resolves this against metadataBase
        width: 800,
        height: 800,
        alt: "Honworth Logo Emblem",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Honworth",
    description: "Your wealth, honoured for generations.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-ivory text-charcoal">
        <InitialSplashScreen />
        {children}
      </body>
    </html>
  );
}
