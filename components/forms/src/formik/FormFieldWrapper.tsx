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
  /** Help info triggered by clicking on an icon in the label. To be used when the label is not self-explanatory. */
  helpText?: string | JSX.Element;
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
   * Whether this field is non-required. The label "Optional" can be overridden if a string is provided but this should only be done in extenuating circumstances (ex: legal requirement).
   *
   * @default false
   */
  optional?: boolean | string;
  /**
   * Optimizes this field so that it only re-renders if its value changes. Changes to values not in this slice of formik state,
   * will not trigger a re-render. This also means updating other props like `containerProps` will not trigger a re-render.
   * Under the covers setting this flag will use a Formik `<FastField>` component. Please read the FastField docs: https://jaredpalmer.com/formik/docs/api/fastfield before using.
   */
  limitRerender?: boolean;
  dependencies?: string[];
  /**
   * Whether to disable error message. When disabled, error message will not be displayed.
   * @default false
   */
  disableError?: boolean;
};

type FormFieldWrapperInternalProps = {
  // Error message for the field.
  error?: string;
};

class FormFieldWrapper extends Component<FormFieldWrapperInternalProps & FormFieldProps> {
  static defaultProps = {
    format: 'form-row',
  };

  handleClickFocus = () => {
    document.getElementById(this.props.name).focus();
  };

  render() {
    const {
      label,
      helpText,
      name,
      error,
      children,
      containerProps,
      fieldType,
      format,
      optional,
      disableError,
    } = this.props;
    const showError = error && !disableError;

    if (format === 'form-row' || format === 'form-row-top-label') {
      const isGroupField = ['checkboxGroup', 'radio'].includes(fieldType);
      const isTopAligned = format === 'form-row-top-label';
      const labelProps = {
        label,
        helpText,
        fieldType,
        optional,
        isTopAligned,
        ...(this.props.manualLabelFocus && { onClick: this.handleClickFocus }),
        ...(!isGroupField && { htmlFor: name }), // groups should not have a `for` attribute; there are multiple inputs
      };
      return (
        <FieldRow {...containerProps} data-fieldrow-test-marker>
          {label && <FormLabel id={getLabelId(name)} {...labelProps} />}
          <FormInputWrapper label={label} isTopAligned={isTopAligned}>
            {children}
            {showError && <FormError id={getErrorId(name)} textDefault={error} />}
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
            {showError && <FormError id={getErrorId(name)} textDefault={error} />}
          </ScreenReaderOnly>
          {children}
        </>
      );
    }
  }
}

export default FormFieldWrapper;
