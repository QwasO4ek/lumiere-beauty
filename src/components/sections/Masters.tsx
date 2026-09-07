import React, { useState } from 'react';
import { masters } from '../../data/masters';
import { Master } from '../../types';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface MastersProps {
  onSelectMaster: (masterId: string) => void;
}

export const Masters: React.FC<MastersProps> = ({ onSelectMaster }) => {
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);

  return (
    <section id="masters" className="py-24 sm:py-32 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
              Мастера
            </span>
            <span className="w-8 h-[1px] bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Наша команда
          </h2>
          <p className="text-base text-charcoal-800/70 font-light">
            Люди, которым можно доверить свою красоту
          </p>
        </div>

        {/* 4 Masters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {masters.map((master) => (
            <div
              key={master.id}
              className="group bg-white border border-cream-300 hover:border-terracotta-400 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
                <img
                  src={master.image}
                  alt={master.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-charcoal-900/80 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 text-terracotta-400 fill-terracotta-400" />
                  <span>{master.rating}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-terracotta-600 font-semibold block mb-1">
                    {master.experience}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal-900 font-medium mb-1">
                    {master.name}
                  </h3>
                  <p className="text-xs text-charcoal-800/70 font-light mb-4">
                    {master.role}
                  </p>
                </div>

                <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedMaster(master)}
                    className="text-xs uppercase tracking-wider font-semibold text-charcoal-900 group-hover:text-terracotta-600 transition-colors flex items-center gap-1"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectMaster(master.id)}
                    className="text-[11px] uppercase tracking-wider font-medium text-terracotta-600 hover:underline"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Master Detail Modal */}
      {selectedMaster && (
        <Modal
          isOpen={!!selectedMaster}
          onClose={() => setSelectedMaster(null)}
          title={`Мастер: ${selectedMaster.name}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img
                src={selectedMaster.image}
                alt={selectedMaster.name}
                className="w-32 h-40 object-cover bg-cream-200 border border-cream-300 shadow-md flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase tracking-wider text-terracotta-600 font-semibold block">
                  {selectedMaster.role}
                </span>
                <h4 className="font-serif text-2xl text-charcoal-900 font-medium mt-1">
                  {selectedMaster.name}
                </h4>
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-xs text-charcoal-800/70">
                  <span className="flex items-center gap-1 font-medium text-charcoal-900">
                    <Star className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500" />
                    {selectedMaster.rating} ({selectedMaster.reviewsCount} отзывов)
                  </span>
                  <span>•</span>
                  <span>{selectedMaster.experience}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-cream-200">
              <h5 className="text-xs uppercase tracking-wider text-charcoal-800 font-semibold mb-2">
                О мастере
              </h5>
              <p className="text-sm text-charcoal-800/80 font-light leading-relaxed">
                {selectedMaster.bio}
              </p>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-wider text-charcoal-800 font-semibold mb-3">
                Ключевые специализации
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedMaster.specialties.map((spec) => (
                  <div key={spec} className="flex items-center gap-2 text-xs text-charcoal-800/80 bg-cream-50 p-2.5 border border-cream-200">
                    <CheckCircle className="w-3.5 h-3.5 text-terracotta-500" />
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
                className="w-full py-3.5 bg-charcoal-900 hover:bg-terracotta-600 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                Записаться к мастеру
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
