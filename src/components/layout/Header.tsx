import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Calendar, Activity } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
  onOpenMyAppointments?: () => void;
  onOpenSalonMatrix?: () => void;
  activeAppointmentsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onBookClick,
  onOpenMyAppointments,
  onOpenSalonMatrix,
  activeAppointmentsCount = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'О салоне', href: '#about' },
    { label: 'Услуги', href: '#services' },
    { label: 'Мастера', href: '#masters' },
    { label: 'Галерея', href: '#gallery' },
    { label: 'До/После', href: '#before-after' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Контакты', href: '#contacts' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'services', 'advantages', 'masters', 'gallery', 'before-after', 'reviews', 'contacts'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-pearl-300 shadow-soft'
          : 'py-5 bg-white/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2 focus:outline-none shrink-0"
        >
          <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.18em] text-charcoal-900 group-hover:text-champagne-600 transition-colors">
            LUMIÈRE
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium pl-2 border-l border-pearl-300">
            Beauty Studio
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-pearl-100/90 p-1.5 rounded-full border border-pearl-300 shadow-sm">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-charcoal-900 shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-charcoal-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* CRM Pulse / Salon live mode */}
          {onOpenSalonMatrix && (
            <button
              type="button"
              onClick={onOpenSalonMatrix}
              title="Открыть пульт автоматизации расписания мастеров"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-full text-xs font-semibold text-emerald-800 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>CRM</span>
            </button>
          )}

          {/* Client My Bookings Button */}
          {onOpenMyAppointments && (
            <button
              type="button"
              onClick={onOpenMyAppointments}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-pearl-100 hover:bg-pearl-200 text-charcoal-900 rounded-full text-xs font-semibold border border-pearl-300 transition-colors relative"
            >
              <Calendar className="w-3.5 h-3.5 text-champagne-700" />
              <span>Мои записи</span>
              {activeAppointmentsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-charcoal-900 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAppointmentsCount}
                </span>
              )}
            </button>
          )}

          {/* Main Book CTA */}
          <button
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-charcoal-900 hover:bg-zinc-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-hover active:scale-95"
          >
            <span>Записаться</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="xl:hidden p-2 rounded-lg text-charcoal-900 hover:bg-pearl-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden fixed inset-x-0 top-[61px] bg-white/98 backdrop-blur-2xl border-b border-pearl-300 transition-all duration-300 overflow-hidden shadow-2xl ${
          mobileMenuOpen ? 'max-h-[550px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 space-y-2.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-medium text-base text-charcoal-900 hover:text-champagne-600 py-2 transition-colors border-b border-pearl-200 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-zinc-400 text-xs">→</span>
            </a>
          ))}

          <div className="pt-3 space-y-2">
            {onOpenMyAppointments && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="w-full py-3 bg-pearl-100 hover:bg-pearl-200 text-charcoal-900 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 border border-pearl-300"
              >
                <Calendar className="w-4 h-4 text-champagne-700" />
                <span>Мои записи ({activeAppointmentsCount})</span>
              </button>
            )}

            {onOpenSalonMatrix && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSalonMatrix();
                }}
                className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 border border-emerald-200"
              >
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Пульт автоматизации салона (CRM)</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3.5 text-xs uppercase tracking-wider font-semibold text-white bg-charcoal-900 hover:bg-zinc-800 rounded-full transition-colors text-center shadow-md"
            >
              Записаться онлайн
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};