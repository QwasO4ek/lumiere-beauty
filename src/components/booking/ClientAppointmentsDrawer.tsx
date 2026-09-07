import React, { useState, useEffect } from 'react';
import { Appointment } from '../../types';
import { bookingStore } from '../../utils/bookingStore';
import { downloadICSFile, createWhatsAppBookingUrl, formatDuration } from '../../utils/bookingEngine';
import { X, Calendar, Clock, Download, MessageCircle, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ClientAppointmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNewBookingClick: () => void;
}

export const ClientAppointmentsDrawer: React.FC<ClientAppointmentsDrawerProps> = ({
  isOpen,
  onClose,
  onNewBookingClick,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const refreshAppointments = () => {
    setAppointments(bookingStore.getUserAppointments());
  };

  useEffect(() => {
    if (isOpen) {
      refreshAppointments();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => refreshAppointments();
    window.addEventListener('lumiere_appointments_updated', handleUpdate);
    return () => window.removeEventListener('lumiere_appointments_updated', handleUpdate);
  }, []);

  const handleCancel = (id: string) => {
    bookingStore.cancelAppointment(id);
    setConfirmCancelId(null);
    refreshAppointments();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-pearl-300 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-pearl-200 flex items-center justify-between bg-pearl-50">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl text-charcoal-900 font-normal">
                  Мои записи
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-charcoal-900 text-white text-[10px] font-bold">
                  {appointments.filter((a) => a.status === 'confirmed').length}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Автоматическое управление вашими визитами
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-charcoal-900 hover:bg-pearl-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Appointments List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-pearl-100 flex items-center justify-center mx-auto text-zinc-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal-900">У вас пока нет активных записей</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Выберите удобную процедуру и время через наш онлайн-букинг
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNewBookingClick();
                  }}
                  className="px-6 py-3 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Записаться онлайн
                </button>
              </div>
            ) : (
              appointments.map((item) => {
                const isCancelled = item.status === 'cancelled';
                return (
                  <div
                    key={item.id}
                    className={`p-5 rounded-3xl border transition-all ${
                      isCancelled
                        ? 'bg-zinc-50/60 border-zinc-200 opacity-60'
                        : 'bg-pearl-50/90 border-pearl-300 shadow-soft'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-champagne-700 bg-champagne-50 px-2.5 py-0.5 rounded-md border border-champagne-200/60">
                        #{item.id}
                      </span>
                      {isCancelled ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 bg-zinc-200 px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" />
                          <span>Отменена</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Подтверждена</span>
                        </span>
                      )}
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-3 text-xs mb-3">
                      <div className="flex items-center gap-1.5 text-charcoal-900 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-charcoal-900 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{item.time} – {item.endTime}</span>
                      </div>
                      <span className="text-zinc-400">
                        ({formatDuration(item.totalDurationMinutes)})
                      </span>
                    </div>

                    {/* Master & Services */}
                    <div className="space-y-1 mb-4 text-xs">
                      <div className="text-zinc-500">
                        Мастер: <strong className="text-charcoal-900 font-medium">{item.masterName}</strong>
                      </div>
                      <div className="text-zinc-500">
                        Услуги: <span className="text-charcoal-900">{item.services.map((s) => s.name).join(', ')}</span>
                      </div>
                      <div className="pt-2 flex items-center justify-between font-semibold text-charcoal-900 text-sm">
                        <span>Сумма к оплате:</span>
                        <span>{item.totalPrice.toLocaleString('ru-RU')} ₸</span>
                      </div>
                    </div>

                    {/* Actions */}
                    {!isCancelled && (
                      <div className="space-y-2 pt-2 border-t border-pearl-200">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => downloadICSFile(item)}
                            className="px-3 py-2 bg-white hover:bg-pearl-100 text-charcoal-900 rounded-xl border border-pearl-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 text-champagne-600" />
                            <span>В календарь</span>
                          </button>

                          <a
                            href={createWhatsAppBookingUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        {/* Self-Service Cancel Button (Automation) */}
                        {confirmCancelId === item.id ? (
                          <div className="p-3 bg-red-50 rounded-xl border border-red-200 space-y-2 text-center">
                            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-red-800">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                              <span>Освободить этот слот?</span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleCancel(item.id)}
                                className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
                              >
                                Да, отменить
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmCancelId(null)}
                                className="flex-1 py-1.5 bg-white text-zinc-700 rounded-lg text-xs font-semibold border border-zinc-200"
                              >
                                Назад
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmCancelId(item.id)}
                            className="w-full py-1.5 text-[11px] text-zinc-400 hover:text-red-600 transition-colors"
                          >
                            Отменить запись (освободить слот)
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-pearl-200 bg-pearl-50">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNewBookingClick();
              }}
              className="w-full py-3.5 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs uppercase tracking-wider font-semibold transition-colors text-center shadow-sm"
            >
              + Новая запись
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};