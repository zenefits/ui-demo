import React from 'react';
import { FormikProps } from 'formik';
import { RenderResult } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form, FormProps } from './Form';

export type RenderFormResult<FormValues> = RenderResult & {
  getFormProps(): FormikProps<FormValues>;
};

export function renderForm<FormValues>(
  initialValues: FormValues,
  formBody: React.ReactNode,
  formProps?: Partial<FormProps<FormValues>>,
): RenderFormResult<FormValues> {
  let injected: FormikProps<FormValues>;
  const rendered = renderWithContext(
    <Form<FormValues> onSubmit={() => {}} initialValues={initialValues} {...formProps}>
      {formikProps => {
        injected = formikProps;
        return (
          <>
            {formBody}
            <Form.Footer cancelText="Reset" cancelOnClick={formikProps.handleReset} primaryText="Save" />
          </>
        );
      }}
    </Form>,
  );
  return {
    // allows getting raw form values without hacks like JSON.stringify
    // for most of our form components, we could use
    // expect(form).toHaveFormValues(...)
    // but that doesn't work in cases like FormSimpleSelect
    getFormProps() {
      return injected;
    },
    ...rendered,
  };
}
