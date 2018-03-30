import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from 'zbase';
import Table from './Table';

storiesOf('Table', module).add('default', () => (
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
));
