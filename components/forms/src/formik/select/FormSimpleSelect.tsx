import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import SimpleSelect, { SharedSimpleSelectProps } from '../../select/SimpleSelect';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';

class FormSimpleSelect<OptionValue> extends Component<SharedSimpleSelectProps<OptionValue> & FormFieldProps> {
  render() {
    const { name, label, containerProps, optional, onChange, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              error={error}
              label={label}
              containerProps={containerProps}
              optional={optional}
            >
              <SimpleSelect
                name={name}
                error={error}
                onChange={(option: OptionValue) => {
                  this.props.onChange && this.props.onChange(option);
                  form.setFieldValue(field.name, option);
                  form.setFieldTouched(field.name);
                }}
                value={field.value}
                {...rest}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormSimpleSelect;
