import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Card } from 'z-frontend-composites';

import { storiesOf } from '../../.storybook/storyHelpers';
import ColumnEditor from './ColumnEditor';

const allColumns = [
  { name: 'First Name' },
  { name: 'Last Name' },
  { name: 'Email' },
  { name: 'Phone' },
  { name: 'Zip Code' },
];

const withRequiredColumns = [
  { name: 'First Name', required: true },
  { name: 'Last Name', required: true },
  { name: 'Email' },
  { name: 'Phone' },
  { name: 'Zip Code' },
];

const withPreselectedColumns = [
  { name: 'First Name', selected: true },
  { name: 'Last Name', selected: true },
  { name: 'Email' },
  { name: 'Phone' },
  { name: 'Zip Code' },
];

storiesOf('tables|ColumnEditor', module)
  .add('default', () => (
    <Card>
      <ColumnEditor columns={allColumns} onChange={action('on-change')} />
    </Card>
  ))
  .add('with required columns', () => (
    <Card>
      <ColumnEditor columns={withRequiredColumns} onChange={action('on-change')} />
    </Card>
  ))
  .add('with preselected columns', () => (
    <Card>
      <ColumnEditor columns={withPreselectedColumns} onChange={action('on-change')} />
    </Card>
  ))
  .add('searchable columns', () => (
    <Card>
      <ColumnEditor columns={allColumns} onChange={action('on-change')} enableSearch />
    </Card>
  ));
