import React, { Component, SyntheticEvent } from 'react';
import { RangeModifier } from 'react-day-picker/types/common';

import { Box } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

import DatePicker from '../date-picker/DatePicker';
import { getWeekRange } from './utils';

export type DayClickHandler = (day: Date, week: RangeModifier) => void;

export interface WeekPickerProps {
  /**
   * Event handler when the user clicks on a day cell.
   */
  onDayClick?: DayClickHandler;

  /**
   * The day to use as first day of the week, starting from 0 (Sunday) to 6 (Saturday).
   * @default 0
   */
  firstDayOfWeek?: number;

  /**
   * The month to display in the calendar at first render. This differs from the month prop, as it won’t re-render the
   * calendar if its value changes.
   * @default new Date()
   */
  initialMonth?: Date;

  /**
   * The week that should appear as selected. Only a single week can be selected at a time.
   */
  selectedWeek?: Date;

  id?: string;

  /**
   * Event handler when the calendar get the blur event.
   */
  onBlur?: (event: SyntheticEvent) => void;
  'aria-label'?: string;
}

interface WeekPickerState {
  hoverRange: RangeModifier;
}

const WeekPickerWrapper = styled(Box)`
  display: inline-block;

  .DayPicker-Month {
    border-collapse: collapse;
  }

  .DayPicker-Weekday {
    padding: 10px 12px;
  }

  .DayPicker-Day {
    padding: 6px 11px;
  }

  /* prettier-ignore */
  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    border-radius: 0;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    border-radius: 0;
  }

  .DayPicker-Day--selected.DayPicker-Day--outside {
    color: ${color('grayscale.g')};
    background-color: ${color('tertiary.a')};

    &:hover {
      background-color: ${color('tertiary.a')};
    }
  }

  .DayPicker-Day--hoverRange:not(.DayPicker-Day--selected) {
    background-color: ${color('tertiary.c')} !important;
  }
`;

/**
 * A calendar view which highlights a week when you hover over
 */
export default class WeekPicker extends Component<WeekPickerProps, WeekPickerState> {
  static defaultProps = {
    onDayClick: () => {},
    onBlur: () => {},
    firstDayOfWeek: 0,
    initialMonth: new Date(),
  };

  constructor(props: WeekPickerProps) {
    super(props);
    this.state = {
      hoverRange: undefined,
    };
  }

  getWeekRange = (date: Date) => {
    const { firstDayOfWeek } = this.props;
    return getWeekRange({ date, firstDayOfWeek });
  };

  handleDayEnter = (date: Date) => {
    this.setState({
      hoverRange: this.getWeekRange(date),
    });
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined,
    });
  };

  handleDayClick = (day: Date) => {
    this.props.onDayClick(day, this.state.hoverRange);
  };

  render() {
    const { firstDayOfWeek, initialMonth, selectedWeek, onBlur } = this.props;
    const { hoverRange } = this.state;

    const selectedDays = selectedWeek ? this.getWeekRange(selectedWeek) : null;

    const modifiers = {
      hoverRange,
    };

    return (
      <WeekPickerWrapper border bg="grayscale.white" data-testid="week-picker">
        <DatePicker
          showOutsideDays
          onDayMouseEnter={this.handleDayEnter}
          onDayMouseLeave={this.handleDayLeave}
          onDayClick={this.handleDayClick}
          firstDayOfWeek={firstDayOfWeek}
          initialMonth={initialMonth}
          selectedDays={selectedDays}
          modifiers={modifiers}
          onBlur={onBlur}
        />
      </WeekPickerWrapper>
    );
  }
}
