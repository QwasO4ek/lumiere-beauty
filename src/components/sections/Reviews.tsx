import React, { useState, useEffect } from 'react';
import { reviews } from '../../data/reviews';
import { Star, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

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
    }, 7500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = reviews[currentIndex];

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pearl-100 rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-200">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Опыт гостей</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-base text-zinc-600 font-normal">
            Искренние отзывы девушек, которые выбирают заботу и профессионализм LUMIÈRE
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-pearl-50 rounded-3xl p-8 sm:p-14 border border-pearl-200 shadow-soft relative min-h-[300px] flex flex-col justify-between">
            <div>
              {/* Stars */}
              <div className="flex items-center justify-center space-x-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl sm:text-2xl text-center text-charcoal-900 font-normal leading-relaxed italic mb-8">
                «{current.text}»
              </blockquote>
            </div>

            {/* Author */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-pearl-200">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <h4 className="font-semibold text-sm text-charcoal-900">{current.name}</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-xs text-zinc-500 font-normal">
                  {current.service} • <span className="text-zinc-400">{current.date}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 px-4">
            <button
              onClick={prevReview}
              aria-label="Предыдущий отзыв"
              className="p-3 bg-white hover:bg-pearl-100 text-charcoal-900 rounded-full border border-pearl-300 transition-all shadow-sm"
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
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? 'w-7 h-2 bg-charcoal-900'
                      : 'w-2 h-2 bg-pearl-300 hover:bg-pearl-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              aria-label="Следующий отзыв"
              className="p-3 bg-white hover:bg-pearl-100 text-charcoal-900 rounded-full border border-pearl-300 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
