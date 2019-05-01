import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import { Input, InputProps } from '../../../index';
import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';

export type FormTextInputProps = InputProps & FormFieldProps;

class FormTextInput extends Component<FormTextInputProps> {
  render() {
    const { name, label, containerProps, optional, format, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
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
              <Input
                id={name}
                {...field}
                {...rest}
                hasError={Boolean(error)}
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                mb={0}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormTextInput;
