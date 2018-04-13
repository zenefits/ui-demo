import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import Table from './Table';
import SortableHeaderCell, { SortableColumnHeaderProps } from './SortableHeaderCell';

const columnHeaders: SortableColumnHeaderProps[] = [
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

storiesOf('SortableHeaderCell', module)
  .addDecorator(getStory => (
    <Box p={20} w={[1, 1 / 2]}>
      <Router>{getStory()}</Router>
    </Box>
  ))
  .add('with titles', () => (
    <Table columnWidths={[1 / 2, 1 / 4, 1 / 4]}>
      <Table.Header py={2}>
        <SortableHeaderCell header={columnHeaders[0]} onHeaderSortClicked={action('clicked sort')} />
        <SortableHeaderCell header={columnHeaders[1]} onHeaderSortClicked={action('clicked sort')} />
      </Table.Header>
    </Table>
  ));
