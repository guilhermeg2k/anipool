import { DatePickerView } from './DateTimePicker';
import {
  getMonthDays,
  getMonthWeeks,
  getWeekDaysName,
} from './dateTimePickerUtils';

interface DaySelectorProps {
  date: Date;
  onChangeDate: (date: Date) => void;
  onChangeView: (view: DatePickerView) => void;
}

const DaySelector = ({
  date,
  onChangeDate,
  onChangeView,
}: DaySelectorProps) => {
  const monthDays = getMonthDays(date);
  const monthWeeks = getMonthWeeks(monthDays);
  const weekDayNames = getWeekDaysName();

  const onMonthYearButtonClickHandler = () => {
    onChangeView(DatePickerView.MONTH_SELECTOR);
  };

  const onChangeDateHandler = (date: Date) => {
    onChangeDate(date);
  };

  const monthYearButton = (
    <button
      className="flex items-center gap-1 self-end rounded-sm px-2 py-1 text-neutral-800 hover:bg-neutral-100"
      onClick={onMonthYearButtonClickHandler}
    >
      <span>
        {date.toLocaleString('default', { month: 'short' }).toUpperCase()}
      </span>
      <span>{date.toLocaleString('default', { year: 'numeric' })}</span>
    </button>
  );

  const weekDaysHeader = weekDayNames.map((weekDay, index) => (
    <span
      key={index}
      className="flex h-[35px] w-[35px] items-center justify-center rounded-full text-neutral-800"
    >
      {weekDay}
    </span>
  ));

  const weeks = monthWeeks.map((week, weekIndex) => {
    const weekDays = week.map((day, dayIndex) => {
      if (day) {
        const isCurrentDay = day.toDateString() === date.toDateString();
        const activeClass = isCurrentDay ? 'bg-neutral-200' : '';
        return (
          <button
            key={day?.toLocaleDateString()}
            className={`flex h-[35px] w-[35px] items-center justify-center rounded-full  text-neutral-600  hover:bg-neutral-100 ${activeClass}`}
            onClick={() => onChangeDateHandler(day)}
          >
            {day?.getDate()}
          </button>
        );
      }
      return (
        <div key={`${weekIndex} ${dayIndex}`} className="h-[35px] w-[35px]" />
      );
    });

    return (
      <div className="flex last:self-start" key={weekIndex}>
        {weekDays}
      </div>
    );
  });

  return (
    <div>
      <div>{monthYearButton}</div>
      <div className="flex">{weekDaysHeader}</div>
      <div>{weeks}</div>
    </div>
  );
};

export default DaySelector;
