import React, { StatelessComponent } from 'react';
import { FlattenInterpolation } from 'styled-components';
import moment from 'moment';

import { css, styled, ColorString } from 'z-frontend-theme';
import { ProgressBar } from 'z-frontend-elements';
import { color, fontStyles, space } from 'z-frontend-theme/utils';
import { Box, Flex, Label, TextBlock } from 'zbase';

type TimelineProps = {
  /** Other text that will appear on the top right of the component */
  otherData?: string;
  /** Label that will appear on the top left of the component */
  label?: string;
  /** How do you want the dates to be formatted? This component uses moment.format to format the dates
   * @default 'MMM D'
   */
  rangeDateFormat?: string;
  /**
   * When does the timeline start?
   */
  startDate: Date;
  /**
   * When does the timeline end?
   */
  endDate: Date;
  /**
   * What is the date you want to mark in the timeline? Usually, this is for the current date.
   */
  valueDate: Date;
  /**
   * What is the value to show on the progress bar. This is a percent value between 0 and 1.0
   */
  progressValue?: number;
  /**
   * Include a color to emphasize the progress made. By default there is no color.
   */
  progressColor?: ColorString;
};

function getThumbTextPosition(val: number) {
  let direction = 'left';
  let positionVal = val;
  if (val > 50) {
    direction = 'right';
    positionVal = 100 - val;
  }
  return `${direction}: ${positionVal + 2}%`;
}

function formatDateIntoString(date: Date, dateFormat?: string) {
  return moment(date).format(dateFormat || 'MMM D');
}

function getDayInteger(date: Date) {
  // makes it easier to deal with as a number
  // converts date to integer and divides by days to make it more readable
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  return Math.floor(date.valueOf() / days);
}

function getValuePercent(start: number, end: number, value: number) {
  const totalDiff = end - start;
  const valueDiff = value - start;
  const percentage = Math.round((valueDiff * 100) / totalDiff);
  return Math.max(0, Math.min(percentage, 100));
}

const textStyle = css`
  color: ${color('grayscale.d')};
  ${props => fontStyles('paragraphs.s')};
  display: inline-block;
`;

const StyledText = styled(TextBlock)`
  ${textStyle};
`;

const StyledLabel = styled(Label)`
  color: ${color('grayscale.b')};
  ${props => fontStyles('controls.m')};
  display: inline-block;
`;

const StyledOtherDataText = styled(TextBlock)`
  color: ${color('grayscale.d')};
  ${props => fontStyles('controls.m')};
  display: inline-block;
`;

const StyledThumb = styled(Box)`
  border: none;
  height: ${space(3)};
  width: 2px;
  border-radius: ${space(3)};
  background: ${color('secondary.a')};
  opacity: 0.5;
  margin-top: -${space(3)};
  position: absolute;
`;

const StyledThumbText = styled(TextBlock)`
  ${textStyle};
  position: absolute;
  bottom: -${space(0)};
  opacity: 0;
`;

const trackContainerStyle: FlattenInterpolation<{ value: number }>[] = css`
  ${StyledThumb} {
    left: ${props => props.value}%;
  }

  ${StyledThumbText} {
    ${props => getThumbTextPosition(props.value)};
  }
`;

const StyledTrackContainer = styled(Box)`
  width: 100%;
  position: relative;
  ${trackContainerStyle};

  &:hover {
    ${StyledThumb} {
      height: ${space(4)};
      transition: all 0.25s ease-in-out;
    }

    ${StyledThumbText} {
      opacity: 1;
      transition: all 0.25s ease-in-out;
    }

    ${StyledText} {
      opacity: 0;
    }
  }
`;

const Timeline: StatelessComponent<TimelineProps> = props => {
  const { startDate, endDate, label, valueDate, otherData, rangeDateFormat, progressValue, progressColor } = props;

  const minDate = getDayInteger(startDate);
  const maxDate = getDayInteger(endDate);
  const inputValueDate = getDayInteger(valueDate);
  const valuePercent = getValuePercent(minDate, maxDate, inputValueDate);
  return (
    <Box>
      <Flex justify="space-between" mb={1}>
        <StyledLabel>{label}</StyledLabel>
        {otherData && <StyledOtherDataText> {otherData} </StyledOtherDataText>}
      </Flex>
      <StyledTrackContainer value={valuePercent}>
        <ProgressBar value={progressValue} color={progressColor} w={1} />
        <StyledThumb />
        <StyledThumbText>{formatDateIntoString(valueDate, rangeDateFormat)}</StyledThumbText>
        <Flex justify="space-between">
          <StyledText> {formatDateIntoString(startDate, rangeDateFormat)} </StyledText>
          <StyledText> {formatDateIntoString(endDate, rangeDateFormat)} </StyledText>
        </Flex>
      </StyledTrackContainer>
    </Box>
  );
};

export default Timeline;
