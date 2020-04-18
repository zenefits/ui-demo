import React, { Component } from 'react';
import { getIn } from 'formik';

import Field from '../Field';
import Select, { SharedSelectProps } from '../../select/Select';
import FormFieldWrapper, { getErrorId, FormFieldProps } from '../FormFieldWrapper';

type FormSelectProps<OptionValue> = SharedSelectProps<OptionValue> & FormFieldProps;

class FormSelect<OptionValue> extends Component<FormSelectProps<OptionValue>> {
  render() {
    const { name, label, containerProps, optional, onChange, format, helpText, ...rest } = this.props;
    return (
      <Field name={name}>
        {({ field, form, setFieldValueAndTouched }) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              helpText={helpText}
              error={error}
              containerProps={containerProps}
              optional={optional}
              format={format}
            >
              <Select
                name={name}
                value={field.value}
                onChange={value => {
                  setFieldValueAndTouched(field.name, value);
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
      </Field>
    );
  }
}

export default FormSelect;
