import React, { useState } from 'react';
import { Instagram, MessageSquare } from 'lucide-react';
import { Modal } from '../ui/Modal';

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const navLinks = [
    { label: 'Главная', href: '#hero' },
    { label: 'О салоне', href: '#about' },
    { label: 'Услуги', href: '#services' },
    { label: 'Мастера', href: '#masters' },
    { label: 'Галерея', href: '#gallery' },
    { label: 'До/После', href: '#before-after' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <footer className="bg-charcoal-900 text-zinc-300 pt-16 pb-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-charcoal-800">
          {/* Brand & Slogan (Col 1 to 5) */}
          <div className="lg:col-span-5">
            <a href="#hero" className="inline-block mb-4">
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.2em] text-white">
                LUMIÈRE
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-champagne-400 block -mt-0.5">
                BEAUTY STUDIO • ALMATY
              </span>
            </a>
            <p className="font-serif text-zinc-300 text-base sm:text-lg font-light italic max-w-sm mb-6">
              «Красота, в которой ты чувствуешь себя собой»
            </p>
            <p className="text-xs text-zinc-400 font-normal leading-relaxed max-w-sm">
              Премиальное пространство красоты и гармонии в Алматы. Профессиональный уход, ведущие топ-мастера и забота в каждой детали вашего комфорта.
            </p>
          </div>

          {/* Navigation (Col 6 to 8) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-5">
              Навигация
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-zinc-400 hover:text-white transition-colors uppercase tracking-wider font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials (Col 9 to 12) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-5">
              Контакты
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400 font-normal mb-6">
              <p className="text-zinc-200">г. Алматы, ул. Панфилова, 98</p>
              <p>
                <a href="tel:+77001234567" className="hover:text-white transition-colors">
                  +7 (700) 123-45-67
                </a>
              </p>
              <p>
                <a href="mailto:hello@lumiere-beauty.kz" className="hover:text-white transition-colors">
                  hello@lumiere-beauty.kz
                </a>
              </p>
              <p className="text-zinc-500">Пн–Сб: 09:00–21:00 • Вс: 10:00–18:00</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 bg-charcoal-800 hover:bg-zinc-700 text-white rounded-full transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 bg-charcoal-800 hover:bg-[#25D366] text-white rounded-full transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="px-3.5 py-2 bg-charcoal-800 hover:bg-white hover:text-charcoal-900 text-white rounded-full text-xs font-bold transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & privacy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-normal gap-4">
          <p>© 2026 LUMIÈRE BEAUTY. Все права защищены.</p>
          <button
            onClick={() => setPrivacyOpen(true)}
            className="hover:text-white transition-colors underline underline-offset-4"
          >
            Политика конфиденциальности
          </button>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Политика конфиденциальности"
        maxWidth="2xl"
      >
        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
          <p>
            Настоящая Политика конфиденциальности персональных данных действует в отношении всей информации, которую салон красоты «LUMIÈRE BEAUTY» может получить о клиенте во время использования сайта и оформления онлайн-записи.
          </p>
          <h5 className="font-semibold text-charcoal-900 uppercase text-xs tracking-wider pt-2">
            1. Сбор информации
          </h5>
          <p>
            Мы собираем только те данные, которые необходимы для связи с вами и бронирования услуг: ваше имя, контактный номер телефона, выбранная дата, время и процедура.
          </p>
          <h5 className="font-semibold text-charcoal-900 uppercase text-xs tracking-wider pt-2">
            2. Использование данных
          </h5>
          <p>
            Предоставленные данные используются исключительно для подтверждения вашей записи, напоминания о визите и консультации. Мы гарантируем, что данные не передаются третьим лицам и не используются для спам-рассылок.
          </p>
          <h5 className="font-semibold text-charcoal-900 uppercase text-xs tracking-wider pt-2">
            3. Защита данных
          </h5>
          <p>
            Мы принимаем необходимые организационные и технические меры для защиты персональной информации от неправомерного или случайного доступа, изменения или раскрытия.
          </p>
        </div>
      </Modal>
    </footer>
  );
};
