import withFontStyles from 'z-frontend-theme/src/withFontStyles';
import Icon from 'z-frontend-theme/src/Icon';
import Text from 'z-frontend-theme/src/Text';
import React, {
  StatelessComponent,
  ComponentClass,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { Box, Flex, Label } from 'rebass';
import { RebassOnlyProps } from 'z-rebass-types';
import { Field, Fields, BaseFieldProps, BaseFieldsProps } from 'redux-form';

declare type Props = {
  label?: string;
  helpText?: string;
  fieldFormat?: 'form-row' | 'stand-alone' | 'raw';
  wrapWithLabel?: boolean;
  labelBoxProps?: RebassOnlyProps;
};

declare type GenericFieldHTMLAttributes = InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export declare type FieldProps = Props & GenericFieldHTMLAttributes & BaseFieldProps;
export declare type FieldsProps = Props & GenericFieldHTMLAttributes & BaseFieldsProps & { [name: string]: any };

const StyledLabel = withFontStyles(Label);
const StyledBox = withFontStyles(Box);

export const FieldFormatWrapper: StatelessComponent<Props> = ({
  label,
  helpText,
  fieldFormat,
  wrapWithLabel,
  labelBoxProps,
  children,
}) => {
  // We only want to wrap simple fields in labels, but all form rows to look the same, so we style Box as label.
  type StyledRebassComponent = ComponentClass<RebassOnlyProps & { fontStyle?: string }>;
  const OuterWrapper = (wrapWithLabel ? StyledLabel : StyledBox) as StyledRebassComponent;
  switch (fieldFormat) {
    case 'form-row':
      return (
        <OuterWrapper mx={4} mt={4} mb={0} fontStyle="controls.m">
          <Flex mx={-2} wrap flex="1 1 auto">
            {label && (
              <Box w={[1, 1 / 3, 1 / 3, 1 / 4]} px={2} mb={[2, 0]} mt={[0, 2]} {...labelBoxProps}>
                {label}
              </Box>
            )}
            <Box px={2} w={label ? [1, 2 / 3, 2 / 3, 3 / 4] : 1}>
              {children}
              {helpText && (
                <Text fontStyle="controls.s" color="grayscale.d" mt={2}>
                  <Icon iconName="info-outline" mr={1} />
                  {helpText}
                </Text>
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
      return <Box>{children}</Box>;
  }
};

FieldFormatWrapper.defaultProps = {
  fieldFormat: 'form-row',
  wrapWithLabel: true,
};

export const FormRow: StatelessComponent<Props> = ({ label, children }) => (
  // Labels for checkboxes and radio buttons do not have top margin.
  <FieldFormatWrapper label={label} fieldFormat="form-row" wrapWithLabel={false} labelBoxProps={{ mt: 0 }}>
    {children}
  </FieldFormatWrapper>
);

export const FieldWrapper: StatelessComponent<FieldProps> = ({ label, helpText, fieldFormat, children, ...rest }) => (
  <FieldFormatWrapper label={label} helpText={helpText} fieldFormat={fieldFormat}>
    <Field {...rest}>{children}</Field>
  </FieldFormatWrapper>
);

export const FieldsWrapper: StatelessComponent<FieldsProps> = ({ label, helpText, fieldFormat, children, ...rest }) => (
  <FieldFormatWrapper label={label} helpText={helpText} fieldFormat={fieldFormat} wrapWithLabel={false}>
    <Fields {...rest}>{children}</Fields>
  </FieldFormatWrapper>
);

export default FieldWrapper;
