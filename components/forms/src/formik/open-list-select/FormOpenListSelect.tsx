import React, { Component } from 'react';
import { getIn } from 'formik';

import { FlexProps } from 'zbase';

import Field from '../Field';
import OpenListSelect, { SharedOpenListSelectProps } from '../../select/OpenListSelect';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';

type FormOpenListSelectProps = {
  /**
   * Utility props to pass through to the container.
   * */
  containerProps?: FlexProps;
};

class FormOpenListSelect<OptionValue> extends Component<
  FormOpenListSelectProps & SharedOpenListSelectProps<OptionValue> & FormFieldProps
> {
  render() {
    const { name, label, containerProps, limitRerender, dependencies, ...rest } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form, setFieldValueAndTouched }) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper name={name} error={error} containerProps={containerProps}>
              <OpenListSelect
                name={name}
                error={error}
                label={label}
                onChange={option => {
                  setFieldValueAndTouched(field.name, option);
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

export default FormOpenListSelect;
