import React from 'react';
import { Award, Sparkles, UserCheck, Coffee } from 'lucide-react';

export const Advantages: React.FC = () => {
  const advantages = [
    {
      num: '01',
      title: 'Профессиональные мастера',
      description: 'Топ-стилисты и колористы с опытом от 5 лет, выпускники международных академий Vidal Sassoon и Pivot Point.',
      icon: Award,
    },
    {
      num: '02',
      title: 'Качественная косметика',
      description: 'Работаем исключительно на оригинальных сертифицированных линейках: Lebel, Davines, Kérastase и Holy Land.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Индивидуальный подход',
      description: 'Глубокая диагностика перед процедурой: подбор цветотипа, оценка структуры волос и персональные рекомендации.',
      icon: UserCheck,
    },
    {
      num: '04',
      title: 'Атмосфера комфорта',
      description: 'Просторный светлый зал, ортопедические кресла, селективная музыка, свежесваренный кофе и авторский чай.',
      icon: Coffee,
    },
  ];

  return (
    <section id="advantages" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pearl-100 rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-200">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Наши преимущества</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight">
            Почему выбирают LUMIÈRE
          </h2>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv) => {
            const IconComponent = adv.icon;
            return (
              <div
                key={adv.num}
                className="group p-8 rounded-3xl bg-pearl-50/70 hover:bg-white border border-pearl-200 hover:border-pearl-300 transition-all duration-300 shadow-soft hover:shadow-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-3xl text-zinc-400 group-hover:text-charcoal-900 font-light transition-colors">
                      {adv.num}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white border border-pearl-300 flex items-center justify-center text-charcoal-900 group-hover:bg-charcoal-900 group-hover:text-white transition-colors shadow-sm">
                      <IconComponent className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-charcoal-900 font-medium mb-3">
                    {adv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
                    {adv.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-pearl-200/80">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 group-hover:text-champagne-600 transition-colors">
                    Гарантия результата
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
