import React, { Component } from 'react';
import { getIn, Field, FieldProps, FormikProps } from 'formik';

import WeekPicker, { DayClickHandler, WeekPickerProps } from '../../week-picker/WeekPicker';
import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';

type FormWeekPickerProps = WeekPickerProps & FormFieldProps;

type CreateDayClickHandler = (form: FormikProps<any>) => DayClickHandler;

class FormWeekPicker extends Component<FormWeekPickerProps> {
  createDayClickHandler: CreateDayClickHandler = form => (day, week) => {
    const name = this.props.name;

    // TODO: Set field value only when selected week changes
    form.setFieldValue(name, week);
  };

  render() {
    const { name, label, containerProps, optional, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
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
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                {...rest}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormWeekPicker;
