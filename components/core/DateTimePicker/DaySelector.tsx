import { DatePickerView } from './DateTimePicker';
import {
  getFormattedTime,
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

  const onTimeButtonClickHandler = () => {
    onChangeView(DatePickerView.TIME_SELECTOR);
  };

  const onChangeDateHandler = (day: number) => {
    const newDate = new Date(date);
    newDate.setDate(day);
    onChangeDate(newDate);
  };

  const monthYearButton = (
    <button
      className="flex items-center gap-1 rounded-sm px-2 font-bold text-neutral-800 hover:bg-neutral-100"
      onClick={onMonthYearButtonClickHandler}
    >
      <span>
        {date.toLocaleString('default', { month: 'short' }).toUpperCase()}
      </span>
      <span>{date.toLocaleString('default', { year: 'numeric' })}</span>
    </button>
  );

  const timeButton = (
    <button
      className="flex rounded-sm px-2 text-sm hover:bg-neutral-100"
      onClick={onTimeButtonClickHandler}
    >
      {getFormattedTime(date)}
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
            onClick={() => onChangeDateHandler(day.getDate())}
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
      <div className="flex flex-col">
        {monthYearButton}
        {timeButton}
      </div>
      <div className="flex">{weekDaysHeader}</div>
      <div>{weeks}</div>
    </div>
  );
};

export default DaySelector;
