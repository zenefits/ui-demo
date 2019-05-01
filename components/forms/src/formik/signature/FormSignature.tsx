import React, { Component } from 'react';
import { getIn, Field, FieldProps } from 'formik';
import * as Yup from 'yup';

import Signature, { SignatureProps } from '../../signature/Signature';
import FormFieldWrapper, { getErrorId, getLabelId, FormFieldProps } from '../FormFieldWrapper';

type FormSignatureProps = SignatureProps & FormFieldProps;

export type SignatureValue = {
  dataUrl: string;
  date: Date;
};

class FormSignature extends Component<FormSignatureProps> {
  static getEmptyValue = (): SignatureValue => ({
    dataUrl: '',
    date: null,
  });

  static getValidationSchema = (label: string) =>
    Yup.object().test('has-valid-signature', `${label} is a required field.`, value => value.dataUrl && value.date);

  render() {
    const { name, label, containerProps, optional, ...rest } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }: FieldProps) => {
          const error: any = getIn(form.touched, name) && getIn(form.errors, name);
          const signatureImage = field.value ? (field.value as SignatureValue).dataUrl : '';
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
                defaultSignatureImage={signatureImage}
                {...rest}
                hasError={Boolean(error)}
                aria-labelledby={getLabelId(name)}
                aria-describedby={error ? getErrorId(name) : null}
                mb={0}
              />
            </FormFieldWrapper>
          );
        }}
      />
    );
  }
}

export default FormSignature;
