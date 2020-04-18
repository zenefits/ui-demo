import React from 'react';
import faker from 'faker';
import { range, uniq } from 'lodash';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import { RouteInfo, SortButton } from '../GraphqlDataManager.stories';
import InMemoryDataManager from './InMemoryDataManager';
import UrlFilterText from '../url-filters/UrlFilterText';
import UrlFilterMultiSelect from '../url-filters/UrlFilterMultiSelect';
import UrlPager from '../url-filters/UrlPager';

storiesOf('data-manager|InMemoryDataManager', module).add('default', () => <DefaultExample />);

type Option = { id: string; label: string };

export type EmployeeType = {
  id: number;
  name: string;
  department: string;
};

const getEmployees: (number: number) => EmployeeType[] = num => {
  faker.seed(123);
  return range(num).map(id => ({
    id,
    name: faker.name.findName(),
    department: faker.commerce.department(),
  }));
};

const employees: EmployeeType[] = getEmployees(50);

const departmentOptions: Option[] = uniq(employees.map(employee => employee.department)).map((department: string) => ({
  id: department,
  label: department,
}));

export type ListOfEmployeesProps = {
  employees: EmployeeType[];
};

function ListOfEmployees({ employees }: ListOfEmployeesProps) {
  return (
    <ul>
      {employees.map((employee: EmployeeType) => (
        <li key={employee.id}>
          [{employee.id}]{employee.name} (Dept: <i>{employee.department}</i>)
        </li>
      ))}
    </ul>
  );
}

function DefaultExample() {
  return (
    <Box>
      <RouteInfo />
      <InMemoryDataManager<EmployeeType> sourceData={employees}>
        {({ data, totalItemsCount }) => {
          return (
            <Box>
              <Box w={300}>
                <UrlFilterText filterName="name" label="Employee Name" />
                <UrlFilterMultiSelect filterName="department" label="Department" options={departmentOptions} />
                <SortButton />
              </Box>
              <ListOfEmployees employees={data} />
              <UrlPager totalItemsCount={totalItemsCount} />
            </Box>
          );
        }}
      </InMemoryDataManager>
    </Box>
  );
}
