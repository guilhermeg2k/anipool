import { DatePickerView } from './DateTimePicker';
import { getMonths } from './dateTimePickerUtils';

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
  const monthsList = getMonths();

  const onClickMonthHandler = (monthNumber: number) => {
    const newDate = new Date(date);
    newDate.setMonth(monthNumber);
    onChangeDate(newDate);
    onChangeView(DatePickerView.YEAR_SELECTOR);
  };

  const months = monthsList.map((month) => {
    const isCurrentMonth = month.number === date.getMonth();
    const activeClass = isCurrentMonth ? 'bg-neutral-200' : '';
    return (
      <button
        key={month.name}
        className={`flex h-[45px] w-[45px] items-center justify-center rounded-full   hover:bg-neutral-100 ${activeClass}`}
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
