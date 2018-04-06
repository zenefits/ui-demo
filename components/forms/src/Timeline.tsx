import React, { StatelessComponent } from 'react';
import { FlattenInterpolation } from 'styled-components';
import { styled, css } from 'z-frontend-theme';
import { color, space, fontStyles } from 'z-frontend-theme/utils';
import { Box, Flex, Label, P } from 'zbase';
import moment from 'moment';

declare type TimelineProps = {
  otherData?: string;
  label?: string;
  rangeDateFormat?: string;
  startDate: Date;
  endDate: Date;
  valueDate: Date;
};

function getThumbTextPosition(val) {
  let direction = 'left';
  let positionVal = val;
  if (val > 50) {
    direction = 'right';
    positionVal = 100 - val;
  }
  return `${direction}: ${positionVal + 4}%`;
}

function formatDateIntoString(date, dateFormat) {
  return moment(date).format(dateFormat || 'MMM D');
}

function getDayInteger(date) {
  // makes it easier to deal with as a number
  // converts date to integer and divides by days to make it more readable
  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  return Math.round(date / days);
}

function getValuePercent(start, end, value) {
  const totalDiff = end - start;
  const valueDiff = value - start;
  const percentage = Math.round(valueDiff * 100 / totalDiff);
  return Math.max(0, Math.min(percentage, 100));
}

const textStyle = css`
  color: ${color('grayscale.d')};
  ${props => fontStyles('paragraphs.s')};
  display: inline-block;
`;

const StyledText = styled(P)`
  ${textStyle};
`;

const StyledLabel = styled(Label)`
  color: ${color('grayscale.b')};
  ${props => fontStyles('controls.m')};
  display: inline-block;
`;

const StyledOtherDataText = styled(P)`
  color: ${color('grayscale.c')};
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
  margin-top: -6px;
  position: absolute;
`;

const StyledThumbText = styled(P)`
  ${textStyle};
  position: absolute;
  top: -${space(3)};
  opacity: 0;
`;

const TrackStyle: FlattenInterpolation<{ value: number }>[] = css`
  ${StyledThumb} {
    left: ${props => props.value}%;
  }

  ${StyledThumbText} {
    ${props => getThumbTextPosition(props.value)};
  }
`;

const StyledTrack = styled(Box)`
  height: ${space(1)};
  background: ${color('secondary.b')};
  border: none;
  border-radius: ${space(1)};
  width: 100%;
  position: relative;
  ${TrackStyle};
`;

const StyledContainer = styled(Box)`
  &:hover {
    ${StyledThumb} {
      height: ${space(4)};
      transform: translateY(-${space(2)});
      transition: all 0.25s ease-in-out;
    }

    ${StyledThumbText} {
      opacity: 1;
      transition: all 0.25s ease-in-out;
    }
  }
`;

const Timeline: StatelessComponent<TimelineProps> = props => {
  const { startDate, endDate, label, valueDate, otherData, rangeDateFormat } = props;

  const minDate = getDayInteger(startDate);
  const maxDate = getDayInteger(endDate);
  const inputValueDate = getDayInteger(valueDate);
  const valuePercent = getValuePercent(minDate, maxDate, inputValueDate);

  return (
    <StyledContainer>
      <Flex justify="space-between" mb={1}>
        <StyledLabel>{label}</StyledLabel>
        {otherData && <StyledOtherDataText> {otherData} </StyledOtherDataText>}
      </Flex>
      <StyledTrack mt={3} mb={1} value={valuePercent}>
        <StyledThumbText>{formatDateIntoString(valueDate, rangeDateFormat)}</StyledThumbText>
        <StyledThumb />
      </StyledTrack>
      <Flex justify="space-between">
        <StyledText> {formatDateIntoString(startDate, rangeDateFormat)} </StyledText>
        <StyledText> {formatDateIntoString(endDate, rangeDateFormat)} </StyledText>
      </Flex>
    </StyledContainer>
  );
};

export default Timeline;
