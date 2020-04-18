import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import { Checkbox, CheckboxProps } from '../../../index';
import FormFieldWrapper, { getLabelId, FormFieldProps } from '../FormFieldWrapper';
import { getAriaInputProps } from '../formAccessibility';

export type FormCheckboxProps = CheckboxProps & FormFieldProps;

class FormCheckbox extends Component<FormCheckboxProps> {
  render() {
    const { name, containerProps, format, limitRerender, dependencies, 'aria-label': ariaLabel, ...rest } = this.props;
    return (
      <Field limitRerender={limitRerender} dependencies={dependencies} name={name}>
        {({ field, form }: FieldProps) => {
          // NOTE: skip `form.touched[name]` to trigger error so that unchecked can be an error
          const error: any = getIn(form.errors, name);
          return (
            <FormFieldWrapper
              fieldType="checkbox"
              name={name}
              error={error}
              containerProps={containerProps}
              format={format}
            >
              <Checkbox
                id={name}
                {...field}
                checked={field.value}
                labelId={getLabelId(name)}
                {...rest}
                {...getAriaInputProps(name, error, ariaLabel)}
                mb={error ? 1 : 0}
              />
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormCheckbox;
