import React from 'react';
import { MapPin, Phone, Clock, Navigation, MessageSquare, Instagram, Sparkles } from 'lucide-react';

export const Contacts: React.FC = () => {
  const address = 'г. Алматы, ул. Панфилова, 98';
  const phone = '+7 (700) 123-45-67';
  const email = 'hello@lumiere-beauty.kz';

  return (
    <section id="contacts" className="py-24 sm:py-32 bg-pearl-50 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold text-charcoal-900 mb-3 border border-pearl-300">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Локация и визит</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Мы ждём вас
          </h2>
          <p className="text-base text-zinc-600 font-normal">
            Исторический центр Алматы, тихий пешеходный бульвар Панфилова
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contacts Information Card (Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-pearl-300 shadow-soft flex flex-col justify-between">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-pearl-50 border border-pearl-200 flex items-center justify-center text-charcoal-900 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                    Наш адрес
                  </h4>
                  <p className="text-sm sm:text-base text-charcoal-900 font-medium">
                    {address}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Пешеходная аллея, 2 минуты от ст. метро «Алмалы»
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-pearl-50 border border-pearl-200 flex items-center justify-center text-charcoal-900 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                    График работы
                  </h4>
                  <p className="text-sm text-charcoal-900 font-medium">
                    Пн–Сб: 09:00 – 21:00
                  </p>
                  <p className="text-sm text-zinc-600 mt-0.5">
                    Вс: 10:00 – 18:00
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-pearl-50 border border-pearl-200 flex items-center justify-center text-charcoal-900 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                    Прямой контакт
                  </h4>
                  <a
                    href="tel:+77001234567"
                    className="text-base text-charcoal-900 font-semibold hover:text-champagne-600 transition-colors block"
                  >
                    {phone}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs text-zinc-500 hover:text-charcoal-900 transition-colors block mt-0.5"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-6 border-t border-pearl-200 mt-6 flex flex-col sm:flex-row gap-2.5">
              <a
                href="tel:+77001234567"
                className="flex-1 py-3 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Позвонить</span>
              </a>

              <a
                href="https://yandex.kz/maps/?text=Алматы,+ул.+Панфилова,+98"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-pearl-100 hover:bg-pearl-200 text-charcoal-900 rounded-full text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2 border border-pearl-300"
              >
                <Navigation className="w-3.5 h-3.5 text-zinc-600" />
                <span>Маршрут</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="pt-5 mt-5 border-t border-pearl-200">
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pearl-50 hover:bg-pearl-100 text-charcoal-900 rounded-full border border-pearl-200 text-xs font-medium transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pearl-50 hover:bg-[#25D366]/10 text-charcoal-900 rounded-full border border-pearl-200 text-xs font-medium transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pearl-50 hover:bg-pearl-100 text-charcoal-900 rounded-full border border-pearl-200 text-xs font-medium transition-colors"
                >
                  <span className="text-[10px] font-bold">TT</span>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-pearl-300 shadow-soft overflow-hidden min-h-[400px]">
            <iframe
              title="LUMIÈRE BEAUTY на карте Алматы"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.7770857373854!2d76.9427670766299!3d43.25611297112349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836eb4bb842777%3A0xe543fa0f283c713b!2sul.+Panfilov+98%2C+Almaty+050000%2C+Kazakhstan!5e0!3m2!1sen!2skz!4v1700000000000!5m2!1sen!2skz"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px', filter: 'contrast(98%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
