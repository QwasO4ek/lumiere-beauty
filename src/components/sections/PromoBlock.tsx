import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromoBlockProps {
  onClaimDiscount: () => void;
}

export const PromoBlock: React.FC<PromoBlockProps> = ({ onClaimDiscount }) => {
  return (
    <section className="py-20 bg-pearl-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-champagne-300/80 p-8 sm:p-14 bg-gradient-to-br from-white via-champagne-100/40 to-white shadow-soft relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-200/50 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-charcoal-900 mb-4 border border-pearl-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Специальный комплимент</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Время для себя
          </h2>

          <p className="text-base sm:text-xl font-normal text-zinc-600 mb-8 max-w-lg mx-auto">
            Получите <span className="font-bold text-charcoal-900">-10%</span> на первое посещение любого мастера при онлайн-записи через сайт
          </p>

          <button
            onClick={onClaimDiscount}
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-charcoal-900 hover:bg-zinc-800 text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 shadow-soft hover:shadow-hover active:scale-95"
          >
            <span>Получить скидку 10%</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
