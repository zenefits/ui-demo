import React, { StatelessComponent } from 'react';
import { Field, Validator, WrappedFieldProps } from 'redux-form';

import { FieldFormatWrapper, FieldProps } from './FieldWrapper';
import SelectDeprecated, { SelectProps as SelectDeprecatedProps } from '../select/SelectDeprecated';
import { generateValidators } from '../validators';
import { InputProps } from '../input/Input';

type FormSelectProps = WrappedFieldProps & FieldProps & InputProps;
export const FormSelect: StatelessComponent<FormSelectProps> = ({
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
  const isInvalid = !!finalErrorText;
  return (
    <FieldFormatWrapper
      label={label}
      tooltipText={tooltipText}
      helpText={helpText}
      fieldFormat={fieldFormat}
      errorText={finalErrorText}
    >
      {/* Use required={false} to disable native validation error */}
      <SelectDeprecated {...rest} {...input} aria-invalid={isInvalid} hasError={isInvalid} required={false} />
    </FieldFormatWrapper>
  );
};

export type SelectFieldProps = FieldProps & SelectDeprecatedProps;
const SelectField: StatelessComponent<SelectFieldProps> = ({ validate, required, ...rest }) => {
  const validators = [
    ...generateValidators({
      required,
    }),
    ...((validate as Validator[]) || []),
  ];
  return <Field<{}> {...rest} component={FormSelect} validate={validators} />;
};

export default SelectField;
