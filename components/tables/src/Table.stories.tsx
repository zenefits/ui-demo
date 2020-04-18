import React, { Component, StatelessComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { orderBy } from 'lodash';

import { Box, TextBlock } from 'zbase';
import { EmptyState } from 'z-frontend-elements';

import { storiesOf } from '../.storybook/storyHelpers';
import Table, { SortableColumnOption } from './Table';
import ExampleRowRichContent from './exampleRichContent';

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
  .add('sorted', () => <ExampleSortableRouter />);

const columnHeaders = [
  {
    title: 'Employee',
    isSortable: true,
    sortOptions: [
      {
        title: 'Sort A-Z',
        order: 'ascending',
        field: 'name-asc',
      },
      {
        title: 'Sort Z-A',
        order: 'descending',
        field: 'name-desc',
      },
    ],
  },
  {
    title: 'Department',
    isSortable: true,
    sortOptions: [
      {
        title: 'Sort A-Z',
        order: 'ascending',
        field: 'department-asc',
      },
      {
        title: 'Sort Z-A',
        order: 'descending',
        field: 'department-desc',
      },
    ],
  },
];

const tableData = [
  { id: 1, name: 'Farley Adams', department: 'Sales' },
  { id: 2, name: 'Amy Sanders', department: 'Marketing' },
];

const TableColumns: StatelessComponent<{ isSortedColumn: boolean }> = ({ isSortedColumn, children }) => {
  return isSortedColumn ? (
    <TextBlock color="text.dark" fontStyle="controls.m">
      {children}
    </TextBlock>
  ) : (
    <Box>{children}</Box>
  );
};

type SortDirection = 'asc' | 'desc';

class ExampleSortable extends Component<RouteComponentProps<{}>> {
  onHeaderSortClicked = (sortOption: SortableColumnOption) => {
    const params = new URLSearchParams(this.props.location.search);
    if (params.get('sort')) {
      params.delete('sort');
    }
    params.set('sort', sortOption.field);
    this.props.history.push(`${this.props.location.pathname}?${params.toString()}`);
  };

  getSortProps(): { field: string; direction: SortDirection } {
    const params = new URLSearchParams(this.props.location.search);
    const sort = params.get('sort');
    if (!sort) {
      return null;
    }

    const [field, direction] = sort.split('-');
    return { field, direction: direction as SortDirection };
  }

  getSortedItems() {
    const sortProps = this.getSortProps();
    if (!sortProps) {
      return tableData;
    }

    return orderBy(tableData, sortProps.field, sortProps.direction);
  }

  render() {
    const sortProps = this.getSortProps();
    return (
      <Table columnWidths={[1 / 3, 1 / 3, 1 / 3]}>
        <Table.Header>
          <Table.SortableHeaderCell header={columnHeaders[0]} onHeaderSortClicked={this.onHeaderSortClicked} />
          <Table.SortableHeaderCell header={columnHeaders[1]} onHeaderSortClicked={this.onHeaderSortClicked} />
        </Table.Header>
        {this.getSortedItems().map(item => (
          <Table.Row key={item.id}>
            <TableColumns isSortedColumn={sortProps && sortProps.field.includes('name')}>{item.name}</TableColumns>
            <TableColumns isSortedColumn={sortProps && sortProps.field.includes('department')}>
              {item.department}
            </TableColumns>
          </Table.Row>
        ))}
      </Table>
    );
  }
}

const ExampleSortableRouter = withRouter<{}>(ExampleSortable);
