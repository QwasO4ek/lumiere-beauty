import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onServicesClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-cream-100 overflow-hidden"
    >
      {/* Subtle Background Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cream-200/60 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-terracotta-300/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center animate-slide-up">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 mb-6">
              <span className="w-8 h-[1px] bg-terracotta-500" />
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-500 inline" />
                Премиум салон красоты • Алматы
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.12] text-charcoal-900 tracking-tight mb-6">
              Твоя красота.<br />
              <span className="italic font-normal text-terracotta-600 font-serif">Твой момент.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-charcoal-800/80 font-light leading-relaxed max-w-xl mb-10">
              Профессиональный уход, стиль и атмосфера, в которую хочется возвращаться. Раскрываем вашу индивидуальность с безупречным чувством меры.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
              <button
                onClick={onBookClick}
                className="group px-8 py-4 bg-charcoal-900 text-cream-100 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-terracotta-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-luxury hover:shadow-luxury-hover"
              >
                <span>Записаться</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={onServicesClick}
                className="px-8 py-4 bg-transparent hover:bg-white/80 text-charcoal-900 border border-charcoal-900/30 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center"
              >
                Наши услуги
              </button>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-cream-300/80">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-medium block">
                  500+
                </span>
                <span className="text-xs text-charcoal-800/60 font-light mt-1 block">
                  довольных клиентов
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-medium block">
                  8
                </span>
                <span className="text-xs text-charcoal-800/60 font-light mt-1 block">
                  лет работы
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-medium block">
                  15
                </span>
                <span className="text-xs text-charcoal-800/60 font-light mt-1 block">
                  профессиональных мастеров
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 border border-terracotta-500/30 -z-10 translate-x-4 translate-y-4 hidden sm:block" />

              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-cream-200 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
                  alt="Девушка в салоне красоты LUMIÈRE BEAUTY"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent" />
              </div>

              {/* Floating Floating Luxury Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white p-5 shadow-luxury border-l-2 border-terracotta-500 max-w-[240px]">
                <p className="font-serif text-charcoal-900 text-sm font-medium italic">
                  «Красота, в которой ты чувствуешь себя собой»
                </p>
                <span className="text-[10px] tracking-widest uppercase text-terracotta-600 block mt-2 font-semibold">
                  LUMIÈRE PHILOSOPHY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
