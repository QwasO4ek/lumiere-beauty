import React, { useState, useMemo } from 'react';
import { services, serviceCategories } from '../../data/services';
import { Service } from '../../types';
import { formatDuration } from '../../utils/bookingEngine';
import { Check, Clock, Search, Zap, ArrowRight, Scissors } from 'lucide-react';

interface ServicesStepProps {
  selectedServices: Service[];
  onToggleService: (service: Service) => void;
  onNext: () => void;
  onQuickEarliest: () => void;
}

export const ServicesStep: React.FC<ServicesStepProps> = ({
  selectedServices,
  onToggleService,
  onNext,
  onQuickEarliest,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalDurationMinutes = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + (s.durationMinutes || 60), 0);
  }, [selectedServices]);

  const rawTotalPrice = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [selectedServices]);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="p-6 sm:p-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
            Выберите процедуры
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Вы можете выбрать несколько услуг — система автоматически рассчитает точный хронометраж и выделит непрерывное окно
          </p>
        </div>

        <button
          type="button"
          onClick={onQuickEarliest}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 shrink-0"
        >
          <Zap className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Найти ближайшее окно в 1 клик</span>
        </button>
      </div>

      {/* Search Bar & Category Pills */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию услуги (например: стрижка, гель-лак, пилинг)..."
            className="w-full pl-11 pr-4 py-3 bg-pearl-50 text-charcoal-900 text-sm rounded-2xl border border-pearl-300 focus:border-charcoal-900 focus:bg-white transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'bg-pearl-100 text-zinc-600 hover:text-charcoal-900 hover:bg-pearl-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-1">
        {filteredServices.map((service) => {
          const isSelected = selectedServices.some((s) => s.id === service.id);
          return (
            <div
              key={service.id}
              onClick={() => onToggleService(service)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-pearl-100/90 border-charcoal-900 shadow-sm ring-1 ring-charcoal-900/10'
                  : 'bg-white hover:bg-pearl-50/70 border-pearl-200 hover:border-pearl-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-champagne-700 bg-champagne-50 px-2 py-0.5 rounded-md border border-champagne-200/60">
                      {service.categoryLabel}
                    </span>
                    {service.popular && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-900 bg-pearl-200 px-2 py-0.5 rounded-md">
                        Хит
                      </span>
                    )}
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-charcoal-900 text-white'
                        : 'border border-zinc-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <h4 className="font-serif text-lg text-charcoal-900 font-normal leading-snug mb-1">
                  {service.name}
                </h4>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-pearl-200 text-xs">
                <span className="font-semibold text-charcoal-900 text-sm">
                  {service.formattedPrice}
                </span>
                <span className="inline-flex items-center gap-1 text-zinc-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  {formatDuration(service.durationMinutes || 60)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Cart Action Bar */}
      <div className="p-4 sm:p-5 bg-pearl-100/90 rounded-2xl border border-pearl-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-charcoal-900 text-white flex items-center justify-center shadow-sm">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Выбрано: {selectedServices.length} {selectedServices.length === 1 ? 'процедура' : 'процедур'}
            </div>
            <div className="text-base sm:text-lg font-bold text-charcoal-900 flex items-center gap-2">
              <span>{rawTotalPrice.toLocaleString('ru-RU')} ₸</span>
              {totalDurationMinutes > 0 && (
                <span className="text-xs font-normal text-zinc-500">
                  • {formatDuration(totalDurationMinutes)}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={selectedServices.length === 0}
          onClick={onNext}
          className="w-full sm:w-auto px-7 py-3.5 bg-charcoal-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-hover active:scale-95"
        >
          <span>Выбрать мастера</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};