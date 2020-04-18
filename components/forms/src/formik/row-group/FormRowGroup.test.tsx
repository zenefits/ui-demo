import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Flex } from 'zbase';
import { patchOffsetParent } from 'z-frontend-jest/utils';

import { Form, FormTextInput } from '../../..';

patchOffsetParent();

const TestExample = () => (
  <Form onSubmit={() => {}} initialValues={{}}>
    <Form.RowGroup label="Full Name">
      <Flex>
        <FormTextInput mr={2} name="first" placeholder="First Name" label="First Name" format="raw" />
        <FormTextInput name="last" placeholder="Last Name" label="Last Name" format="raw" />
      </Flex>
    </Form.RowGroup>
  </Form>
);

describe('Form.RowGroup', () => {
  afterEach(cleanup);

  it('focuses first element when label is clicked', () => {
    const wrapper = renderWithContext(<TestExample />);
    wrapper.getByText('Full Name').click();
    expect(document.activeElement).toBe(wrapper.container.querySelectorAll('input')[0]);
  });
});
