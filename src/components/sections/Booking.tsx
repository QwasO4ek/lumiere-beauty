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

  // Phone input formatter for Kazakhstan/CIS: +7 (700) 000-00-00
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
      newErrors.name = 'Пожалуйста, введите ваше имя';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!formData.serviceId) {
      newErrors.serviceId = 'Пожалуйста, выберите услугу';
    }

    if (!formData.agreedToPolicy) {
      newErrors.agreedToPolicy = 'Необходимо согласие на обработку данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Mock network request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      onSuccess();
      // Reset form
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
    }, 800);
  };

  // Time slots for booking
  const availableTimeSlots = [
    '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00',
  ];

  return (
    <section id="booking" className="py-24 sm:py-32 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="w-8 h-[1px] bg-terracotta-500" />
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
                Онлайн-запись
              </span>
              <span className="w-8 h-[1px] bg-terracotta-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
              Запишитесь на процедуру
            </h2>
            <p className="text-base text-charcoal-800/70 font-light">
              Заполните простую форму, и наш администратор подтвердит удобное время визита
            </p>

            {promoApplied && (
              <div className="mt-4 inline-flex items-center gap-2 bg-terracotta-500/10 border border-terracotta-500/30 px-4 py-2 text-terracotta-700 text-xs font-medium">
                <Sparkles className="w-4 h-4 text-terracotta-500" />
                <span>Скидка 10% на первый визит будет применена при подтверждении</span>
              </div>
            )}
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 sm:p-12 border border-cream-300 shadow-luxury">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-2">
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
                    className={`w-full px-4 py-3 bg-cream-50 text-charcoal-900 text-sm border transition-colors focus:outline-none focus:bg-white ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-cream-300 focus:border-charcoal-900'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (700) 000-00-00"
                    className={`w-full px-4 py-3 bg-cream-50 text-charcoal-900 text-sm border transition-colors focus:outline-none focus:bg-white ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-cream-300 focus:border-charcoal-900'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Service & Master Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-2">
                    Выберите услугу *
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => {
                      setFormData({ ...formData, serviceId: e.target.value });
                      if (errors.serviceId) setErrors({ ...errors, serviceId: '' });
                    }}
                    className={`w-full px-4 py-3 bg-cream-50 text-charcoal-900 text-sm border transition-colors focus:outline-none focus:bg-white ${
                      errors.serviceId
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-cream-300 focus:border-charcoal-900'
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
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-2">
                    Выберите мастера (опционально)
                  </label>
                  <select
                    value={formData.masterId}
                    onChange={(e) => setFormData({ ...formData, masterId: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-50 text-charcoal-900 text-sm border border-cream-300 focus:border-charcoal-900 transition-colors focus:outline-none focus:bg-white"
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

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-terracotta-500" />
                    Желаемая дата
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-50 text-charcoal-900 text-sm border border-cream-300 focus:border-charcoal-900 transition-colors focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-terracotta-500" />
                    Желаемое время
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-cream-50 text-charcoal-900 text-sm border border-cream-300 focus:border-charcoal-900 transition-colors focus:outline-none focus:bg-white"
                  >
                    <option value="">Выберите удобное время</option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-2">
                  Комментарий или пожелания
                </label>
                <textarea
                  rows={3}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Например: хочу совместить маникюр и окрашивание, или есть аллергия..."
                  className="w-full px-4 py-3 bg-cream-50 text-charcoal-900 text-sm border border-cream-300 focus:border-charcoal-900 transition-colors focus:outline-none focus:bg-white resize-none"
                />
              </div>

              {/* Checkbox Agreement */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.agreedToPolicy}
                    onChange={(e) => {
                      setFormData({ ...formData, agreedToPolicy: e.target.checked });
                      if (errors.agreedToPolicy) setErrors({ ...errors, agreedToPolicy: '' });
                    }}
                    className="mt-0.5 w-4 h-4 text-terracotta-600 rounded border-cream-300 focus:ring-terracotta-500"
                  />
                  <span className="text-xs text-charcoal-800/70 leading-normal">
                    Я согласен(на) на обработку персональных данных и ознакомлен(а) с политикой конфиденциальности
                  </span>
                </label>
                {errors.agreedToPolicy && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.agreedToPolicy}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-charcoal-900 hover:bg-terracotta-600 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-luxury hover:shadow-luxury-hover disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Отправка заявки...</span>
                ) : (
                  <>
                    <span>Отправить заявку</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal Notification */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white max-w-md w-full p-8 sm:p-10 border border-cream-300 shadow-2xl text-center">
            <div className="w-16 h-16 bg-terracotta-500/20 text-terracotta-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="font-serif text-2xl text-charcoal-900 font-normal mb-3">
              Спасибо! Ваша заявка принята.
            </h3>

            <p className="text-sm text-charcoal-800/70 font-light leading-relaxed mb-8">
              Мы свяжемся с вами в ближайшее время по указанному телефону для подтверждения записи и ответа на любые вопросы.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3.5 bg-charcoal-900 hover:bg-terracotta-600 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              Отлично
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
