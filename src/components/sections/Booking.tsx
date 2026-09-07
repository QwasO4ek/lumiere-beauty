import React, { useState, useEffect } from 'react';
import { services } from '../../data/services';
import { masters } from '../../data/masters';
import { BookingFormData } from '../../types';
import { Calendar, Clock, Check, AlertCircle, Sparkles, Send } from 'lucide-react';

interface BookingProps {
  preselectedServiceId?: string;
  preselectedMasterId?: string;
  promoApplied?: boolean;
  onSuccess: () => void;
}

export const Booking: React.FC<BookingProps> = ({
  preselectedServiceId,
  preselectedMasterId,
  promoApplied = false,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    serviceId: preselectedServiceId || '',
    masterId: preselectedMasterId || '',
    date: '',
    time: '',
    comment: '',
    agreedToPolicy: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedMasterId) {
      setFormData((prev) => ({ ...prev, masterId: preselectedMasterId }));
    }
  }, [preselectedMasterId]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('8')) input = '7' + input.slice(1);
    if (!input.startsWith('7') && input.length > 0) input = '7' + input;

    let formatted = '';
    if (input.length > 0) {
      formatted = '+7';
      if (input.length > 1) {
        formatted += ' (' + input.substring(1, 4);
      }
      if (input.length >= 4) {
        formatted += ') ' + input.substring(4, 7);
      }
      if (input.length >= 7) {
        formatted += '-' + input.substring(7, 9);
      }
      if (input.length >= 9) {
        formatted += '-' + input.substring(9, 11);
      }
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      newErrors.phone = 'Укажите корректный номер телефона';
    }

    if (!formData.serviceId) {
      newErrors.serviceId = 'Выберите желаемую процедуру';
    }

    if (!formData.agreedToPolicy) {
      newErrors.agreedToPolicy = 'Требуется согласие на обработку данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      onSuccess();
      setFormData({
        name: '',
        phone: '',
        serviceId: '',
        masterId: '',
        date: '',
        time: '',
        comment: '',
        agreedToPolicy: true,
      });
    }, 700);
  };

  const availableTimeSlots = [
    '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00',
  ];

  return (
    <section id="booking" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pearl-100 rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-200">
              <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
              <span>Быстрая запись</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
              Запишитесь на процедуру
            </h2>
            <p className="text-base text-zinc-600 font-normal">
              Выберите удобный день и время — мы забронируем слот и свяжемся с вами в течение 10 минут
            </p>

            {promoApplied && (
              <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full text-emerald-800 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Скидка 10% на первый визит будет учтена при подтверждении</span>
              </div>
            )}
          </div>

          {/* Form Card */}
          <div className="bg-pearl-50 rounded-3xl p-8 sm:p-12 border border-pearl-300 shadow-soft">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Например, Алина"
                    className={`w-full px-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-charcoal-900/10 ${
                      errors.name ? 'border-red-400' : 'border-pearl-300 focus:border-charcoal-900'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (700) 000-00-00"
                    className={`w-full px-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-charcoal-900/10 ${
                      errors.phone ? 'border-red-400' : 'border-pearl-300 focus:border-charcoal-900'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Service & Master */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2">
                    Выберите услугу *
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => {
                      setFormData({ ...formData, serviceId: e.target.value });
                      if (errors.serviceId) setErrors({ ...errors, serviceId: '' });
                    }}
                    className={`w-full px-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-charcoal-900/10 ${
                      errors.serviceId ? 'border-red-400' : 'border-pearl-300 focus:border-charcoal-900'
                    }`}
                  >
                    <option value="">-- Выберите процедуру --</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.formattedPrice})
                      </option>
                    ))}
                  </select>
                  {errors.serviceId && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.serviceId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2">
                    Мастер (по желанию)
                  </label>
                  <select
                    value={formData.masterId}
                    onChange={(e) => setFormData({ ...formData, masterId: e.target.value })}
                    className="w-full px-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border border-pearl-300 focus:border-charcoal-900 transition-all focus:outline-none"
                  >
                    <option value="">Любой свободный мастер</option>
                    {masters.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time slot chips */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      Дата визита
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border border-pearl-300 focus:border-charcoal-900 transition-all focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      Время
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            formData.time === slot
                              ? 'bg-charcoal-900 text-white shadow-sm'
                              : 'bg-white hover:bg-pearl-200 text-zinc-700 border border-pearl-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider mb-2">
                  Пожелания или комментарий
                </label>
                <textarea
                  rows={2}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Особые пожелания или детали..."
                  className="w-full px-4 py-3 bg-white text-charcoal-900 text-sm rounded-2xl border border-pearl-300 focus:border-charcoal-900 transition-all focus:outline-none resize-none"
                />
              </div>

              {/* Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.agreedToPolicy}
                    onChange={(e) => {
                      setFormData({ ...formData, agreedToPolicy: e.target.checked });
                      if (errors.agreedToPolicy) setErrors({ ...errors, agreedToPolicy: '' });
                    }}
                    className="mt-0.5 w-4 h-4 rounded text-charcoal-900 focus:ring-charcoal-900"
                  />
                  <span className="text-xs text-zinc-500 leading-normal">
                    Согласен(на) на обработку персональных данных согласно политике конфиденциальности
                  </span>
                </label>
                {errors.agreedToPolicy && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.agreedToPolicy}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-soft hover:shadow-hover disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Отправка заявки...</span>
                ) : (
                  <>
                    <span>Отправить заявку</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 sm:p-10 border border-pearl-300 shadow-2xl text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-100">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>

            <h3 className="font-serif text-2xl text-charcoal-900 font-normal mb-2">
              Спасибо! Ваша заявка принята.
            </h3>

            <p className="text-sm text-zinc-500 font-normal leading-relaxed mb-6">
              Мы свяжемся с вами в ближайшее время для подтверждения записи и ответим на все вопросы.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Отлично
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
