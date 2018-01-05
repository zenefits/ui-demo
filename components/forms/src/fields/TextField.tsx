import React, { InputHTMLAttributes, StatelessComponent } from 'react';
import { WrappedFieldProps } from 'redux-form';
import FieldWrapper, { FieldProps } from './FieldWrapper';
import Input from '../Input';

// consider renaming InputField for consistency with component

declare type InputProps = WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>;
const WrappedInput: StatelessComponent<InputProps> = ({ input, ...rest }) => <Input {...rest} {...input} />;

const TextField: StatelessComponent<FieldProps> = props => (
  <FieldWrapper type="text" {...props} component={WrappedInput} />
);

export default TextField;
