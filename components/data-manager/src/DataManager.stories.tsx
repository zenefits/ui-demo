import React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';
import { includes, range, uniqBy } from 'lodash';

import { Button, Checkbox, InputWithIcon } from 'z-frontend-forms';
import { Box, Flex } from 'zbase';

import DataManager, { DataManagerRenderProps } from './DataManager';
import { updateFilters } from './filterUtils';
import { updateSorter } from './sortUtils';
import Pager from './Pager';

interface EmployeeType {
  id: number;
  name: string;
  company: string;
  department: string;
}

const getEmployees: (number) => EmployeeType[] = num => {
  faker.seed(123);
  return range(num).map(id => ({
    id,
    name: faker.name.findName(),
    company: faker.company.companyName(),
    department: faker.commerce.department(),
  }));
};
const employees = getEmployees(50);
const allDepartments = uniqBy(employees, 'department').map(e => e.department);
const initialNameFilter = { name: { stringContains: 'er' } };
const initialDeptFilter = updateFilters({}, 'matchAny', 'department', 'Automotive', true);

const ListOfEmployees = ({ arr }) => (
  <ul>
    {arr.map(a => (
      <li key={a.id}>
        {a.name} (Dept: <i>{a.department}</i>)
      </li>
    ))}
  </ul>
);

const DepartmentCheckboxesFilter = ({ allDepts, filterConfig, onFilterChange }) => {
  const selectedDepartments = (filterConfig.department || {}).matchAny;

  return (
    <Box>
      Filter departments:{' '}
      {allDepts.map(dept => (
        <Checkbox
          key={dept}
          label={dept}
          checked={includes(selectedDepartments, dept)}
          onChange={e => onFilterChange(updateFilters(filterConfig, 'matchAny', 'department', dept, e.target.checked))}
        />
      ))}
    </Box>
  );
};

const NameSearchFilter = ({ filterConfig, onFilterChange }) => (
  <Box w={1 / 3}>
    Search names:{' '}
    <InputWithIcon
      iconName="search"
      s="small"
      value={(filterConfig.name || {}).stringContains || ''}
      onChange={e => onFilterChange(updateFilters(filterConfig, 'stringContains', 'name', e.target.value, true))}
    />
  </Box>
);

const SortButton = ({ field, sortConfig, onSortChange }) => (
  <Button
    m={2}
    mode="primary"
    disabled={(sortConfig[0] || { key: '' }).key === field}
    onClick={e => onSortChange(updateSorter(sortConfig, field, true))}
  >
    Sort by {field}
  </Button>
);

storiesOf('FilterManager', module)
  .add('no filter', () => (
    <DataManager
      sourceData={employees}
      render={(managerProps: DataManagerRenderProps<EmployeeType>) => (
        <Box p={3}>
          <h3>Full List ({employees.length} employees)</h3>

          {/* This component actually renders the final data */}
          <ListOfEmployees arr={managerProps.displayData} />
        </Box>
      )}
    />
  ))
  .add('with stringContains filter', () => (
    <DataManager
      sourceData={employees}
      initialFilter={initialNameFilter}
      render={(managerProps: DataManagerRenderProps<EmployeeType>) => (
        <Box p={3}>
          <h3>Search (stringContains)</h3>
          <NameSearchFilter
            filterConfig={managerProps.filtering.config}
            onFilterChange={managerProps.filtering.onChange}
          />
          <b>Results:</b>

          {/* This component actually renders the final data */}
          <ListOfEmployees arr={managerProps.displayData} />
        </Box>
      )}
    />
  ))
  .add('with matchAny filter', () => (
    <DataManager
      sourceData={employees}
      initialFilter={initialDeptFilter}
      render={(managerProps: DataManagerRenderProps<EmployeeType>) => (
        <Box p={3}>
          <h3>Checkboxes (matchAny)</h3>
          <DepartmentCheckboxesFilter
            allDepts={allDepartments}
            filterConfig={managerProps.filtering.config}
            onFilterChange={managerProps.filtering.onChange}
          />
          <b>Results:</b>

          {/* This component actually renders the final data */}
          <ListOfEmployees arr={managerProps.displayData} />
        </Box>
      )}
    />
  ));

storiesOf('SortManager', module).add('basic', () => (
  <DataManager
    sourceData={employees}
    render={(managerProps: DataManagerRenderProps<EmployeeType>) => (
      <Box p={3}>
        <h3>Sorting a List by specific keys</h3>
        <SortButton
          field={'name'}
          sortConfig={managerProps.sorting.config}
          onSortChange={managerProps.sorting.onChange}
        />
        <SortButton
          field={'department'}
          sortConfig={managerProps.sorting.config}
          onSortChange={managerProps.sorting.onChange}
        />

        {/* This component actually renders the final data */}
        <ListOfEmployees arr={managerProps.displayData} />
      </Box>
    )}
  />
));

const pageSize = 20;
storiesOf('PageManager', module).add('basic', () => (
  <DataManager
    sourceData={employees}
    initialPageSize={pageSize}
    render={(managerProps: DataManagerRenderProps<EmployeeType>) => (
      <Box p={3}>
        <h3>Paged List (page size: {pageSize})</h3>

        {/* This component actually renders the final data */}
        <ListOfEmployees arr={managerProps.displayData} />

        <Pager
          pageSize={managerProps.paging.pageSize}
          currentPage={managerProps.paging.currentPage}
          totalItemsCount={managerProps.paging.inputData.length}
          onPageChange={managerProps.paging.onPageChange}
        />
      </Box>
    )}
  />
));

// kitchen sink example - filtering, sorting, and pagination together
storiesOf('Kitchen Sink', module).add('all', () => (
  <DataManager
    sourceData={employees}
    initialPageSize={pageSize}
    render={(managerProps: DataManagerRenderProps<EmployeeType>) => (
      <Box p={3}>
        <h3>Filtering, Sorting, and Pagination</h3>
        <Flex>
          <Box w={1 / 6}>
            <NameSearchFilter
              filterConfig={managerProps.filtering.config}
              onFilterChange={managerProps.filtering.onChange}
            />
            <DepartmentCheckboxesFilter
              allDepts={allDepartments}
              filterConfig={managerProps.filtering.config}
              onFilterChange={managerProps.filtering.onChange}
            />
          </Box>
          <Box w={2 / 3} p={3}>
            <SortButton
              field={'name'}
              sortConfig={managerProps.sorting.config}
              onSortChange={managerProps.sorting.onChange}
            />
            <SortButton
              field={'department'}
              sortConfig={managerProps.sorting.config}
              onSortChange={managerProps.sorting.onChange}
            />

            {/* This component actually renders the final data */}
            <ListOfEmployees arr={managerProps.displayData} />

            <Pager
              pageSize={managerProps.paging.pageSize}
              currentPage={managerProps.paging.currentPage}
              totalItemsCount={managerProps.paging.inputData.length}
              onPageChange={managerProps.paging.onPageChange}
            />
          </Box>
        </Flex>
      </Box>
    )}
  />
));
