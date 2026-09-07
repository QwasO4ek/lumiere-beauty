import { Appointment, MasterWorkSlot } from '../types';
import { masters } from '../data/masters';
import { services } from '../data/services';

const USER_STORAGE_KEY = 'lumiere_user_appointments_v1';
const SALON_SLOTS_KEY = 'lumiere_salon_slots_v1';

// Format helper to get YYYY-MM-DD
export function getRelativeDateString(dayOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return d.toISOString().split('T')[0];
}

// Pre-seeded realistic appointments for masters to simulate active salon load
function getInitialSalonBusySlots(): MasterWorkSlot[] {
  const today = getRelativeDateString(0);
  const tomorrow = getRelativeDateString(1);
  const dayAfter = getRelativeDateString(2);

  return [
    // Today
    { masterId: 'master-alina', masterName: 'Алина Воронова', date: today, startTime: '11:00', endTime: '14:30', clientName: 'Камилла С.', serviceName: 'Сложное окрашивание' },
    { masterId: 'master-alina', masterName: 'Алина Воронова', date: today, startTime: '16:00', endTime: '17:00', clientName: 'Асель М.', serviceName: 'Стрижка женская' },
    { masterId: 'master-maria', masterName: 'Мария Ким', date: today, startTime: '10:00', endTime: '11:30', clientName: 'Елена В.', serviceName: 'Покрытие гель-лак' },
    { masterId: 'master-maria', masterName: 'Мария Ким', date: today, startTime: '14:00', endTime: '15:15', clientName: 'Динара Т.', serviceName: 'Smart-педикюр' },
    { masterId: 'master-diana', masterName: 'Диана Сабитова', date: today, startTime: '12:00', endTime: '13:00', clientName: 'Айгерим К.', serviceName: 'Ламинирование ресниц' },
    { masterId: 'master-diana', masterName: 'Диана Сабитова', date: today, startTime: '17:00', endTime: '17:40', clientName: 'Жанна Р.', serviceName: 'Архитектура бровей' },
    { masterId: 'master-sofia', masterName: 'София Левина', date: today, startTime: '13:00', endTime: '14:15', clientName: 'Индира Н.', serviceName: 'Вечерний макияж' },

    // Tomorrow
    { masterId: 'master-alina', masterName: 'Алина Воронова', date: tomorrow, startTime: '10:00', endTime: '11:00', clientName: 'Зарина К.', serviceName: 'Стрижка женская' },
    { masterId: 'master-alina', masterName: 'Алина Воронова', date: tomorrow, startTime: '14:00', endTime: '15:30', clientName: 'Ольга Б.', serviceName: 'Лечение Lebel' },
    { masterId: 'master-maria', masterName: 'Мария Ким', date: tomorrow, startTime: '11:30', endTime: '13:00', clientName: 'Виктория С.', serviceName: 'Маникюр + Покрытие' },
    { masterId: 'master-maria', masterName: 'Мария Ким', date: tomorrow, startTime: '16:00', endTime: '17:30', clientName: 'Алуа С.', serviceName: 'Покрытие гель-лак' },
    { masterId: 'master-diana', masterName: 'Диана Сабитова', date: tomorrow, startTime: '14:30', endTime: '15:30', clientName: 'Мадина М.', serviceName: 'Ламинирование ресниц' },
    { masterId: 'master-sofia', masterName: 'София Левина', date: tomorrow, startTime: '15:00', endTime: '17:00', clientName: 'Сабина Ю.', serviceName: 'Свадебный образ' },

    // Day After
    { masterId: 'master-alina', masterName: 'Алина Воронова', date: dayAfter, startTime: '12:00', endTime: '15:30', clientName: 'Гульнара Т.', serviceName: 'Сложное окрашивание' },
    { masterId: 'master-maria', masterName: 'Мария Ким', date: dayAfter, startTime: '10:00', endTime: '11:15', clientName: 'Анель Д.', serviceName: 'Smart-педикюр' },
  ];
}

