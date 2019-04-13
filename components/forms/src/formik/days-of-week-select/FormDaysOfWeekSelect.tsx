import React, { Component } from 'react';
import _ from 'lodash';

import { CircleButton } from '../../circle-button-array/CircleButtonArray';
import CircleButtonSelect from '../circle-button-select/FormCircleButtonSelect';
import { FormFieldProps } from '../FormFieldWrapper';

type DaysOfWeekSelectProps = FormFieldProps & {
  behavior: 'checkbox' | 'radio';
};

export enum dayOfWeekMap {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

const weekdayOptions = [
  { label: 'M', full: 'Monday' },
  { label: 'T', full: 'Tuesday' },
  { label: 'W', full: 'Wednesday' },
  { label: 'T', full: 'Thursday' },
  { label: 'F', full: 'Friday' },
  { label: 'S', full: 'Saturday' },
  { label: 'S', full: 'Sunday' },
];

class FormDaysOfWeekSelect extends Component<DaysOfWeekSelectProps> {
  render() {
    return (
      <CircleButtonSelect numOptions={7} {...this.props}>
        {weekdayOptions.map((option, i) => (
          <CircleButton key={i} aria-label={option.full}>
            {option.label}
          </CircleButton>
        ))}
      </CircleButtonSelect>
    );
  }
}

export default FormDaysOfWeekSelect;
