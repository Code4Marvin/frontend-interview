import type { DateKey, DayCell } from '../lib/dates';
import { WEEKDAY_LABELS, buildMonthGrid, formatMonthLabel } from '../lib/dates';
import { hasAvailability } from '../api/mockApi';
import './DayGrid.css';

type DayGridProps = {
  month: Date;
  onSelectDay: (key: DateKey) => void;
  onStepMonth: (amount: number) => void;
  selectedKey: DateKey | null;
};

type DayButtonProps = {
  cell: DayCell;
  isSelected: boolean;
  onSelectDay: (key: DateKey) => void;
};

function DayButton({ cell, isSelected, onSelectDay }: DayButtonProps) {
  const isDisabled = cell.isPast || !hasAvailability(cell.key);

  const onClickDay = () => onSelectDay(cell.key);

  const classNames = ['day'];
  if (isSelected) classNames.push('day--selected');
  if (cell.isToday) classNames.push('day--today');

  return (
    <button className={classNames.join(' ')} disabled={isDisabled} onClick={onClickDay} type="button">
      {cell.date.getDate()}
    </button>
  );
}

export function DayGrid({ month, onSelectDay, onStepMonth, selectedKey }: DayGridProps) {
  const cells = buildMonthGrid(month);

  const onClickPreviousMonth = () => onStepMonth(-1);
  const onClickNextMonth = () => onStepMonth(1);

  return (
    <div className="dayGridPanel">
      <div className="monthNav">
        <button aria-label="Previous month" onClick={onClickPreviousMonth} type="button">
          &#8249;
        </button>
        <span className="monthLabel">{formatMonthLabel(month)}</span>
        <button aria-label="Next month" onClick={onClickNextMonth} type="button">
          &#8250;
        </button>
      </div>

      <div className="weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <span className="weekday" key={label}>
            {label}
          </span>
        ))}
      </div>

      <div className="dayGrid">
        {cells.map((cell, index) =>
          cell ? (
            <DayButton
              cell={cell}
              isSelected={cell.key === selectedKey}
              key={cell.key}
              onSelectDay={onSelectDay}
            />
          ) : (
            <span key={`pad-${index}`} />
          ),
        )}
      </div>
    </div>
  );
}
