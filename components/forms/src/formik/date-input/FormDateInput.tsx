import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';

import DateInput, { DateInputProps } from '../../date-picker/DateInput';
import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';

type FormDateInputProps = DateInputProps & FormFieldProps;

class FormDateInput extends Component<FormDateInputProps> {
  render() {
    const { name, label, containerProps, optional, format, pickerOptions, ...rest } = this.props;
    let setTouchedOnInputBlurTimeout: NodeJS.Timeout;

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
              format={format}
              containerProps={containerProps}
              optional={optional}
            >
              <DateInput
                id={name}
                value={field.value}
                onChange={value => {
                  clearTimeout(setTouchedOnInputBlurTimeout);
                  form.setFieldValue(name, value);
                }}
                onBlur={() => {
                  // The blur handler is firing whenever a day is a selected or month changed
                  // This handler happens before the day change handler, and if the form.setFieldTouched
                  // cb fires immediately, the form will re-render and the day change handler won't get called.
                  setTouchedOnInputBlurTimeout = setTimeout(() => {
                    form.setFieldTouched(name, true);
                  }, 250);
                }}
                hasError={Boolean(error)}
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                mb={0}
                pickerOptions={{
                  onMonthChange: () => {
                    clearTimeout(setTouchedOnInputBlurTimeout);
                  },
                  ...pickerOptions,
                }}
                {...rest}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormDateInput;
