import React, { useState } from 'react';
import { masters } from '../../data/masters';
import { Master } from '../../types';
import { ArrowRight, Star, CheckCircle, Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface MastersProps {
  onSelectMaster: (masterId: string) => void;
}

export const Masters: React.FC<MastersProps> = ({ onSelectMaster }) => {
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);

  return (
    <section id="masters" className="py-24 sm:py-32 bg-pearl-50 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-300">
              <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
              <span>Команда экспертов</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight">
              Наша команда
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 max-w-md font-normal">
            Люди, которым можно доверить свою красоту. Постоянное повышение квалификации и тонкое чувство индивидуального стиля.
          </p>
        </div>

        {/* 4 Masters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {masters.map((master) => (
            <div
              key={master.id}
              className="group bg-white rounded-3xl overflow-hidden border border-pearl-300 hover:border-pearl-400 shadow-soft hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo with Overlay Badge */}
              <div className="relative aspect-[3/4] overflow-hidden bg-pearl-100">
                <img
                  src={master.image}
                  alt={master.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm border border-pearl-200">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-charcoal-900">{master.rating}</span>
                </div>
              </div>

              {/* Info Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                    {master.experience}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal-900 font-medium mb-1">
                    {master.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4 font-normal">
                    {master.role}
                  </p>
                </div>

                <div className="pt-4 border-t border-pearl-200 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedMaster(master)}
                    className="text-xs font-semibold text-charcoal-900 hover:text-champagne-600 transition-colors flex items-center gap-1"
                  >
                    <span>О мастере</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectMaster(master.id)}
                    className="px-3 py-1.5 bg-pearl-100 hover:bg-charcoal-900 hover:text-white text-charcoal-900 rounded-full text-xs font-semibold transition-colors"
                  >
                    Запись
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Profile */}
      {selectedMaster && (
        <Modal
          isOpen={!!selectedMaster}
          onClose={() => setSelectedMaster(null)}
          title={`Мастер ${selectedMaster.name}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img
                src={selectedMaster.image}
                alt={selectedMaster.name}
                className="w-32 h-40 object-cover rounded-2xl bg-pearl-100 border border-pearl-200 shadow-md flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                  {selectedMaster.role}
                </span>
                <h4 className="font-serif text-2xl text-charcoal-900 font-medium mt-1">
                  {selectedMaster.name}
                </h4>
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-xs text-zinc-500">
                  <span className="flex items-center gap-1 font-bold text-charcoal-900">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {selectedMaster.rating} ({selectedMaster.reviewsCount} отзывов)
                  </span>
                  <span>•</span>
                  <span>{selectedMaster.experience}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-pearl-200">
              <h5 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">
                О мастере
              </h5>
              <p className="text-sm text-zinc-600 font-normal leading-relaxed">
                {selectedMaster.bio}
              </p>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
                Специализация и ключевые техники
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedMaster.specialties.map((spec) => (
                  <div key={spec} className="flex items-center gap-2 text-xs text-charcoal-900 bg-pearl-50 p-2.5 rounded-xl border border-pearl-200">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  const id = selectedMaster.id;
                  setSelectedMaster(null);
                  onSelectMaster(id);
                }}
                className="w-full py-3.5 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs uppercase tracking-wider font-semibold transition-colors shadow-md"
              >
                Записаться к этому мастеру
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
