import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';
import { DayPickerProps } from 'react-day-picker/types/props';

import { styled } from 'z-frontend-theme';

import { Box, Flex, FlexProps } from 'zbase';

import DateInput, { DateInputProps } from '../../date-picker/DateInput';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import FormGroup from '../FormGroup';

const Separator = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export type DateRangeValue = {
  startDate: Date;
  endDate: Date;
};

type FormDateRangeProps = {
  /**
   * Human-friendly label for the input.
   * */
  label: string;
  /**
   * Utility props to pass through to the container.
   * */
  containerProps?: FlexProps;
  /**
   * Library options for starting date picker
   * */
  startDatePickerOptions?: DayPickerProps;
  /**
   * Library options for ending date picker
   * */
  endDatePickerOptions?: DayPickerProps;
};

class FormDateRange extends Component<FormDateRangeProps & DateInputProps & FormFieldProps> {
  static getEmptyValue = () => ({
    startDate: '',
    endDate: '',
  });

  render() {
    const { name, label, containerProps, optional, startDatePickerOptions, endDatePickerOptions } = this.props;

    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const touched = getIn(form.touched, name);
          const error: any = touched && getIn(form.errors, name);
          const fieldValue = field.value || FormDateRange.getEmptyValue();
          return (
            <FormGroup id={name} containerProps={containerProps} label={label} error={error} optional={optional}>
              <Flex>
                <Box flex="1">
                  <FormFieldWrapper
                    name={name + '-startDate'}
                    label={label}
                    error={error}
                    format="raw"
                    optional={optional}
                  >
                    <DateInput
                      name={name + '-startDate'}
                      value={fieldValue.startDate}
                      onChange={value => {
                        form.setFieldValue(field.name, {
                          ...fieldValue,
                          startDate: value,
                        });
                      }}
                      pickerOptions={startDatePickerOptions}
                    />
                  </FormFieldWrapper>
                </Box>
                <Separator px={3}> &mdash; </Separator>
                <Box flex="1">
                  <FormFieldWrapper
                    name={name + '-endDate'}
                    label={label}
                    error={error}
                    format="raw"
                    optional={optional}
                  >
                    <DateInput
                      name={name + '-endDate'}
                      value={fieldValue.endDate}
                      onChange={value => {
                        form.setFieldValue(field.name, {
                          ...fieldValue,
                          endDate: value,
                        });
                      }}
                      pickerOptions={endDatePickerOptions}
                    />
                  </FormFieldWrapper>
                </Box>
              </Flex>
            </FormGroup>
          );
        }}
      />
    );
  }
}

export default FormDateRange;
