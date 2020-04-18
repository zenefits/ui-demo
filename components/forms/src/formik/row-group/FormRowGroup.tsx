import React from 'react';
// @ts-ignore
import tabbable from 'tabbable';
import { FormikConsumer, FormikErrors, FormikTouched } from 'formik';

import { FlexProps } from 'zbase';

import FormError from '../error/FormError';
import FieldRow from '../FieldRow';
import { FormFieldType, FormInputWrapper, FormLabel } from '../FormLabel';
import { getErrorId, getLabelId } from '../FormFieldWrapper';

export type FormRowGroupProps = {
  /** Human-friendly label for the group. */
  label: string;
  /** Help info triggered by clicking on an icon in the label. To be used when the label is not self-explanatory. */
  helpText?: string | JSX.Element;
  /** Utility props to pass through to the container. */
  containerProps?: FlexProps;
  /** Which kind of input is being wrapped (to help determine layout). */
  fieldType?: FormFieldType;
  /** Formik field names relevant to this group. Any relevant errors will be shown. */
  fieldNames?: string[];
  /** Error message to show for whole group. */
  error?: string;
  optional?: boolean | string;
};

// Way to give each form row group a unique id without having to pass a prop in
let uniqueFormRowIndex = 0;
const getNextFormRowGroupIndex = () => {
  uniqueFormRowIndex += 1;
  return uniqueFormRowIndex;
};

function getFieldError(fieldNames: string[], touched: FormikTouched<any>, errors: FormikErrors<any>): string {
  if (!fieldNames) {
    return null;
  }

  const fieldErrors = fieldNames.map(name => touched[name] && errors[name]).filter(Boolean) as string[];
  return fieldErrors.length ? fieldErrors[0] : null;
}

class FormRowGroup extends React.Component<FormRowGroupProps> {
  id = `form-row-group-${getNextFormRowGroupIndex()}`;

  wrapper = React.createRef<HTMLDivElement>();

  focusFirst = () => {
    const focusableElements = tabbable(this.wrapper.current);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  };

  render() {
    const { children, error, label, helpText, containerProps, fieldType, optional, fieldNames } = this.props;
    return (
      <FieldRow
        {...containerProps}
        data-fieldrow-test-marker
        role="group"
        aria-labelledby={getLabelId(this.id)}
        aria-describedby={error && getErrorId(this.id)}
        elementRef={this.wrapper}
      >
        <FormLabel
          id={getLabelId(this.id)}
          label={label}
          helpText={helpText}
          htmlFor={this.id}
          fieldType={fieldType}
          optional={optional}
          onClick={this.focusFirst}
        />
        <FormikConsumer>
          {formikProps => {
            const displayError = error || getFieldError(fieldNames, formikProps.touched, formikProps.errors);
            return (
              <FormInputWrapper label={label}>
                {children}
                {displayError && (
                  <FormError mt="2px" id={getErrorId(this.id)} textDefault={displayError} whiteSpace="pre-line" />
                )}
              </FormInputWrapper>
            );
          }}
        </FormikConsumer>
      </FieldRow>
    );
  }
}

export default FormRowGroup;
