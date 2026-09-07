import React from 'react';
import { Heart, Sparkles, Feather, Coffee } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Intro */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pearl-100 rounded-full text-xs font-semibold text-charcoal-900 mb-4 border border-pearl-200">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Концепция LUMIÈRE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Больше, чем просто салон
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            LUMIÈRE — это пространство, созданное для того, чтобы вы могли остановиться, расслабиться и посвятить время себе. Мы объединяем профессиональный уход, современные техники и атмосферу настоящего комфорта.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: Philosophy (Span 7) */}
          <div className="lg:col-span-7 bg-pearl-50 rounded-3xl p-8 sm:p-12 border border-pearl-200 flex flex-col justify-between relative overflow-hidden shadow-soft">
            <div className="max-w-xl relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-white border border-pearl-300 flex items-center justify-center text-champagne-600 mb-6 shadow-sm">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-2">
                Наша философия
              </span>
              <blockquote className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal leading-snug mb-4">
                «Мы верим, что красота начинается с заботы о себе.»
              </blockquote>
              <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                Мы не навязываем шаблонные стандарты. Задача нашей команды — подчеркнуть вашу индивидуальность, подарив волосам, коже и образу здоровое природное сияние.
              </p>
            </div>

            <div className="pt-8 border-t border-pearl-200/80 mt-8 flex flex-wrap items-center gap-6 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-champagne-600" /> Бережные органические составы
              </span>
              <span className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-champagne-600" /> Меню авторских напитков
              </span>
            </div>
          </div>

          {/* Bento Card 2: Image 1 - Interior (Span 5) */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-pearl-100 border border-pearl-200 aspect-[4/3] lg:aspect-auto relative shadow-soft group">
            <img
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=85"
              alt="Светлый интерьер салона LUMIÈRE"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-sm font-medium">
                Просторные рабочие зоны с мягким естественным освещением
              </p>
            </div>
          </div>

          {/* Bento Card 3: Image 2 - Master at Work (Span 5) */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-pearl-100 border border-pearl-200 aspect-[4/3] lg:aspect-auto relative shadow-soft group">
            <img
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85"
              alt="Мастер за работой"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-sm font-medium">
                Индивидуальная консультация и диагностика перед каждой услугой
              </p>
            </div>
          </div>

          {/* Bento Card 4: Quality Standard (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-pearl-300 shadow-soft flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-serif text-xl text-charcoal-900 font-medium mb-2">
                  Селективная косметика
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Используем мировые бренды первого эшелона: Lebel (Япония), Davines (Италия), Kérastase (Франция) и Holy Land (Израиль).
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl text-charcoal-900 font-medium mb-2">
                  Эстетика времени
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Возможность параллельных услуг в 4 руки: маникюр + педикюр или окрашивание + оформление бровей без потери качества.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-pearl-200 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                LUMIÈRE BEAUTY STANDARDS
              </span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Сертифицированные специалисты
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
