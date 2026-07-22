import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import UnifiedContactModal from './UnifiedContactModal';

export default function PhoneSupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [wiggle, setWiggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 1500);
    }, 10000); // Wiggle every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="phone-widget-container">
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

      {/* Floating Action Button (Red corporate design) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl hover:bg-red-700 transition-all cursor-pointer border-none outline-none ${
          wiggle ? 'animate-custom-wiggle' : 'hover:scale-110 active:scale-95'
        }`}
        title="Atendimento e Solicitação de 2ª Via"
        id="phone-floating-btn"
      >
        {/* Pulsing Ripple circles background */}
        <span className="absolute inset-0 rounded-full bg-red-600/40 animate-custom-ripple" />
        <span className="absolute inset-0 rounded-full bg-red-600/20 animate-custom-ripple" style={{ animationDelay: '1s' }} />

        {/* Support Mail Icon */}
        <Mail className="h-8 w-8 relative z-10" />

        {/* Pulsing Alert Notification Badge */}
        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center justify-center border border-white animate-bounce">
          1
        </span>
      </button>

      {/* Unified Modal Form */}
      <UnifiedContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultAssunto="2ª Via de Boleto"
      />
    </div>
  );
}
