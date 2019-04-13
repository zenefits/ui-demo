import React from 'react';

import { Box } from 'zbase';

import Table from '../Table';

export default () => (
  <Table columnWidths={[1 / 3, 1 / 3, 1 / 3]}>
    <Table.Header>
      <Box>Employee</Box>
      <Box>Department</Box>
      <Box>Hire date</Box>
    </Table.Header>
    <Table.Row>
      <Box>
        <Table.AvatarCell firstName="Farley" lastName="Adams" />
      </Box>
      <Box>Sales</Box>
      <Box>June 12, 2017</Box>
    </Table.Row>
    <Table.Row>
      <Table.AvatarCell firstName="Amy" lastName="Sanders" />
      <Box>Marketing</Box>
      <Box>June 12, 2017</Box>
    </Table.Row>
  </Table>
);
