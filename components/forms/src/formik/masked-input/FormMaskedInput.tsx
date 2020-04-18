import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import MaskedInput, { MaskedInputProps } from '../../masked-input/MaskedInput';
import { getAriaInputProps } from '../formAccessibility';

type FormMaskedInputProps = MaskedInputProps & FormFieldProps;

class FormMaskedInput extends Component<FormMaskedInputProps> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      limitRerender,
      dependencies,
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
            >
              <MaskedInput
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

export default FormMaskedInput;
