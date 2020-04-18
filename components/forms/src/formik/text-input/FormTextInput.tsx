import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import { Input, InputProps } from '../../../index';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import { getAriaInputProps } from '../formAccessibility';
import InputDisplay from '../../input/InputDisplay';

export type FormTextInputProps = InputProps &
  FormFieldProps & {
    /**
     * Use to toggle the component from edit to display but keep exact spacing, eg in an EditableTable.
     * @default false
     */
    displayOnly?: boolean;
  };

class FormTextInput extends Component<FormTextInputProps> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      format,
      limitRerender,
      dependencies,
      'aria-label': ariaLabel,
      helpText,
      displayOnly,
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
              helpText={helpText}
              error={error}
              format={format}
              containerProps={containerProps}
              optional={optional}
              dependencies={dependencies}
            >
              {displayOnly ? (
                <InputDisplay value={field.value || rest.value} />
              ) : (
                <Input
                  id={name}
                  {...field}
                  {...rest}
                  hasError={Boolean(error)}
                  {...getAriaInputProps(name, error, ariaLabel)}
                  mb={0}
                />
              )}
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormTextInput;
