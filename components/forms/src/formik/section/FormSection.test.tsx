import React from 'react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Box } from 'zbase';

import { Form } from '../Form';

describe('Form.Section', () => {
  it('renders label and content', () => {
    const { getByText } = renderWithContext(
      <Form.Section label="Example label">
        <Box>Section content</Box>
      </Form.Section>,
    );

    getByText('Example label');
    getByText('Section content');
  });

  it('label is on DOM if isLabelVisuallyHidden is passed', () => {
    const { getByText } = renderWithContext(
      <Form.Section label="Example label" isLabelVisuallyHidden>
        <Box>Section Content</Box>
      </Form.Section>,
    );
    getByText('Example label');
  });
});
