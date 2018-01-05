import React from 'react';
import { Box } from 'rebass';
import { shallow } from 'enzyme';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import Table from './Table';
import { RebassProps } from 'z-rebass-types';

describe('Table', () => {
  it('should render all cells text', () => {
    const tableJsx = (
      <Table columnWidths={[1 / 3, 2 / 3]}>
        <Table.Header>
          <Box>H1</Box>
          <Box>H2</Box>
        </Table.Header>
        <Table.Row>
          <Box>R11</Box>
          <Box>R12</Box>
        </Table.Row>
        <Table.Row>
          <Box />
          <Box>R22</Box>
        </Table.Row>
        <Table.Footer>
          <Box>F1</Box>
          <Box>F2</Box>
        </Table.Footer>
      </Table>
    );
    expect.assertions(8);
    const tableCells = ['H1', 'H2', 'R11', 'R12', '', 'R22', 'F1', 'F2'];

    const wrapper = mountWithTheme(tableJsx);
    const cellWrappers = wrapper.findWhere(
      nestedWrapper => nestedWrapper.find(Box).length === 1 && nestedWrapper.instance() instanceof Box,
    );
    cellWrappers.forEach((wrapper, i) => expect(wrapper.text()).toEqual(tableCells[i]));
  });

  it('body elements should correctly assign columnWidths', () => {
    const componentsJsx = [
      <Table.Header key={0}>
        <Box>H1</Box>
        <Box>H2</Box>
      </Table.Header>,
      <Table.Row key={1}>
        <Box>R1</Box>
        <Box>R2</Box>
      </Table.Row>,
      <Table.Footer key={2}>
        <Box>F1</Box>
        <Box>F2</Box>
      </Table.Footer>,
    ];

    const context = {
      columnWidths: [1 / 4, 3 / 4],
      columnSpacing: 1,
      verticalSpacing: 2,
    };

    expect.assertions(6);

    componentsJsx.forEach(jsx => {
      const wrapper = shallow(jsx, { context });
      const cellWrappers = wrapper.findWhere(
        wrapper => wrapper.find(Box).length === 2 && (wrapper.props() as RebassProps<{}>).w !== undefined,
      );
      cellWrappers.forEach((cell, i) => {
        const { w, px, py } = cell.props() as RebassProps<{}>;
        expect({ w, px, py }).toEqual({
          w: [1, null, i % 2 ? 3 / 4 : 1 / 4],
          px: 1,
          py: 2,
        });
      });
    });
  });
});
