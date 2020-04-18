import React, { StatelessComponent } from 'react';
// eslint-disable-next-line zenefits-custom-rules/import-filter
import { Field as BaseField, Validator, WrappedFieldProps } from 'redux-form';

import { FieldFormatWrapper, FieldProps } from './FieldWrapper';
import { generateValidators } from '../validators';
import Input, { InputProps } from '../input/Input';
import MoneyInput from '../money-input/MoneyInput';
import PercentageInput from '../percentage-input/PercentageInput';

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
  type,
  ...rest
}) => {
  const { touched, error } = meta;
  const finalErrorText = (touched && error) || errorText;
  const InputComponent = getInputComponent(type) as any;
  return (
    <FieldFormatWrapper
      label={label}
      tooltipText={tooltipText}
      helpText={helpText}
      fieldFormat={fieldFormat}
      errorText={finalErrorText}
    >
      <InputComponent
        {...rest}
        {...input}
        aria-invalid={!!finalErrorText}
        hasError={!!finalErrorText}
        required={false}
      />
    </FieldFormatWrapper>
  );
};

function getInputComponent(type: string) {
  if (type === 'money') {
    return MoneyInput;
  }
  if (type === 'percent') {
    return PercentageInput;
  }
  return Input;
}

const TextField: StatelessComponent<FieldProps> = ({ validate, ...rest }) => {
  const validators = [
    ...generateValidators({
      required: rest.required,
      minLength: rest.minLength,
      maxLength: rest.maxLength,
      minVal: rest.min,
      maxVal: rest.max,
    }),
    ...((validate as Validator[]) || []),
  ];
  return <Field type="text" component={InputField} validate={validators} {...rest} />;
};

export default TextField;
