import React, { Component } from 'react';
import { ObjectOmit } from 'typelevel-ts';
import { DayPickerProps } from 'react-day-picker/types/props';
// @ts-ignore
import DayPickerInput from 'react-day-picker/DayPickerInput';
// @ts-ignore
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import { styled } from 'z-frontend-theme';

import { InputProps } from '../input/Input';
import InputWithIcon, { InputWithIconProps } from '../input-with-icon/InputWithIcon';
import { DayPickerWrapper } from './DatePicker';
import CustomOverlay from './CustomOverlay';

// const dayPickerCaptionHeight = '64px';

const StyledDayPickerInputWrapper = styled(DayPickerWrapper)`
  .DayPickerInput {
    display: inherit; /* override inline-block, which limits width */
  }
`;

type DatePicketInputOwnProps = {
  /**
   * The format string(s) used for formatting and parsing dates. It works with parseDate and formatDate
   * http://react-day-picker.js.org/api/DayPickerInput/#format
   */
  format?: string;
  /**
   * The DayPicker props (http://react-day-picker.js.org/api/DayPicker/) to customize the calendar rendered in the overlay.
   * http://react-day-picker.js.org/api/DayPickerInput/#dayPickerProps
   */
  pickerOptions?: DayPickerProps;
  locale?: string;
  /**
   * onChange handler (form react-day-picker/DayPickerInput component) called when the user types a valid day – according
   * to the format prop – or when a day is clicked on the calendar. If the typed value is empty or not valid, `day` is
   * undefined.
   * official docs for this handler http://react-day-picker.js.org/api/DayPickerInput/#onDayChange
   */
  onChange?: (day?: Date) => void;
  onDayPickerHide?: () => void;
};

export type DateInputProps = ObjectOmit<InputProps, keyof DatePicketInputOwnProps> & DatePicketInputOwnProps;

// Avoid warning: "Stateless function components cannot be given refs."
class InputWithCalendarIcon extends Component<InputWithIconProps> {
  focus() {} // no-op to prevent warning
  wrapperEl: HTMLDivElement;
  render() {
    return (
      <InputWithIcon
        wrapperRef={el => {
          this.wrapperEl = el;
        }}
        rightIconName="calendar"
        {...this.props}
      />
    );
  }
}

const localePlaceholderMap: { [key: string]: string } = {
  en: 'MM/DD/YYYY',
};

export default class DateInput extends Component<DateInputProps, any> {
  static defaultProps = {
    disabled: false,
    locale: 'en',
    format: 'L', // leave it up to locale
    pickerOptions: {},
    autoComplete: 'off',
  };

  render() {
    const { value, format, locale, onChange, pickerOptions, ...rest } = this.props;

    if (pickerOptions.showOutsideDays === undefined) {
      pickerOptions.showOutsideDays = false;
    }

    const formattedValue = value && formatDate(value, format, locale); // by default, DayPickerInput only calls formatDate if value is of type Date

    return (
      <StyledDayPickerInputWrapper>
        <DayPickerInput
          value={formattedValue}
          onDayChange={onChange}
          placeholder={localePlaceholderMap[locale]}
          formatDate={formatDate}
          parseDate={parseDate}
          format={format}
          component={InputWithCalendarIcon}
          inputProps={{ ...rest, required: false }}
          dayPickerProps={pickerOptions}
          overlayComponent={CustomOverlay}
        />
      </StyledDayPickerInputWrapper>
    );
  }
}
