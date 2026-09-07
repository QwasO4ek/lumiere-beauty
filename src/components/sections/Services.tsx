import React, { useState } from 'react';
import { services, serviceCategories } from '../../data/services';
import { Service } from '../../types';
import { Clock, Check, Sparkles, ChevronRight, Calculator, Plus } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isFullPriceOpen, setIsFullPriceOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  const toggleServiceInCalculator = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatedTotal = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((acc, curr) => acc + curr.price, 0);

  return (
    <section id="services" className="py-24 sm:py-32 bg-pearl-50 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-300">
              <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
              <span>Меню услуг</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight">
              Всё необходимое для твоей красоты
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 max-w-md font-normal">
            Используем только оригинальную косметику премиальных линеек. Выберите процедуры по отдельности или рассчитайте комплекс в калькуляторе.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'bg-white hover:bg-pearl-100 text-zinc-600 border border-pearl-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((service) => {
            const isSelected = selectedServices.includes(service.id);

            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between shadow-soft hover:shadow-hover hover:-translate-y-1 relative ${
                  isSelected ? 'border-charcoal-900 ring-1 ring-charcoal-900' : 'border-pearl-300 hover:border-zinc-400'
                }`}
              >
                {service.popular && (
                  <span className="absolute top-6 right-6 bg-pearl-100 border border-pearl-300 text-charcoal-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-champagne-600" />
                    Топ выбор
                  </span>
                )}

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                    {service.categoryLabel}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal mb-3 pr-16">
                    {service.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between py-4 border-t border-pearl-200 mb-4">
                    <div className="flex items-center text-xs text-zinc-500 gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{service.duration}</span>
                    </div>
                    <span className="font-serif text-xl font-medium text-charcoal-900">
                      {service.formattedPrice}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => toggleServiceInCalculator(service.id)}
                      className={`py-2.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-pearl-50 hover:bg-pearl-100 text-charcoal-900 border-pearl-300'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>В расчете</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-zinc-400" />
                          <span>В расчет</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSelectService(service.id)}
                      className="py-2.5 px-3 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Записаться</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating / Sticky Visit Calculator Bar if any service selected */}
        {selectedServices.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-900 shadow-xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-charcoal-900 text-white flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Калькулятор визита
                </p>
                <h4 className="font-serif text-xl text-charcoal-900 font-medium">
                  Выбрано услуг: {selectedServices.length} на сумму от {calculatedTotal.toLocaleString('ru-RU')} ₸
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setSelectedServices([])}
                className="px-4 py-3 text-xs text-zinc-500 hover:text-charcoal-900 font-medium"
              >
                Сбросить
              </button>
              <button
                onClick={() => onSelectService(selectedServices[0])}
                className="flex-1 sm:flex-initial px-6 py-3 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Оформить визит
              </button>
            </div>
          </div>
        )}

        {/* View Full Price List Action */}
        <div className="text-center">
          <button
            onClick={() => setIsFullPriceOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-pearl-100 text-charcoal-900 border border-pearl-300 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
          >
            <span>Смотреть весь прайс-лист</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Full Price Modal */}
      <Modal
        isOpen={isFullPriceOpen}
        onClose={() => setIsFullPriceOpen(false)}
        title="Полный прайс-лист LUMIÈRE BEAUTY"
        maxWidth="3xl"
      >
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-zinc-500 font-normal">
            Все цены указаны в тенге (₸). Финальная стоимость сложных процедур может корректироваться мастером на консультации в зависимости от расхода красителя и длины волос.
          </p>

          <div className="divide-y divide-pearl-200">
            {services.map((service: Service) => (
              <div key={service.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-pearl-50 px-3 rounded-xl transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      [{service.categoryLabel}]
                    </span>
                    <h4 className="font-serif text-base text-charcoal-900 font-medium">{service.name}</h4>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{service.description}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-5 flex-shrink-0">
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {service.duration}
                  </span>
                  <span className="font-serif font-medium text-charcoal-900 text-base min-w-[85px] text-right">
                    {service.formattedPrice}
                  </span>
                  <button
                    onClick={() => {
                      setIsFullPriceOpen(false);
                      onSelectService(service.id);
                    }}
                    className="px-4 py-1.5 bg-charcoal-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition-colors"
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
