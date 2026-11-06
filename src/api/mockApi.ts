import type { DateKey } from '../lib/dates';

export type Slot = {
  id: string;
  startsAt: string;
  therapist: string;
  durationMinutes: number;
};

const THERAPISTS = ['Dr. Amara Osei', 'Dr. Luis Moreno', 'Dr. Priya Raman', 'Dr. Tom Baxter'];
const START_HOURS = [9, 10, 11, 13, 14, 15, 16, 17];

function hashKey(key: DateKey): number {
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) % 100000;
  }
  return hash;
}

export function hasAvailability(key: DateKey): boolean {
  const dayOfMonth = Number(key.slice(8, 10));
  return dayOfMonth % 7 !== 3 && dayOfMonth % 7 !== 5;
}

// Days divisible by 5 respond slowly on purpose -- see SOLUTIONS.md, task 3.
function latencyFor(key: DateKey): number {
  const dayOfMonth = Number(key.slice(8, 10));
  return dayOfMonth % 5 === 0 ? 1800 : 220;
}

function buildSlots(key: DateKey): Slot[] {
  const hash = hashKey(key);
  const count = 3 + (hash % 4);

  return Array.from({ length: count }, (_, index) => {
    const hour = START_HOURS[(hash + index * 3) % START_HOURS.length];
    const minute = (hash + index) % 2 === 0 ? 0 : 30;
    const [year, month, day] = key.split('-').map(Number);
    const startsAt = new Date(year, month - 1, day, hour, minute).toISOString();

    return {
      id: `${key}-${hour}-${minute}`,
      startsAt,
      therapist: THERAPISTS[(hash + index) % THERAPISTS.length],
      durationMinutes: index % 3 === 0 ? 50 : 30,
    };
  }).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function fetchSlots(key: DateKey): Promise<Slot[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(hasAvailability(key) ? buildSlots(key) : []), latencyFor(key));
  });
}
