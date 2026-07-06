import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgColor?: 'ivory' | 'sage' | 'sage-mist' | 'white' | 'deep-green';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "", 
  id, 
  bgColor = "ivory" 
}) => {
  const bgClasses = {
    ivory: "bg-ivory",
    sage: "bg-sage",
    "sage-mist": "bg-sage-mist",
    white: "bg-white",
    "deep-green": "bg-deep-green"
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${bgClasses[bgColor]} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
        {children}
      </div>
    </section>
  );
};
