import React, { Component, ReactElement, ReactNode } from 'react';

import { Box, Flex, TextBlock } from 'zbase';
import { radius } from 'z-frontend-theme/utils';
import { styled, HideFor } from 'z-frontend-theme';

import FormCustomTileInput, { FormCustomTileInputProps } from './FormCustomTileInput';
import { StyledBox as CustomTileInputStyledBox } from '../../custom-tile-input/CustomTileInput';

type TileInputProps = FormCustomTileInputProps & {
  name: string;
  label: string;
  children?: ReactNode;
};

export type CustomTileInputGroupProps = {
  /**
   * Whether or not to stack vertically on mobile. Should be set to true if we have a value and label for the child tiles
   *
   * @default false
   */
  stackMobileVertically?: boolean;
  /**
   * Does the input act as a checkbox (multiple can be selected)? If false, defaults to acting as a radio button.
   * @default false
   */
  isCheckbox?: boolean;
  /**
   * Label external to the input group which is meant to provide context to the first input in the group.
   */
  firstInputLabel?: ReactNode;
  /**
   * Label external to the input group which is meant to provide context to the last input in the group.
   */
  lastInputLabel?: ReactNode;
  children: (props: React.FunctionComponent<TileInputProps>) => ReactElement<FormCustomTileInput>[];
};

// Only outside corners should have a radius
const TileContainer = styled(Flex)`
  & ${CustomTileInputStyledBox} {
    border-radius: 0;
  }

  &:first-of-type ${CustomTileInputStyledBox} {
    border-radius: ${radius()} 0 0 ${radius()};
  }

  &:last-of-type ${CustomTileInputStyledBox} {
    border-radius: 0 ${radius()} ${radius()} 0;
  }

  @media (max-width: ${(props: any) => props.theme.breakpoints[0]}em) {
    &:first-of-type ${CustomTileInputStyledBox} {
      border-radius: ${radius()} ${radius()} 0 0;
    }

    &:last-of-type ${CustomTileInputStyledBox} {
      border-radius: 0 0 ${radius()} ${radius()};
    }
  }
`;

export default class CustomTileInputGroup extends Component<CustomTileInputGroupProps> {
  TileInput: React.FunctionComponent<TileInputProps> = (props: TileInputProps) => {
    const { value, label, children, name, ...restProps } = props;
    // Allow tiles to be rendered with custom styling
    return (
      <TileContainer flex="1">
        <FormCustomTileInput
          boxProps={{ py: 3, height: '100%' }}
          containerProps={{ w: '100%', height: '100%', mb: 0 }}
          isCheckbox={this.props.isCheckbox}
          omitCheckIcon
          value={value}
          name={name}
          height="100%"
          {...restProps}
        >
          {children ? (
            children
          ) : (
            <Flex align="center" justify={'center'} height="100%">
              <TextBlock fontStyle="controls.s" color="text.light" textAlign="center">
                {label}
              </TextBlock>
            </Flex>
          )}
        </FormCustomTileInput>
      </TileContainer>
    );
  };

  renderExternalLabels() {
    const { firstInputLabel, lastInputLabel, stackMobileVertically } = this.props;

    if (!firstInputLabel && !lastInputLabel) {
      return null;
    }
    return (
      <HideFor breakpoints={stackMobileVertically ? [true] : [false]}>
        <Flex mb={2} fontStyle="paragraphs.s" justify="space-between">
          <TextBlock>{firstInputLabel}</TextBlock>
          <TextBlock>{lastInputLabel}</TextBlock>
        </Flex>
      </HideFor>
    );
  }

  render() {
    const { children, stackMobileVertically } = this.props;

    return (
      <Box>
        {this.renderExternalLabels()}
        <Flex direction={stackMobileVertically ? ['column', 'row'] : 'row'} flex="1">
          {children(this.TileInput)}
        </Flex>
      </Box>
    );
  }
}
