import moment from 'moment';

function getDaysToAdd(firstDayOfWeek: number, day: number) {
  if (day < firstDayOfWeek) return firstDayOfWeek - 7;
  return firstDayOfWeek;
}

interface GetWeekRangeParams {
  date: Date;
  firstDayOfWeek: number;
}

/**
 * Given a date and the first day of week on calendar, return a date range.
 */
export const getWeekRange = ({ date, firstDayOfWeek }: GetWeekRangeParams) => {
  const day = moment(date).day();
  // Use daysToAdd to keep the hover effect on one row
  const daysToAdd = getDaysToAdd(firstDayOfWeek, day);

  const from = moment(date)
    .startOf('week')
    .add(daysToAdd, 'days')
    .toDate();
  const to = moment(date)
    .endOf('week')
    .add(daysToAdd, 'days')
    .toDate();

  return { from, to };
};
