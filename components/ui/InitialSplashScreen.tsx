'use client';

import React, { useEffect, useState } from 'react';
import { BrandPreloader } from './BrandPreloader';

export const InitialSplashScreen: React.FC = () => {
  const [showSplash, setShowSplash] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (!hasSeenSplash) {
      setShowSplash(true);
      // Let the animation run for exactly one full cycle (2.4s) plus a tiny buffer
      const timer = setTimeout(() => {
        setFadingOut(true);
        sessionStorage.setItem('hasSeenSplash', 'true');
        
        // Wait for fade out transition to complete before unmounting
        setTimeout(() => {
          setShowSplash(false);
        }, 500); 
      }, 2400);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!showSplash) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-deep-green transition-opacity duration-500 ease-in-out ${fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      aria-hidden="true"
    >
      <BrandPreloader size={160} />
    </div>
  );
};
