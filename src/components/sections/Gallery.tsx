import React, { useState } from 'react';
import { galleryItems, galleryCategories } from '../../data/gallery';
import { Maximize2, Sparkles } from 'lucide-react';
import { Lightbox } from '../ui/Lightbox';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pearl-100 rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-200">
              <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
              <span>Фотоальбом студии</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight">
              Атмосфера LUMIÈRE
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 max-w-md font-normal">
            Эстетика света, чистые линии и вдохновение в каждой детали пространства и образов наших гостей.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'bg-pearl-50 hover:bg-pearl-100 text-zinc-600 border border-pearl-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Modern Masonry/Grid Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleImageClick(index)}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-pearl-100 cursor-pointer shadow-soft hover:shadow-hover border border-pearl-200 transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="self-end p-2.5 bg-white/90 backdrop-blur-md text-charcoal-900 rounded-full shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50">
                  <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-semibold block mb-0.5">
                    LUMIÈRE GALLERY
                  </span>
                  <h4 className="font-serif text-base text-charcoal-900 font-medium">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        items={filteredItems}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
