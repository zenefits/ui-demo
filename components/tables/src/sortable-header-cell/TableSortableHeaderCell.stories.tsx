import React from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import Table from '../Table';

const columnHeaders = [
  { title: 'Name', isSortable: false, sortOptions: [] },
  {
    title: 'Company',
    isSortable: true,
    sortOptions: [
      {
        title: 'Sort A-Z',
        order: 'ascending',
        field: 'company',
      },
      {
        title: 'Sort Z-A',
        order: 'descending',
        field: 'company',
      },
    ],
  },
];

storiesOf('tables|Table.SortableHeaderCell', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 1 / 2]}>
      {getStory()}
    </Box>
  ))
  .add('with titles', () => (
    <Table columnWidths={[1 / 2, 1 / 4, 1 / 4]}>
      <Table.Header py={2}>
        <Table.SortableHeaderCell header={columnHeaders[0]} onHeaderSortClicked={action('clicked sort')} />
        <Table.SortableHeaderCell header={columnHeaders[1]} onHeaderSortClicked={action('clicked sort')} />
      </Table.Header>
    </Table>
  ));
