import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/ui/ContactForm";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Honworth",
  description: "Start a conversation with Honworth. Reach out via email, WhatsApp, or schedule a brief introductory call with our team.",
  openGraph: {
    title: "Contact Us | Honworth",
    description: "Start a conversation with Honworth. Reach out via email, WhatsApp, or schedule a brief introductory call with our team.",
    url: "https://honworth.in/contact",
  }
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Section bgColor="ivory" className="border-b border-sage/20 py-12 md:py-16">
          <div className="max-w-4xl">
            <h1 className="font-serif text-4xl md:text-5xl text-deep-green mb-6">Start a Conversation</h1>
            <p className="text-lg text-charcoal/80 leading-relaxed max-w-2xl">
              Whether you are looking to create, protect, or transition your wealth, we are here to listen. Schedule a meeting directly or send us a message below.
            </p>
          </div>
        </Section>

        <Section bgColor="white" className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl text-deep-green mb-6">Schedule a Meeting</h2>
              <p className="text-charcoal/80 mb-8">
                Select a time that works best for you. We typically begin with a brief introductory call to understand your needs.
              </p>
              <CalendlyEmbed />
            </div>

            <div>
               <h2 className="font-serif text-3xl text-deep-green mb-6">Send an Inquiry</h2>
               <p className="text-charcoal/80 mb-8">
                 Prefer to write to us? Fill out the form below and our team will get back to you promptly.
               </p>
               <ContactForm />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
