import React, { Component } from 'react';

import { HashRouter as Router } from 'react-router-dom';

import { Box, Flex } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import DataFilter from './DataFilter';
import DataManager, { DataManagerRenderProps } from '../DataManager';

export interface Employee {
  id?: number;
  name?: string;
  departmentName?: string;
  locationName?: string;
  dateHire?: Date;
  dateTermination?: Date;
  location: string;
}

export const employeeData: Employee[] = [
  { id: 1, name: 'Morley Vin', departmentName: 'Recruiting', dateHire: new Date('2019-02-10'), location: 'California' },
  { id: 2, name: 'Dave Caf', /* no department */ dateHire: new Date('2019-03-10'), location: 'California' },
  { id: 3, name: 'Stephanie Caf', departmentName: 'Marketing', dateHire: new Date('2019-03-20'), location: 'New York' },
  { id: 4, name: 'Sam Caf', departmentName: 'Marketing', dateHire: new Date('2019-03-22'), location: 'New York' },
  {
    id: 5,
    /* missing name */ departmentName: 'Competitor Analysis & Management',
    dateHire: new Date('2019-03-22'),
    location: 'Colorado',
  },
];

export class FilterResults extends Component<{ results: Employee[] }> {
  render() {
    return (
      <>
        <b>Results:</b>
        <ul>
          {this.props.results.map((a: any) => (
            <li key={a.id.toString()} data-testid="filter-result">
              {a.name || 'n/a'}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

storiesOf('data-manager|DataFilter', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 900]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <DefaultFilterExample />)
  .add('initial filters', () => (
    <DefaultFilterExample
      initialFilter={{
        name: { stringContains: 'Caf' },
        departmentName: {
          matchAny: ['Marketing'],
        },
        location: {
          matchAny: ['New York', 'California'],
        },
      }}
    />
  ));

export const DefaultFilterExample = (props: any) => (
  <Router>
    <DataManager
      sourceData={employeeData}
      {...props}
      render={(managerProps: DataManagerRenderProps<Employee>) => (
        <Flex direction={['column', 'row']}>
          <Box w={250} mr={[null, 5]}>
            <DataFilter>
              <DataFilter.Section label="Employee">
                <DataFilter.Text label="Name" dataKey="name" />
                <DataFilter.CheckboxGroup label="Department" dataKey="departmentName" data={employeeData} />
                <DataFilter.MultiSelect label="Location" dataKey="location" />
                <DataFilter.DateRange label="Hired" dataKey="dateHire" />
              </DataFilter.Section>
            </DataFilter>
          </Box>
          <Box>
            <FilterResults results={managerProps.displayData} />
          </Box>
        </Flex>
      )}
    />
  </Router>
);
