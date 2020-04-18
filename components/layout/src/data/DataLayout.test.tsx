import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { DefaultExample } from './DataLayout.stories';

describe('DataLayout', () => {
  afterEach(cleanup);

  it('renders all provided sections', () => {
    const { getByText } = renderWithContext(<DefaultExample />);
    getByText('Panel');
    getByText('Table body');
    getByText('Add Row');
    getByText('Pager');
  });

  it('includes filter button with accessible label', () => {
    const { getByLabelText } = renderWithContext(<DefaultExample />);
    getByLabelText('Toggle filter panel');
  });

  it('clicking filter button toggles panel', async () => {
    const { queryByText, getByLabelText } = renderWithContext(<DefaultExample />);
    expect(queryByText('Panel')).toBeVisible();
    fireEvent.click(getByLabelText('Toggle filter panel'));
    await wait(() => {
      expect(queryByText('Panel')).not.toBeVisible();
    });
  });
});
