import React, { InputHTMLAttributes, StatelessComponent } from 'react';
import { Field as BaseField, WrappedFieldProps } from 'redux-form';

import { LabelProps } from 'zbase';

import { FieldFormatWrapper, FieldProps } from './FieldWrapper';
import Checkbox, { CheckboxProps } from '../Checkbox';

class Field extends BaseField<CheckboxProps> {}

declare type WrappedProps = LabelProps & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>;
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
