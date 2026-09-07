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
      className="fixed inset-0 z-50 bg-charcoal-900/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Закрыть просмотр"
        className="absolute top-6 right-6 z-10 text-white bg-white/10 hover:bg-white/25 p-3 rounded-full transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Предыдущий кадр"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/25 p-3 sm:p-4 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Следующий кадр"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/25 p-3 sm:p-4 rounded-full transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Media & Details */}
      <div 
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.image}
          alt={currentItem.alt}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
        />
        <div className="mt-4 text-center">
          <p className="font-serif text-lg text-white font-normal">{currentItem.title}</p>
          <span className="text-xs text-zinc-400 mt-0.5 block">
            {currentIndex + 1} из {items.length}
          </span>
        </div>
      </div>
    </div>
  );
};
