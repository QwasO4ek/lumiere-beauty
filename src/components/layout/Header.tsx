import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
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
          className="group flex items-center gap-2 focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.18em] text-charcoal-900 group-hover:text-champagne-600 transition-colors">
            LUMIÈRE
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium pl-2 border-l border-pearl-300">
            Beauty Studio
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-pearl-100/90 p-1.5 rounded-full border border-pearl-300 shadow-sm">
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
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
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

        {/* Right CTA Actions */}
        <div className="flex items-center gap-4">
          {/* Live Slot Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-[11px] text-emerald-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Свободные окна на сегодня</span>
          </div>

          <button
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-charcoal-900 hover:bg-zinc-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-hover active:scale-95"
          >
            <span>Записаться</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="lg:hidden p-2 rounded-lg text-charcoal-900 hover:bg-pearl-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[61px] bg-white/98 backdrop-blur-2xl border-b border-pearl-300 transition-all duration-300 overflow-hidden shadow-2xl ${
          mobileMenuOpen ? 'max-h-[500px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 space-y-3">
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
          <div className="pt-3">
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
