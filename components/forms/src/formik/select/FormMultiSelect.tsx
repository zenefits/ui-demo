import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import MultiSelect, { SharedMultiSelectProps } from '../../select/MultiSelect';
import FormFieldWrapper, { getErrorId, FormFieldProps } from '../FormFieldWrapper';

type FormMultiSelectProps<OptionValue> = SharedMultiSelectProps<OptionValue> & FormFieldProps;

class FormMultiSelect<OptionValue> extends Component<FormMultiSelectProps<OptionValue>> {
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
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <MultiSelect<OptionValue>
                name={name}
                value={field.value}
                onChange={(value: OptionValue[]) => {
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

export default FormMultiSelect;
