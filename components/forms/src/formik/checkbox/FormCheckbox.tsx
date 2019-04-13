import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import { Checkbox, CheckboxProps } from '../../../index';
import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';

export type FormCheckboxProps = CheckboxProps & FormFieldProps;

class FormCheckbox extends Component<FormCheckboxProps> {
  render() {
    const { name, containerProps, format, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
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
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                {...rest}
                mb={error ? 1 : 0}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormCheckbox;
