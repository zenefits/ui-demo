import React, { Component, MouseEvent } from 'react';

import { Box, Flex, Label, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';

type Height = { normal: number; optional: number };

const heights: { [key in FormFieldType]: Height } = {
  input: { normal: 40, optional: 40 },
  radio: { normal: 20, optional: 40 },
  checkbox: { normal: 20, optional: 40 },
  checkboxGroup: { normal: 20, optional: 40 },
  block: { normal: 20, optional: 40 }, // typically a non-input, like TextBlock
};

export const labelWidths = [1, 1 / 3, 1 / 3, 1 / 4];
export const inputWidths = [1, 1 - labelWidths[1], 1 - labelWidths[2], 1 - labelWidths[3]];

const StyledLabel = styled(Label)`
  display: inline-block;
`;

export type FormFieldType = 'input' | 'radio' | 'checkbox' | 'checkboxGroup' | 'block';

type FormLabelProps = {
  id: string;
  htmlFor?: string;
  fieldType?: FormFieldType;
  onClick?: (event: MouseEvent) => void;
  optional?: boolean;
  isTopAligned?: boolean;
};

export class FormLabel extends Component<FormLabelProps> {
  static defaultProps = {
    fieldType: 'input',
  };

  render() {
    const { fieldType, optional, isTopAligned, children, ...rest } = this.props;
    const heightKey = isTopAligned ? 'input' : fieldType;
    const height = heights[heightKey][optional ? 'optional' : 'normal'];

    return (
      <Flex
        w={isTopAligned ? 1 : labelWidths}
        height={['auto', height]}
        pr={2}
        column
        justify={optional ? undefined : 'center'}
        mt={optional ? 1 : 0}
      >
        <StyledLabel mb={0} {...rest}>
          {children}
          {optional && (
            <TextBlock fontStyle="paragraphs.s" color="grayscale.d" mt={1}>
              Optional
            </TextBlock>
          )}
        </StyledLabel>
      </Flex>
    );
  }
}

export class FormInputWrapper extends Component<{ label: string | JSX.Element }> {
  render() {
    const { label, ...rest } = this.props;
    return <Box w={label ? inputWidths : 1} {...rest} />;
  }
}
