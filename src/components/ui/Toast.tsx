import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
  subMessage?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ show, message, subMessage, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full sm:w-auto animate-slide-up">
      <div className="bg-charcoal-900 text-white px-6 py-5 rounded-none shadow-2xl border-l-4 border-terracotta-500 flex items-start gap-4">
        <div className="p-1 rounded-full bg-terracotta-500/20 text-terracotta-300 mt-0.5">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div className="flex-1 pr-2">
          <h4 className="font-serif text-lg font-medium tracking-wide text-cream-100">{message}</h4>
          {subMessage && <p className="text-cream-300 text-sm mt-1 leading-relaxed">{subMessage}</p>}
        </div>
        <button
          onClick={onClose}
          aria-label="Закрыть уведомление"
          className="text-cream-400 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
