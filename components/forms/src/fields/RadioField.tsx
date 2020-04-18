import React, { InputHTMLAttributes, StatelessComponent } from 'react';
// eslint-disable-next-line zenefits-custom-rules/import-filter
import { Field as BaseField, WrappedFieldProps } from 'redux-form';

import { LabelProps } from 'zbase';

import { FieldProps } from './FieldWrapper';
import Radio, { RadioProps } from '../radio/Radio';

class Field extends BaseField<RadioProps> {}

type WrappedProps = LabelProps & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>;
const WrappedRadio: StatelessComponent<WrappedProps> = ({ input, ...rest }) => <Radio {...rest} {...input} />;

const RadioField: StatelessComponent<FieldProps & RadioProps> = props => (
  <Field component={WrappedRadio} type="radio" {...props} />
);

export default RadioField;
