import React from 'react';
import { Star, MapPin, Clock, Phone, MessageCircle, Calendar, Activity, CheckCircle2 } from 'lucide-react';

export type DikidiTab = 'booking' | 'services' | 'masters' | 'reviews' | 'portfolio' | 'about' | 'contacts';

interface SalonProfileHeaderProps {
  activeTab: DikidiTab;
  onTabChange: (tab: DikidiTab) => void;
  onOpenMyAppointments: () => void;
  onOpenSalonMatrix: () => void;
  activeAppointmentsCount: number;
}

export const SalonProfileHeader: React.FC<SalonProfileHeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenMyAppointments,
  onOpenSalonMatrix,
  activeAppointmentsCount,
}) => {
  const tabs = [
    { id: 'booking' as DikidiTab, label: 'Онлайн-запись', badge: 'Слоты online' },
    { id: 'services' as DikidiTab, label: 'Услуги и цены', count: '17' },
    { id: 'masters' as DikidiTab, label: 'Специалисты', count: '4' },
    { id: 'reviews' as DikidiTab, label: 'Отзывы', count: '142' },
    { id: 'portfolio' as DikidiTab, label: 'До / После & Фото' },
    { id: 'about' as DikidiTab, label: 'О салоне' },
    { id: 'contacts' as DikidiTab, label: 'Контакты' },
  ];

  return (
    <div className="bg-white border-b border-pearl-300 pt-16 sm:pt-20">
      {/* Top Cover Banner */}
      <div className="relative h-44 sm:h-64 w-full overflow-hidden bg-zinc-900">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=85"
          alt="LUMIÈRE BEAUTY Interior"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-transparent" />

        {/* Live Slot Status Pill */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-charcoal-900 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Свободные окна на сегодня</span>
        </div>
      </div>

      {/* Salon Info Header Card (DIKIDI Style) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="relative -mt-16 sm:-mt-20 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Avatar and Titles */}
            <div className="flex items-end gap-5">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white p-1.5 shadow-xl border border-pearl-200 shrink-0">
                <div className="w-full h-full rounded-2xl bg-charcoal-900 flex flex-col items-center justify-center text-white">
                  <span className="font-serif text-2xl sm:text-3xl tracking-widest font-normal text-champagne-400">
                    LB
                  </span>
                  <span className="text-[8px] uppercase tracking-widest text-zinc-400">
                    Studio
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-normal tracking-tight">
                    Салон красоты LUMIÈRE BEAUTY
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Проверенный партнер</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-500 font-normal">
                  Премиум-студия эстетики и авторского ухода • г. Алматы
                </p>

                {/* Rating & Address Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-1 font-bold text-charcoal-900">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>4.98</span>
                    <span className="text-zinc-400 font-normal">(142 отзыва)</span>
                  </div>

                  <div className="flex items-center gap-1 text-zinc-600">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>пр. Достык 132</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Открыто до 21:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onTabChange('booking')}
                className="px-6 py-3 bg-charcoal-900 hover:bg-zinc-800 text-white rounded-full text-xs uppercase tracking-wider font-semibold shadow-soft hover:shadow-hover transition-all active:scale-95"
              >
                ⚡ Онлайн-запись
              </button>

              <button
                type="button"
                onClick={onOpenMyAppointments}
                className="px-4 py-3 bg-pearl-100 hover:bg-pearl-200 text-charcoal-900 rounded-full text-xs font-semibold border border-pearl-300 transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-champagne-700" />
                <span>Мои записи</span>
                {activeAppointmentsCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-charcoal-900 text-white text-[10px] font-bold">
                    {activeAppointmentsCount}
                  </span>
                )}
              </button>

              <a
                href="https://wa.me/77073124488"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 transition-colors"
                title="Написать в WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </a>

              <a
                href="tel:+77273124488"
                className="p-3 bg-pearl-100 hover:bg-pearl-200 text-zinc-700 rounded-full border border-pearl-300 transition-colors"
                title="Позвонить"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenSalonMatrix}
                className="px-3.5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                title="CRM-пульт загрузки салона"
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CRM</span>
              </button>
            </div>
          </div>
        </div>

        {/* DIKIDI-Style Horizontal Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto border-t border-pearl-200 scrollbar-none py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
                  isActive
                    ? 'border-charcoal-900 text-charcoal-900 bg-pearl-50/80'
                    : 'border-transparent text-zinc-500 hover:text-charcoal-900 hover:bg-pearl-50/50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count && (
                  <span className="text-[10px] text-zinc-400 font-normal">
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full border border-emerald-200">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};