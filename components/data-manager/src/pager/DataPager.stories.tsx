import React from 'react';
// @ts-ignore
import { withViewport } from '@storybook/addon-viewport';

import { Box } from 'zbase';
import { styled } from 'z-frontend-theme';
import { color, space } from 'z-frontend-theme/utils';
import { setViewports } from 'z-frontend-app-bootstrap';

import { storiesOf } from '../../.storybook/storyHelpers';
import { employeeData, Employee } from '../filter/DataFilter.stories';
import DataPager from './DataPager';
import DataManager, { DataManagerRenderProps } from '../DataManager';

storiesOf('data-manager|DataPager', module)
  .addDecorator(withViewport())
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 600]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultDataPagerExample />)
  .add('mobile', () => <DefaultDataPagerExample />, setViewports([0]));

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    text-align: left;
    vertical-align: bottom;
    padding: ${space(2)} ${space(4)};
    border-bottom: 1px solid ${color('grayscale.f')};
  }
`;

const HtmlTable = (props: { data: Employee[] }) => (
  <Box mb={2}>
    <StyledTable>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((employee: Employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.departmentName}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </Box>
);

export const DefaultDataPagerExample = () => (
  <DataManager<Employee>
    sourceData={employeeData}
    initialPageSize="xs"
    render={(managerProps: DataManagerRenderProps<Employee>) => (
      <>
        {/* NOTE: you would typically use DataTable here, but this package cannot depend on z-frontend-tables (circular dependency) */}
        <HtmlTable data={managerProps.displayData} />
        <DataPager px={4} />
      </>
    )}
  />
);
