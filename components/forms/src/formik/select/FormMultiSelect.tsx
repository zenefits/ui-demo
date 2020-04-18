import React, { Component } from 'react';
import { getIn } from 'formik';

import Field from '../Field';
import MultiSelect, { SharedMultiSelectProps } from '../../select/MultiSelect';
import FormFieldWrapper, { getErrorId, FormFieldProps } from '../FormFieldWrapper';

export type FormMultiSelectProps<OptionValue> = SharedMultiSelectProps<OptionValue> & FormFieldProps;

class FormMultiSelect<OptionValue> extends Component<FormMultiSelectProps<OptionValue>> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      onChange,
      limitRerender,
      dependencies,
      format,
      helpText,
      ...rest
    } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
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
              <MultiSelect<OptionValue>
                name={name}
                value={field.value}
                onChange={(value: OptionValue[]) => {
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

export default FormMultiSelect;
