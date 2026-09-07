import React, { useState } from 'react';
import { services, serviceCategories } from '../../data/services';
import { Service } from '../../types';
import { Clock, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isFullPriceOpen, setIsFullPriceOpen] = useState(false);

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 sm:py-32 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
              Услуги
            </span>
            <span className="w-8 h-[1px] bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Всё необходимое для твоей красоты — в одном месте
          </h2>
          <p className="text-base text-charcoal-800/70 font-light">
            Каждая услуга создана с вниманием к деталям, здоровью и премиальному уровню комфорта.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-charcoal-800/80 border border-cream-300/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white p-7 sm:p-8 border border-cream-300 hover:border-terracotta-400/60 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative"
            >
              {service.popular && (
                <span className="absolute -top-3 right-6 bg-terracotta-500 text-white text-[10px] tracking-widest uppercase font-semibold px-3 py-1 flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5" />
                  Популярное
                </span>
              )}

              <div>
                <span className="text-[11px] uppercase tracking-wider text-terracotta-600 font-semibold block mb-2">
                  {service.categoryLabel}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal group-hover:text-terracotta-600 transition-colors mb-3">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-800/70 font-light leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between pt-5 border-t border-cream-200 mb-6">
                  <div className="flex items-center text-xs text-charcoal-800/60 gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>{service.duration}</span>
                  </div>
                  <span className="font-serif text-lg font-medium text-charcoal-900">
                    {service.formattedPrice}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-3 bg-cream-50 hover:bg-charcoal-900 text-charcoal-900 hover:text-white border border-cream-300 hover:border-charcoal-900 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-charcoal-900 group-hover:text-white"
                >
                  <span>Записаться</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Price List Button */}
        <div className="text-center">
          <button
            onClick={() => setIsFullPriceOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-white text-charcoal-900 border border-charcoal-900 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm"
          >
            <span>Смотреть весь прайс-лист</span>
            <ChevronRight className="w-4 h-4 text-terracotta-500" />
          </button>
        </div>
      </div>

      {/* Full Price List Modal */}
      <Modal
        isOpen={isFullPriceOpen}
        onClose={() => setIsFullPriceOpen(false)}
        title="Полный прайс-лист LUMIÈRE BEAUTY"
        maxWidth="4xl"
      >
        <div className="space-y-8">
          <p className="text-sm text-charcoal-800/70 font-light">
            Все цены указаны в тенге (₸). Финальная стоимость сложных процедур может варьироваться в зависимости от длины и густоты волос или индивидуальных особенностей.
          </p>

          <div className="divide-y divide-cream-300">
            {services.map((service: Service) => (
              <div key={service.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/60 px-2 transition-colors">
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-terracotta-600 font-medium">
                      [{service.categoryLabel}]
                    </span>
                    <h4 className="font-serif text-base text-charcoal-900 font-medium">{service.name}</h4>
                  </div>
                  <p className="text-xs text-charcoal-800/60 font-light mt-0.5">{service.description}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 flex-shrink-0">
                  <span className="text-xs text-charcoal-800/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {service.duration}
                  </span>
                  <span className="font-serif font-medium text-charcoal-900 text-base min-w-[90px] text-right">
                    {service.formattedPrice}
                  </span>
                  <button
                    onClick={() => {
                      setIsFullPriceOpen(false);
                      onSelectService(service.id);
                    }}
                    className="px-4 py-1.5 bg-charcoal-900 hover:bg-terracotta-600 text-white text-[11px] uppercase tracking-wider font-semibold transition-colors"
                  >
                    Запись
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </section>
  );
};
