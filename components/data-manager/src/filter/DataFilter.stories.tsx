import React, { Component } from 'react';

import { Box, Flex } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import DataFilter from './DataFilter';
import DataManager, { DataManagerRenderProps } from '../DataManager';

export interface Employee {
  name: string;
  departmentName: string;
  locationName?: string;
  dateHire?: Date;
  dateTermination?: Date;
}

export const employeeData: Employee[] = [
  { name: 'Morley Vin', departmentName: 'Recruiting', dateHire: new Date('2019-02-10') },
  { name: 'Dave Caf', departmentName: 'Music', dateHire: new Date('2019-03-10') },
  { name: 'Stephanie Caf', departmentName: 'Marketing', dateHire: new Date('2019-03-20') },
  { name: 'Sam Caf', departmentName: 'Marketing', dateHire: new Date('2019-03-22') },
];

export class FilterResults extends Component<{ results: Employee[] }> {
  render() {
    return (
      <>
        <b>Results:</b>
        <ul>
          {this.props.results.map((a: any) => (
            <li key={a.name} data-testid="filter-result">
              {a.name}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

storiesOf('data-manager|DataFilter', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 600]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultFilterExample />);

export const DefaultFilterExample = () => (
  <DataManager
    sourceData={employeeData}
    render={(managerProps: DataManagerRenderProps<Employee>) => (
      <Flex direction={['column', 'row']}>
        <Box w={250} mr={[null, 5]}>
          <DataFilter>
            <DataFilter.Section label="Employee">
              <DataFilter.Text label="Name" dataKey="name" dataManagerProps={managerProps} />
              <DataFilter.CheckboxGroup
                label="Department"
                dataKey="departmentName"
                data={employeeData}
                dataManagerProps={managerProps}
              />
              <DataFilter.DateRange label="Hired" dataKey="dateHire" dataManagerProps={managerProps} />
            </DataFilter.Section>
          </DataFilter>
        </Box>
        <Box>
          <FilterResults results={managerProps.displayData} />
        </Box>
      </Flex>
    )}
  />
);
