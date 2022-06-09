export const getMonthDays = (date: Date): Array<Date> => {
  const days: Array<Date> = [];
  const dateOnMonthEndDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  );
  const monthEndDay = dateOnMonthEndDay.getDate();
  for (let i = 1; i <= monthEndDay; i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return days;
};

export const getMonthWeeks = (
  monthDays: Array<Date>
): Array<Array<Date | null>> => {
  const weeks: Array<Array<Date | null>> = [];

  let daysAdded = 0;

  while (daysAdded < monthDays.length) {
    const week: Array<Date | null> = [];
    for (let weekDay = 0; weekDay < 7; weekDay++) {
      if (daysAdded >= monthDays.length) {
        break;
      }
      const monthDayDayWeek = monthDays[daysAdded].getDay();
      if (weekDay === monthDayDayWeek) {
        week.push(monthDays[daysAdded]);
        daysAdded++;
      } else {
        week.push(null);
      }
    }
    weeks.push(week);
  }

  return weeks;
};
