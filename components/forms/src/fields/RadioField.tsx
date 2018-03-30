import React, { StatelessComponent, InputHTMLAttributes } from 'react';
import { Field as BaseField, WrappedFieldProps } from 'redux-form';
import { FieldProps } from './FieldWrapper';
import Radio, { RadioProps } from '../Radio';
import { LabelProps } from 'zbase';

class Field extends BaseField<RadioProps> {}

declare type WrappedProps = LabelProps & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>;
const WrappedRadio: StatelessComponent<WrappedProps> = ({ input, ...rest }) => <Radio {...rest} {...input} />;

const RadioField: StatelessComponent<FieldProps & RadioProps> = props => (
  <Field component={WrappedRadio} type="radio" {...props} />
);

export default RadioField;
