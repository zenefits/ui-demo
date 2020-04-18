import React, { Component } from 'react';
import { getIn, FieldProps, FormikProps } from 'formik';

import Field from '../Field';
import WeekPicker, { DayClickHandler, WeekPickerProps } from '../../week-picker/WeekPicker';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import { getAriaInputProps } from '../formAccessibility';

type FormWeekPickerProps = WeekPickerProps & FormFieldProps;

type CreateDayClickHandler = (form: FormikProps<any>) => DayClickHandler;

class FormWeekPicker extends Component<FormWeekPickerProps> {
  createDayClickHandler: CreateDayClickHandler = form => (day, week) => {
    const { name } = this.props;

    // TODO: Set field value only when selected week changes
    form.setFieldValue(name, week);
  };

  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      limitRerender,
      dependencies,
      'aria-label': ariaLabel,
      ...rest
    } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form }: FieldProps) => {
          // TODO: update type for error
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);

          const selectedWeek = field.value && field.value.from;
          const initialMonth = selectedWeek || new Date();
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <WeekPicker
                id={name}
                selectedWeek={selectedWeek}
                initialMonth={initialMonth}
                onBlur={() => {
                  form.setFieldTouched(name, true);
                }}
                onDayClick={this.createDayClickHandler(form)}
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

export default FormWeekPicker;
