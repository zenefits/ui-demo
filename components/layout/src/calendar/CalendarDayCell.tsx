import React from 'react';

import { Flex, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';

import { colors, styles } from './constants';

enum Day {
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
}

enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

interface CalendarDayCellProps {
  /**
   * The day of the week (from 0-6)
   */
  day: Day;

  /**
   * The month (from 0-11)
   */
  month: Month;

  /**
   * The day of the month (from 1-31)
   */
  date: number;

  /**
   * Number of days to display
   */
  numberOfDays: number;
}

const DayCell = styled(Flex)`
  min-width: ${styles.cellMinWidth};
  height: ${styles.topRowCellHeight}; /* without this, Firefox renders 52.9833px while Chrome and Safari render 52px */
`;

/**
 * A component to render a day cell in the header row for Calendar component,
 */
class CalendarDayCell extends React.Component<CalendarDayCellProps> {
  render() {
    const { day, date, month, numberOfDays } = this.props;
    return (
      <DayCell
        column
        w={1 / numberOfDays}
        borderBottom
        borderRight
        borderColor={colors.border}
        justify="center"
        align="center"
        py={2}
        bg={colors.rowBgLight}
      >
        <TextBlock color="grayscale.d" fontStyle="headings.xs" mb={1}>
          {Day[day]}
        </TextBlock>
        <TextBlock fontStyle="controls.m">
          {Month[month]} {date}
        </TextBlock>
      </DayCell>
    );
  }
}

export default CalendarDayCell;
