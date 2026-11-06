export type DateKey = string;

export type DayCell = {
  date: Date;
  key: DateKey;
  isToday: boolean;
  isPast: boolean;
};

export function toDateKey(date: Date): DateKey {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromDateKey(key: DateKey): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatLongDate(key: DateKey): string {
  return fromDateKey(key).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatMonthLabel(month: Date): string {
  return month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(month: Date, amount: number): Date {
  return new Date(month.getFullYear(), month.getMonth() + amount, 1);
}

export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Leading nulls pad the first row so the 1st lands under the right weekday.
export function buildMonthGrid(month: Date): (DayCell | null)[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const dayCount = new Date(year, monthIndex + 1, 0).getDate();

  const todayKey = toDateKey(new Date());
  const cells: (DayCell | null)[] = Array.from({ length: firstWeekday }, () => null);

  for (let dayOfMonth = 1; dayOfMonth <= dayCount; dayOfMonth += 1) {
    const date = new Date(year, monthIndex, dayOfMonth);
    const key = toDateKey(date);
    cells.push({ date, key, isToday: key === todayKey, isPast: key < todayKey });
  }

  return cells;
}
