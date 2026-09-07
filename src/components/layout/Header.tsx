import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Главная', href: '#hero' },
    { label: 'О салоне', href: '#about' },
    { label: 'Услуги', href: '#services' },
    { label: 'Мастера', href: '#masters' },
    { label: 'Галерея', href: '#gallery' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Контакты', href: '#contacts' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Active section calculation
      const sections = ['hero', 'about', 'services', 'advantages', 'masters', 'gallery', 'before-after', 'reviews', 'contacts'];
      const scrollPosition = window.scrollY + 200;

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-cream-100/95 backdrop-blur-md shadow-sm border-b border-cream-300'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.25em] text-charcoal-900 group-hover:text-terracotta-500 transition-colors">
            LUMIÈRE
          </span>
          <span className="text-[9px] tracking-[0.35em] uppercase text-charcoal-800/60 font-light -mt-0.5">
            BEAUTY SALON
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
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
                className={`text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 relative py-1 ${
                  isActive ? 'text-terracotta-600' : 'text-charcoal-800/70 hover:text-charcoal-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-terracotta-500 animate-fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-white bg-charcoal-900 hover:bg-terracotta-600 transition-all duration-300 border border-charcoal-900 hover:border-terracotta-600 active:scale-95 shadow-sm"
          >
            Записаться
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="lg:hidden p-2 text-charcoal-900 hover:text-terracotta-600 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[65px] bg-cream-100/98 backdrop-blur-xl border-b border-cream-300 transition-all duration-300 overflow-hidden shadow-2xl ${
          mobileMenuOpen ? 'max-h-[500px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-8 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-serif text-lg text-charcoal-900 hover:text-terracotta-600 py-1 transition-colors border-b border-cream-200"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3 text-xs uppercase tracking-[0.2em] font-semibold text-white bg-charcoal-900 hover:bg-terracotta-600 transition-colors text-center"
            >
              Записаться онлайн
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
