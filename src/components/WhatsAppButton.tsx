import React, { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  // Periodic wiggle to attract attention
  const [wiggle, setWiggle] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 1500);
    }, 10000); // Wiggle every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.open('https://api.whatsapp.com/send?phone=5511977655148&text=Suporte%20Online', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="whatsapp-widget-container">
      {/* Custom Styles for Pulse/Ripple and Wiggle animations */}
      <style>{`
        @keyframes custom-ripple {
          0% {
            transform: scale(0.95);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.35;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        @keyframes custom-wiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          15% { transform: rotate(-12deg) scale(1.05); }
          30% { transform: rotate(14deg) scale(1.05); }
          45% { transform: rotate(-10deg) scale(1.05); }
          60% { transform: rotate(10deg) scale(1.02); }
          75% { transform: rotate(-4deg) scale(1); }
        }
        .animate-custom-ripple {
          animation: custom-ripple 2.5s infinite ease-out;
        }
        .animate-custom-wiggle {
          animation: custom-wiggle 1.2s ease-in-out;
        }
      `}</style>

      {/* Floating Action Button */}
      <button
        onClick={handleClick}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-600 transition-all cursor-pointer ${
          wiggle ? 'animate-custom-wiggle' : 'hover:scale-110 active:scale-95'
        }`}
        title="Suporte Online WhatsApp"
        id="whatsapp-floating-btn"
      >
        {/* Pulsing Ripple circles background */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-custom-ripple" />
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-custom-ripple" style={{ animationDelay: '1s' }} />

        {/* WhatsApp Custom styled Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="h-9 w-9 relative z-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.01 14.12 1.01 11.5 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.637.452 3.23 1.309 4.633L1.925 21.8l6.452-1.68c.31.08.31.08-.01.08zM17.51 14.39c-.3-.149-1.762-.87-2.034-.97-.27-.1-.47-.149-.669.149-.2.3-.764.96-.938 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.785-1.48-1.76-1.65-2.059-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.59-.49-.51-.67-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.29-.2-.59-.35z"/>
        </svg>

        {/* Pulsing Alert Notification Badge (Bounce effect) */}
        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center border border-white animate-bounce">
          1
        </span>
      </button>
    </div>
  );
}
