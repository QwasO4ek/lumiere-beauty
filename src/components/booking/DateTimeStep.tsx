import React, { useState, useMemo } from 'react';
import { formatDuration, generateAvailableSlots, calculateEndTime } from '../../utils/bookingEngine';
import { bookingStore } from '../../utils/bookingStore';
import { Zap, AlertCircle, ChevronLeft, ArrowRight } from 'lucide-react';

interface DateTimeStepProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  totalDurationMinutes: number;
  selectedMasterId: string;
  onQuickEarliest: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  totalDurationMinutes,
  selectedMasterId,
  onQuickEarliest,
  onBack,
  onNext,
}) => {
  const [slotPeriodFilter, setSlotPeriodFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');

  // Calendar days (next 14 days)
  const calendarDays = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const weekday = d.toLocaleDateString('ru-RU', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('ru-RU', { month: 'short' });
      list.push({ iso, weekday, dayNum, monthName, isToday: i === 0 });
    }
    return list;
  }, []);

  const busySlots = useMemo(() => bookingStore.getSalonBusySlots(), [selectedDate]);

  const timeSlots = useMemo(() => {
    const dur = totalDurationMinutes > 0 ? totalDurationMinutes : 60;
    return generateAvailableSlots(selectedDate, selectedMasterId, dur, busySlots);
  }, [selectedDate, selectedMasterId, totalDurationMinutes, busySlots]);

  const filteredSlots = useMemo(() => {
    if (slotPeriodFilter === 'all') return timeSlots;
    return timeSlots.filter((s) => s.period === slotPeriodFilter);
  }, [timeSlots, slotPeriodFilter]);

  return (
    <div className="p-6 sm:p-10 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
            Дата и время визита
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Длительность процедур: <strong className="text-charcoal-900">{formatDuration(totalDurationMinutes)}</strong>. Отображаются только окна, куда полностью помещается весь комплекс.
          </p>
        </div>

        <button
          type="button"
          onClick={onQuickEarliest}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold transition-all shrink-0"
        >
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span>Автоподбор ближайшего слота</span>
        </button>
      </div>

      {/* Date Picker Carousel */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          Выберите день:
        </label>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {calendarDays.map((day) => {
            const isSelected = selectedDate === day.iso;
            return (
              <button
                key={day.iso}
                type="button"
                onClick={() => {
                  onSelectDate(day.iso);
                  onSelectTime('');
                }}
                className={`flex flex-col items-center justify-center min-w-[70px] py-3.5 px-2 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-sm scale-105'
                    : 'bg-pearl-50 hover:bg-pearl-100 text-zinc-800 border-pearl-200'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold opacity-70">
                  {day.weekday}
                </span>
                <span className="text-lg font-bold my-0.5">
                  {day.dayNum}
                </span>
                <span className="text-[10px] font-medium opacity-80">
                  {day.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Period Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'Все слоты' },
          { id: 'morning', label: 'Утро (09:00 - 12:00)' },
          { id: 'afternoon', label: 'День (12:00 - 17:00)' },
          { id: 'evening', label: 'Вечер (17:00 - 21:00)' },
        ].map((period) => (
          <button
            key={period.id}
            type="button"
            onClick={() => setSlotPeriodFilter(period.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              slotPeriodFilter === period.id
                ? 'bg-charcoal-900 text-white shadow-sm'
                : 'bg-pearl-100 text-zinc-600 hover:text-charcoal-900 hover:bg-pearl-200'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Dynamic Available Slots Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Доступное время начала:
          </label>
          {selectedTime && (
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Окно: {selectedTime} — {calculateEndTime(selectedTime, totalDurationMinutes)}
            </span>
          )}
        </div>

        {filteredSlots.filter((s) => s.available).length === 0 ? (
          <div className="p-8 text-center bg-pearl-50 rounded-2xl border border-pearl-200">
            <AlertCircle className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            <p className="text-sm text-charcoal-900 font-medium">
              На этот день в выбранном диапазоне нет свободных окон на {formatDuration(totalDurationMinutes)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Попробуйте выбрать другой день или нажмите автоподбор
            </p>
            <button
              type="button"
              onClick={onQuickEarliest}
              className="mt-4 px-4 py-2 bg-charcoal-900 text-white text-xs rounded-full font-semibold"
            >
              Найти ближайшее свободное окно
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {filteredSlots.map((slot) => {
              const isSelected = selectedTime === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectTime(slot.time)}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    !slot.available
                      ? 'opacity-25 cursor-not-allowed bg-pearl-100 border-pearl-200 line-through text-zinc-400'
                      : isSelected
                      ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-sm ring-2 ring-charcoal-900/20'
                      : 'bg-white hover:bg-pearl-100 text-charcoal-900 border-pearl-300'
                  }`}
                >
                  <div className="text-sm font-bold tracking-tight">{slot.time}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    до {slot.endTime}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-pearl-200">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 text-xs uppercase tracking-wider font-semibold text-zinc-600 hover:text-charcoal-900 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Назад к мастеру</span>
        </button>

        <button
          type="button"
          disabled={!selectedTime}
          onClick={onNext}
          className="px-7 py-3.5 bg-charcoal-900 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-sm hover:shadow-hover active:scale-95"
        >
          <span>К подтверждению</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};