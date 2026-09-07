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
import { bookingStore } from './utils/bookingStore';

export const App: React.FC = () => {
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

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToBooking();
  };

  const handleSelectMaster = (masterId: string) => {
    setSelectedMasterId(masterId);
    scrollToBooking();
  };

  const handleClaimDiscount = () => {
    setPromoApplied(true);
    scrollToBooking();
  };

  const handleBookingSuccess = () => {
    setToastOpen(true);
    updateAppointmentsCount();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white relative">
      {/* Top Sticky Header */}
      <Header
        onBookClick={scrollToBooking}
        onOpenMyAppointments={() => setIsAppointmentsDrawerOpen(true)}
        onOpenSalonMatrix={() => setIsSalonMatrixOpen(true)}
        activeAppointmentsCount={activeAppointmentsCount}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onBookClick={scrollToBooking}
          onServicesClick={scrollToServices}
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

      {/* Footer */}
      <Footer />

      {/* Floating Utilities */}
      <ScrollToTop />
      <MobileCTA onBookClick={scrollToBooking} />

      {/* Client Appointments Self-Service Portal Drawer */}
      <ClientAppointmentsDrawer
        isOpen={isAppointmentsDrawerOpen}
        onClose={() => setIsAppointmentsDrawerOpen(false)}
        onNewBookingClick={scrollToBooking}
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