import React, { StatelessComponent } from 'react';
import { Field as BaseField, Validator, WrappedFieldProps } from 'redux-form';

import { FieldFormatWrapper, FieldProps } from './FieldWrapper';
import { generateValidators } from '../validators';
import Input, { InputProps } from '../Input';

type AllInputProps = InputProps & WrappedFieldProps & FieldProps;

class Field extends BaseField<InputProps> {}

export const InputField: StatelessComponent<AllInputProps> = ({
  input,
  meta,
  label,
  helpText,
  errorText,
  tooltipText,
  fieldFormat,
  ...rest
}) => {
  const { touched, error } = meta;
  const finalErrorText = (touched && error) || errorText;
  return (
    <FieldFormatWrapper
      label={label}
      tooltipText={tooltipText}
      helpText={helpText}
      fieldFormat={fieldFormat}
      errorText={finalErrorText}
    >
      <Input {...rest} {...input} aria-invalid={!!finalErrorText} hasError={!!finalErrorText} />
    </FieldFormatWrapper>
  );
};

const TextField: StatelessComponent<FieldProps> = ({ validate, ...rest }) => {
  const validators = [
    ...generateValidators({
      required: rest.required,
      minLength: rest.minLength,
      maxLength: rest.maxLength,
      minVal: Number(rest.min),
      maxVal: Number(rest.max),
    }),
    ...((validate as Validator[]) || []),
  ];
  return <Field type="text" component={InputField} validate={validators} {...rest} />;
};

export default TextField;
