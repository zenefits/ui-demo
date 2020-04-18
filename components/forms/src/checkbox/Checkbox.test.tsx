import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import Checkbox from './Checkbox';

const common = {
  label: 'My Label',
};

describe('Checkbox', () => {
  it('has a label', () => {
    const { findByText } = renderWithContext(<Checkbox label="My Label" />);
    findByText('My Label');
  });

  it('should support checked', () => {
    const { getByLabelText } = renderWithContext(<Checkbox {...common} defaultChecked />);

    const checkbox = getByLabelText('My Label') as HTMLInputElement;
    expect(checkbox).toBeChecked();
  });

  it('is not disabled by default', () => {
    const { getByLabelText } = renderWithContext(<Checkbox {...common} defaultChecked />);

    const checkbox = getByLabelText('My Label') as HTMLInputElement;
    expect(checkbox).not.toBeDisabled();
  });

  it('is disabled when specified', () => {
    const { getByLabelText } = renderWithContext(<Checkbox {...common} defaultChecked disabled />);

    const checkbox = getByLabelText('My Label') as HTMLInputElement;
    expect(checkbox).toBeDisabled();
  });

  it('toggles the checkbox', () => {
    const { getByLabelText } = renderWithContext(<Checkbox {...common} />);

    const checkbox = getByLabelText('My Label') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should invoke callback on change', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderWithContext(<Checkbox {...common} onChange={onChange} />);

    const checkbox = getByLabelText('My Label') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });
});
