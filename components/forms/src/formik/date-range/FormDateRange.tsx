import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';
import { DayPickerProps } from 'react-day-picker/types/props';
import * as Yup from 'yup';

import { styled } from 'z-frontend-theme';
import { Box, Flex } from 'zbase';

import Field from '../Field';
import DateInput, { DateInputProps } from '../../date-picker/DateInput';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import FormRowGroup from '../row-group/FormRowGroup';
import { formatIsoString } from '../../fields/DatePickerField';

const Separator = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

type SingleDayPickerProps = { disabled?: boolean } & DayPickerProps;

export type DateRangeValue = {
  startDate: Date | string;
  endDate: Date | string;
};

type FormDateRangeProps = Omit<DateInputProps, 'onChange'> &
  FormFieldProps & {
    /**
     * Human-friendly label for the input.
     * */
    label: string;
    /**
     * Library options for starting date picker
     * */
    startDatePickerOptions?: SingleDayPickerProps;
    /**
     * Library options for ending date picker
     * */
    endDatePickerOptions?: SingleDayPickerProps;
    /**
     * onChange handler.
     */
    onChange?: (dateRangeValue: DateRangeValue) => void;
    /**
     * Whether to keep the time part of the date. When false, the value format is YYYY-MM-DD.
     * @default false
     */
    shouldPreserveTime?: boolean;
  };

class FormDateRange extends Component<FormDateRangeProps> {
  static getEmptyValue = () => ({
    startDate: '',
    endDate: '',
  });

  static validationSchema = Yup.object()
    .test('has-start-date', 'Start date is required', value => value.startDate)
    .test('has-end-date', 'End date is required', value => value.endDate)
    .test('start-should-be-before-end-date', 'Start date cannot be after end date', (value: DateRangeValue) => {
      if (value.startDate && value.endDate) {
        return !(new Date(value.startDate) > new Date(value.endDate));
      }
      return true;
    });

  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      onChange,
      startDatePickerOptions,
      limitRerender,
      dependencies,
      endDatePickerOptions,
      disabled,
      shouldPreserveTime,
    } = this.props;

    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form }: FieldProps) => {
          const touched = getIn(form.touched, name);
          const error: any = touched && getIn(form.errors, name);
          const fieldValue = field.value || FormDateRange.getEmptyValue();
          const getOnChangeForDateInput = (type: 'startDate' | 'endDate' = 'startDate') => (value: Date) => {
            const formatted = shouldPreserveTime ? value : formatIsoString(value); // remove time portion
            const newFieldValue: DateRangeValue = {
              ...fieldValue,
              [type]: formatted,
            };
            form.setFieldValue(field.name, newFieldValue);
            onChange && onChange(newFieldValue);
          };

          return (
            <FormRowGroup containerProps={containerProps} label={label} error={error} optional={optional}>
              <Flex>
                <Box flex="1">
                  <FormFieldWrapper name={`${name}-startDate`} label={label} format="raw" optional={optional}>
                    <DateInput
                      data-testid="FormDateRangeStartDate"
                      name={`${name}-startDate`}
                      value={fieldValue.startDate}
                      onChange={getOnChangeForDateInput('startDate')}
                      pickerOptions={startDatePickerOptions}
                      disabled={disabled || (startDatePickerOptions && startDatePickerOptions.disabled)}
                    />
                  </FormFieldWrapper>
                </Box>
                <Separator px={3}> &mdash; </Separator>
                <Box flex="1">
                  <FormFieldWrapper name={`${name}-endDate`} label={label} format="raw" optional={optional}>
                    <DateInput
                      data-testid="FormDateRangeEndDate"
                      name={`${name}-endDate`}
                      value={fieldValue.endDate}
                      onChange={getOnChangeForDateInput('endDate')}
                      onBlur={() => {
                        form.setFieldTouched(field.name);
                      }}
                      pickerOptions={endDatePickerOptions}
                      disabled={disabled || (endDatePickerOptions && endDatePickerOptions.disabled)}
                    />
                  </FormFieldWrapper>
                </Box>
              </Flex>
            </FormRowGroup>
          );
        }}
      </Field>
    );
  }
}

export default FormDateRange;
