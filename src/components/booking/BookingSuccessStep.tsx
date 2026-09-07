import React from 'react';
import { Appointment } from '../../types';
import { downloadICSFile, createWhatsAppBookingUrl } from '../../utils/bookingEngine';
import { Check, Download, MessageCircle, ArrowRight } from 'lucide-react';

interface BookingSuccessStepProps {
  appointment: Appointment;
  onOpenMyAppointments?: () => void;
  onReset: () => void;
}

export const BookingSuccessStep: React.FC<BookingSuccessStepProps> = ({
  appointment,
  onOpenMyAppointments,
  onReset,
}) => {
  return (
    <div className="p-8 sm:p-12 text-center space-y-8 animate-fade-in">
      {/* Animated Success Badge */}
      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border border-emerald-200/80 shadow-soft">
        <Check className="w-10 h-10 stroke-[2.5]" />
      </div>

      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pearl-100 rounded-full text-xs font-semibold text-charcoal-900 mb-2 border border-pearl-200">
          <span>Бронь подтверждена онлайн</span>
          <span className="font-mono text-champagne-700 font-bold">
            #{appointment.id}
          </span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
          Ждем вас в LUMIÈRE BEAUTY!
        </h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mt-2">
          Ваш слот автоматически зарезервирован в расписании мастера. Мы сохранили запись в вашем личном кабинете.
        </p>
      </div>

      {/* Appointment Ticket Card */}
      <div className="bg-pearl-50 p-6 sm:p-8 rounded-3xl border border-pearl-300 max-w-lg mx-auto text-left space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-pearl-200">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
              Дата визита
            </span>
            <span className="font-semibold text-charcoal-900 text-base">
              {new Date(appointment.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' })}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
              Время
            </span>
            <span className="font-bold text-charcoal-900 text-base">
              {appointment.time} – {appointment.endTime}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-pearl-200 text-xs">
          <span className="text-zinc-500">Специалист:</span>
          <span className="font-semibold text-charcoal-900">{appointment.masterName}</span>
        </div>

        <div className="space-y-1.5 text-xs py-1">
          <span className="text-zinc-500 block mb-1">Процедуры:</span>
          {appointment.services.map((s) => (
            <div key={s.id} className="flex items-center justify-between text-charcoal-900">
              <span>• {s.name}</span>
              <span className="font-medium">{s.formattedPrice}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-pearl-200 text-sm">
          <span className="text-zinc-500">Итоговая стоимость:</span>
          <span className="font-bold text-lg text-charcoal-900">
            {appointment.totalPrice.toLocaleString('ru-RU')} ₸
          </span>
        </div>

        <div className="text-[11px] text-zinc-500 pt-2 border-t border-pearl-200">
          📍 г. Алматы, пр. Достык 132 • +7 (727) 312-44-88
        </div>
      </div>

      {/* Automation Actions: 1-Click Calendar, WhatsApp Concierge */}
      <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => downloadICSFile(appointment)}
          className="px-4 py-3 bg-white hover:bg-pearl-100 text-charcoal-900 rounded-2xl border border-pearl-300 text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Download className="w-4 h-4 text-champagne-600" />
          <span>Календарь (.ics)</span>
        </button>

        <a
          href={createWhatsAppBookingUrl(appointment)}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Открыть в WhatsApp</span>
        </a>
      </div>

      {/* My Appointments Portal & Reset Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        {onOpenMyAppointments && (
          <button
            type="button"
            onClick={onOpenMyAppointments}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-charcoal-900 hover:text-champagne-600 transition-colors"
          >
            <span>Посмотреть в «Мои записи»</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 text-xs text-zinc-500 hover:text-charcoal-900 transition-colors"
        >
          Создать еще одну запись
        </button>
      </div>
    </div>
  );
};