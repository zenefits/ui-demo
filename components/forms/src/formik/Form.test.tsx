import React from 'react';
import { cleanup, fireEvent, wait } from 'react-testing-library';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from './Form';

interface FormValues {
  name: string;
}

describe('Form', () => {
  function createForm(props: any = {}) {
    return (
      <Form<FormValues>
        onSubmit={props.onSubmit}
        initialValues={{
          name: 'David',
        }}
      >
        <Form.TextInput name="name" label="Name" />
        <button type="submit">Submit</button>
      </Form>
    );
  }

  afterEach(cleanup);

  it('shows child inputs', () => {
    const wrapper = renderWithContext(createForm());
    wrapper.getByLabelText('Name');
  });

  it('submit calls onSubmit', async () => {
    const handleClick = jest.fn();
    const wrapper = renderWithContext(createForm({ onSubmit: handleClick }));

    const button = wrapper.getByText('Submit');
    fireEvent.click(button);
    await wait(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(
        {
          name: 'David',
        },
        expect.anything(),
      );
    });
  });
});
