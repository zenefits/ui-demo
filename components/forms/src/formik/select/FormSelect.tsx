import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import Select, { SharedSelectProps } from '../../select/Select';
import FormFieldWrapper, { getErrorId, FormFieldProps } from '../FormFieldWrapper';

type FormSelectProps<OptionValue> = SharedSelectProps<OptionValue> & FormFieldProps;

class FormSelect<OptionValue> extends Component<FormSelectProps<OptionValue>> {
  render() {
    const { name, label, containerProps, optional, onChange, format, ...rest } = this.props;
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
              containerProps={containerProps}
              optional={optional}
              format={format}
            >
              <Select
                name={name}
                value={field.value}
                onChange={value => {
                  form.setFieldValue(field.name, value);
                  form.setFieldTouched(field.name);
                  onChange && onChange(value);
                }}
                onInputValueChange={this.props.onInputValueChange}
                label={label}
                error={error}
                controlAriaDescribedBy={error && getErrorId(name)}
                {...rest}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormSelect;
