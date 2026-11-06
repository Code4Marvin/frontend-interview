import { createContext, useContext } from 'react';
import type { DateKey } from '../lib/dates';

export type CalendarContextValue = {
  selectedKey: DateKey | null;
  selectDay: (key: DateKey) => void;
};

export const CalendarContext = createContext<CalendarContextValue>({
  selectedKey: null,
  selectDay: () => {},
});

export function useCalendar() {
  return useContext(CalendarContext);
}
