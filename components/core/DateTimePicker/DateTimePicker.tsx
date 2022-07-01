import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import DaySelector from './DaySelector';
import MonthSelector from './MonthSelector';
import TimeSelector from './TimeSelector';
import YearSelector from './YearSelector';

export enum DatePickerView {
  DAY_SELECTOR,
  MONTH_SELECTOR,
  YEAR_SELECTOR,
  TIME_SELECTOR,
  CLOSE,
}

const DEFAULT_VIEW = DatePickerView.DAY_SELECTOR;

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const DateTimePicker = ({ value, onChange }: DateTimePickerProps) => {
  const [view, setView] = useState(DEFAULT_VIEW);
  const [open, setOpen] = useState(false);
  const onChangeDateHandler = (date: Date) => {
    onChange(date);
  };

  const onChangeViewHandler = (view: DatePickerView) => {
    setView(view);
  };

  const input = (
    <div className="flex">
      <input
        value={value && value.toDateString()}
        type="text"
        className="w-full cursor-pointer border border-neutral-300 text-neutral-600 hover:border-indigo-900 focus:border-indigo-600 focus:ring-0"
        readOnly
      />
      <div className="relative right-[45px] top-1/2 w-0 rounded-full duration-100 ease-in hover:bg-neutral-100 active:bg-neutral-200">
        <CalendarIcon className="m-2 h-6 text-neutral-600 " />
      </div>
    </div>
  );

  const renderPickerView = (onClose: Function) => {
    switch (view) {
      case DatePickerView.DAY_SELECTOR:
        return (
          <DaySelector
            date={value}
            onChangeDate={onChangeDateHandler}
            onChangeView={onChangeViewHandler}
          />
        );
      case DatePickerView.MONTH_SELECTOR:
        return (
          <MonthSelector
            date={value}
            onChangeDate={onChangeDateHandler}
            onChangeView={onChangeViewHandler}
          />
        );
      case DatePickerView.YEAR_SELECTOR:
        return (
          <YearSelector
            date={value}
            onChangeDate={onChangeDateHandler}
            onChangeView={onChangeViewHandler}
          />
        );
      case DatePickerView.TIME_SELECTOR:
        return <TimeSelector />;
      case DatePickerView.CLOSE:
        onClose();
        setView(DEFAULT_VIEW);
        return <></>;
      default:
        return <></>;
    }
  };

  const renderPopoverPanelBody = (open: boolean, onClose: Function) => {
    if (open) {
      return (
        <div className="text-neutral-60 absolute max-h-[340px] w-[270px] overflow-y-auto rounded-sm bg-white p-2 shadow-md">
          <div className="flex flex-col justify-center p-2">
            {renderPickerView(onClose)}
          </div>
        </div>
      );
    }
    setView(DEFAULT_VIEW);
    return <></>;
  };

  return (
    <Popover>
      <Popover.Button className="w-full">{input}</Popover.Button>
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
          {({ open, close }) => renderPopoverPanelBody(open, close)}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DateTimePicker;
