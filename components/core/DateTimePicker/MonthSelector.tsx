import { DatePickerView } from './DateTimePicker';
import { getMonthNames } from './dateTimePickerUtils';

interface MonthSelectorProps {
  date: Date;
  onChangeDate: (date: Date) => void;
  onChangeView: (view: DatePickerView) => void;
}

const MonthSelector = ({
  date,
  onChangeDate,
  onChangeView,
}: MonthSelectorProps) => {
  const monthNames = getMonthNames();

  const onClickMonthHandler = (monthNumber: number) => {
    const newDate = new Date(date);
    newDate.setMonth(monthNumber);
    onChangeDate(newDate);
    onChangeView(DatePickerView.YEAR_SELECTOR);
  };

  const months = monthNames.map((month) => {
    return (
      <button
        key={month.name}
        className={`flex h-[45px] w-[45px] items-center justify-center rounded-full  text-neutral-600 hover:bg-neutral-100`}
        onClick={() => onClickMonthHandler(month.number)}
      >
        {month.name}
      </button>
    );
  });

  return (
    <div className="flex w-full items-center justify-center">
      <div className="justify-content-center grid w-full grid-cols-3 justify-items-center">
        {months}
      </div>
    </div>
  );
};

export default MonthSelector;
