import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/outline';
import {
  getMonthDays,
  getMonthNames,
  getMonthWeeks,
  getWeekDaysName,
  getYears,
} from '@utils/dateTimePicker';
import { Fragment, useRef, useState } from 'react';

interface MonthYearSelectorProps {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onClose: () => void;
}

export const MonthYearSelector = ({
  onYearChange,
  onMonthChange,
  onClose,
}: MonthYearSelectorProps) => {
  const years = getYears();
  const months = getMonthNames();
  const [currentSelector, setCurrentSelector] = useState('months');

  const monthsRows = months.map((month) => {
    const onClickHandler = () => {
      onMonthChange(month.number);
      setCurrentSelector('year');
    };

    return (
      <button
        key={month.name}
        className={`flex h-[45px] w-[45px] items-center justify-center rounded-full  text-neutral-600 hover:bg-neutral-100`}
        onClick={onClickHandler}
      >
        {month.name}
      </button>
    );
  });

  const yearsRows = years.map((year) => {
    const focus = year === 2022;
    const onClickHandler = () => {
      onYearChange(year);
      onClose();
    };

    return (
      <button
        key={year}
        className={`flex h-[45px] w-[45px] items-center justify-center rounded-full  text-neutral-600 hover:bg-neutral-100`}
        onClick={onClickHandler}
        autoFocus={focus}
      >
        {year}
      </button>
    );
  });

  return (
    <div className="flex w-full items-center justify-center">
      <div className="justify-content-center grid w-full grid-cols-3 justify-items-center">
        {currentSelector === 'months' ? monthsRows : yearsRows}
      </div>
    </div>
  );
};

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const monthDays = getMonthDays(date);
  const monthWeeks = getMonthWeeks(monthDays);
  const weekDays = getWeekDaysName();
  const [currentScreen, setCurrentScreen] = useState('calendar');

  const onDateChangeHandler = (date: Date) => {
    setDate(date);
  };

  const onYearChangeHandler = (year: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    setDate(newDate);
  };

  const onMonthChangeHandler = (month: number) => {
    const newDate = new Date(date);
    newDate.setMonth(month);
    setDate(newDate);
  };

  const onMonthYearSelectionCloseHandler = () => {
    setCurrentScreen('calendar');
  };

  const onMonthYearButtonClickHandler = () => {
    setCurrentScreen('32131');
  };

  const datePickerButton = (
    <div className="flex">
      <input
        value={date.toDateString()}
        type="text"
        className="w-full cursor-pointer border border-neutral-300 text-neutral-600 hover:border-indigo-900 focus:border-indigo-600 focus:ring-0"
      />
      <div className="relative right-[45px] top-1/2 w-0 rounded-full duration-100 ease-in hover:bg-neutral-100 active:bg-neutral-200">
        <CalendarIcon className="m-2 h-6 text-neutral-600 " />
      </div>
    </div>
  );

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

  const calendarHeader = (
    <div className="flex">
      {weekDays.map((weekDay) => (
        <span
          key={weekDay}
          className="flex h-[35px] w-[35px] items-center justify-center rounded-full text-neutral-800"
        >
          {weekDay}
        </span>
      ))}
    </div>
  );

  const calendarWeeks = monthWeeks.map((week) => {
    return (
      <div className="flex last:self-start" key={`week-${week[6]?.getDate()}`}>
        {week.map((day, index) => {
          if (day) {
            const isCurrentDay = day.toDateString() === date.toDateString();
            const activeClass = isCurrentDay && 'bg-neutral-200';
            return (
              <button
                key={day ? day?.getDate() : index}
                className={`flex h-[35px] w-[35px] items-center justify-center rounded-full  text-neutral-600  hover:bg-neutral-100 ${activeClass}`}
                onClick={() => onDateChangeHandler(day)}
              >
                {day?.getDate()}
              </button>
            );
          }
          return <div key={index} className="h-[35px] w-[35px]" />;
        })}
      </div>
    );
  });

  const calendar = (
    <div>
      {monthYearButton}
      {calendarHeader}
      {calendarWeeks}
    </div>
  );

  return (
    <Popover>
      <Popover.Button className="w-full">{datePickerButton}</Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel>
          <div className="text-neutral-60 absolute max-h-[320px] w-[270px] overflow-y-auto rounded-sm bg-white p-2 shadow-md">
            <div className="flex flex-col justify-center p-2">
              <div>
                {currentScreen === 'calendar' ? (
                  calendar
                ) : (
                  <MonthYearSelector
                    onMonthChange={onMonthChangeHandler}
                    onYearChange={onYearChangeHandler}
                    onClose={onMonthYearSelectionCloseHandler}
                  />
                )}
              </div>
              {/* <div>{monthYearButton}</div>
              <div className="text-sm">{calendar}</div> */}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DatePicker;
