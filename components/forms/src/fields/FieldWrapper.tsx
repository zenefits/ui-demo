import React, {
  Component,
  ComponentType,
  InputHTMLAttributes,
  ReactElement,
  SelectHTMLAttributes,
  StatelessComponent,
  TextareaHTMLAttributes,
} from 'react';
import { BaseFieldProps, Field } from 'redux-form';
import { ObjectOmit } from 'typelevel-ts';

import { Box, BoxProps, Flex, Icon, Label, TextBlock, UtilProps } from 'zbase';
import { HideFor } from 'z-frontend-theme';
import { Tooltip } from 'z-frontend-overlays';

import InputErrorText from './InputErrorText';

interface Props {
  label?: string | JSX.Element;
  helpText?: string | JSX.Element;
  tooltipText?: string | JSX.Element;
  fieldFormat?: 'form-row' | 'stand-alone' | 'raw';
  errorText?: string;
}

interface WrapperProps extends Props {
  wrapWithLabel?: boolean;
  labelBoxProps?: BoxProps;
}

type GenericFieldHTMLAttributes = InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export type FieldProps<P = {}> = ObjectOmit<Props & GenericFieldHTMLAttributes & BoxProps, keyof BaseFieldProps<P>> &
  BaseFieldProps<P>;

export const FieldFormatWrapper: StatelessComponent<WrapperProps> = ({
  label,
  helpText,
  tooltipText,
  fieldFormat,
  errorText,
  wrapWithLabel,
  labelBoxProps,
  children,
}) => {
  // We only want to wrap simple fields in labels, but all form rows to look the same, so we style Box as label.
  const OuterWrapper: ComponentType<UtilProps> = wrapWithLabel ? Label : Box;
  const showHelpText = !errorText && helpText;
  switch (fieldFormat) {
    case 'form-row':
      return (
        <OuterWrapper mx={4} mt={4} mb={0} fontStyle="controls.m">
          <Flex mx={-2} wrap flex="1 1 auto">
            {label && (
              <Box w={[1, 1 / 3, 1 / 3, 1 / 4]} px={2} mb={[2, 0]} mt={[0, 2]} {...labelBoxProps}>
                {label}
                {tooltipText && (
                  <HideFor breakpoints={[true]}>
                    <Tooltip
                      event="hover"
                      showArrow
                      placement="bottom"
                      targetBody={<Icon iconName="help-outline" color="grayscale.d" ml={1} />}
                    >
                      <Box p={10}>{tooltipText}</Box>
                    </Tooltip>
                  </HideFor>
                )}
              </Box>
            )}
            <Box px={2} w={label ? [1, 2 / 3, 2 / 3, 3 / 4] : 1}>
              {children}
              {errorText && <InputErrorText>{errorText} </InputErrorText>}
              {showHelpText && (
                <TextBlock fontStyle="controls.s" color="grayscale.d" mt={2}>
                  <Icon iconName="info-outline" mr={1} />
                  {helpText}
                </TextBlock>
              )}
            </Box>
          </Flex>
        </OuterWrapper>
      );
    case 'stand-alone':
      return (
        <Box my={2} w={1}>
          {children}
        </Box>
      );
    case 'raw':
      return (
        <>
          {children}
          {errorText && <InputErrorText>{errorText} </InputErrorText>}
        </>
      );
  }
};

FieldFormatWrapper.defaultProps = {
  fieldFormat: 'form-row',
  wrapWithLabel: true,
};

export const FormRow: StatelessComponent<WrapperProps> = ({ children, ...rest }) => (
  // Labels for checkboxes and radio buttons do not have top margin.
  <FieldFormatWrapper fieldFormat="form-row" wrapWithLabel={false} labelBoxProps={{ mt: 0 }} {...rest}>
    {children}
  </FieldFormatWrapper>
);

export const FormCell = FormRow;

export class FieldWrapper<P = {}> extends Component<FieldProps<P>> {
  render() {
    const { label, helpText, tooltipText, fieldFormat, children, errorText, ...rest } = this.props;

    return (
      <FieldFormatWrapper
        label={label}
        helpText={helpText}
        fieldFormat={fieldFormat}
        errorText={errorText}
        tooltipText={tooltipText}
      >
        <Field<{}> {...rest}>{children}</Field>
      </FieldFormatWrapper>
    );
  }
}

export const FieldsWrapper: StatelessComponent<Props> = ({ children, ...rest }) => (
  <FieldFormatWrapper wrapWithLabel={false} {...rest}>
    <Flex mx={-2}>
      {React.Children.map(children, child => {
        const field = child as ReactElement<any>;
        return (
          field && (
            <Box px={2} w={field.props.w} flex={field.props.flex}>
              {React.cloneElement(field, { fieldFormat: 'raw', w: 1, flex: '1 1 auto' })}
            </Box>
          )
        );
      })}
    </Flex>
  </FieldFormatWrapper>
);

export default FieldWrapper;
