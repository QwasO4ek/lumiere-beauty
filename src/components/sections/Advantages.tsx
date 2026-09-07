import React from 'react';
import { Award, Sparkles, UserCheck, Coffee } from 'lucide-react';

export const Advantages: React.FC = () => {
  const advantages = [
    {
      num: '01',
      title: 'Профессиональные мастера',
      description: 'Топ-стилисты и колористы с опытом от 5 лет, регулярно проходящие международные стажировки и сертификации.',
      icon: Award,
    },
    {
      num: '02',
      title: 'Качественная косметика',
      description: 'Работаем исключительно на оригинальных сертифицированных линейках премиум-сегмента: Lebel, Davines, Kérastase, Holy Land.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Индивидуальный подход',
      description: 'Глубокая консультация перед каждой процедурой, анализ цветотипа, состояния волос и кожи для безупречного результата.',
      icon: UserCheck,
    },
    {
      num: '04',
      title: 'Атмосфера комфорта',
      description: 'Просторный тихий зал, ортопедические кресла, свежесваренный кофе, авторский чай и максимальная забота о вашем отдыхе.',
      icon: Coffee,
    },
  ];

  return (
    <section id="advantages" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
              Преимущества
            </span>
            <span className="w-8 h-[1px] bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight">
            Почему выбирают нас
          </h2>
        </div>

        {/* Grid 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv) => {
            const IconComponent = adv.icon;
            return (
              <div
                key={adv.num}
                className="group p-8 bg-cream-50 hover:bg-cream-100 border border-cream-300 hover:border-terracotta-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-3xl font-light text-terracotta-600/80 group-hover:text-terracotta-600 transition-colors">
                      {adv.num}
                    </span>
                    <div className="p-3 bg-white text-charcoal-900 group-hover:bg-terracotta-500 group-hover:text-white transition-colors border border-cream-300">
                      <IconComponent className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-charcoal-900 font-medium mb-3">
                    {adv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-800/70 font-light leading-relaxed">
                    {adv.description}
                  </p>
                </div>

                <div className="w-8 h-[1px] bg-cream-300 group-hover:w-full group-hover:bg-terracotta-500 transition-all duration-500 mt-8" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
