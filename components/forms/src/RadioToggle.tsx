import React, { StatelessComponent } from 'react';
import { styled, css } from 'z-frontend-theme';
import { color, space, fontStyles, radius } from 'z-frontend-theme/utils';
import { Flex, Box, Label, Input, InputProps } from 'zbase';

export declare type RadioToggleProps = InputProps & {
  onValue?: string;
  offValue?: string;
  onLabel: React.ReactNode;
  offLabel: React.ReactNode;
  selectedValue?: string;
};

const styledRadio = css`
  background-color: ${color('grayscale.white')};
  padding: ${space(2)} ${space(3)};
  ${fontStyles('controls.m')};
  color: ${color('grayscale.e')};
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 0 0 1px ${color('secondary.b')};
`;

const OnRadioBox = styled(Box)`
  ${styledRadio};
  border-radius: ${radius} 0 0 ${radius};
`;

const OffRadioBox = styled(Box)`
  ${styledRadio};
  border-radius: 0 ${radius} ${radius} 0;
`;

const StyledInput = styled.input.attrs({ type: 'radio' })`
  margin: 0;
  appearance: none;

  &:checked {
    ~ ${OnRadioBox} {
      color: ${color('grayscale.white')};
      background-color: ${color('affirmation.b')};
    }

    /* stylelint-disable no-duplicate-selectors */
    ~ ${OffRadioBox} {
      /* stylelint-enable no-duplicate-selectors */
      color: ${color('grayscale.white')};
      background-color: ${color('negation.b')};
    }
  }

  &:disabled ~ * {
    cursor: not-allowed;
  }

  &:hover:not(:disabled) ~ * {
    box-shadow: 0 0 0 1px ${color('grayscale.e')};
    z-index: 1;
  }

  &:active:not(:disabled) ~ * {
    box-shadow: 0 0 0 1px ${color('grayscale.d')};
  }
` as typeof Input;

const StyledLabel = styled(Label)`
  cursor: pointer;
  margin: 0;
`;

const StyledContainer = styled(Flex)`
  border-radius: ${radius};
  display: inline-flex;
`;

const RadioToggle: StatelessComponent<RadioToggleProps> = props => {
  const {
    name,
    onValue = 'on',
    offValue = 'off',
    onLabel,
    offLabel,
    selectedValue,
    defaultChecked,
    checked,
    ...inputProps
  } = props;

  return (
    <StyledContainer>
      <StyledLabel>
        <StyledInput name={name} value={onValue} defaultChecked={selectedValue === onValue} {...inputProps} />
        <OnRadioBox>{onLabel}</OnRadioBox>
      </StyledLabel>
      <StyledLabel>
        <StyledInput name={name} value={offValue} defaultChecked={selectedValue === offValue} {...inputProps} />
        <OffRadioBox>{offLabel}</OffRadioBox>
      </StyledLabel>
    </StyledContainer>
  );
};

export default RadioToggle;
