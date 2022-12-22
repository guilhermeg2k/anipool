import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import React from 'react';
import { DatePickerView } from './DateTimePicker';
interface TimeSelectorProps {
  date: Date;
  onChangeDate: (date: Date) => void;
  onChangeView: (view: DatePickerView) => void;
}

const TimeSelector = ({
  date,
  onChangeDate,
  onChangeView,
}: TimeSelectorProps) => {
  const renderHour = () => {
    const hour = date.getHours();
    if (hour < 10) {
      return `0${hour}`;
    }
    return hour;
  };

  const renderMinutes = () => {
    const minutes = date.getMinutes();
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
  };

  const onChangeMinuteHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const minutes = parseInt(event.target.value);
    if (minutes >= 0 && minutes < 60) {
      const newDate = new Date(date);
      newDate.setMinutes(minutes);
      onChangeDate(newDate);
    }
  };

  const onChangeHourHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hour = parseInt(event.target.value);
    if (hour >= 0 && hour < 24) {
      const newDate = new Date(date);
      newDate.setHours(hour);
      onChangeDate(newDate);
    }
  };

  const onConfirmClickHandler = () => {
    onChangeView(DatePickerView.DAY_SELECTOR);
  };

  return (
    <div className="flex w-full justify-between gap-1">
      <input
        value={renderHour()}
        className="w-[100px] border border-neutral-300 p-2  outline-none hover:border-indigo-900 focus:border-indigo-600 focus:ring-0"
        type="number"
        placeholder="Hour"
        onChange={onChangeHourHandler}
      />
      <input
        value={renderMinutes()}
        className="w-[100px] border border-neutral-300 p-2  outline-none hover:border-indigo-900 focus:border-indigo-600 focus:ring-0"
        type="number"
        placeholder="Minutes"
        onChange={onChangeMinuteHandler}
      />
      <button onClick={onConfirmClickHandler}>
        <CheckIcon className="m-2 h-6  hover:text-indigo-800 " />
      </button>
    </div>
  );
};

export default TimeSelector;
