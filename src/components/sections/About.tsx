import React from 'react';
import { Heart, Sparkles, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photos Composition (Columns 1 to 6) */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Large Main Interior Photo */}
              <div className="col-span-8 aspect-[4/5] overflow-hidden bg-cream-200 shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80"
                  alt="Интерьер салона LUMIÈRE BEAUTY"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Smaller Asymmetric Working Photo */}
              <div className="col-span-4 space-y-4">
                <div className="aspect-[3/4] overflow-hidden bg-cream-200 shadow-luxury">
                  <img
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
                    alt="Мастер салона за работой с клиентом"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 bg-cream-100 border border-cream-300">
                  <p className="font-serif text-2xl text-charcoal-900 font-normal">100%</p>
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-800/70 mt-0.5">
                    Премиальная косметика
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Overlay Card */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-cream-100 p-6 border border-cream-300 shadow-luxury max-w-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-terracotta-500/15 text-terracotta-600 rounded-none">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-charcoal-900 font-semibold">
                    Знак качества
                  </p>
                  <p className="text-[11px] text-charcoal-800/60 mt-0.5">
                    Сертифицированные топ-эксперты
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content (Columns 7 to 12) */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-6">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="w-8 h-[1px] bg-terracotta-500" />
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
                О салоне
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 leading-tight mb-6">
              Больше, чем просто салон
            </h2>

            <p className="text-base sm:text-lg text-charcoal-800/80 font-light leading-relaxed mb-8">
              LUMIÈRE — это пространство, созданное для того, чтобы вы могли остановиться, расслабиться и посвятить время себе. Мы объединяем профессиональный уход, современные техники и атмосферу настоящего комфорта.
            </p>

            {/* Philosophy Box */}
            <div className="bg-cream-50 border-l-4 border-terracotta-500 p-6 sm:p-8 mb-8 relative">
              <div className="flex items-center gap-2 text-terracotta-600 mb-2">
                <Heart className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                  Наша философия
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal italic leading-snug">
                «Мы верим, что красота начинается с заботы о себе.»
              </blockquote>
              <p className="text-sm text-charcoal-800/70 font-light mt-3 leading-relaxed">
                Каждый визит в LUMIÈRE — это не просто процедура, а персональный ритуал восстановления гармонии, уверенности и природного сияния.
              </p>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-terracotta-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm text-charcoal-900">Эстетика и стерильность</h4>
                  <p className="text-xs text-charcoal-800/60 mt-1 leading-relaxed">
                    Тройной цикл дезинфекции и одноразовые наборы для каждого гостя.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-terracotta-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm text-charcoal-900">Атмосфера тишины</h4>
                  <p className="text-xs text-charcoal-800/60 mt-1 leading-relaxed">
                    Комфортное зонирование, мягкий свет и селективная музыка.
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
