import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import { styled } from 'z-frontend-theme';
import { color, fontSizes, icon, radius, space } from 'z-frontend-theme/utils';

import { InputProps } from './Input';
import InputWithIcon from './InputWithIcon';

const dayPickerCaptionHeight = '64px';

const StyledDayPickerWrapper = styled.div`
  .DayPickerInput {
    display: inherit; /* override inline-block, which limits width */
  }

  .DayPickerInput-Overlay {
    margin-top: ${space(1)};
    border-radius: ${radius};
    box-shadow: 0 0 0 1px ${color('secondary.a', 0.2)}, 0 1px 4px 0 ${color('secondary.a', 0.2)};
  }

  .DayPicker-wrapper {
    padding-bottom: 10px;
  }

  .DayPicker {
    color: ${color('grayscale.c')}; /* TODO: just inherit default text color once we change it */
  }

  .DayPicker-Month {
    margin: 0; /* allow borders to reach edge */
    border-collapse: separate;
    border-spacing: 6px 4px;
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
    color: ${color('grayscale.e')};
    font-size: ${fontSizes(0)};
    padding: 6px 9px;
  }

  .DayPicker-Day {
    padding: 4px;
    font-size: ${fontSizes(1)};
  }

  .DayPicker-Day--today {
    /* subtly emphasize today's date */
    color: ${color('grayscale.black')};
    font-weight: ${props => props.theme.weights[2]};
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
    color: ${color('grayscale.d')};
  }

  .DayPicker-Day--disabled {
    color: ${color('grayscale.e')};
  }
`;

export declare type DatePickerProps = InputProps & {
  format?: string;
  pickerOptions?: any;
  locale?: string;
};

// Avoid warning: "Stateless function components cannot be given refs."
class InputWithCalendarIcon extends Component<any> {
  focus() {} // no-op to prevent warning
  render() {
    return <InputWithIcon iconName="calendar" {...this.props} />;
  }
}

const localePlaceholderMap = {
  en: 'MM/DD/YYYY',
};

export default class DatePicker extends Component<DatePickerProps, any> {
  static defaultProps = {
    disabled: false,
    locale: 'en',
    format: 'L', // leave it up to locale
    pickerOptions: {},
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { value, format, locale, onChange, pickerOptions, ...rest } = this.props;
    if (pickerOptions.showOutsideDays === undefined) {
      pickerOptions.showOutsideDays = false;
    }
    const formattedValue = value && formatDate(value, format, locale); // by default, DayPickerInput only calls formatDate if value is of type Date
    return (
      <StyledDayPickerWrapper>
        <DayPickerInput
          value={formattedValue}
          onDayChange={onChange}
          placeholder={localePlaceholderMap[locale]}
          formatDate={formatDate}
          parseDate={parseDate}
          format={format}
          component={InputWithCalendarIcon}
          inputProps={{ ...rest }}
          dayPickerProps={pickerOptions}
        />
      </StyledDayPickerWrapper>
    );
  }
}
