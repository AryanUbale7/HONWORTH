import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', children, ...props }, ref) => {
    // Soft/calm styling: transition-colors with long duration (300ms) and no scaling animations.
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm";
    
    const variants = {
      primary: "bg-deep-green text-ivory hover:bg-deep-green/90 border border-transparent",
      secondary: "bg-transparent border border-deep-green text-deep-green hover:bg-deep-green/10"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
