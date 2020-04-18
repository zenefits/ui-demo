import React, { Component, MouseEvent } from 'react';

import { Box, Flex, Label, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { space } from 'z-frontend-theme/utils';

import FormHelpPopover from './help-popover/FormHelpPopover';

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

const StyledInnerLabel = styled.span<{ hasHelpText?: boolean }>`
  margin-right: ${props => (props.hasHelpText ? `${space(1)(props)}` : '')};
`;

export type FormFieldType = 'input' | 'radio' | 'checkbox' | 'checkboxGroup' | 'block';

type FormLabelProps = {
  id: string;
  label: string | JSX.Element;
  helpText?: string | JSX.Element;
  htmlFor?: string;
  fieldType?: FormFieldType;
  onClick?: (event: MouseEvent) => void;
  optional?: boolean | string;
  isTopAligned?: boolean;
};

export class FormLabel extends Component<FormLabelProps> {
  static defaultProps = {
    fieldType: 'input',
  };

  render() {
    const { label, helpText, fieldType, optional, isTopAligned, children, ...rest } = this.props;
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
        mb={[2, 0]}
      >
        <StyledLabel mb={0} {...rest}>
          <StyledInnerLabel hasHelpText={!!helpText}>{label}</StyledInnerLabel>
          {helpText && <FormHelpPopover title={label as string}>{helpText}</FormHelpPopover>}
          {optional && (
            <TextBlock fontStyle="paragraphs.s" color="text.light" mt={1}>
              {typeof optional === 'string' ? optional : 'Optional'}
            </TextBlock>
          )}
        </StyledLabel>
      </Flex>
    );
  }
}

type FormInputWrapperProps = {
  label: string | JSX.Element;
  isTopAligned?: boolean;
};

export class FormInputWrapper extends Component<FormInputWrapperProps> {
  render() {
    const { label, isTopAligned, ...rest } = this.props;
    const width = !label || isTopAligned ? 1 : inputWidths;
    return <Box w={width} {...rest} />;
  }
}
