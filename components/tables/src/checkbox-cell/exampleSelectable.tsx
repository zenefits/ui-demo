import React, { Component, SyntheticEvent } from 'react';
import { without } from 'lodash';

import { Box } from 'zbase';
import { Form } from 'z-frontend-forms';

import Table from '../Table';

type ExampleSelectableState = {
  selectedRows: string[];
};

class ExampleSelectable extends Component<{}, ExampleSelectableState> {
  state: { selectedRows: string[] } = {
    selectedRows: [],
  };

  onCheckboxChange = (rowName: string) => (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.setState(prevState => {
        return { selectedRows: [...prevState.selectedRows, rowName] };
      });
    } else {
      this.setState(prevState => {
        return { selectedRows: without(prevState.selectedRows, rowName) };
      });
    }
  };

  render() {
    return (
      <Form initialValues={{}} onSubmit={() => {}}>
        <Table columnWidths={[1 / 10, 3 / 10, 3 / 10, 3 / 10]}>
          <Table.Header>
            <Box />
            <Box>Name</Box>
            <Box>Department</Box>
            <Box>Hire date</Box>
          </Table.Header>
          <Table.Row>
            <Table.CheckboxCell
              checked={this.state.selectedRows.includes('row1')}
              onChange={this.onCheckboxChange('row1')}
              name="row1"
            />
            <Box>Farley Adams</Box>
            <Box>Sales</Box>
            <Box>June 12, 2017</Box>
          </Table.Row>
          <Table.Row>
            <Table.CheckboxCell
              checked={this.state.selectedRows.includes('row2')}
              onChange={this.onCheckboxChange('row2')}
              name="row2"
            />
            <Box>Amy Sanders</Box>
            <Box>Marketing</Box>
            <Box>June 12, 2017</Box>
          </Table.Row>
        </Table>
      </Form>
    );
  }
}

export default ExampleSelectable;
