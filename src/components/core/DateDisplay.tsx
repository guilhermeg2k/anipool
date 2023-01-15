import { getFormattedDateTime } from '@utils/dateUtils';
import Tooltip from './Tooltip';

interface DateDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date | string | undefined;
}

const DateDisplay = ({ date, ...rest }: DateDisplayProps) => {
  return (
    <Tooltip title="YYYY-MM-DD HH:mm" {...rest}>
      <time>{getFormattedDateTime(date)}</time>
    </Tooltip>
  );
};

export default DateDisplay;
