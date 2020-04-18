import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import NumberInput, { NumberInputProps } from '../../number-input/NumberInput';
import { getAriaInputProps } from '../formAccessibility';

type FormNumberInputProps = NumberInputProps & FormFieldProps;

class FormNumberInput extends Component<FormNumberInputProps> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      limitRerender,
      dependencies,
      format,
      'aria-label': ariaLabel,
      ...rest
    } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
              format={format}
            >
              <NumberInput
                id={name}
                {...field}
                onChange={(value: number | string) => {
                  form.setFieldValue(name, value);
                }}
                {...rest}
                hasError={Boolean(error)}
                {...getAriaInputProps(name, error, ariaLabel)}
                mb={0}
              />
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormNumberInput;
