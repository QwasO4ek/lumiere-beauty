import React from 'react';
import { ArrowRight, Star, Sparkles, MapPin, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onServicesClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-gradient-to-b from-pearl-50/70 via-white to-white overflow-hidden"
    >
      {/* Background Soft Luminous Glows */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-champagne-200/30 rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-pearl-200/50 rounded-full filter blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center animate-slide-up">
            {/* Top Pill Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-pearl-300 rounded-full text-xs font-medium text-charcoal-900 shadow-soft">
                <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
                <span>Премиальная студия красоты</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-pearl-300 rounded-full text-xs font-medium text-charcoal-900 shadow-soft">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Алматы • Панфилова, 98</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-charcoal-900 leading-[1.08] mb-6">
              Твоя красота.<br />
              <span className="italic font-light text-zinc-600">Твой момент.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl mb-9">
              Профессиональный уход, безупречный стиль и эстетичное пространство, в которое хочется возвращаться. Раскрываем природную красоту без шаблонных решений.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-12">
              <button
                onClick={onBookClick}
                className="group px-8 py-4 bg-charcoal-900 hover:bg-zinc-800 text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-soft hover:shadow-hover active:scale-95"
              >
                <span>Записаться</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={onServicesClick}
                className="px-8 py-4 bg-white hover:bg-pearl-100 text-charcoal-900 border border-pearl-300 text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 flex items-center justify-center shadow-soft"
              >
                Наши услуги
              </button>
            </div>

            {/* Social Proof & Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-pearl-200">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-medium block">
                  500+
                </span>
                <span className="text-xs text-zinc-500 font-normal mt-0.5 block">
                  довольных гостей
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-medium block">
                  8 лет
                </span>
                <span className="text-xs text-zinc-500 font-normal mt-0.5 block">
                  безупречной работы
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-medium block">
                  15
                </span>
                <span className="text-xs text-zinc-500 font-normal mt-0.5 block">
                  топ-мастеров
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Modern Glass Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Clean Image Card */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-pearl-100 shadow-2xl border border-pearl-200">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=90"
                  alt="LUMIÈRE BEAUTY — премиальный салон в Алматы"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-pearl-200 max-w-[210px] animate-fade-in">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-charcoal-900 ml-1">4.98</span>
                </div>
                <p className="text-[11px] text-zinc-600 leading-snug">
                  Рейтинг 2ГИС и Google Maps на основе 380+ отзывов
                </p>
              </div>

              {/* Floating Certified Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-pearl-200 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal-900">
                    100% стерильность
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Медицинский автоклав
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
