import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Advantages } from './components/sections/Advantages';
import { Masters } from './components/sections/Masters';
import { Gallery } from './components/sections/Gallery';
import { BeforeAfter } from './components/sections/BeforeAfter';
import { Reviews } from './components/sections/Reviews';
import { PromoBlock } from './components/sections/PromoBlock';
import { Booking } from './components/sections/Booking';
import { Contacts } from './components/sections/Contacts';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { MobileCTA } from './components/ui/MobileCTA';
import { Toast } from './components/ui/Toast';
import { ClientAppointmentsDrawer } from './components/booking/ClientAppointmentsDrawer';
import { SalonLiveMatrixModal } from './components/booking/SalonLiveMatrixModal';
import { AutomatedBookingWizard } from './components/booking/AutomatedBookingWizard';
import { SalonProfileHeader, DikidiTab } from './components/dikidi/SalonProfileHeader';
import { bookingStore } from './utils/bookingStore';
import { LayoutGrid, Layers, Sparkles, Shield, Coffee, Clock } from 'lucide-react';

export const App: React.FC = () => {
  // Mode: 'app' (DIKIDI-style application view, DEFAULT) or 'landing' (full scroll)
  const [viewMode, setViewMode] = useState<'app' | 'landing'>('app');
  const [activeTab, setActiveTab] = useState<DikidiTab>('booking');

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedMasterId, setSelectedMasterId] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  // Modals & Drawer state
  const [isAppointmentsDrawerOpen, setIsAppointmentsDrawerOpen] = useState<boolean>(false);
  const [isSalonMatrixOpen, setIsSalonMatrixOpen] = useState<boolean>(false);
  const [activeAppointmentsCount, setActiveAppointmentsCount] = useState<number>(0);

  const updateAppointmentsCount = () => {
    const list = bookingStore.getUserAppointments();
    const confirmed = list.filter((a) => a.status === 'confirmed');
    setActiveAppointmentsCount(confirmed.length);
  };

  useEffect(() => {
    updateAppointmentsCount();
    window.addEventListener('lumiere_appointments_updated', updateAppointmentsCount);
    return () => window.removeEventListener('lumiere_appointments_updated', updateAppointmentsCount);
  }, []);

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveTab('booking');
    if (viewMode === 'landing') {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMaster = (masterId: string) => {
    setSelectedMasterId(masterId);
    setActiveTab('booking');
    if (viewMode === 'landing') {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClaimDiscount = () => {
    setPromoApplied(true);
    setActiveTab('booking');
    if (viewMode === 'landing') {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = () => {
    setToastOpen(true);
    updateAppointmentsCount();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white relative">
      {/* Top Header */}
      <Header
        onBookClick={() => {
          setActiveTab('booking');
          if (viewMode === 'landing') {
            const el = document.getElementById('booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenMyAppointments={() => setIsAppointmentsDrawerOpen(true)}
        onOpenSalonMatrix={() => setIsSalonMatrixOpen(true)}
        activeAppointmentsCount={activeAppointmentsCount}
      />

      {/* Floating View Switcher: DIKIDI App Mode vs Full Landing */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-charcoal-900/95 backdrop-blur-xl text-white p-1.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-1 text-xs">
        <button
          type="button"
          onClick={() => setViewMode('app')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all ${
            viewMode === 'app'
              ? 'bg-white text-charcoal-900 font-bold shadow-sm'
              : 'text-zinc-300 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Режим DIKIDI (App)</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('landing')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all ${
            viewMode === 'landing'
              ? 'bg-white text-charcoal-900 font-bold shadow-sm'
              : 'text-zinc-300 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Полный лендинг</span>
        </button>
      </div>

      {/* MAIN VIEW CONTENT */}
      {viewMode === 'app' ? (
        /* DIKIDI-STYLE PLATFORM APPLICATION VIEW */
        <main className="flex-1">
          {/* Company Profile Header with Tabs */}
          <SalonProfileHeader
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            onOpenMyAppointments={() => setIsAppointmentsDrawerOpen(true)}
            onOpenSalonMatrix={() => setIsSalonMatrixOpen(true)}
            activeAppointmentsCount={activeAppointmentsCount}
          />

          {/* Tab Views */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
            {activeTab === 'booking' && (
              <div className="space-y-12">
                <div className="max-w-4xl mx-auto">
                  <AutomatedBookingWizard
                    preselectedServiceId={selectedServiceId}
                    preselectedMasterId={selectedMasterId}
                    promoApplied={promoApplied}
                    onSuccess={handleBookingSuccess}
                    onOpenMyAppointments={() => setIsAppointmentsDrawerOpen(true)}
                  />
                </div>

                {/* Trust & Guarantee Cards */}
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-pearl-50 border border-pearl-200 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-champagne-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-charcoal-900">100% Стерильность</div>
                      <div className="text-zinc-500 text-[11px]">Крафт-пакеты, СанПиН</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-pearl-50 border border-pearl-200 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-champagne-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-charcoal-900">Люкс-косметика</div>
                      <div className="text-zinc-500 text-[11px]">Lebel, Davines, Kérastase</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-pearl-50 border border-pearl-200 flex items-center gap-3">
                    <Coffee className="w-5 h-5 text-champagne-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-charcoal-900">Welcome-бар</div>
                      <div className="text-zinc-500 text-[11px]">Кофе, матча, игристое</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-pearl-50 border border-pearl-200 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-champagne-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-charcoal-900">Без задержек</div>
                      <div className="text-zinc-500 text-[11px]">Точный тайминг визита</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <Services onSelectService={handleSelectService} />
            )}

            {activeTab === 'masters' && (
              <Masters onSelectMaster={handleSelectMaster} />
            )}

            {activeTab === 'reviews' && (
              <Reviews />
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-16">
                <BeforeAfter />
                <Gallery />
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-16">
                <About />
                <Advantages />
              </div>
            )}

            {activeTab === 'contacts' && (
              <Contacts />
            )}
          </div>
        </main>
      ) : (
        /* FULL EDITORIAL LANDING PAGE VIEW */
        <main className="flex-1">
          <Hero
            onBookClick={() => {
              const el = document.getElementById('booking');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onServicesClick={() => {
              const el = document.getElementById('services');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <About />
          <Services onSelectService={handleSelectService} />
          <Advantages />
          <Masters onSelectMaster={handleSelectMaster} />
          <Gallery />
          <BeforeAfter />
          <Reviews />
          <PromoBlock onClaimDiscount={handleClaimDiscount} />
          <Booking
            preselectedServiceId={selectedServiceId}
            preselectedMasterId={selectedMasterId}
            promoApplied={promoApplied}
            onSuccess={handleBookingSuccess}
            onOpenMyAppointments={() => setIsAppointmentsDrawerOpen(true)}
            onOpenSalonMatrix={() => setIsSalonMatrixOpen(true)}
          />
          <Contacts />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating Utilities */}
      <ScrollToTop />
      <MobileCTA
        onBookClick={() => {
          setActiveTab('booking');
          if (viewMode === 'landing') {
            const el = document.getElementById('booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Client Appointments Self-Service Portal Drawer */}
      <ClientAppointmentsDrawer
        isOpen={isAppointmentsDrawerOpen}
        onClose={() => setIsAppointmentsDrawerOpen(false)}
        onNewBookingClick={() => {
          setActiveTab('booking');
          if (viewMode === 'landing') {
            const el = document.getElementById('booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Salon Live Schedule & CRM Matrix Modal */}
      <SalonLiveMatrixModal
        isOpen={isSalonMatrixOpen}
        onClose={() => setIsSalonMatrixOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        show={toastOpen}
        message="Запись успешно создана и подтверждена!"
        subMessage="Слот забронирован. Детали доступны в разделе «Мои записи» и выгружены в ваш календарь."
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
};

export default App;