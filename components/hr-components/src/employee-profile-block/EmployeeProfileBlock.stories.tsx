import React from 'react';

import { Box } from 'zbase';
import { paddedBox } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';
import { employeeWithManager } from '../../factories/employee';
import EmployeeProfileBlock, { EmployeeType } from './EmployeeProfileBlock';

const fakeEmployee = employeeWithManager();

storiesOf('zapp-talent|EmployeeProfileBlock', module)
  .addDecorator(paddedBox)
  .add('default', () => <EmployeeProfileBlock employee={fakeEmployee as EmployeeType} />)
  .add('vertical', () => <EmployeeProfileBlock employee={fakeEmployee as EmployeeType} mode="vertical" />)
  .add(
    'size',
    () => (
      <>
        <Box mb={4}>
          <EmployeeProfileBlock employee={fakeEmployee as EmployeeType} size="xsmall" />
        </Box>
        <Box mb={4}>
          <EmployeeProfileBlock employee={fakeEmployee as EmployeeType} size="medium" />
        </Box>
        <Box mb={4}>
          <EmployeeProfileBlock employee={fakeEmployee as EmployeeType} size="xxlarge" />
        </Box>
      </>
    ),
    {
      chromatic: {
        diffThreshold: 0.1, // increase from default of 0.063 to avoid flakiness in this test
      },
    },
  );
