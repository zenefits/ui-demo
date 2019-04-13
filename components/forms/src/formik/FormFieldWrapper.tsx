import React, { Component } from 'react';

import { FlexProps, Label, TextInline } from 'zbase';
import { ScreenReaderOnly } from 'z-frontend-elements';

import FormError from './error/FormError';
import FieldRow from './FieldRow';
import { FormFieldType, FormInputWrapper, FormLabel } from './FormLabel';

export function getLabelId(name: string) {
  return `zf-${name}-label`;
}

export function getErrorId(name: string) {
  return `zf-${name}-error`;
}

export type FormFieldFormat = 'form-row' | 'form-row-top-label' | 'raw';

export type FormFieldProps = {
  /** The name of the control, which is submitted with the control's value as part of the form data. */
  name: string;
  /** Human-friendly label for the input. */
  label?: string | JSX.Element;
  /** Utility props to pass through to the container. */
  containerProps?: FlexProps;
  /** Which kind of input is being wrapped (to help determine layout). */
  fieldType?: FormFieldType;
  /**
   * Determines field layout.
   * form-row: use for most situations
   * form-row-top-label: use where horizontal space is limited (eg filter panel)
   * raw - use when a visual label is redundant (but still there for screen readers)
   * @default form-row
   */
  format?: FormFieldFormat;
  /** Manually trigger focus when label is clicked. Only for non-inputs like contenteditable. */
  manualLabelFocus?: boolean;
  /**
   * Whether this field is non-required.
   * @default false
   */
  optional?: boolean;
};

type FormFieldInternalProps = FormFieldProps & {
  error?: string;
};

class FormFieldWrapper extends Component<FormFieldInternalProps> {
  static defaultProps = {
    format: 'form-row',
  };

  handleClickFocus = () => {
    document.getElementById(this.props.name).focus();
  };

  render() {
    const { label, name, error, children, containerProps, fieldType, format, optional } = this.props;
    if (format === 'form-row' || format === 'form-row-top-label') {
      const isGroupField = ['checkboxGroup', 'radio'].includes(fieldType);
      const conditionalProps = {
        ...(this.props.manualLabelFocus && { onClick: this.handleClickFocus }),
        ...(format === 'form-row-top-label' && { isTopAligned: true }),
        ...(!isGroupField && { htmlFor: name }), // groups should not have a `for` attribute; there are multiple inputs
      };
      return (
        <FieldRow {...containerProps} data-fieldrow-test-marker>
          {label && (
            <FormLabel id={getLabelId(name)} fieldType={fieldType} {...conditionalProps} optional={optional}>
              {label}
            </FormLabel>
          )}
          <FormInputWrapper label={label}>
            {children}
            {error && <FormError id={getErrorId(name)} textDefault={error} />}
          </FormInputWrapper>
        </FieldRow>
      );
    } else {
      return (
        <>
          <ScreenReaderOnly>
            <Label id={getLabelId(name)} htmlFor={name}>
              {label}
              {optional && (
                <TextInline fontStyle="paragraphs.m" color="grayscale.d">
                  Optional
                </TextInline>
              )}
            </Label>
            {error && <FormError id={getErrorId(name)} textDefault={error} />}
          </ScreenReaderOnly>
          {children}
        </>
      );
    }
  }
}

export default FormFieldWrapper;
