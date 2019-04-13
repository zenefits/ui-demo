import React, { Component, SyntheticEvent } from 'react';
import DayPicker from 'react-day-picker';
import { DayModifiers, Modifier, Modifiers } from 'react-day-picker/types/common';

import { styled } from 'z-frontend-theme';
import { color, fontSizes, icon } from 'z-frontend-theme/utils';

const dayPickerCaptionHeight = '64px';

export const DayPickerWrapper = styled.div`
  .DayPicker-wrapper {
    padding-bottom: 10px;
  }

  .DayPicker-Month {
    margin: 0; /* allow borders to reach edge */
    border-collapse: separate;
    border-spacing: 6px 4px;
    color: ${color('text.dark')};
  }

  /* replace default bg images */
  .DayPicker-NavButton--prev,
  .DayPicker-NavButton--next {
    background: none;
    width: auto;
    height: ${dayPickerCaptionHeight};
    left: auto;
    right: auto;
    padding-left: 12px;
    padding-right: 12px;
    margin: 0;
    top: 0;

    &::after {
      font-family: Material-Design-Iconic-Font;
      font-size: ${fontSizes(4)};
      color: ${color('grayscale.e')};
      line-height: ${dayPickerCaptionHeight};
    }
  }

  .DayPicker-NavButton--prev {
    left: 0;

    &::after {
      content: '${icon('chevron-left')}';
    }
  }

  .DayPicker-NavButton--next {
    right: 0;

    &::after {
      content: '${icon('chevron-right')}';
    }
  }

  .DayPicker-Caption {
    font-size: ${fontSizes(1)};
    line-height: ${dayPickerCaptionHeight};
    text-align: center;
    margin: 0;
    padding: 0;

    > div {
      font-size: inherit;
    }
  }

  .DayPicker-Weekdays {
    display: table-caption; /* not semantic, but default of 'table-header-group' doesn't support borders */
    border-top: 1px solid ${color('grayscale.e')};
    border-bottom: 1px solid ${color('grayscale.e')};
    margin: 0;
    line-height: 8px;
  }

  .DayPicker-Weekday {
    color: ${color('text.light')};
    font-size: ${fontSizes(0)};
    padding: 6px 9px;
  }

  .DayPicker-Day {
    padding: 4px;
    font-size: ${fontSizes(1)};
  }

  .DayPicker-Day--today {
    /* subtly emphasize today's date */
    color: ${color('text.dark')};
    font-weight: ${props => props.theme.weights[1]};
  }

  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    border-radius: 4px;
    background-color: ${color('tertiary.c')};
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    border-radius: 4px;
    background-color: ${color('tertiary.a')};

    &:hover {
      background-color: ${color('tertiary.a')};
    }
  }

  .DayPicker-Day--outside {
    color: ${color('text.light')};
  }

  .DayPicker-Day--disabled {
    color: ${color('text.off')};
  }
`;

interface DatePickerProps {
  /**
   * Event handler when the user clicks on a day cell.
   */
  onDayClick?: (day: Date) => void;

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
   * An object of day modifiers.
   * http://react-day-picker.js.org/docs/matching-days/
   */
  modifiers?: Partial<Modifiers>;

  /**
   * Event handler when the mouse enters a day cell.
   */
  onDayMouseEnter?: (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Event handler when the mouse leave a day cell.
   */
  onDayMouseLeave?: (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Display the days falling outside the current month.
   * @default false
   */
  showOutsideDays?: boolean;

  /**
   * Day(s) that should appear as selected. Set a selected modifier.
   */
  selectedDays?: Modifier | Modifier[];

  onBlur?: (event: SyntheticEvent) => void;
}

interface DatePickerState {}

export default class DatePicker extends Component<DatePickerProps, DatePickerState> {
  static defaultProps = {
    onDayClick: () => {},
    onBlur: () => {},
    firstDayOfWeek: 0,
    initialMonth: new Date(),
    onDayMouseEnter: () => {},
    onDayMouseLeave: () => {},
    modifiers: {},
  };

  render() {
    const {
      firstDayOfWeek,
      onBlur,
      onDayClick,
      initialMonth,
      onDayMouseEnter,
      onDayMouseLeave,
      modifiers,
      showOutsideDays,
      selectedDays,
    } = this.props;

    return (
      <DayPickerWrapper>
        <DayPicker
          showOutsideDays={showOutsideDays}
          onDayClick={day => onDayClick(day)}
          firstDayOfWeek={firstDayOfWeek}
          initialMonth={initialMonth}
          onDayMouseEnter={onDayMouseEnter}
          onDayMouseLeave={onDayMouseLeave}
          selectedDays={selectedDays}
          modifiers={modifiers}
          onBlur={onBlur}
        />
      </DayPickerWrapper>
    );
  }
}
