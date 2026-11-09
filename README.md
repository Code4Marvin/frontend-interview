# Booking Widget — Frontend Exercise

A small appointment booking widget: pick a day on the left, pick a time slot on the right.

It mostly works. It also has a few problems.

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Ground rules

- **This is intentionally longer than the time we have.** We don't expect you to finish.
  We're far more interested in how you approach the problems than in how many you close.
- Think out loud. Tell us what you suspect before you go looking.
- Google, the docs, and your usual tooling are all fair game.
- Ask us questions. We'd rather you ask than guess silently.

## Where things live

```
src/
  api/mockApi.ts        fake backend (network latency is simulated)
  lib/dates.ts          date helpers
  context/
    CalendarContext.tsx selected-day context
  data/therapists.ts    5,000-row therapist directory (generated, deterministic)
  components/
    BookingWidget.tsx   top-level state
    DayGrid.tsx         month grid + day selection
    SlotList.tsx        time slots for the selected day
    TherapistFinder.tsx the "Find a therapist" tab
```

The two tabs at the top of the page are separate exercises. Tasks 1-4 are the booking
widget; task 5 is the therapist finder.

## Tasks

Work through these in order.

### 1. The calendar grid doesn't line up

At a glance it looks like a calendar, but the dates are in the wrong columns. Navigate to
December 2026: the 1st is a Tuesday, yet it renders under SUN, and each row holds six days
instead of seven.

Days should sit in seven columns, with the weekday headers lined up above them and each
day fitting inside its column.

### 2. Finish the context migration

`DayGrid` takes `selectedKey` and `onSelectDay`, but it never uses either one — it only
forwards them down to `DayButton`.

Someone started cleaning this up: `src/context/CalendarContext.tsx` exists, and
`BookingWidget` already wraps `DayGrid` in the provider. Nothing consumes it yet.

Rewire `DayButton` to read the selected day and the select handler from the context, and
remove the props that become dead once it does.

Expect a few questions afterwards about when you'd reach for context and when you wouldn't.

### 3. Selection leaks between days

Two things go wrong when you switch days:

- Expand **Details** on a slot, then switch to a different day — the details stay open on
  whatever slot happens to be in the same position.
- Select a time, then switch to the 20th. While the new day loads, the summary at the
  bottom pairs the **new** date with the **old** time and therapist.

Fix both. Expect to explain what React is doing here.

### 4. Stretch — the calendar needs a mouse

Put the mouse down and book a session using only the keyboard, starting from the top of
the page. Some of our clients use a screen reader, so assume that matters too.

Tell us what you run into and how you would fix each thing. You almost certainly won't
have time to implement it — we are after the diagnosis, not the patch.

### 5. The therapist finder lags while you type

Switch to the **Find a therapist** tab and search for something broad — `anxiety`, or just
the letter `a`. Typing is visibly behind your fingers: characters land in bursts instead of
as you press them. Clicking the ★ on a row is slow in the same way, even though nothing
about the search has changed.

Diagnose it first, out loud, before you touch anything.

Then fix it. Say what you expect each change to buy *before* you make it, and measure
afterwards — we're at least as interested in whether your prediction held as in the final
number.
