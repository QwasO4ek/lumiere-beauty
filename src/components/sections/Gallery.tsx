import React, { useState } from 'react';
import { galleryItems, galleryCategories } from '../../data/gallery';
import { Maximize2 } from 'lucide-react';
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
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
              Галерея
            </span>
            <span className="w-8 h-[1px] bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Атмосфера LUMIÈRE
          </h2>
          <p className="text-base text-charcoal-800/70 font-light">
            Пространство эстетики, премиальных текстур и вдохновения в каждом кадре
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-charcoal-900 text-white'
                  : 'bg-cream-100 hover:bg-cream-200 text-charcoal-800/80 border border-cream-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleImageClick(index)}
              className="group relative aspect-[4/5] overflow-hidden bg-cream-200 cursor-pointer shadow-luxury hover:shadow-luxury-hover border border-cream-300 transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="self-end p-2.5 bg-white/90 text-charcoal-900 rounded-none shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-terracotta-300 font-semibold block mb-1">
                    LUMIÈRE GALLERY
                  </span>
                  <h4 className="font-serif text-lg text-white font-light">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
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
