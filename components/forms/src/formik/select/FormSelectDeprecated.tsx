import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import SelectDeprecated, { SelectProps as SelectDeprecatedProps } from '../../select/SelectDeprecated';
import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';

type FormSelectProps = SelectDeprecatedProps & FormFieldProps;

/**
 * @deprecated Please use Form.Select instead
 */
class FormSelectDeprecated extends Component<FormSelectProps> {
  render() {
    const { name, label, containerProps, optional, limitRerender, dependencies, ...rest } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <SelectDeprecated
                id={name}
                {...field}
                onChange={(value: string) => form.setFieldValue(name, value)} // treat as custom because synthetic DOM event `e` not exposed
                onBlur={() => form.setFieldTouched(name, true)} // treat as custom because synthetic DOM event `e` not exposed
                {...rest}
                hasError={Boolean(error)}
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
              />
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormSelectDeprecated;
