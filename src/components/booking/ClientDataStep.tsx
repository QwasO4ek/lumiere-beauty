import React from 'react';
import { Service } from '../../types';
import { masters } from '../../data/masters';
import { formatDuration, calculateEndTime } from '../../utils/bookingEngine';
import { User, Phone, Tag, CheckCircle2, ChevronLeft } from 'lucide-react';

interface ClientDataStepProps {
  selectedServices: Service[];
  selectedMasterId: string;
  selectedDate: string;
  selectedTime: string;
  totalDurationMinutes: number;
  rawTotalPrice: number;
  finalTotalPrice: number;
  discountPercent: number;
  clientName: string;
  clientPhone: string;
  clientComment: string;
  promoCodeInput: string;
  promoMessage: string;
  reminderViaWhatsApp: boolean;
  agreedToPolicy: boolean;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onChangeName: (name: string) => void;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeComment: (comment: string) => void;
  onChangePromo: (promo: string) => void;
  onApplyPromo: () => void;
  onChangeWhatsApp: (val: boolean) => void;
  onChangeAgreed: (val: boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const ClientDataStep: React.FC<ClientDataStepProps> = ({
  selectedServices,
  selectedMasterId,
  selectedDate,
  selectedTime,
  totalDurationMinutes,
  rawTotalPrice,
  finalTotalPrice,
  discountPercent,
  clientName,
  clientPhone,
  clientComment,
  promoCodeInput,
  promoMessage,
  reminderViaWhatsApp,
  agreedToPolicy,
  errors,
  isSubmitting,
  onChangeName,
  onChangePhone,
  onChangeComment,
  onChangePromo,
  onApplyPromo,
  onChangeWhatsApp,
  onChangeAgreed,
  onBack,
  onSubmit,
}) => {
  const masterObj = masters.find((m) => m.id === selectedMasterId);

  return (
    <div className="p-6 sm:p-10 space-y-8 animate-fade-in">
      <div>
        <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
          Данные для записи и подтверждение
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Проверьте сводку визита и укажите контактный телефон для подтверждения
        </p>
      </div>

      {/* Appointment Summary Card */}
      <div className="bg-pearl-50 p-6 rounded-2xl border border-pearl-300 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-pearl-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Детали бронирования
          </span>
          <span className="text-xs font-semibold text-champagne-700 bg-champagne-50 px-2.5 py-0.5 rounded-full border border-champagne-200">
            {formatDuration(totalDurationMinutes)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-zinc-400 block mb-1">Дата и время:</span>
            <span className="font-semibold text-charcoal-900 text-sm">
              {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' })}
            </span>
            <span className="text-zinc-600 block mt-0.5">
              в {selectedTime} (до {calculateEndTime(selectedTime, totalDurationMinutes)})
            </span>
          </div>

          <div>
            <span className="text-zinc-400 block mb-1">Мастер:</span>
            <span className="font-semibold text-charcoal-900 text-sm">
              {selectedMasterId === 'any' ? 'Любой свободный специалист' : masterObj?.name}
            </span>
            <span className="text-zinc-600 block mt-0.5">
              {selectedMasterId === 'any' ? 'Автоматическое назначение' : masterObj?.role}
            </span>
          </div>
        </div>

        {/* List of services */}
        <div className="pt-3 border-t border-pearl-200 space-y-2">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
            Выбранные услуги:
          </span>
          {selectedServices.map((srv) => (
            <div key={srv.id} className="flex items-center justify-between text-xs">
              <span className="text-charcoal-900 font-medium">• {srv.name}</span>
              <span className="text-zinc-600 font-semibold">{srv.formattedPrice}</span>
            </div>
          ))}
        </div>

        {/* Price calculation */}
        <div className="pt-3 border-t border-pearl-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-500 block">К оплате в салоне:</span>
            {discountPercent > 0 && (
              <span className="text-[11px] text-emerald-600 line-through mr-2">
                {rawTotalPrice.toLocaleString('ru-RU')} ₸
              </span>
            )}
            <span className="font-bold text-xl text-charcoal-900">
              {finalTotalPrice.toLocaleString('ru-RU')} ₸
            </span>
          </div>

          {discountPercent > 0 && (
            <div className="text-right">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Экономия {(rawTotalPrice - finalTotalPrice).toLocaleString('ru-RU')} ₸ (-{discountPercent}%)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2">
            Ваше имя *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={clientName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Как к вам обращаться?"
              className={`w-full pl-11 pr-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border transition-all outline-none ${
                errors.name ? 'border-red-400' : 'border-pearl-300 focus:border-charcoal-900'
              }`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2">
            Номер телефона *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={clientPhone}
              onChange={onChangePhone}
              placeholder="+7 (700) 000-00-00"
              className={`w-full pl-11 pr-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border transition-all outline-none ${
                errors.phone ? 'border-red-400' : 'border-pearl-300 focus:border-charcoal-900'
              }`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="p-4 bg-pearl-50 rounded-2xl border border-pearl-200">
        <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-champagne-600" />
          <span>Промокод или сертификат</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCodeInput}
            onChange={(e) => onChangePromo(e.target.value)}
            placeholder="Например: LUMIERE10"
            className="flex-1 px-4 py-2.5 bg-white text-charcoal-900 text-xs rounded-xl border border-pearl-300 uppercase tracking-wider outline-none"
          />
          <button
            type="button"
            onClick={onApplyPromo}
            className="px-4 py-2.5 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold tracking-wider transition-colors"
          >
            Применить
          </button>
        </div>
        {promoMessage && (
          <p
            className={`text-xs mt-2 font-medium ${
              discountPercent > 0 ? 'text-emerald-700' : 'text-red-500'
            }`}
          >
            {promoMessage}
          </p>
        )}
      </div>

      {/* Comments */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2">
          Пожелания или комментарий для мастера
        </label>
        <textarea
          rows={2}
          value={clientComment}
          onChange={(e) => onChangeComment(e.target.value)}
          placeholder="Например: снятие старого покрытия, пожелание по чаю/кофе..."
          className="w-full px-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border border-pearl-300 focus:border-charcoal-900 outline-none resize-none"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-2 text-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={reminderViaWhatsApp}
            onChange={(e) => onChangeWhatsApp(e.target.checked)}
            className="w-4 h-4 rounded text-charcoal-900"
          />
          <span className="text-zinc-600">
            Отправить автоматическое напоминание в WhatsApp за 24 ч до визита
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreedToPolicy}
            onChange={(e) => onChangeAgreed(e.target.checked)}
            className="w-4 h-4 rounded text-charcoal-900"
          />
          <span className="text-zinc-600">
            Согласен(на) с правилами салона и обработкой персональных данных
          </span>
        </label>
        {errors.agreed && <p className="text-red-500 text-xs">{errors.agreed}</p>}
      </div>

      {/* Submit Action */}
      <div className="flex items-center justify-between pt-4 border-t border-pearl-200">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 text-xs uppercase tracking-wider font-semibold text-zinc-600 hover:text-charcoal-900 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Назад ко времени</span>
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="px-8 py-4 bg-charcoal-900 hover:bg-zinc-800 disabled:opacity-50 text-white rounded-full text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 shadow-soft hover:shadow-hover active:scale-95"
        >
          {isSubmitting ? (
            <span>Резервирование слота...</span>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Завершить бронирование</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};