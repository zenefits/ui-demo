import React from 'react';

import { Box } from 'zbase';
import { EmptyState } from 'z-frontend-elements';

import { storiesOf } from '../.storybook/storyHelpers';
import Table from './Table';
import ExampleRowRichContent from './exampleRichContent';
import ExampleSortable from './exampleSortable';

const employees: any = [];

storiesOf('tables|Table', module)
  .add('default', () => (
    <Table columnWidths={[1 / 2, 1 / 4, 1 / 4]}>
      <Table.Header>
        <Box> Header 1 </Box>
        <Box> Header 2 </Box>
        <Box> Header 3 </Box>
      </Table.Header>
      <Table.Row>
        <Box> 1 1 </Box>
        <Box> 1 2 </Box>
        <Box> 1 3 </Box>
      </Table.Row>
      <Table.Row>
        <Box> 2 1 </Box>
        <Box> 2 2 </Box>
        <Box> 2 3 </Box>
      </Table.Row>
      <Table.Footer>
        <Box> Footer 1 </Box>
        <Box> Footer 2 </Box>
        <Box> Footer 3 </Box>
      </Table.Footer>
    </Table>
  ))
  .add('custom width columns', () => (
    <Table columnWidths={[1 / 12, 3 / 12, 4 / 12, 4 / 12]}>
      <Table.Header>
        <Box>Name</Box>
        <Box>Icon</Box>
        <Box>Usage</Box>
        <Box>Example</Box>
      </Table.Header>
      <Table.Row>
        <Box>1/12 wide</Box>
        <Box>1/4 wide</Box>
        <Box>1/3 wide</Box>
        <Box>1/3 wide</Box>
      </Table.Row>
    </Table>
  ))
  .add('empty', () => (
    <Table columnWidths={[1 / 12, 3 / 12, 4 / 12, 4 / 12]} isEmpty={employees.length === 0}>
      <Table.Header>
        <Box>Name</Box>
        <Box>Title</Box>
        <Box>Salary</Box>
      </Table.Header>
    </Table>
  ))
  .add('empty (custom)', () => (
    <Table
      columnWidths={[1 / 12, 3 / 12, 4 / 12, 4 / 12]}
      isEmpty={employees.length === 0}
      emptyRender={() => <EmptyState message="No results. Double check your filters." iconName="search" />}
    >
      <Table.Header>
        <Box>Name</Box>
        <Box>Title</Box>
        <Box>Salary</Box>
      </Table.Header>
    </Table>
  ))
  .add('row with rich content', () => <ExampleRowRichContent />)
  .add('sorted', () => <ExampleSortable />);
