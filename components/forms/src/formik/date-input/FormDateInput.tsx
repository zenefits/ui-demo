import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';

import Field from '../Field';
import DateInput, { DateInputProps } from '../../date-picker/DateInput';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import { formatIsoString } from '../../fields';
import { getAriaInputProps } from '../formAccessibility';

export type FormDateInputProps = DateInputProps &
  FormFieldProps & {
    /**
     * Keep the time part of the date. By default, the value is just YYYY-MM-DD.
     * This is mostly for backwards-compatibility.
     * @default false
     */
    preserveTime?: boolean;
  };

class FormDateInput extends Component<FormDateInputProps> {
  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      format,
      pickerOptions,
      limitRerender,
      dependencies,
      preserveTime,
      helpText,
      'aria-label': ariaLabel,
      ...rest
    } = this.props;
    let setTouchedOnInputBlurTimeout: number;

    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              format={format}
              containerProps={containerProps}
              optional={optional}
              helpText={helpText}
            >
              <DateInput
                id={name}
                value={field.value}
                onChange={value => {
                  clearTimeout(setTouchedOnInputBlurTimeout);
                  const formatted = preserveTime ? value : formatIsoString(value); // remove time portion
                  form.setFieldValue(name, formatted || '');
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
                mb={0}
                pickerOptions={{
                  onMonthChange: () => {
                    clearTimeout(setTouchedOnInputBlurTimeout);
                  },
                  ...pickerOptions,
                }}
                {...rest}
                {...getAriaInputProps(name, error, ariaLabel)}
              />
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormDateInput;
