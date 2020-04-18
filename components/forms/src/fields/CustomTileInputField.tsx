import React, { InputHTMLAttributes, StatelessComponent } from 'react';
// eslint-disable-next-line zenefits-custom-rules/import-filter
import { Field as BaseField, WrappedFieldProps } from 'redux-form';

import { LabelProps } from 'zbase';

import { FieldProps } from './FieldWrapper';
import { CustomTileInput, CustomTileInputProps } from '../../index';

class Field extends BaseField<CustomTileInputProps> {}

type WrappedProps = LabelProps & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>;
const WrappedCustomTileInput: StatelessComponent<WrappedProps> = ({ input, ...rest }) => (
  <CustomTileInput {...rest} {...input} />
);

const CustomTileInputField: StatelessComponent<FieldProps & CustomTileInputProps> = props => {
  const { name, value, isCheckbox = false } = props;
  let inputType = 'radio';
  if (isCheckbox) {
    inputType = 'checkbox';
  }
  return <Field name={name} component={WrappedCustomTileInput} type={inputType} props={props} value={value} />;
};

export default CustomTileInputField;
