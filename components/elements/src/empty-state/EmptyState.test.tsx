import React from 'react';
// @ts-ignore
import { render } from '@testing-library/react';

import { ThemeProvider } from 'z-frontend-theme';

import EmptyState, { EmptyStateProps } from './EmptyState';

function renderEmptyState(props?: Partial<EmptyStateProps>) {
  return render(
    <ThemeProvider>
      <EmptyState {...props} />
    </ThemeProvider>,
  );
}

describe('EmptyState', () => {
  it('has a default message', () => {
    const { getByText } = renderEmptyState();
    getByText('unable to load content', { exact: false });
  });

  it('shows custom messages', () => {
    const { getByText } = renderEmptyState({ message: 'This is custom' });
    getByText('This is custom');
  });

  it('shows reload page prompt', () => {
    const { getByText } = renderEmptyState({ askToReload: true });
    getByText('Try reloading');
  });
});
