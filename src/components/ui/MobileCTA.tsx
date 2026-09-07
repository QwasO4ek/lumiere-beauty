import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface MobileCTAProps {
  onBookClick: () => void;
}

export const MobileCTA: React.FC<MobileCTAProps> = ({ onBookClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero
      if (window.scrollY > 350) {
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
    <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden animate-slide-up">
      <button
        onClick={onBookClick}
        className="w-full bg-charcoal-900 text-cream-100 py-3.5 px-6 font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl border border-terracotta-500/30 active:scale-[0.98] transition-transform"
      >
        <Calendar className="w-4 h-4 text-terracotta-400" />
        <span>Записаться онлайн</span>
      </button>
    </div>
  );
};
