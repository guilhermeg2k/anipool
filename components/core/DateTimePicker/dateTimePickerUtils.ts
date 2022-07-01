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

export function getWeekDaysName() {
  const dateOnMonday = new Date(Date.UTC(2022, 0, 3));
  const currentDate = dateOnMonday;
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(currentDate.toLocaleDateString('en', { weekday: 'narrow' }));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return weekDays;
}

export function getMonths() {
  const dateOnJanuary = new Date(Date.UTC(2022, 0, 2));
  const currentDate = dateOnJanuary;
  const months = [];
  for (let i = 0; i < 12; i++) {
    const month = {
      number: i,
      name: currentDate.toLocaleDateString('default', { month: 'short' }),
    };
    months.push(month);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return months;
}

export function getYears() {
  const dateOn1970 = new Date(Date.UTC(1900, 0, 2));
  const currentDate = dateOn1970;
  const years = [];
  for (let i = 0; i < 200; i++) {
    const year = currentDate.toLocaleDateString('default', { year: 'numeric' });
    years.push(parseInt(year));
    currentDate.setFullYear(currentDate.getFullYear() + 1);
  }
  return years;
}
