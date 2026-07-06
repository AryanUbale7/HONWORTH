"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Wealth Creation', href: '/wealth-creation' },
  { label: 'Wealth Protection', href: '/wealth-protection' },
  { label: 'Wealth Legacy', href: '/wealth-legacy' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/95 backdrop-blur-sm border-b border-sage/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between h-24">
        <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
          <Image 
            src="/logo/honworthlogo.png" 
            alt="Honworth Logo" 
            width={240} 
            height={80} 
            className="object-contain h-16 md:h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="text-sm tracking-wide text-charcoal hover:text-gold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden p-2 text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm transition-colors hover:text-gold"
          onClick={toggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="xl:hidden bg-ivory border-b border-sage/20 px-6 py-6" aria-label="Mobile Navigation">
          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block text-xl font-serif text-charcoal hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
