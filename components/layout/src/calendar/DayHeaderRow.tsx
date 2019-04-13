import React from 'react';

import { Flex } from 'zbase';

import CalendarDayCell from './CalendarDayCell';

interface DayHeaderRowProps {
  /**
   * The first day displayed on the calendar
   */
  startDate: Date;

  /**
   * Number of days to display
   */
  numberOfDays: number;
}

/**
 * A component to render the header row (except the top-left cell) for Calendar component
 */
class DayHeaderRow extends React.Component<DayHeaderRowProps> {
  render() {
    const { startDate, numberOfDays } = this.props;

    const dayCells = [];
    for (let i = 0; i < numberOfDays; i += 1) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);
      dayCells.push(
        <CalendarDayCell
          key={i}
          day={day.getDay()}
          date={day.getDate()}
          month={day.getMonth()}
          numberOfDays={numberOfDays}
        />,
      );
    }

    return <Flex>{dayCells}</Flex>;
  }
}

export default DayHeaderRow;
