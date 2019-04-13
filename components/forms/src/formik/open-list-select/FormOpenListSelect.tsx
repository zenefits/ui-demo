import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import { FlexProps } from 'zbase';

import OpenListSelect, { SharedOpenListSelectProps } from '../../select/OpenListSelect';
import FormFieldWrapper from '../FormFieldWrapper';

type FormOpenListSelectProps = {
  /**
   * Utility props to pass through to the container.
   * */
  containerProps?: FlexProps;
};

class FormOpenListSelect<OptionValue> extends Component<
  FormOpenListSelectProps & SharedOpenListSelectProps<OptionValue>
> {
  render() {
    const { name, label, containerProps, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper name={name} error={error} containerProps={containerProps}>
              <OpenListSelect
                name={name}
                error={error}
                label={label}
                onChange={option => {
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

export default FormOpenListSelect;
