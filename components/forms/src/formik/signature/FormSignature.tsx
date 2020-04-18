import React, { Component } from 'react';
import { getIn, FieldProps } from 'formik';
import * as Yup from 'yup';

import Field from '../Field';
import Signature, { SignatureProps, SignatureValue } from '../../signature/Signature';
import FormFieldWrapper, { FormFieldProps } from '../FormFieldWrapper';
import { getAriaInputProps } from '../formAccessibility';

type FormSignatureProps = SignatureProps & FormFieldProps;

class FormSignature extends Component<FormSignatureProps> {
  static getEmptyValue = (): SignatureValue => ({
    dataUrl: '',
    date: null,
    valid: false,
  });

  static getValidationSchema = (label: string) =>
    Yup.object()
      .test('is-required', `${label} is a required field.`, value => value.dataUrl && value.date)
      .test('must-be-valid', 'The signature is too small. Please try again.', value => value.valid);

  render() {
    const {
      name,
      label,
      containerProps,
      optional,
      limitRerender,
      dependencies,
      'aria-label': ariaLabel,
      ...rest
    } = this.props;
    return (
      <Field name={name} limitRerender={limitRerender} dependencies={dependencies}>
        {({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          const defaultSignatureImage = field.value ? (field.value as SignatureValue).dataUrl : '';
          return (
            <FormFieldWrapper
              name={name}
              label={label}
              error={error}
              containerProps={containerProps}
              optional={optional}
            >
              <Signature
                id={name}
                name={name}
                onSignatureChange={signatureChange => {
                  form.setFieldValue(field.name, signatureChange);
                }}
                defaultSignatureImage={defaultSignatureImage}
                {...rest}
                hasError={Boolean(error)}
                {...getAriaInputProps(name, error, ariaLabel)}
                mb={0}
              />
            </FormFieldWrapper>
          );
        }}
      </Field>
    );
  }
}

export default FormSignature;
