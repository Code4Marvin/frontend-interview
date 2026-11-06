import { useEffect, useState } from 'react';
import { DayGrid } from './DayGrid';
import { SlotList } from './SlotList';
import { fetchSlots, type Slot } from '../api/mockApi';
import { addMonths, formatLongDate, formatTime, startOfMonth, type DateKey } from '../lib/dates';
import { CalendarContext } from '../context/CalendarContext';
import './BookingWidget.css';

export function BookingWidget() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedKey, setSelectedKey] = useState<DateKey | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedKey) return;

    setIsLoading(true);
    fetchSlots(selectedKey).then((result) => {
      setSlots(result);
      setIsLoading(false);
    });
  }, [selectedKey]);

  const onSelectDay = (key: DateKey) => setSelectedKey(key);
  const onSelectSlot = (slotId: string) => setSelectedSlotId(slotId);
  const onStepMonth = (amount: number) => setMonth((previous) => addMonths(previous, amount));

  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId);

  return (
    <div className="bookingWidget">
      <h1 className="bookingTitle">Book a session</h1>

      <div className="bookingBody">
        <CalendarContext.Provider value={{ selectedKey, selectDay: onSelectDay }}>
          <DayGrid
            month={month}
            onSelectDay={onSelectDay}
            onStepMonth={onStepMonth}
            selectedKey={selectedKey}
          />
        </CalendarContext.Provider>
        <SlotList
          isLoading={isLoading}
          onSelectSlot={onSelectSlot}
          selectedKey={selectedKey}
          selectedSlotId={selectedSlotId}
          slots={slots}
        />
      </div>

      <div className="bookingSummary">
        {selectedSlot && selectedKey ? (
          <p>
            Booking <strong>{formatLongDate(selectedKey)}</strong> at{' '}
            <strong>{formatTime(selectedSlot.startsAt)}</strong> with {selectedSlot.therapist}
          </p>
        ) : (
          <p className="bookingSummaryEmpty">Nothing selected yet</p>
        )}
      </div>
    </div>
  );
}
