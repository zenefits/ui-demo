import React, { Component } from 'react';
import { styled } from 'z-frontend-theme';
import moment from 'moment';
import { color, fontSizes, icon, radius, space } from 'z-frontend-theme/src/utils';
import { InputProps } from './Input';
import InputWithIcon from './InputWithIcon';

// see http://react-day-picker.js.org
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

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
    color: ${color('grayscale.b')};
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
    color: inherit;
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
    color: ${color('grayscale.e')};
  }

  .DayPicker-Day--disabled {
    background-color: ${color('secondary.c')};
    color: ${color('grayscale.d')};
  }
`;

export declare type DatePickerProps = InputProps & {
  date?: Date;
  format?: string;
  pickerOptions?: any;
};

// Avoid warning: "Stateless function components cannot be given refs."
class InputWithCalendarIcon extends Component<any> {
  focus() {} // no-op to prevent warning
  render() {
    return <InputWithIcon iconName="calendar" {...this.props} />;
  }
}

export default class DatePicker extends Component<DatePickerProps> {
  static defaultProps = {
    disabled: false,
    format: 'MM/DD/YYYY',
    pickerOptions: {},
  };

  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(day, modifiers, e) {
    if (this.props.onChange) {
      this.props.onChange(day);
    }
  }

  render() {
    const { date, format, pickerOptions, ...rest } = this.props;
    // date prop overrides existing value, if any
    const value = date ? moment(date).format(format) : this.props.value;
    if (pickerOptions.showOutsideDays === undefined) {
      pickerOptions.showOutsideDays = true;
    }
    // use onDayClick instead of input's onDayChange to get the actual event
    pickerOptions.onDayClick = this.handleDayChange;

    return (
      <StyledDayPickerWrapper>
        <DayPickerInput
          value={value}
          placeholder={format}
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
