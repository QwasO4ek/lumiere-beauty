import React, { useState, useEffect, useMemo } from 'react';
import { masters } from '../../data/masters';
import { bookingStore } from '../../utils/bookingStore';
import { MasterWorkSlot } from '../../types';
import { X, Activity, ShieldCheck, Calendar } from 'lucide-react';

interface SalonLiveMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SalonLiveMatrixModal: React.FC<SalonLiveMatrixModalProps> = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [busySlots, setBusySlots] = useState<MasterWorkSlot[]>([]);

  useEffect(() => {
    const refresh = () => setBusySlots(bookingStore.getSalonBusySlots());
    refresh();
    window.addEventListener('lumiere_appointments_updated', refresh);
    return () => window.removeEventListener('lumiere_appointments_updated', refresh);
  }, []);

  // Today's slots
  const slotsForDate = useMemo(() => {
    return busySlots.filter((s) => s.date === currentDate);
  }, [busySlots, currentDate]);

  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-pearl-300 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-pearl-200 bg-pearl-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-charcoal-900 text-champagne-400 flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">
                  Пульт автоматизации расписания
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                  Live CRM
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Сетка занятости мастеров в реальном времени с автоматической защитой от двойных записей
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-pearl-300 rounded-xl text-xs font-semibold text-charcoal-900">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="bg-transparent text-xs font-semibold outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-charcoal-900 hover:bg-pearl-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 bg-pearl-100/60 border-b border-pearl-200 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-pearl-300">
            <span className="text-zinc-500 block text-[11px]">Загрузка специалистов:</span>
            <span className="text-lg font-bold text-charcoal-900">76%</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">Оптимальная емкость</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-pearl-300">
            <span className="text-zinc-500 block text-[11px]">Авто-напоминания:</span>
            <span className="text-lg font-bold text-charcoal-900">WhatsApp / SMS</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">За 24 часа до визита</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-pearl-300">
            <span className="text-zinc-500 block text-[11px]">Управление клиентом:</span>
            <span className="text-lg font-bold text-charcoal-900">Self-Service</span>
            <span className="text-[10px] text-champagne-700 block mt-0.5">Отмена/перенос в 1 клик</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-pearl-300">
            <span className="text-zinc-500 block text-[11px]">Календарная синхронизация:</span>
            <span className="text-lg font-bold text-charcoal-900">Apple / Google</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">Формат RFC-5545 (.ics)</span>
          </div>
        </div>

        {/* Timeline Matrix */}
        <div className="flex-1 overflow-auto p-6">
          <div className="min-w-[700px]">
            {/* Masters Header */}
            <div className="grid grid-cols-5 gap-2 pb-3 border-b border-pearl-200 font-semibold text-xs text-charcoal-900">
              <div className="text-zinc-400 uppercase tracking-wider text-[10px]">Время</div>
              {masters.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  <img src={m.image} alt={m.name} className="w-6 h-6 rounded-full object-cover border" />
                  <span className="truncate">{m.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>

            {/* Time Rows */}
            <div className="divide-y divide-pearl-200">
              {hours.map((hour) => {
                const hourNum = parseInt(hour.split(':')[0], 10);

                return (
                  <div key={hour} className="grid grid-cols-5 gap-2 py-3 items-center text-xs">
                    <div className="font-mono text-zinc-400 text-xs font-semibold">{hour}</div>

                    {masters.map((m) => {
                      // Find if master has booking during this hour
                      const booking = slotsForDate.find((slot) => {
                        if (slot.masterId !== m.id) return false;
                        const startH = parseInt(slot.startTime.split(':')[0], 10);
                        const endH = parseInt(slot.endTime.split(':')[0], 10);
                        return hourNum >= startH && hourNum <= endH;
                      });

                      if (booking) {
                        return (
                          <div
                            key={m.id}
                            className="p-2 bg-charcoal-900 text-white rounded-xl shadow-sm overflow-hidden"
                          >
                            <div className="text-[10px] text-champagne-400 font-bold uppercase truncate">
                              {booking.startTime} – {booking.endTime}
                            </div>
                            <div className="font-semibold text-xs truncate">
                              {booking.serviceName || 'Запись'}
                            </div>
                            <div className="text-[10px] text-zinc-400 truncate">
                              {booking.clientName || 'Гость'}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={m.id}
                          className="h-10 rounded-xl bg-pearl-50 border border-dashed border-pearl-200 flex items-center justify-center text-[10px] text-zinc-400"
                        >
                          Свободно
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-pearl-200 bg-pearl-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Все слоты изолированы и обновляются мгновенно при оформлении онлайн</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full font-semibold transition-colors"
          >
            Закрыть пульт
          </button>
        </div>
      </div>
    </div>
  );
};