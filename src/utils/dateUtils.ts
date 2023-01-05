import dayjs from 'dayjs';

export const getFormattedDateTime = (date: Date | string | undefined) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm A');
};
