import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { AddressValue, Form, FormAddressIntl } from '../../../..';

interface FormValues {
  address: AddressValue;
}

describe('Form.AddressIntl', () => {
  function createForm(props: any = {}) {
    return (
      <Form<FormValues>
        onSubmit={values => {
          console.log(values);
        }}
        initialValues={{
          address: FormAddressIntl.getEmptyValue(),
        }}
      >
        <FormAddressIntl name="address" {...props} />
      </Form>
    );
  }

  afterEach(cleanup);

  it('should render all inputs', () => {
    const wrapper = renderWithContext(createForm());
    wrapper.getByLabelText('Country');
    wrapper.getByLabelText('Address Line 1');
    wrapper.getByLabelText('Address Line 2', { exact: false });
    wrapper.getByLabelText('City');
    wrapper.getByLabelText('State/Province');
    wrapper.getByLabelText('Postal/ZIP Code');

    // no name or country inputs by default
    const nameInput = wrapper.queryByLabelText('Name');
    expect(nameInput).toBeNull();
  });

  it('should optionally render Name input', () => {
    const wrapper = renderWithContext(createForm({ includeName: true }));
    wrapper.getByLabelText('Name');
    wrapper.getByLabelText('Address Line 1');
  });
});
