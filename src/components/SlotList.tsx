import { useState } from 'react';
import type { Slot } from '../api/mockApi';
import type { DateKey } from '../lib/dates';
import { formatLongDate, formatTime } from '../lib/dates';
import './SlotList.css';

type SlotListProps = {
  isLoading: boolean;
  onSelectSlot: (slotId: string) => void;
  selectedKey: DateKey | null;
  selectedSlotId: string | null;
  slots: Slot[];
};

type SlotRowProps = {
  isSelected: boolean;
  onSelectSlot: (slotId: string) => void;
  slot: Slot;
};

function SlotRow({ isSelected, onSelectSlot, slot }: SlotRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClickSlot = () => onSelectSlot(slot.id);
  const onClickDetails = () => setIsExpanded((previous) => !previous);

  return (
    <li className={`slot ${isSelected ? 'slot--selected' : ''}`}>
      <button className="slotMain" onClick={onClickSlot} type="button">
        {formatTime(slot.startsAt)}
      </button>
      <button className="slotDetailsToggle" onClick={onClickDetails} type="button">
        {isExpanded ? 'Hide' : 'Details'}
      </button>
      {isExpanded && (
        <p className="slotDetails">
          {slot.therapist} &middot; {slot.durationMinutes} min
        </p>
      )}
    </li>
  );
}

export function SlotList({ isLoading, onSelectSlot, selectedKey, selectedSlotId, slots }: SlotListProps) {
  if (!selectedKey) {
    return (
      <div className="slotPanel">
        <p className="slotEmpty">Pick a day to see available time slots</p>
      </div>
    );
  }

  return (
    <div className="slotPanel">
      <h2 className="slotHeading">{formatLongDate(selectedKey)}</h2>

      {isLoading && <p className="slotEmpty">Loading slots&hellip;</p>}

      {!isLoading && slots.length === 0 && <p className="slotEmpty">No availability on this day</p>}

      {slots.length > 0 && (
        <ul className="slotList">
          {slots.map((slot, index) => (
            <SlotRow
              isSelected={slot.id === selectedSlotId}
              key={index}
              onSelectSlot={onSelectSlot}
              slot={slot}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
