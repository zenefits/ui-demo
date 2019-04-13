import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';
import { Button, IconButton, ProgressBar } from 'z-frontend-elements';

import Table from './Table';

export default () => (
  <Table columnWidths={[1 / 5, 1 / 5, 1 / 5, 1 / 5, 1 / 5]}>
    <Table.Header>
      <Box>Name</Box>
      <Box>Department</Box>
      <Box>Hire date</Box>
      <Box>Progress</Box>
      <Box />
    </Table.Header>
    <Table.Row>
      <Table.AvatarCell firstName="Farley" lastName="Adams" metadata="Engineer" />
      <Box>Sales</Box>
      <Box>June 12, 2017</Box>
      <Box>
        <ProgressBar value={20} max={100} w={76} />
        <TextBlock color="text.light" mt={2}>
          20% complete
        </TextBlock>
      </Box>
      <Flex justify="flex-end">
        <Button>Action</Button>
        <IconButton iconName="more-vert" />
      </Flex>
    </Table.Row>
    <Table.Row>
      <Table.AvatarCell firstName="Amy" lastName="Sanders" metadata="Designer" />
      <Box>Marketing</Box>
      <Box>June 12, 2017</Box>
      <Box>
        <ProgressBar value={20} max={100} w={76} />
        <TextBlock color="text.light" mt={2}>
          20% complete
        </TextBlock>
      </Box>
      <Flex justify="flex-end">
        <Button>Action</Button>
        <IconButton iconName="more-vert" />
      </Flex>
    </Table.Row>
  </Table>
);
