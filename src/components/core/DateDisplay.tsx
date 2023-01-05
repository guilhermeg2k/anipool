import { getFormattedDateTime } from '@utils/dateUtils';
import Tooltip from './Tooltip';

interface DateDisplayProps {
  date: Date | string | undefined;
}

const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <Tooltip title="yyyy-mm-dd hh:mm">{getFormattedDateTime(date)}</Tooltip>
  );
};

export default DateDisplay;
