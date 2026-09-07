import React, { useState, useEffect, useMemo } from 'react';
import { services } from '../../data/services';
import { masters } from '../../data/masters';
import { Service, Appointment } from '../../types';
import { findEarliestSlot, calculateEndTime } from '../../utils/bookingEngine';
import { bookingStore } from '../../utils/bookingStore';

import { BookingStepsBar } from './BookingStepsBar';
import { ServicesStep } from './ServicesStep';
import { MasterStep } from './MasterStep';
import { DateTimeStep } from './DateTimeStep';
import { ClientDataStep } from './ClientDataStep';
import { BookingSuccessStep } from './BookingSuccessStep';

interface AutomatedBookingWizardProps {
  preselectedServiceId?: string;
  preselectedMasterId?: string;
  promoApplied?: boolean;
  onSuccess?: (appointment: Appointment) => void;
  onOpenMyAppointments?: () => void;
}

export const AutomatedBookingWizard: React.FC<AutomatedBookingWizardProps> = ({
  preselectedServiceId,
  preselectedMasterId,
  promoApplied = false,
  onSuccess,
  onOpenMyAppointments,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected state
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedMasterId, setSelectedMasterId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Client form
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientComment, setClientComment] = useState<string>('');
  const [promoCodeInput, setPromoCodeInput] = useState<string>(promoApplied ? 'LUMIERE10' : '');
  const [discountPercent, setDiscountPercent] = useState<number>(promoApplied ? 10 : 0);
  const [promoMessage, setPromoMessage] = useState<string>(promoApplied ? 'Скидка 10% на первый визит активирована' : '');
  const [reminderViaWhatsApp, setReminderViaWhatsApp] = useState<boolean>(true);
  const [agreedToPolicy, setAgreedToPolicy] = useState<boolean>(true);

  // Submission
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Handle preselected service
  useEffect(() => {
    if (preselectedServiceId) {
      const found = services.find((s) => s.id === preselectedServiceId);
      if (found) {
        setSelectedServices((prev) => {
          if (prev.some((s) => s.id === found.id)) return prev;
          return [...prev, found];
        });
      }
    }
  }, [preselectedServiceId]);

  // Handle preselected master
  useEffect(() => {
    if (preselectedMasterId) {
      setSelectedMasterId(preselectedMasterId);
    }
  }, [preselectedMasterId]);

  // Handle promo
  useEffect(() => {
    if (promoApplied) {
      setPromoCodeInput('LUMIERE10');
      setDiscountPercent(10);
      setPromoMessage('Скидка 10% на первый визит активирована');
    }
  }, [promoApplied]);

  // Computed durations and prices
  const totalDurationMinutes = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + (s.durationMinutes || 60), 0);
  }, [selectedServices]);

  const rawTotalPrice = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [selectedServices]);

  const finalTotalPrice = useMemo(() => {
    if (discountPercent <= 0) return rawTotalPrice;
    return Math.round(rawTotalPrice * (1 - discountPercent / 100));
  }, [rawTotalPrice, discountPercent]);

  // Service toggle
  const handleToggleService = (service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
    setSelectedTime('');
  };

  // Smart earliest slot auto-finder
  const handleFindEarliestSlot = () => {
    const dur = totalDurationMinutes > 0 ? totalDurationMinutes : 60;
    const busySlots = bookingStore.getSalonBusySlots();
    const earliest = findEarliestSlot(dur, selectedMasterId, busySlots);
    if (earliest) {
      setSelectedDate(earliest.date);
      setSelectedTime(earliest.time);
      if (selectedMasterId === 'any' && earliest.masterId) {
        setSelectedMasterId(earliest.masterId);
      }
      setCurrentStep(3);
    }
  };

  // Promo code apply
  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'LUMIERE10' || code === 'BEAUTY10' || code === 'FIRST10') {
      setDiscountPercent(10);
      setPromoMessage('Промокод применен: скидка 10%');
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      setPromoMessage('VIP-промокод применен: скидка 20%');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Неверный промокод');
    }
  };

  // Phone input formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('8')) input = '7' + input.slice(1);
    if (!input.startsWith('7') && input.length > 0) input = '7' + input;

    let formatted = '';
    if (input.length > 0) {
      formatted = '+7';
      if (input.length > 1) formatted += ' (' + input.substring(1, 4);
      if (input.length >= 4) formatted += ') ' + input.substring(4, 7);
      if (input.length >= 7) formatted += '-' + input.substring(7, 9);
      if (input.length >= 9) formatted += '-' + input.substring(9, 11);
    }
    setClientPhone(formatted);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  // Submit appointment
  const handleConfirmBooking = () => {
    const newErrors: Record<string, string> = {};

    if (!clientName.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }
    const cleanPhone = clientPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      newErrors.phone = 'Укажите корректный номер телефона (11 цифр)';
    }
    if (!agreedToPolicy) {
      newErrors.agreed = 'Необходимо согласие на обработку данных';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const randomId = 'LUM-' + Math.floor(10000 + Math.random() * 90000);
    const endTime = calculateEndTime(selectedTime, totalDurationMinutes);

    let chosenMasterName = 'Любой свободный специалист';
    let chosenMasterImage = undefined;
    if (selectedMasterId !== 'any') {
      const m = masters.find((item) => item.id === selectedMasterId);
      if (m) {
        chosenMasterName = m.name;
        chosenMasterImage = m.image;
      }
    } else {
      const m = masters[0];
      chosenMasterName = m.name;
      chosenMasterImage = m.image;
    }

    const newAppointment: Appointment = {
      id: randomId,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      serviceIds: selectedServices.map((s) => s.id),
      services: selectedServices,
      masterId: selectedMasterId,
      masterName: chosenMasterName,
      masterImage: chosenMasterImage,
      date: selectedDate,
      time: selectedTime,
      endTime,
      totalDurationMinutes,
      totalPrice: finalTotalPrice,
      discountAmount: rawTotalPrice - finalTotalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      notes: clientComment.trim() || undefined,
      reminderViaWhatsApp,
    };

    setTimeout(() => {
      bookingStore.addAppointment(newAppointment);
      setCreatedAppointment(newAppointment);
      setIsSubmitting(false);
      setCurrentStep(5);
      if (onSuccess) onSuccess(newAppointment);
    }, 600);
  };

  const handleReset = () => {
    setSelectedServices([]);
    setSelectedTime('');
    setCurrentStep(1);
    setCreatedAppointment(null);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-pearl-300 shadow-soft overflow-hidden transition-all">
      {/* Wizard Steps Navigation Bar */}
      <BookingStepsBar currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />

      {/* Step 1: Services Catalog */}
      {currentStep === 1 && (
        <ServicesStep
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onNext={() => setCurrentStep(2)}
          onQuickEarliest={() => {
            if (selectedServices.length === 0) {
              setSelectedServices([services[0]]);
            }
            handleFindEarliestSlot();
          }}
        />
      )}

      {/* Step 2: Master Selection */}
      {currentStep === 2 && (
        <MasterStep
          selectedMasterId={selectedMasterId}
          onSelectMaster={(id) => setSelectedMasterId(id)}
          onBack={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
        />
      )}

      {/* Step 3: Date & Time Dynamic Slots */}
      {currentStep === 3 && (
        <DateTimeStep
          selectedDate={selectedDate}
          onSelectDate={(date) => setSelectedDate(date)}
          selectedTime={selectedTime}
          onSelectTime={(time) => setSelectedTime(time)}
          totalDurationMinutes={totalDurationMinutes}
          selectedMasterId={selectedMasterId}
          onQuickEarliest={handleFindEarliestSlot}
          onBack={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(4)}
        />
      )}

      {/* Step 4: Client Form & Instant Confirmation */}
      {currentStep === 4 && (
        <ClientDataStep
          selectedServices={selectedServices}
          selectedMasterId={selectedMasterId}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          totalDurationMinutes={totalDurationMinutes}
          rawTotalPrice={rawTotalPrice}
          finalTotalPrice={finalTotalPrice}
          discountPercent={discountPercent}
          clientName={clientName}
          clientPhone={clientPhone}
          clientComment={clientComment}
          promoCodeInput={promoCodeInput}
          promoMessage={promoMessage}
          reminderViaWhatsApp={reminderViaWhatsApp}
          agreedToPolicy={agreedToPolicy}
          errors={errors}
          isSubmitting={isSubmitting}
          onChangeName={(name) => {
            setClientName(name);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          onChangePhone={handlePhoneChange}
          onChangeComment={(comment) => setClientComment(comment)}
          onChangePromo={(promo) => setPromoCodeInput(promo)}
          onApplyPromo={handleApplyPromo}
          onChangeWhatsApp={(val) => setReminderViaWhatsApp(val)}
          onChangeAgreed={(val) => {
            setAgreedToPolicy(val);
            if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: '' }));
          }}
          onBack={() => setCurrentStep(3)}
          onSubmit={handleConfirmBooking}
        />
      )}

      {/* Step 5: Automation Hub & Success Screen */}
      {currentStep === 5 && createdAppointment && (
        <BookingSuccessStep
          appointment={createdAppointment}
          onOpenMyAppointments={onOpenMyAppointments}
          onReset={handleReset}
        />
      )}
    </div>
  );
};