import React, { Component, StatelessComponent } from 'react';
import { orderBy } from 'lodash';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Box, TextBlock } from 'zbase';

import Table, { SortableColumnOption } from './Table';

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

class ExampleSortable extends Component<RouteComponentProps<{}>> {
  onHeaderSortClicked = (sortOption: SortableColumnOption) => {
    const params = new URLSearchParams(this.props.location.search);
    if (params.get('sort')) {
      params.delete('sort');
    }
    params.set('sort', sortOption.field);
    this.props.history.push(`${this.props.location.pathname}?${params.toString()}`);
  };

  getSortProps() {
    const params = new URLSearchParams(this.props.location.search);
    const sort = params.get('sort');
    if (!sort) {
      return null;
    }

    const [field, direction] = sort.split('-');
    return { field, direction };
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

export default withRouter<{}>(ExampleSortable);
