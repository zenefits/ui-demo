import React from 'react';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import MyComponent from '../my-component/MyComponent';

describe('MyComponent', () => {
  afterEach(cleanup);

  it('has text', () => {
    const { getByText } = renderWithContext(<MyComponent>hi</MyComponent>);
    getByText('hi');
  });
});
