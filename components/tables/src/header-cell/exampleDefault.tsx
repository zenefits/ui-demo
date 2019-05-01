import React from 'react';

import { Box } from 'zbase';

import Table from '../Table';

export default () => (
  <Table columnWidths={[1 / 4, 1 / 4, 1 / 4, 1 / 4]}>
    <Table.Header>
      <Table.HeaderCell iconProps={{ iconName: 'account-circle' }}>Employee</Table.HeaderCell>
      <Box>Department</Box>
      <Table.HeaderCell tooltipBody="When the employee was hired">Hire data</Table.HeaderCell>
      <Box>Progress</Box>
    </Table.Header>
  </Table>
);
