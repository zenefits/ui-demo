import React, { StatelessComponent, InputHTMLAttributes } from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { FieldProps } from './FieldWrapper';
import Radio, { RadioProps } from '../Radio';

declare type WrappedProps = WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>;
const WrappedRadio: StatelessComponent<WrappedProps> = ({ input, ...rest }) => <Radio {...rest} {...input} />;

const RadioField: StatelessComponent<FieldProps & RadioProps> = props => (
  <Field name={props.name} component={WrappedRadio} type="radio" props={props} value={props.value} />
);

export default RadioField;
