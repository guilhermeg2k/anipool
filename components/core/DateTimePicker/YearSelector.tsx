import { DatePickerView } from './DateTimePicker';
import { getYears } from './dateTimePickerUtils';

interface YearSelectorProps {
  date: Date;
  onChangeDate: (date: Date) => void;
  onChangeView: (view: DatePickerView) => void;
}

const YearSelector = ({
  date,
  onChangeDate,
  onChangeView,
}: YearSelectorProps) => {
  const yearsList = getYears();

  const onClickYearHandler = (year: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(year);
    onChangeDate(newDate);
    onChangeView(DatePickerView.CLOSE);
  };

  const years = yearsList.map((year) => {
    const focus = year === 2022;
    return (
      <button
        key={year}
        className={`flex h-[45px] w-[45px] items-center justify-center rounded-full  text-neutral-600 hover:bg-neutral-100`}
        onClick={() => onClickYearHandler(year)}
        autoFocus={focus}
      >
        {year}
      </button>
    );
  });

  return (
    <div className="flex w-full items-center justify-center">
      <div className="justify-content-center grid w-full grid-cols-3 justify-items-center">
        {years}
      </div>
    </div>
  );
};

export default YearSelector;
