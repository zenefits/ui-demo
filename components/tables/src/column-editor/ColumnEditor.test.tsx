import React from 'react';
import { cleanup } from 'react-testing-library';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Card } from 'z-frontend-composites';

import ColumnEditor from './ColumnEditor';

const allColumns = [
  { name: 'First Name' },
  { name: 'Last Name' },
  { name: 'Email' },
  { name: 'Phone' },
  { name: 'Zip Code' },
];

afterEach(cleanup);

describe('ColumnEditor', () => {
  test('renders two sections', () => {
    const wrapper = renderWithContext(
      <Card>
        <ColumnEditor columns={allColumns} />
      </Card>,
    );
    wrapper.getByText('Columns to Include');
    wrapper.getByText('Column Ordering');
  });
});
