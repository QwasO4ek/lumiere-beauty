import React from 'react';
import { masters } from '../../data/masters';
import { Sparkles, Zap, Check, Star, ChevronLeft, ArrowRight } from 'lucide-react';

interface MasterStepProps {
  selectedMasterId: string;
  onSelectMaster: (masterId: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const MasterStep: React.FC<MasterStepProps> = ({
  selectedMasterId,
  onSelectMaster,
  onBack,
  onNext,
}) => {
  return (
    <div className="p-6 sm:p-10 space-y-8 animate-fade-in">
      <div>
        <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
          Выберите специалиста
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Выберите конкретного мастера или воспользуйтесь автоматическим подбором свободного окна
        </p>
      </div>

      {/* Any Master Smart Option */}
      <div
        onClick={() => onSelectMaster('any')}
        className={`p-6 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
          selectedMasterId === 'any'
            ? 'bg-pearl-100/90 border-charcoal-900 shadow-sm ring-1 ring-charcoal-900/10'
            : 'bg-white hover:bg-pearl-50 border-pearl-200'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-charcoal-900 text-champagne-400 flex items-center justify-center shadow-sm shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1">
              <Zap className="w-3 h-3 text-emerald-600" />
              <span>Автоподбор окон</span>
            </div>
            <h4 className="font-serif text-lg text-charcoal-900 font-normal">
              Любой свободный мастер
            </h4>
            <p className="text-xs text-zinc-500">
              Покажет максимум свободных окон на выбранные даты
            </p>
          </div>
        </div>

        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
            selectedMasterId === 'any'
              ? 'bg-charcoal-900 text-white'
              : 'border border-zinc-300 bg-white'
          }`}
        >
          {selectedMasterId === 'any' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>

      {/* Individual Masters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {masters.map((master) => {
          const isSelected = selectedMasterId === master.id;
          return (
            <div
              key={master.id}
              onClick={() => onSelectMaster(master.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                isSelected
                  ? 'bg-pearl-100/90 border-charcoal-900 shadow-sm ring-1 ring-charcoal-900/10'
                  : 'bg-white hover:bg-pearl-50 border-pearl-200'
              }`}
            >
              <img
                src={master.image}
                alt={master.name}
                className="w-16 h-16 rounded-2xl object-cover border border-pearl-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="font-serif text-base text-charcoal-900 font-normal truncate">
                    {master.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs font-semibold text-charcoal-900 shrink-0">
                    <Star className="w-3.5 h-3.5 text-champagne-500 fill-champagne-500" />
                    <span>{master.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mb-2">{master.role}</p>
                <div className="flex flex-wrap gap-1">
                  {master.specialties.slice(0, 2).map((sp) => (
                    <span
                      key={sp}
                      className="text-[10px] bg-pearl-200/80 text-zinc-700 px-2 py-0.5 rounded-md"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  isSelected
                    ? 'bg-charcoal-900 text-white'
                    : 'border border-zinc-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-pearl-200">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 text-xs uppercase tracking-wider font-semibold text-zinc-600 hover:text-charcoal-900 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Назад к услугам</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-7 py-3.5 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-sm hover:shadow-hover active:scale-95"
        >
          <span>Выбрать дату и время</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};