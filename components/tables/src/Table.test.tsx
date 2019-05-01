import React from 'react';
import { shallow } from 'enzyme';

import { Box, BoxProps } from 'zbase';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import { EmptyState } from 'z-frontend-elements';

import Table from './Table';

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
    const tableText = wrapper.text();
    tableCells.forEach(cell => expect(tableText).toContain(cell));
  });

  it('supports empty message', () => {
    const wrapper = mountWithTheme(
      <Table columnWidths={[]} isEmpty emptyRender={() => <EmptyState message="No employees available." />} />,
    );
    expect(wrapper.text()).toContain('No employees available');
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
        wrapper => wrapper.find(Box).length === 2 && (wrapper.props() as BoxProps).w !== undefined,
      );
      cellWrappers.forEach((cell, i) => {
        const { w, px, py } = cell.props() as BoxProps;
        expect({ w, px, py }).toEqual({
          w: [1, null, i % 2 ? 3 / 4 : 1 / 4],
          px: 1,
          py: 2,
        });
      });
    });
  });
});
