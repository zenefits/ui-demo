import React, { Component } from 'react';
import { getIn } from 'formik';

import { FlexProps } from 'zbase';

import Field from '../Field';
import SearchSelect, { SharedSearchSelectProps } from '../../search/SearchSelect';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';

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

class FormSearchSelect<OptionValue> extends Component<
  FormSearchSelectProps & SharedSearchSelectProps<OptionValue> & FormFieldProps
> {
  render() {
    const { name, label, containerProps, onChange, limitRerender, dependencies, ...rest } = this.props;
    return (
      <Field limitRerender={limitRerender} dependencies={dependencies} name={name}>
        {({ field, form, setFieldValueAndTouched }) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper name={name} error={error} label={label} containerProps={containerProps}>
              <SearchSelect
                name={name}
                error={error}
                onChange={value => {
                  setFieldValueAndTouched(field.name, value);
                  onChange && onChange(value);
                }}
                value={field.value}
                {...rest}
              />
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormSearchSelect;
