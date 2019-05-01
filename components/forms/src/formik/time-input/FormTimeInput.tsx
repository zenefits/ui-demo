import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import { FlexProps } from 'zbase';

import TimeInput, { parseTimeString, PublicTimeInputProps, Time } from '../../time/TimeInput';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';

export const INVALID_TIME_MESSAGE = 'The time you entered is not valid.';

export type TimeInputValue = {
  timeString: string;
  time?: Time | null;
};

export const timeInputSchema = Yup.object().test(
  'is-valid-time',
  INVALID_TIME_MESSAGE,
  value => parseTimeString(value.timeString) !== null,
);

type FormTimeInputProps = {
  /**
   * Human-friendly label for the input.
   * */
  label: string;
  /**
   * Utility props to pass through to the container.
   * */
  containerProps?: FlexProps;
};

class FormTimeInput extends Component<FormTimeInputProps & PublicTimeInputProps & FormFieldProps> {
  static getEmptyValue = () => ({ timeString: '' });
  static validationSchema = timeInputSchema;

  render() {
    const { name, label, containerProps, optional, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          const fieldValue = field.value || { timeString: '' };
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <TimeInput
                name={name}
                error={error}
                onChange={(timeString, time) => {
                  form.setFieldValue(field.name, {
                    timeString,
                    time,
                  });
                  form.setFieldTouched(field.name);
                }}
                initialInputValue={fieldValue.timeString}
                {...rest}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

FormTimeInput.validationSchema = timeInputSchema;

export default FormTimeInput;
