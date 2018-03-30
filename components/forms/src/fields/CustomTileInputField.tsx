import React, { StatelessComponent, InputHTMLAttributes } from 'react';
import { Field as BaseField, WrappedFieldProps } from 'redux-form';
import { FieldProps } from './FieldWrapper';
import CustomTileInput, { CustomTileInputProps } from '../CustomTileInput';
import { LabelProps } from 'zbase';

class Field extends BaseField<CustomTileInputProps> {}

declare type WrappedProps = LabelProps & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>;
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
