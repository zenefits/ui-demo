import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DataManager, { updateFilters } from './DataManager';
import { Box, Subhead } from 'rebass';
import faker from 'faker';
import _ from 'lodash';

const getEmployees = num => {
  faker.seed(123);
  return _.range(num).map(i =>
    Object.create({
      id: i,
      name: faker.name.findName(),
      company: faker.company.companyName(),
      department: faker.commerce.department(),
      email: faker.internet.email(),
      location: faker.address.city(),
      phone: faker.phone.phoneNumber(),
      salary: faker.random.number({ min: 50000, max: 100000 }),
    }),
  );
};
const employees = getEmployees(50);

const initialNameFilter = { name: { stringContains: 'er' } };
const nameSearchString = nameFilter => (nameFilter || {}).stringContains || '';
const doNameSearch = (onFilterChange, filterDesc) => e =>
  onFilterChange(updateFilters(filterDesc, 'stringContains', 'name', e.target.value, true));

const initialDeptFilter = updateFilters({}, 'matchAny', 'department', 'Automotive', true);
const allDepartments = _.uniqBy(employees, 'department').map(e => e.department);
const selectedDepartments = deptFilter => new Set((deptFilter || {}).matchAny);
const doDepartmentFilter = (onFilterChange, filterDesc, d) => e =>
  onFilterChange(updateFilters(filterDesc, 'matchAny', 'department', d, e.target.checked));

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

storiesOf('DataManager', module)
  .add('basic', () => (
    <DataManager sourceData={employees}>
      {data => (
        <Box p={3}>
          <Subhead>Full List</Subhead>
          <UnorderedList arr={data.filteredData} />
        </Box>
      )}
    </DataManager>
  ))
  .add('with stringContains filter', () => (
    <DataManager sourceData={employees} filterDescriptor={initialNameFilter}>
      {data => (
        <Box p={3}>
          <Subhead>Search (stringContains)</Subhead>
          <p>
            Search names:{' '}
            <input
              value={nameSearchString(data.filterDescriptor.name)}
              onChange={doNameSearch(data.onFilterChange, data.filterDescriptor)}
            />
          </p>
          <b>Results:</b>
          <UnorderedList arr={data.filteredData} />
        </Box>
      )}
    </DataManager>
  ))
  .add('with matchAny filter', () => (
    <DataManager sourceData={employees} filterDescriptor={initialDeptFilter}>
      {data => (
        <Box p={3}>
          <Subhead>Checkboxes (matchAny)</Subhead>
          <p>
            Filter departments:{' '}
            {allDepartments.map(d => (
              <CheckboxWithLabel
                key={d}
                label={d}
                checked={selectedDepartments(data.filterDescriptor.department).has(d)}
                onChange={doDepartmentFilter(data.onFilterChange, data.filterDescriptor, d)}
              />
            ))}
          </p>
          <b>Results:</b>
          <UnorderedList arr={data.filteredData} />
        </Box>
      )}
    </DataManager>
  ));
