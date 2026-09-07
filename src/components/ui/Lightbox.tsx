import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-charcoal-900/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Закрыть галерею"
        className="absolute top-6 right-6 z-10 text-cream-200 hover:text-white bg-charcoal-800/80 p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Предыдущее изображение"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-cream-200 hover:text-white bg-charcoal-800/80 p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Следующее изображение"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-cream-200 hover:text-white bg-charcoal-800/80 p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Image & Caption */}
      <div 
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.image}
          alt={currentItem.alt}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-none shadow-2xl border border-cream-400/20"
        />
        <div className="mt-4 text-center">
          <p className="font-serif text-lg text-cream-100 font-light">{currentItem.title}</p>
          <span className="text-xs tracking-widest uppercase text-terracotta-400 mt-1 block">
            {currentIndex + 1} из {items.length}
          </span>
        </div>
      </div>
    </div>
  );
};
