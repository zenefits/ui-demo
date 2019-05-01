import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { Box, Flex, FlexProps } from 'zbase';
import { styled } from 'z-frontend-theme';

import TimeInput, { parseTimeString, PublicTimeInputProps, Time } from '../../time/TimeInput';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import { TimeInputValue } from '../time-input/FormTimeInput';
import FormGroup from '../FormGroup';

export type TimeRangeValue = {
  startTime: TimeInputValue;
  endTime: TimeInputValue;
};

const DEFAULT_HIGHLIGHT_TYPES = {
  CURRENT_TIME: 'currentTime',
  CUSTOM_TIME: 'customTime',
  INTERVAL_AFTER_START_TIME: 'intervalAfterStartTime',
};

type StartDefaultHighlightTypes =
  | typeof DEFAULT_HIGHLIGHT_TYPES.CURRENT_TIME
  | typeof DEFAULT_HIGHLIGHT_TYPES.CUSTOM_TIME;

type StartDefaultHighlight = {
  type: StartDefaultHighlightTypes;
  customTime?: {
    hours: number;
    minutes: number;
  };
};

type EndDefaultHighlightTypes =
  | typeof DEFAULT_HIGHLIGHT_TYPES.CURRENT_TIME
  | typeof DEFAULT_HIGHLIGHT_TYPES.CUSTOM_TIME
  | typeof DEFAULT_HIGHLIGHT_TYPES.INTERVAL_AFTER_START_TIME;

type EndDefaultHighlight = {
  type: EndDefaultHighlightTypes;
  numberOfIntervals?: number; // Number of intervals from start Time
  customTime?: {
    hours: number;
    minutes: number;
  };
};

type FormTimeInputProps = {
  /**
   * Human-friendly label for the input.
   * */
  label: string;
  /**
   * Utility props to pass through to the container.
   * */
  containerProps?: FlexProps;
  interval?: number;
  startDefaultHighlight?: StartDefaultHighlight;
  endDefaultHighlight?: EndDefaultHighlight;
};

const Separator = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

const START_TIME_ERROR = 'The start time you entered is not valid.';
const END_TIME_ERROR = 'The end time you entered is not valid.';
const GENERIC_ERROR = 'The time range you entered is invalid.';

class FormTimeRange extends Component<FormTimeInputProps & PublicTimeInputProps & FormFieldProps> {
  static defaultProps = {
    interval: 30,
    startDefaultHighlight: {
      type: 'currentTime',
    },
    endDefaultHighlight: {
      type: 'intervalAfterStartTime',
      numberOfIntervals: 1,
    },
  };
  static getEmptyValue = () => ({
    startTime: { timeString: '' },
    endTime: { timeString: '' },
  });

  static validationSchema = Yup.object()
    .test(
      'has-valid-start-time',
      START_TIME_ERROR,
      value => !!(value.startTime && parseTimeString(value.startTime.timeString)),
    )
    .test(
      'has-valid-end-time',
      END_TIME_ERROR,
      value => !!(value.endTime && parseTimeString(value.endTime.timeString)),
    );

  startDefaultTime = () => {
    if (
      this.props.startDefaultHighlight &&
      this.props.startDefaultHighlight.type === DEFAULT_HIGHLIGHT_TYPES.CUSTOM_TIME &&
      this.props.startDefaultHighlight.customTime
    ) {
      return this.props.startDefaultHighlight.customTime;
    } else {
      const startDefaultTime = moment();
      return {
        hours: startDefaultTime.get('hours'),
        minutes: startDefaultTime.get('minutes'),
      };
    }
  };
  endDefaultTime = (startTimeString: string): Time => {
    let endDefaultTime = moment();
    if (
      this.props.endDefaultHighlight &&
      this.props.endDefaultHighlight.type === DEFAULT_HIGHLIGHT_TYPES.CUSTOM_TIME &&
      this.props.endDefaultHighlight.customTime
    ) {
      return this.props.endDefaultHighlight.customTime;
    } else if (
      startTimeString &&
      this.props.endDefaultHighlight &&
      this.props.endDefaultHighlight.type === DEFAULT_HIGHLIGHT_TYPES.INTERVAL_AFTER_START_TIME
    ) {
      const minutesToAdd = (this.props.endDefaultHighlight.numberOfIntervals || 1) * this.props.interval;
      endDefaultTime = moment(parseTimeString(startTimeString)).add(minutesToAdd, 'minutes');
    }
    return {
      hours: endDefaultTime.get('hours'),
      minutes: endDefaultTime.get('minutes'),
    };
  };

  render() {
    const { name, label, containerProps, optional, ...rest } = this.props;

    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const touched = getIn(form.touched, name);
          const error: any = touched && getIn(form.errors, name);
          const fieldValue = field.value || FormTimeRange.getEmptyValue();

          let startTimeError;
          let endTimeError;
          if (error) {
            startTimeError = error === START_TIME_ERROR ? START_TIME_ERROR : GENERIC_ERROR;
            endTimeError = error === END_TIME_ERROR ? END_TIME_ERROR : GENERIC_ERROR;
          }

          return (
            <FormGroup id={name} containerProps={containerProps} label={label} error={error} optional={optional}>
              <Flex>
                <Box flex="1">
                  <FormFieldWrapper name={name + '-start'} label={label} error={error} format="raw" optional={optional}>
                    <TimeInput
                      name={name + '-start'}
                      error={startTimeError}
                      onChange={(timeString, time) => {
                        form.setFieldValue(field.name, {
                          ...fieldValue,
                          startTime: {
                            timeString,
                            time,
                          },
                        });

                        // Shouldn't set field as touched until both subfields have been edited
                        if (fieldValue.endTime.timeString) {
                          form.setFieldTouched(name, true);
                        }
                      }}
                      initialInputValue={fieldValue.startTime.timeString}
                      defaultHighlightTime={this.startDefaultTime()}
                      {...rest}
                    />
                  </FormFieldWrapper>
                </Box>
                <Separator px={5}> &mdash; </Separator>
                <Box flex="1">
                  <FormFieldWrapper name={name + '-end'} label={label} error={error} format="raw" optional={optional}>
                    <TimeInput
                      name={name + '-end'}
                      error={endTimeError}
                      onChange={(timeString, time) => {
                        form.setFieldValue(field.name, {
                          ...fieldValue,
                          endTime: {
                            timeString,
                            time,
                          },
                        });

                        if (fieldValue.startTime.timeString) {
                          form.setFieldTouched(name, true);
                        }
                      }}
                      initialInputValue={fieldValue.endTime.timeString}
                      defaultHighlightTime={this.endDefaultTime(fieldValue.startTime.timeString)}
                      {...rest}
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

export default FormTimeRange;
