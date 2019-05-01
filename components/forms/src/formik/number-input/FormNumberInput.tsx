import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';
import NumberInput, { NumberInputProps } from '../../number-input/NumberInput';

type FormNumberInputProps = NumberInputProps & FormFieldProps;

class FormNumberInput extends Component<FormNumberInputProps> {
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
              <NumberInput
                id={name}
                {...field}
                {...rest}
                hasError={Boolean(error)}
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                mb={0}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormNumberInput;