// Pre-seeded sample appointment for client demo
function getInitialUserAppointments(): Appointment[] {
  const tomorrow = getRelativeDateString(1);
  const sampleService = services.find((s) => s.id === 'hair-cut') || services[0];
  const sampleMaster = masters[0];

  return [
    {
      id: 'LUM-84920',
      clientName: 'Алина Гость',
      clientPhone: '+7 (705) 912-34-56',
      serviceIds: [sampleService.id],
      services: [sampleService],
      masterId: sampleMaster.id,
      masterName: sampleMaster.name,
      masterImage: sampleMaster.image,
      date: tomorrow,
      time: '12:00',
      endTime: '13:00',
      totalDurationMinutes: 60,
      totalPrice: sampleService.price,
      discountAmount: 0,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      notes: 'Просьба подготовить чай с мятой',
      reminderViaWhatsApp: true,
    }
  ];
}

export const bookingStore = {
  // Get all user appointments
  getUserAppointments(): Appointment[] {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (!stored) {
        const initial = getInitialUserAppointments();
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  // Save new user appointment
  addAppointment(appointment: Appointment): void {
    const list = this.getUserAppointments();
    const updated = [appointment, ...list.filter((a) => a.id !== appointment.id)];
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));

    // Also register in salon busy slots so nobody can double-book this time
    this.addSalonBusySlot({
      masterId: appointment.masterId,
      masterName: appointment.masterName,
      date: appointment.date,
      startTime: appointment.time,
      endTime: appointment.endTime,
      clientName: appointment.clientName,
      serviceName: appointment.services.map((s) => s.name).join(', '),
    });

    window.dispatchEvent(new Event('lumiere_appointments_updated'));
  },

  // Cancel appointment
  cancelAppointment(appointmentId: string): void {
    const list = this.getUserAppointments();
    const target = list.find((a) => a.id === appointmentId);
    if (!target) return;

    const updated = list.map((a) =>
      a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a
    );
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));

    // Remove slot from salon busy slots
    const slots = this.getSalonBusySlots().filter(
      (s) => !(s.masterId === target.masterId && s.date === target.date && s.startTime === target.time)
    );
    localStorage.setItem(SALON_SLOTS_KEY, JSON.stringify(slots));

    window.dispatchEvent(new Event('lumiere_appointments_updated'));
  },

  // Reschedule appointment
  rescheduleAppointment(appointmentId: string, newDate: string, newTime: string, newEndTime: string): void {
    const list = this.getUserAppointments();
    const target = list.find((a) => a.id === appointmentId);
    if (!target) return;

    // Free old slot
    const slots = this.getSalonBusySlots().filter(
      (s) => !(s.masterId === target.masterId && s.date === target.date && s.startTime === target.time)
    );

    // Book new slot
    slots.push({
      masterId: target.masterId,
      masterName: target.masterName,
      date: newDate,
      startTime: newTime,
      endTime: newEndTime,
      clientName: target.clientName,
      serviceName: target.services.map((s) => s.name).join(', '),
    });
    localStorage.setItem(SALON_SLOTS_KEY, JSON.stringify(slots));

    const updated = list.map((a) =>
      a.id === appointmentId
        ? { ...a, date: newDate, time: newTime, endTime: newEndTime, status: 'confirmed' as const }
        : a
    );
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(new Event('lumiere_appointments_updated'));
  },

  // Get salon busy slots
  getSalonBusySlots(): MasterWorkSlot[] {
    try {
      const stored = localStorage.getItem(SALON_SLOTS_KEY);
      if (!stored) {
        const initial = getInitialSalonBusySlots();
        localStorage.setItem(SALON_SLOTS_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(stored);
    } catch {
      return getInitialSalonBusySlots();
    }
  },

  // Add a slot to salon busy slots
  addSalonBusySlot(slot: MasterWorkSlot): void {
    const slots = this.getSalonBusySlots();
    slots.push(slot);
    localStorage.setItem(SALON_SLOTS_KEY, JSON.stringify(slots));
    window.dispatchEvent(new Event('lumiere_appointments_updated'));
  }
};