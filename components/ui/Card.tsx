import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  linkHref, 
  linkLabel = "Learn more", 
  className = "" 
}) => {
  return (
    <div className={`bg-sage-mist/30 border border-sage/20 p-8 md:p-12 flex flex-col items-start gap-4 transition-colors duration-300 hover:bg-sage-mist/60 ${className}`}>
      <h3 className="font-serif text-2xl md:text-3xl text-deep-green font-medium">{title}</h3>
      <p className="text-charcoal leading-relaxed flex-grow text-base">{description}</p>
      {linkHref && (
        <Link 
          href={linkHref} 
          className="text-gold font-medium mt-4 hover:text-gold/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm flex items-center gap-2"
        >
          {linkLabel}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      )}
    </div>
  );
};
