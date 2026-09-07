import { Appointment, TimeSlot, MasterWorkSlot } from '../types';
import { masters } from '../data/masters';

export const SALON_OPEN_HOUR = 9; // 09:00
export const SALON_CLOSE_HOUR = 21; // 21:00

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} мин`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'}`;
  }
  return `${hours} ч ${remainingMinutes} мин`;
}

export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const startMin = timeToMinutes(startTime);
  const endMin = startMin + durationMinutes;
  return minutesToTime(endMin);
}

// Base 30-min candidate slots
export const ALL_BASE_SLOTS: string[] = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

export function getSlotPeriod(time: string): 'morning' | 'afternoon' | 'evening' {
  const [hours] = time.split(':').map(Number);
  if (hours < 12) return 'morning';
  if (hours < 17) return 'afternoon';
  return 'evening';
}

// Check if a time interval conflicts with busy work slots
export function isMasterFree(
  masterId: string,
  date: string,
  startMin: number,
  endMin: number,
  busySlots: MasterWorkSlot[]
): boolean {
  for (const slot of busySlots) {
    if (slot.masterId === masterId && slot.date === date) {
      const busyStart = timeToMinutes(slot.startTime);
      const busyEnd = timeToMinutes(slot.endTime);
      // If intervals overlap
      if (Math.max(startMin, busyStart) < Math.min(endMin, busyEnd)) {
        return false;
      }
    }
  }
  return true;
}

// Generate available slots for a given date, master, and duration
export function generateAvailableSlots(
  date: string,
  masterId: string,
  durationMinutes: number,
  busySlots: MasterWorkSlot[]
): TimeSlot[] {
  const maxEndMinutes = SALON_CLOSE_HOUR * 60; // 21:00 = 1260

  return ALL_BASE_SLOTS.map((time) => {
    const startMin = timeToMinutes(time);
    const endMin = startMin + durationMinutes;
    const endTime = minutesToTime(endMin);
    const period = getSlotPeriod(time);

    // Can slot fit before salon closes?
    if (endMin > maxEndMinutes) {
      return { time, endTime, available: false, period };
    }

    let isAvailable = false;
    if (masterId && masterId !== 'any') {
      isAvailable = isMasterFree(masterId, date, startMin, endMin, busySlots);
    } else {
      // For "any master", is there AT LEAST ONE master who is free for this duration?
      isAvailable = masters.some((m) =>
        isMasterFree(m.id, date, startMin, endMin, busySlots)
      );
    }

    return {
      time,
      endTime,
      available: isAvailable,
      period,
    };
  });
}

// Find earliest available slot across next 7 days
export function findEarliestSlot(
  durationMinutes: number,
  masterId: string,
  busySlots: MasterWorkSlot[]
): { date: string; time: string; masterId: string; masterName: string } | null {
  const now = new Date();

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const checkDate = new Date();
    checkDate.setDate(now.getDate() + dayOffset);
    const dateStr = checkDate.toISOString().split('T')[0];

    const slots = generateAvailableSlots(dateStr, masterId, durationMinutes, busySlots);
    const freeSlot = slots.find((s) => s.available);

    if (freeSlot) {
      let chosenMasterId = masterId;
      let chosenMasterName = 'Любой свободный специалист';

      if (chosenMasterId === 'any' || !chosenMasterId) {
        const startMin = timeToMinutes(freeSlot.time);
        const endMin = startMin + durationMinutes;
        const availableMaster = masters.find((m) =>
          isMasterFree(m.id, dateStr, startMin, endMin, busySlots)
        );
        if (availableMaster) {
          chosenMasterId = availableMaster.id;
          chosenMasterName = availableMaster.name;
        }
      } else {
        const found = masters.find((m) => m.id === chosenMasterId);
        if (found) chosenMasterName = found.name;
      }

      return {
        date: dateStr,
        time: freeSlot.time,
        masterId: chosenMasterId,
        masterName: chosenMasterName,
      };
    }
  }

  return null;
}

// Generate an .ics calendar file for instant import into iOS/Android/Google/Outlook
export function generateICS(appointment: Appointment): string {
  const cleanDate = appointment.date.replace(/-/g, '');
  const [startHour, startMin] = appointment.time.split(':');
  const [endHour, endMin] = appointment.endTime.split(':');

  const startFormatted = `${cleanDate}T${startHour.padStart(2, '0')}${startMin.padStart(2, '0')}00`;
  const endFormatted = `${cleanDate}T${endHour.padStart(2, '0')}${endMin.padStart(2, '0')}00`;

  const serviceNames = appointment.services.map((s) => s.name).join(', ');
  const description = [
    'Запись в салон красоты LUMIÈRE BEAUTY',
    `Процедуры: ${serviceNames}`,
    `Специалист: ${appointment.masterName}`,
    `Сумма к оплате: ${appointment.totalPrice.toLocaleString('ru-RU')} ₸`,
    `Номер брони: ${appointment.id}`,
    'Адрес: г. Алматы, пр. Достык 132',
    'Телефон: +7 (727) 312-44-88'
  ].join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lumiere Beauty Studio//Booking Engine//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${appointment.id}-lumiere@lumiere-beauty.kz`,
    `DTSTAMP:${cleanDate}T120000Z`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:LUMIÈRE BEAUTY — ${appointment.services[0]?.name || 'Запись'}`,
    `DESCRIPTION:${description}`,
    'LOCATION:LUMIÈRE BEAUTY Studio, пр. Достык 132, г. Алматы',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Напоминание о визите в LUMIÈRE BEAUTY',
    'TRIGGER:-PT2H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadICSFile(appointment: Appointment): void {
  const icsData = generateICS(appointment);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `lumiere-booking-${appointment.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function createWhatsAppBookingUrl(appointment: Appointment): string {
  const serviceList = appointment.services.map((s) => `• ${s.name} (${s.formattedPrice})`).join('\n');
  const text = [
    'Здравствуйте! Записываюсь в салон LUMIÈRE BEAUTY:',
    `💎 Номер записи: ${appointment.id}`,
    `📅 Дата: ${appointment.date}`,
    `⏰ Время: ${appointment.time} – ${appointment.endTime}`,
    `👤 Мастер: ${appointment.masterName}`,
    `✨ Выбранные услуги:\n${serviceList}`,
    `💰 Итоговая стоимость: ${appointment.totalPrice.toLocaleString('ru-RU')} ₸`,
    `Имя: ${appointment.clientName}`,
    `Телефон: ${appointment.clientPhone}`,
    'Подтвердите, пожалуйста, бронирование!'
  ].join('\n');

  return `https://wa.me/77073124488?text=${encodeURIComponent(text)}`;
}