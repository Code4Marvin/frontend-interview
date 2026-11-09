import { useState, type ChangeEvent } from 'react';
import { THERAPISTS, type Therapist } from '../data/therapists';
import './TherapistFinder.css';

type TherapistRowProps = {
  isFavourite: boolean;
  onToggleFavourite: () => void;
  therapist: Therapist;
};

function matchesQuery(therapist: Therapist, needle: string): boolean {
  if (!needle) return true;
  return (
    therapist.name.toLowerCase().includes(needle) ||
    therapist.specialty.toLowerCase().includes(needle) ||
    therapist.city.toLowerCase().includes(needle) ||
    therapist.bio.toLowerCase().includes(needle)
  );
}

function TherapistRow({ isFavourite, onToggleFavourite, therapist }: TherapistRowProps) {
  const nextFreeDay = therapist.freeMinutesByDay.findIndex((minutes) => minutes > 0);
  const totalHours = Math.round(
    therapist.freeMinutesByDay.reduce((sum, minutes) => sum + minutes, 0) / 60,
  );
  const sparkline = therapist.freeMinutesByDay.slice(0, 10);

  return (
    <li className={`therapist ${isFavourite ? 'therapist--favourite' : ''}`}>
      <div className="therapistInfo">
        <span className="therapistName">{therapist.name}</span>
        <span className="therapistSpecialty">{therapist.specialty}</span>
        <span className="therapistBio">{therapist.bio}</span>
      </div>

      <div className="therapistMeta">
        <span>{therapist.city}</span>
        <span>{therapist.yearsExperience} yrs</span>
        <span>{totalHours}h free</span>
        <span>{nextFreeDay === 0 ? 'Free today' : `Next free in ${nextFreeDay} days`}</span>
      </div>

      <div className="therapistSparkline">
        {sparkline.map((minutes, day) => (
          <div
            className="therapistSparkBar"
            key={day}
            style={{ height: `${Math.min(100, (minutes / 300) * 100)}%` }}
          />
        ))}
      </div>

      <button
        aria-pressed={isFavourite}
        className="therapistFavourite"
        onClick={onToggleFavourite}
        type="button"
      >
        {isFavourite ? '★' : '☆'}
      </button>
    </li>
  );
}

export function TherapistFinder() {
  const [query, setQuery] = useState('');
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);

  const needle = query.trim().toLowerCase();
  const matches = THERAPISTS.filter((therapist) => matchesQuery(therapist, needle));

  const onChangeQuery = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const onToggleFavourite = (id: string) => {
    setFavouriteIds((previous) =>
      previous.includes(id) ? previous.filter((other) => other !== id) : [...previous, id],
    );
  };

  return (
    <div className="finder">
      <h1 className="finderTitle">Find a therapist</h1>

      <label className="finderSearch">
        <span className="finderSearchLabel">Search by name, specialty or city</span>
        <input
          className="finderInput"
          onChange={onChangeQuery}
          placeholder="e.g. anxiety, Bristol, Raman"
          type="search"
          value={query}
        />
      </label>

      <p className="finderCount">
        {matches.length} of {THERAPISTS.length} therapists &middot; {favouriteIds.length} saved
      </p>

      <ul className="therapistList">
        {matches.map((therapist) => (
          <TherapistRow
            isFavourite={favouriteIds.includes(therapist.id)}
            key={therapist.id}
            onToggleFavourite={() => onToggleFavourite(therapist.id)}
            therapist={therapist}
          />
        ))}
      </ul>
    </div>
  );
}
