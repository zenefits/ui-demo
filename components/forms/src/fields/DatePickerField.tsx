import React, { StatelessComponent } from 'react';
import { WrappedFieldProps } from 'redux-form';
import FieldWrapper, { FieldProps } from './FieldWrapper';
import DatePicker, { DatePickerProps } from '../DatePicker';

const WrappedDatePicker: StatelessComponent<WrappedFieldProps> = ({ input, ...rest }) => (
  <DatePicker {...rest} {...input} />
);

const DatePickerField: StatelessComponent<FieldProps & DatePickerProps> = props => (
  <FieldWrapper component={WrappedDatePicker} {...props} />
);

export default DatePickerField;
