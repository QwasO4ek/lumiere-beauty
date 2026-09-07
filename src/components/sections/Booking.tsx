import React from 'react';
import { Sparkles, Calendar, Activity } from 'lucide-react';
import { AutomatedBookingWizard } from '../booking/AutomatedBookingWizard';
import { Appointment } from '../../types';

interface BookingProps {
  preselectedServiceId?: string;
  preselectedMasterId?: string;
  promoApplied?: boolean;
  onSuccess: () => void;
  onOpenMyAppointments?: () => void;
  onOpenSalonMatrix?: () => void;
}

export const Booking: React.FC<BookingProps> = ({
  preselectedServiceId,
  preselectedMasterId,
  promoApplied = false,
  onSuccess,
  onOpenMyAppointments,
  onOpenSalonMatrix,
}) => {
  return (
    <section id="booking" className="py-24 sm:py-32 bg-white relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pearl-100 rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-200">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Интеллектуальная онлайн-запись</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Запишитесь в LUMIÈRE BEAUTY
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 font-normal max-w-xl mx-auto">
            Инновационная система бронирования: выбор нескольких услуг в один визит, умный расчет времени и мгновенная синхронизация с календарем
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {onOpenMyAppointments && (
              <button
                type="button"
                onClick={onOpenMyAppointments}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pearl-100 hover:bg-pearl-200 text-charcoal-900 text-xs font-semibold border border-pearl-300 transition-colors shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-champagne-700" />
                <span>Мои записи (личный кабинет)</span>
              </button>
            )}

            {onOpenSalonMatrix && (
              <button
                type="button"
                onClick={onOpenSalonMatrix}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors shadow-xs"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Пульт автоматизации / CRM</span>
              </button>
            )}
          </div>
        </div>

        {/* Wizard Container */}
        <div className="max-w-4xl mx-auto">
          <AutomatedBookingWizard
            preselectedServiceId={preselectedServiceId}
            preselectedMasterId={preselectedMasterId}
            promoApplied={promoApplied}
            onSuccess={(_appointment: Appointment) => onSuccess()}
            onOpenMyAppointments={onOpenMyAppointments}
          />
        </div>
      </div>
    </section>
  );
};