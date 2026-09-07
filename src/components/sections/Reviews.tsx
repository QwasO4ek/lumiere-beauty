import React, { useState, useEffect } from 'react';
import { reviews } from '../../data/reviews';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = reviews[currentIndex];

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative quotes in background */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-cream-200 pointer-events-none opacity-40">
        <Quote className="w-48 h-48" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
              Отзывы
            </span>
            <span className="w-8 h-[1px] bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-base text-charcoal-800/70 font-light">
            Искренние впечатления тех, кто уже доверил нам свою красоту
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-cream-50 p-8 sm:p-14 border border-cream-300 shadow-luxury relative min-h-[300px] flex flex-col justify-between">
            {/* Stars */}
            <div>
              <div className="flex items-center justify-center space-x-1.5 mb-8">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-terracotta-500 fill-terracotta-500" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="font-serif text-xl sm:text-2xl text-center text-charcoal-900 font-normal leading-relaxed italic mb-8">
                «{current.text}»
              </blockquote>
            </div>

            {/* Author details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-cream-200">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="text-center sm:text-left">
                <h4 className="font-medium text-sm text-charcoal-900">{current.name}</h4>
                <p className="text-xs text-charcoal-800/60 font-light">
                  {current.service} • <span className="text-terracotta-600">{current.date}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Controls: Arrows and Dots */}
          <div className="flex items-center justify-between mt-8 px-4">
            <button
              onClick={prevReview}
              aria-label="Предыдущий отзыв"
              className="p-3 bg-white hover:bg-charcoal-900 text-charcoal-900 hover:text-white border border-cream-300 transition-all duration-300 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center space-x-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Перейти к отзыву ${idx + 1}`}
                  className={`transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-8 h-1.5 bg-terracotta-500'
                      : 'w-2 h-1.5 bg-cream-300 hover:bg-cream-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              aria-label="Следующий отзыв"
              className="p-3 bg-white hover:bg-charcoal-900 text-charcoal-900 hover:text-white border border-cream-300 transition-all duration-300 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
