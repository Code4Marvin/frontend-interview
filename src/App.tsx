import { useState } from 'react';
import { BookingWidget } from './components/BookingWidget';
import { TherapistFinder } from './components/TherapistFinder';
import './App.css';

type View = 'booking' | 'finder';

export default function App() {
  const [view, setView] = useState<View>('booking');

  const onClickBooking = () => setView('booking');
  const onClickFinder = () => setView('finder');

  return (
    <>
      <nav className="appNav">
        <button
          className={`appNavTab ${view === 'booking' ? 'appNavTab--active' : ''}`}
          onClick={onClickBooking}
          type="button"
        >
          Book a session
        </button>
        <button
          className={`appNavTab ${view === 'finder' ? 'appNavTab--active' : ''}`}
          onClick={onClickFinder}
          type="button"
        >
          Find a therapist
        </button>
      </nav>

      {view === 'booking' ? <BookingWidget /> : <TherapistFinder />}
    </>
  );
}
