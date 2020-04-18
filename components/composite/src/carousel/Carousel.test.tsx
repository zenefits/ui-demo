import React from 'react';
// @ts-ignore
import { cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Box } from 'zbase';

import Carousel from './Carousel';

const items = [
  { id: 1, label: 'One' },
  { id: 2, label: 'Two' },
  { id: 3, label: 'Three' },
  { id: 4, label: 'Four' },
  { id: 5, label: 'Five' },
];

describe('Carousel', () => {
  afterEach(cleanup);

  it('shows children', () => {
    // NOTE-DZH: would be nice to check visibility, but difficult with the `overflow: hidden` approach we're using
    // (and visual tests cover that anyway)
    const { getByText } = renderWithContext(
      <Carousel itemsPerPage={3}>
        {items.map(item => (
          <Box key={item.id}>{item.label}</Box>
        ))}
      </Carousel>,
    );
    getByText('One');
    getByText('Two');
    getByText('Three');
  });

  it('includes pagination buttons', () => {
    const { getByLabelText } = renderWithContext(
      <Carousel itemsPerPage={3}>
        {items.map(item => (
          <Box key={item.id}>{item.label}</Box>
        ))}
      </Carousel>,
    );
    const prevButton = getByLabelText('Previous');
    expect(prevButton).toBeDisabled();
    const nextButton = getByLabelText('Next');
    expect(nextButton).not.toBeDisabled();
  });
});
