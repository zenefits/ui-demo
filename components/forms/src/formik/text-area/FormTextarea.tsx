import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import Textarea, { TextareaProps } from '../../textarea/Textarea';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import { getAriaInputProps } from '../formAccessibility';

type FormTextareaProps = TextareaProps & FormFieldProps;

class FormTextarea extends Component<FormTextareaProps> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      limitRerender,
      dependencies,
      'aria-label': ariaLabel,
      helpText,
      format,
      ...rest
    } = this.props;
    return (
      <Field limitRerender={limitRerender} dependencies={dependencies} name={name}>
        {({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              helpText={helpText}
              error={error}
              format={format}
              containerProps={containerProps}
              optional={optional}
            >
              <Textarea
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

export default FormTextarea;
