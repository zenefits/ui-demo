import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import { FlexProps } from 'zbase';

import SearchSelect, { SharedSearchSelectProps } from '../../search/SearchSelect';
import FormFieldWrapper from '../FormFieldWrapper';

type FormSearchSelectProps = {
  /**
   * Human-friendly label for the input.
   * */
  label: string;
  /**
   * Utility props to pass through to the container.
   * */
  containerProps?: FlexProps;
};

class FormSearchSelect<OptionValue> extends Component<FormSearchSelectProps & SharedSearchSelectProps<OptionValue>> {
  render() {
    const { name, label, containerProps, onChange, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper name={name} error={error} label={label} containerProps={containerProps}>
              <SearchSelect
                name={name}
                error={error}
                onChange={value => {
                  form.setFieldValue(field.name, value);
                  form.setFieldTouched(field.name);
                  onChange && onChange(value);
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

export default FormSearchSelect;
