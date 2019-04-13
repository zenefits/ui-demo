import React, { StatelessComponent } from 'react';
import { Field, Validator, WrappedFieldProps } from 'redux-form';
import moment, { Moment } from 'moment';
import { ObjectOmit } from 'typelevel-ts';

import { FieldFormatWrapper, FieldProps } from './FieldWrapper';
import DateInput, { DateInputProps } from '../date-picker/DateInput';
import { generateValidators } from '../validators';

type MinMaxDateValidationProps = {
  /** Min date (allowed value will be on this day or after) */
  minDate?: Date;
  /** Max date (allowed value will be on this day or before) */
  maxDate?: Date;
};

type AllInputProps = ObjectOmit<FieldProps, keyof DateInputProps> &
  WrappedFieldProps &
  DateInputProps &
  MinMaxDateValidationProps;

const WrappedDateInput: StatelessComponent<AllInputProps> = ({
  input,
  meta,
  label,
  helpText,
  errorText,
  tooltipText,
  fieldFormat,
  type,
  pickerOptions,
  ...rest
}) => {
  const { touched, error } = meta;
  const finalErrorText = (touched && error) || errorText;
  const resultPickerOptions = Object.assign({}, pickerOptions || {});
  if (rest.minDate || rest.maxDate) {
    resultPickerOptions.disabledDays = {
      before: rest.minDate && moment(rest.minDate).toDate(),
      after: rest.maxDate && moment(rest.maxDate).toDate(),
    };
  }

  return (
    <FieldFormatWrapper
      label={label}
      tooltipText={tooltipText}
      helpText={helpText}
      fieldFormat={fieldFormat}
      errorText={finalErrorText}
    >
      <DateInput
        {...rest}
        pickerOptions={resultPickerOptions}
        {...input}
        aria-invalid={!!finalErrorText}
        hasError={!!finalErrorText}
      />
    </FieldFormatWrapper>
  );
};

type DatePickerFieldProps = ObjectOmit<DateInputProps, keyof FieldProps> &
  FieldProps &
  MinMaxDateValidationProps & {
    format?: string;
  };

const DatePickerField: StatelessComponent<DatePickerFieldProps> = ({ validate, ...rest }) => {
  const validators: Validator[] = [
    ...generateValidators({
      maxDate: rest.maxDate && { format: rest.format, maxDate: rest.maxDate },
      minDate: rest.minDate && { format: rest.format, minDate: rest.minDate },
      required: rest.required,
    }),
    ...(validate ? (Array.isArray(validate) ? validate : [validate]) : []),
  ];

  return <Field<{}> parse={formatIsoString} component={WrappedDateInput} {...rest} validate={validators} />;
};

export default DatePickerField;

const ISO_8601_DATE = 'YYYY-MM-DD';
const strictParse = true;
const acceptableDateFormats = [ISO_8601_DATE, moment.ISO_8601, moment.localeData().longDateFormat('L')];

export function formatIsoString(date: Date | Moment | string): string {
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
