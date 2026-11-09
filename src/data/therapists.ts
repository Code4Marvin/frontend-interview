export type Therapist = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  yearsExperience: number;
  bio: string;
  freeMinutesByDay: number[];
};

// Tune this if the list renders too fast or too slow on the interview machine.
const DIRECTORY_SIZE = 5000;
const HORIZON_DAYS = 60;

const FIRST_NAMES = [
  'Amara', 'Luis', 'Priya', 'Tom', 'Nadia', 'Ellis', 'Hana', 'Marcus', 'Sofia', 'Dimitri',
  'Yusuf', 'Clara', 'Ravi', 'Ingrid', 'Oscar', 'Leila', 'Jonah', 'Mei', 'Patrick', 'Zara',
  'Felix', 'Anneke', 'Diego', 'Rosa', 'Kwame', 'Elena', 'Simon', 'Aisha', 'Viktor', 'Juno',
  'Omar', 'Greta', 'Theo', 'Nilufar', 'Caleb', 'Saoirse', 'Hugo', 'Imani', 'Martin', 'Delphine',
];

const LAST_NAMES = [
  'Osei', 'Moreno', 'Raman', 'Baxter', 'Lindqvist', 'Okonkwo', 'Takahashi', 'Vega', 'Duarte', 'Novak',
  'Haddad', 'Fontaine', 'Iyer', 'Bergmann', 'Whitfield', 'Karimi', 'Castellanos', 'Nakamura', 'Brennan', 'Petrova',
  'Adeyemi', 'Halvorsen', 'Marchetti', 'Sandoval', 'Mbeki', 'Rousseau', 'Kowalski', 'Farouk', 'Larsson', 'Quintero',
  'Bekele', 'Van Dijk', 'Sorensen', 'Aliyev', 'Donnelly', 'Pires', 'Weiss', 'Thackeray', 'Mikhailov', 'Boateng',
  'Esposito', 'Lindgren', 'Chaudhary', 'Pereira', 'Hollands', 'Nazarov', 'Guerrero', 'Tanaka', 'Fitzgerald', 'Kaur',
];

const SPECIALTIES = [
  'Cognitive Behavioural Therapy',
  'Trauma & PTSD',
  'Couples Counselling',
  'Child & Adolescent',
  'Anxiety Disorders',
  'Grief & Bereavement',
  'Addiction Recovery',
  'Eating Disorders',
  'Workplace Burnout',
  'Sleep & Insomnia',
  'Family Systems',
  'Neurodiversity Support',
];

const BIO_OPENERS = [
  'Works with adults navigating',
  'Supports clients through',
  'Specialises in the treatment of',
  'Offers structured sessions around',
  'Takes a collaborative approach to',
  'Has fifteen years of practice in',
];

const BIO_TOPICS = [
  'anxiety and panic', 'low mood and depression', 'relationship strain', 'workplace stress',
  'disordered sleep', 'bereavement and loss', 'identity and self-esteem', 'chronic pain',
  'trauma recovery', 'parenting pressure', 'health anxiety', 'social withdrawal',
];

const BIO_CLOSERS = [
  'Evening and weekend appointments available.',
  'Accepts self-referrals and GP referrals.',
  'Sessions run online or in person.',
  'Offers a free fifteen minute introductory call.',
  'Currently has a short waiting list.',
  'Works in English and one other language.',
];

const CITIES = [
  'London', 'Manchester', 'Bristol', 'Leeds', 'Edinburgh', 'Glasgow', 'Cardiff', 'Birmingham',
  'Newcastle', 'Brighton', 'Sheffield', 'Nottingham', 'Liverpool', 'Oxford', 'Cambridge', 'Belfast',
];

function seededNext(seed: number): number {
  return (seed * 1664525 + 1013904223) % 4294967296;
}

function buildDirectory(): Therapist[] {
  const directory: Therapist[] = [];
  let seed = 20261108;

  for (let index = 0; index < DIRECTORY_SIZE; index += 1) {
    seed = seededNext(seed);
    const first = FIRST_NAMES[seed % FIRST_NAMES.length];
    seed = seededNext(seed);
    const last = LAST_NAMES[seed % LAST_NAMES.length];
    seed = seededNext(seed);
    const specialty = SPECIALTIES[seed % SPECIALTIES.length];
    seed = seededNext(seed);
    const city = CITIES[seed % CITIES.length];
    seed = seededNext(seed);
    const yearsExperience = 1 + (seed % 30);
    seed = seededNext(seed);
    const opener = BIO_OPENERS[seed % BIO_OPENERS.length];
    seed = seededNext(seed);
    const topicA = BIO_TOPICS[seed % BIO_TOPICS.length];
    seed = seededNext(seed);
    const topicB = BIO_TOPICS[seed % BIO_TOPICS.length];
    seed = seededNext(seed);
    const closer = BIO_CLOSERS[seed % BIO_CLOSERS.length];
    const bio = `${opener} ${topicA}, alongside ${topicB}. ${closer}`;

    const freeMinutesByDay: number[] = [];
    for (let day = 0; day < HORIZON_DAYS; day += 1) {
      seed = seededNext(seed);
      freeMinutesByDay.push(seed % 7 < 2 ? 0 : 30 * (1 + (seed % 9)));
    }

    directory.push({
      id: `t-${index}`,
      name: `Dr. ${first} ${last}`,
      specialty,
      city,
      yearsExperience,
      bio,
      freeMinutesByDay,
    });
  }

  return directory;
}

export const THERAPISTS = buildDirectory();
