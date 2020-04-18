import React, { Component, RefObject } from 'react';
// @ts-ignore
import DayPickerInput from 'react-day-picker/DayPickerInput';
// @ts-ignore
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import { styled } from 'z-frontend-theme';
import { color, radius, space } from 'z-frontend-theme/utils';
import { Tethered, TetherComponentProps } from 'z-frontend-overlays';
import { Box } from 'zbase';

import { DayPickerWrapper } from './DatePicker';

const StyledOverlayWrapper = styled(Box)`
  display: inline-block;
  background-color: ${color('grayscale.white')};
  margin-top: ${space(1)};
  border-radius: ${radius()};
  box-shadow: 0 0 0 1px ${color('secondary.a', 0.2)}, 0 1px 4px 0 ${color('secondary.a', 0.2)};
`;

type CustomOverlayProps = {
  selectedDay?: Date;
  month?: Date;
  overlayRef?: RefObject<HTMLDivElement>;
  input: {
    wrapperEl: HTMLDivElement;
  };
  tetherProps: Partial<TetherComponentProps>;
};

export default class CustomOverlay extends Component<CustomOverlayProps> {
  static defaultProps = {
    tetherProps: {},
  };

  shouldComponentUpdate(nextProps: CustomOverlayProps) {
    const currentMonth = this.props.month && this.props.month.valueOf();
    const nextMonth = nextProps.month && nextProps.month.valueOf();
    const currentDay = this.props.selectedDay && this.props.selectedDay.valueOf();
    const nextDay = nextProps.selectedDay && nextProps.selectedDay.valueOf();

    return currentDay !== nextDay || nextMonth !== currentMonth;
  }

  render() {
    const { wrapperEl } = this.props.input;
    const { overlayRef } = this.props;

    const tetherProps: Partial<TetherComponentProps> = {
      ...this.props.tetherProps,
      options: {
        placement: 'auto-start',
      },
    };

    return (
      <Tethered target={{ current: wrapperEl }} matchWidth={false} {...tetherProps}>
        <StyledOverlayWrapper>
          <DayPickerWrapper ref={overlayRef}>{this.props.children}</DayPickerWrapper>
        </StyledOverlayWrapper>
      </Tethered>
    );
  }
}
