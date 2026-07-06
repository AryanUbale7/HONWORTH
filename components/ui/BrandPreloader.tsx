import React from 'react';

export const BrandPreloader: React.FC<{ size?: number }> = ({ size = 160 }) => {
  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ width: size, height: size }}
      aria-label="Loading..."
      role="status"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drawIn {
          0% {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          40% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          70% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          85% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
        }
        
        .ring-anim {
          fill: none;
          stroke: #B8923E; /* Gold */
          stroke-linecap: round;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          opacity: 0;
        }

        @media (prefers-reduced-motion: no-preference) {
          .ring-anim {
            animation: drawIn 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          }
          .ring-1 { animation-delay: 0.0s; }
          .ring-2 { animation-delay: 0.15s; }
          .ring-3 { animation-delay: 0.30s; }
          .ring-4 { animation-delay: 0.45s; }
          .ring-5 { animation-delay: 0.60s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring-anim {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
      `}} />
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="transform -rotate-90"
      >
        {/* Ring 1 (Outermost) */}
        <circle cx="100" cy="100" r="90" strokeWidth="4" className="ring-anim ring-1" />
        {/* Ring 2 */}
        <circle cx="100" cy="100" r="70" strokeWidth="4.5" className="ring-anim ring-2" />
        {/* Ring 3 */}
        <circle cx="100" cy="100" r="50" strokeWidth="5" className="ring-anim ring-3" />
        {/* Ring 4 */}
        <circle cx="100" cy="100" r="30" strokeWidth="6" className="ring-anim ring-4" />
        {/* Ring 5 (Innermost) */}
        <circle cx="100" cy="100" r="10" strokeWidth="8" className="ring-anim ring-5" />
      </svg>
    </div>
  );
};
