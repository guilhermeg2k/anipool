import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { getMonthDays, getMonthWeeks } from '../utils/dateTimePicker';

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthDays = getMonthDays(currentDate);
  const monthWeekRows = getMonthWeeks(monthDays);

  const calendarRows = monthWeekRows.map((week) => {
    return (
      <div className="flex" key={`week-${week[6]?.getDate()}`}>
        {week.map((day, index) => {
          return (
            <div
              key={day ? day?.getDate() : index}
              className="flex h-[35px] w-[35px] items-center justify-center"
            >
              {day ? day.getDate() : ''}
            </div>
          );
        })}
      </div>
    );
  });

  const datePickerButton = (
    <div className="flex">
      <input
        value={currentDate.toDateString()}
        type="text"
        className="w-full border border-neutral-300 text-neutral-600 hover:border-indigo-900 focus:border-indigo-600 focus:ring-0"
      />
      <div className="relative right-[45px] top-1/2 w-0 rounded-full duration-100 ease-in hover:bg-neutral-100 active:bg-neutral-200">
        <CalendarIcon className="m-2 h-6 text-neutral-600 " />
      </div>
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
          <div className="text-neutral-60 absolute w-[278px] rounded-sm bg-white shadow-md">
            <div className="flex flex-col items-center justify-center p-2">
              <span>
                {currentDate.toLocaleString('default', { year: 'numeric' })}
              </span>
              <span>
                {currentDate.toLocaleString('default', { month: 'long' })}
                {calendarRows}
              </span>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DatePicker;
