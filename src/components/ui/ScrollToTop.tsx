import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Наверх"
      className="fixed bottom-6 right-6 z-40 bg-white/90 hover:bg-white text-charcoal-900 border border-cream-300 p-3 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-300 rounded-none focus:outline-none hidden sm:flex items-center justify-center"
    >
      <ChevronUp className="w-5 h-5 text-terracotta-600" />
    </button>
  );
};
