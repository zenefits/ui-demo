import React from 'react';
import { cleanup } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import PhoneInput from './PhoneInput';

function getInput(defaultValue: string, allowInternational?: boolean) {
  return (
    <label>
      Phone number
      <PhoneInput defaultValue={defaultValue} allowInternational={allowInternational} />
    </label>
  );
}

describe('PhoneInput', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Accepts national numbers', () => {
    const { getByDisplayValue } = renderWithContext(getInput('(555) 555-5555'));
    getByDisplayValue('(555) 555-5555');
  });

  it('Masks an unformatted national number', () => {
    const { getByDisplayValue } = renderWithContext(getInput('5555555555'));
    getByDisplayValue('(555) 555-5555');
  });

  it('Always masks when not international', () => {
    const { getByDisplayValue } = renderWithContext(getInput('55 (555) 555-5555'));
    getByDisplayValue('(555) 555-5555');
  });

  it('Assumes international when > 10 digits', () => {
    const { getByDisplayValue } = renderWithContext(getInput('55 123456789', true));
    getByDisplayValue('+55123456789');
  });

  it('Assumes international when + is present', () => {
    const { getByDisplayValue } = renderWithContext(getInput('+15555555', true));
    getByDisplayValue('+15555555');
  });

  it('Matches a US international #', () => {
    const { getByDisplayValue } = renderWithContext(getInput('+15555555555', true));
    getByDisplayValue('+1 (555) 555-5555');
  });

  it('should contain icon', () => {
    const { getByLabelText } = renderWithContext(getInput('(555) 555-5555'));
    getByLabelText('Phone number', {
      selector: 'i',
    });
  });
});
