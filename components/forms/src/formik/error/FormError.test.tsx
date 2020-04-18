import React from 'react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { Form } from '../Form';

const messages = { fieldRequired: 'This field is required.' };

describe('Form.Error', () => {
  it('has a label and role', () => {
    const message = 'Email is a required field.';
    const { getByText, getByRole } = renderWithContext(<Form.Error textDefault={message} />, { messages });

    getByText(message);
    getByRole('alert');
  });

  it('supports i18n', () => {
    const { getByText, getByRole } = renderWithContext(<Form.Error textKey="fieldRequired" textDefault="fallback" />, {
      messages,
    });

    getByText(messages.fieldRequired);
    getByRole('alert');
  });
});
