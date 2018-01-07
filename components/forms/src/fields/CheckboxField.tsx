import React, { StatelessComponent, InputHTMLAttributes } from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { FieldFormatWrapper, FieldProps } from './FieldWrapper';
import Checkbox, { CheckboxProps } from '../Checkbox';

declare type WrappedProps = WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>;
const WrappedCheckbox: StatelessComponent<WrappedProps> = ({ input, ...rest }) => (
  <Checkbox {...rest} {...input} checked={input.value} />
);

const CheckboxField: StatelessComponent<FieldProps & CheckboxProps> = ({ fieldFormat, ...props }) => (
  <FieldFormatWrapper fieldFormat={fieldFormat}>
    <Field name={props.name} component={WrappedCheckbox} props={props} value={props.value} />
  </FieldFormatWrapper>
);

CheckboxField.defaultProps = { fieldFormat: 'raw' };

export default CheckboxField;
