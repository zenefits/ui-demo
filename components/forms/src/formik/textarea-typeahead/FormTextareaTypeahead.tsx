import React, { Component } from 'react';
import { getIn } from 'formik';

import { FlexProps } from 'zbase';

import Field from '../Field';
import TextareaTypeahead, { SharedTextareaTypeaheadProps } from '../../textarea-typeahead/TextareaTypeahead';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';

type FormTextareaTypeaheadProps = {
  /**
   * human-friendly label for the input.
   * */
  label: string;
  /**
   * Utility props to pass through to the container.
   * */
  containerProps?: FlexProps;
};

class FormTextareaTypeahead extends Component<
  FormTextareaTypeaheadProps & SharedTextareaTypeaheadProps & FormFieldProps
> {
  render() {
    const { name, label, containerProps, onChange, limitRerender, dependencies, ...rest } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form, setFieldValueAndTouched }) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper name={name} error={error} label={label} containerProps={containerProps}>
              <TextareaTypeahead
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

export default FormTextareaTypeahead;
