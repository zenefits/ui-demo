import React from 'react';
import { cleanup, waitForElement } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { AddressValue, Form, FormAddressUS } from '../../..';

interface FormValues {
  address: AddressValue;
}

describe('Form.AddressUS', () => {
  function createForm(props: any = {}) {
    return (
      <Form<FormValues>
        onSubmit={values => {
          console.log(values);
        }}
        initialValues={{
          address: FormAddressUS.getEmptyValue(),
        }}
      >
        <FormAddressUS name="address" {...props} />
      </Form>
    );
  }

  afterEach(cleanup);

  it('should render all inputs', () => {
    const wrapper = renderWithContext(createForm());
    wrapper.getByLabelText('Address Line 1');
    wrapper.getByLabelText('Address Line 2', { exact: false });
    wrapper.getByLabelText('City');
    wrapper.getByLabelText('State');
    wrapper.getByLabelText('ZIP Code');

    // no name or country inputs by default
    const nameInput = wrapper.queryByLabelText('Name');
    expect(nameInput).toBeNull();

    const countryInput = wrapper.queryByLabelText('Country');
    expect(countryInput).toBeNull();
  });

  it('should optionally render Name input', () => {
    const wrapper = renderWithContext(createForm({ includeName: true }));
    wrapper.getByLabelText('Name');
    wrapper.getByLabelText('Address Line 1');
  });

  it('should open State dropdown when input is focused', async () => {
    const wrapper = renderWithContext(createForm());
    ReactTestUtils.Simulate.focus(wrapper.getByLabelText('State'));
    await waitForElement(() => wrapper.getByText('Alaska', { exact: false }));
  });
});
