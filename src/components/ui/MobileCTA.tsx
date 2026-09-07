import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface MobileCTAProps {
  onBookClick: () => void;
}

export const MobileCTA: React.FC<MobileCTAProps> = ({ onBookClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 inset-x-5 z-40 sm:hidden animate-slide-up">
      <button
        onClick={onBookClick}
        className="w-full bg-charcoal-900/95 backdrop-blur-xl text-white py-3.5 px-6 font-semibold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-2xl border border-white/20 active:scale-[0.98] transition-transform"
      >
        <Calendar className="w-4 h-4 text-champagne-400" />
        <span>Записаться онлайн</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
      </button>
    </div>
  );
};
