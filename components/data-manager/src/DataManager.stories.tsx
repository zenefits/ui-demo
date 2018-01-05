import React from 'react';
import { storiesOf } from '@storybook/react';
import DataManager from './DataManager';
import { updateFilters } from './filterUtils';
import { updateSorter } from './sortUtils';
import Button from 'z-frontend-forms/src/Button';
import { Box, Subhead } from 'rebass';
import faker from 'faker';
import _ from 'lodash';
import Pager from './Pager';

const getEmployees = num => {
  faker.seed(123);
  return _.range(num).map(id =>
    Object.create({
      id,
      name: faker.name.findName(),
      company: faker.company.companyName(),
      department: faker.commerce.department(),
    }),
  );
};
const employees = getEmployees(50);

const initialNameFilter = { name: { stringContains: 'er' } };
const getNameSearchString = nameFilter => (nameFilter || {}).stringContains || '';
const changeNameSearch = (onFilterChange, filterConfig, newValue) =>
  onFilterChange(updateFilters(filterConfig, 'stringContains', 'name', newValue, true));

const initialDeptFilter = updateFilters({}, 'matchAny', 'department', 'Automotive', true);
const allDepartments = _.uniqBy(employees, 'department').map(e => e.department);
const getSelectedDepartments = deptFilter => new Set((deptFilter || {}).matchAny);
const changeDepartmentFilters = (onFilterChange, filterConfig, d, isSelected) =>
  onFilterChange(updateFilters(filterConfig, 'matchAny', 'department', d, isSelected));

const UnorderedList = ({ arr }) => (
  <ul>
    {arr.map(a => (
      <li key={a.id}>
        {a.name} (Dept: <i>{a.department}</i>)
      </li>
    ))}
  </ul>
);

const CheckboxWithLabel = ({ label, checked, onChange }) => (
  <label>
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);

storiesOf('FilterManager', module)
  .add('basic', () => (
    <DataManager
      sourceData={employees}
      render={managerProps => (
        <Box p={3}>
          <Subhead>Full List ({employees.length} employees)</Subhead>
          <UnorderedList arr={managerProps.filtering.outputData} />
        </Box>
      )}
    />
  ))
  .add('with stringContains filter', () => (
    <DataManager
      sourceData={employees}
      initialFilter={initialNameFilter}
      render={managerProps => (
        <Box p={3}>
          <Subhead>Search (stringContains)</Subhead>
          <p>
            Search names:{' '}
            <input
              value={getNameSearchString(managerProps.filtering.config.name)}
              onChange={e =>
                changeNameSearch(managerProps.filtering.onChange, managerProps.filtering.config, e.target.value)
              }
            />
          </p>
          <b>Results:</b>
          <UnorderedList arr={managerProps.filtering.outputData} />
        </Box>
      )}
    />
  ))
  .add('with matchAny filter', () => (
    <DataManager
      sourceData={employees}
      initialFilter={initialDeptFilter}
      render={managerProps => (
        <Box p={3}>
          <Subhead>Checkboxes (matchAny)</Subhead>
          <p>
            Filter departments:{' '}
            {allDepartments.map(dept => (
              <CheckboxWithLabel
                key={dept}
                label={dept}
                checked={getSelectedDepartments(managerProps.filtering.config.department).has(dept)}
                onChange={e =>
                  changeDepartmentFilters(
                    managerProps.filtering.onChange,
                    managerProps.filtering.config,
                    dept,
                    e.target.checked,
                  )
                }
              />
            ))}
          </p>
          <b>Results:</b>
          <UnorderedList arr={managerProps.filtering.outputData} />
        </Box>
      )}
    />
  ));

const changeSorting = (sortConfig, onSortChange, key) => onSortChange(updateSorter(sortConfig, key, true));

storiesOf('SortManager', module).add('basic', () => (
  <DataManager
    sourceData={employees}
    render={managerProps => (
      <Box p={3}>
        <Subhead>Sorting a List by specific keys</Subhead>
        <Button
          m={2}
          disabled={(managerProps.sorting.config[0] || { key: '' }).key === 'name'}
          onClick={e => changeSorting(managerProps.sorting.config, managerProps.sorting.onChange, 'name')}
        >
          Sort by name
        </Button>
        <Button
          m={2}
          disabled={(managerProps.sorting.config[0] || { key: '' }).key === 'department'}
          onClick={e => changeSorting(managerProps.sorting.config, managerProps.sorting.onChange, 'department')}
        >
          Sort by department
        </Button>
        <UnorderedList arr={managerProps.sorting.outputData} />
      </Box>
    )}
  />
));

const pageSize = 20;
storiesOf('PageManager', module).add('basic', () => (
  <DataManager
    sourceData={employees}
    intialPageSize={pageSize}
    render={managerProps => (
      <Box p={3}>
        <Subhead>Paged List (page size: {pageSize})</Subhead>
        <UnorderedList arr={managerProps.paging.outputData} />
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
