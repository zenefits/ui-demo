import React, { StatelessComponent } from 'react';
import { WrappedFieldProps } from 'redux-form';
import moment from 'moment';
import FieldWrapper, { FieldProps } from './FieldWrapper';
import DatePicker, { DatePickerProps } from '../DatePicker';

const WrappedDatePicker: StatelessComponent<WrappedFieldProps> = ({ input, ...rest }) => {
  return <DatePicker {...rest} {...input} />;
};

const DatePickerField: StatelessComponent<FieldProps & DatePickerProps> = props => (
  <FieldWrapper
    component={WrappedDatePicker}
    {...props}
    parse={formatIsoString} // ensure store gets non-localized standard format (ISO8601)
  />
);

export default DatePickerField;

const ISO_8601_DATE = 'YYYY-MM-DD';
const strictParse = true;
const acceptableDateFormats = [ISO_8601_DATE, moment.ISO_8601, moment.localeData().longDateFormat('L')];

export function formatIsoString(date): string {
  if (date instanceof Date) {
    return moment(date).format(ISO_8601_DATE);
  } else if (moment.isMoment(date)) {
    return date.format(ISO_8601_DATE);
  } else if (typeof date === 'string' && date.length) {
    const dateOnly = date.replace(/T.*$/, ''); // strip time component
    const parsed = moment(dateOnly, acceptableDateFormats, strictParse).startOf('day');
    if (parsed.isValid()) {
      return parsed.format(ISO_8601_DATE);
    } else {
      if (__DEVELOPMENT__ && __CLIENT__) {
        console.warn(`received unrecognized date (${date}); returning null`);
      }
    }
  }
  return null; // do not default to today to avoid surprises
}
