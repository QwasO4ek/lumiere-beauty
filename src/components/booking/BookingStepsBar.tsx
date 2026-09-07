import React from 'react';
import { Check } from 'lucide-react';

interface BookingStepsBarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const BookingStepsBar: React.FC<BookingStepsBarProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { step: 1, label: 'Услуги' },
    { step: 2, label: 'Мастер' },
    { step: 3, label: 'Дата и время' },
    { step: 4, label: 'Контакты' },
  ];

  return (
    <div className="bg-pearl-50/90 px-6 py-4 border-b border-pearl-200">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((item) => {
          const isCompleted = currentStep > item.step || currentStep === 5;
          const isCurrent = currentStep === item.step;

          return (
            <button
              key={item.step}
              type="button"
              onClick={() => {
                if (currentStep !== 5 && item.step < currentStep) {
                  onStepClick(item.step);
                }
              }}
              disabled={currentStep === 5 || item.step > currentStep}
              className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                isCurrent
                  ? 'text-charcoal-900'
                  : isCompleted
                  ? 'text-champagne-700 hover:text-charcoal-900 cursor-pointer'
                  : 'text-zinc-400 cursor-not-allowed'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  isCompleted
                    ? 'bg-charcoal-900 text-white'
                    : isCurrent
                    ? 'bg-champagne-600 text-white shadow-sm ring-2 ring-champagne-200'
                    : 'bg-pearl-200 text-zinc-500'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : item.step}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};