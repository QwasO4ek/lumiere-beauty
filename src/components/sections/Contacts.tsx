import { MapPin, Phone, Clock, Navigation, MessageSquare, Instagram } from 'lucide-react';

export const Contacts: React.FC = () => {
  const address = 'г. Алматы, ул. Панфилова, 98';
  const phone = '+7 (700) 123-45-67';
  const email = 'hello@lumiere-beauty.kz';

  return (
    <section id="contacts" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <span className="w-8 h-[1px] bg-terracotta-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-600 font-semibold">
              Контакты
            </span>
            <span className="w-8 h-[1px] bg-terracotta-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-900 tracking-tight mb-4">
            Мы ждём вас
          </h2>
          <p className="text-base text-charcoal-800/70 font-light">
            Уютное пространство в историческом и культурном сердце Алматы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Info Card (Columns 1 to 5) */}
          <div className="lg:col-span-5 bg-cream-50 p-8 sm:p-12 border border-cream-300 shadow-luxury flex flex-col justify-between">
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-terracotta-600 border border-cream-300 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-1">
                    Наш адрес
                  </h4>
                  <p className="text-sm sm:text-base text-charcoal-800 font-normal">
                    {address}
                  </p>
                  <p className="text-xs text-charcoal-800/60 font-light mt-0.5">
                    Пешеходная зона, 2 минуты от метро «Алмалы»
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-terracotta-600 border border-cream-300 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-1">
                    Время работы
                  </h4>
                  <p className="text-sm text-charcoal-800">
                    <strong className="font-medium">Пн–Сб:</strong> 09:00 – 21:00
                  </p>
                  <p className="text-sm text-charcoal-800 mt-0.5">
                    <strong className="font-medium">Вс:</strong> 10:00 – 18:00
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-terracotta-600 border border-cream-300 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal-900 mb-1">
                    Телефон для связи
                  </h4>
                  <a
                    href="tel:+77001234567"
                    className="text-base text-charcoal-900 font-medium hover:text-terracotta-600 transition-colors block"
                  >
                    {phone}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs text-charcoal-800/60 hover:text-terracotta-600 transition-colors block mt-1"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-8 border-t border-cream-300 mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+77001234567"
                className="flex-1 py-3.5 bg-charcoal-900 hover:bg-terracotta-600 text-white text-xs uppercase tracking-[0.16em] font-semibold text-center transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Позвонить</span>
              </a>

              <a
                href="https://yandex.kz/maps/?text=Алматы,+ул.+Панфилова,+98"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 text-xs uppercase tracking-[0.16em] font-semibold text-center transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-terracotta-600" />
                <span>Маршрут</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-6 mt-6 border-t border-cream-200">
              <p className="text-[11px] uppercase tracking-widest text-charcoal-800/60 font-semibold mb-3">
                Мы в социальных сетях:
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-terracotta-500 hover:text-white text-charcoal-900 border border-cream-300 text-xs font-medium transition-all"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#25D366] hover:text-white text-charcoal-900 border border-cream-300 text-xs font-medium transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-charcoal-900 hover:text-white text-charcoal-900 border border-cream-300 text-xs font-medium transition-all"
                >
                  <span className="text-[10px] font-bold">TT</span>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed (Columns 6 to 12) */}
          <div className="lg:col-span-7 bg-cream-200 border border-cream-300 shadow-luxury relative min-h-[420px] overflow-hidden">
            <iframe
              title="LUMIÈRE BEAUTY на карте Алматы"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.7770857373854!2d76.9427670766299!3d43.25611297112349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836eb4bb842777%3A0xe543fa0f283c713b!2sul.+Panfilov+98%2C+Almaty+050000%2C+Kazakhstan!5e0!3m2!1sen!2skz!4v1700000000000!5m2!1sen!2skz"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px', filter: 'grayscale(15%) contrast(95%)' }}
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
