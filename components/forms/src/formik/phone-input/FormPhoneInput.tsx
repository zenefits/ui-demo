import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import PhoneInput, { PhoneInputProps } from '../../phone-input/PhoneInput';
import { getAriaInputProps } from '../formAccessibility';

type FormPhoneInputProps = PhoneInputProps & FormFieldProps;

class FormPhoneInput extends Component<FormPhoneInputProps> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      limitRerender,
      dependencies,
      'aria-label': ariaLabel,
      format,
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
              format={format}
              containerProps={containerProps}
              optional={optional}
            >
              <PhoneInput
                id={name}
                {...field}
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

export default FormPhoneInput;
