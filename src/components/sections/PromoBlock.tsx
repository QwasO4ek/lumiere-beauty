import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromoBlockProps {
  onClaimDiscount: () => void;
}

export const PromoBlock: React.FC<PromoBlockProps> = ({ onClaimDiscount }) => {
  return (
    <section className="py-20 bg-charcoal-800 text-white relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terracotta-700/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center border border-terracotta-500/30 p-8 sm:p-14 bg-charcoal-900/60 backdrop-blur-sm shadow-2xl">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-4 h-4 text-terracotta-400" />
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-300 font-semibold">
              Специальное предложение
            </span>
            <Sparkles className="w-4 h-4 text-terracotta-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-cream-100 tracking-tight mb-4">
            Время для себя
          </h2>

          <p className="text-lg sm:text-2xl font-light text-cream-300 mb-8 max-w-xl mx-auto">
            Получите <span className="text-terracotta-400 font-medium font-serif">-10%</span> на первое посещение любого мастера при онлайн-записи
          </p>

          <button
            onClick={onClaimDiscount}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-terracotta-500 hover:bg-terracotta-400 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            <span>Получить скидку</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
