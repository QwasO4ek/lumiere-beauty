import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

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
      <div className="bg-white text-charcoal-900 px-6 py-5 rounded-3xl shadow-2xl border border-pearl-300 flex items-start gap-4">
        <div className="p-1 rounded-xl bg-emerald-50 text-emerald-600 mt-0.5 border border-emerald-200">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="flex-1 pr-2">
          <h4 className="font-serif text-lg font-medium text-charcoal-900">{message}</h4>
          {subMessage && <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{subMessage}</p>}
        </div>
        <button
          onClick={onClose}
          aria-label="Закрыть уведомление"
          className="text-zinc-400 hover:text-charcoal-900 transition-colors p-1 rounded-full hover:bg-pearl-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
