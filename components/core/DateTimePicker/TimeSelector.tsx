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
  return <div className="flex w-full items-center justify-center"></div>;
};

export default TimeSelector;
