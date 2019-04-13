import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import { FlexProps } from 'zbase';

import GroupSelect, { SharedGroupSelectProps } from '../../select/GroupSelect';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';

type FormGroupSelectProps = {
  /**
   * Human-friendly label for the input.
   * */
  label: string;
  /**
   * Utility props to pass through to the container.
   * */
  containerProps?: FlexProps;
};

class FormGroupSelect<OptionValue = any> extends Component<
  FormGroupSelectProps & FormFieldProps & SharedGroupSelectProps<OptionValue>
> {
  render() {
    const { name, label, containerProps, optional, ...rest } = this.props;
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
            >
              <GroupSelect
                name={name}
                error={error}
                onSelect={option => {
                  form.setFieldValue(field.name, option);
                  form.setFieldTouched(field.name);
                }}
                defaultValue={field.value}
                {...rest}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormGroupSelect;
