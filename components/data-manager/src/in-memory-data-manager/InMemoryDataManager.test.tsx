import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';
import { Box } from 'zbase';
import { Button, List } from 'z-frontend-elements';

import { UrlQueryParamsProps } from '../UrlQueryParamsManager';
import InMemoryDataManager, { InMemoryDataManagerProps } from './InMemoryDataManager';
import { EmployeeType, ListOfEmployeesProps } from './InMemoryDataManager.stories';
import { CustomFilter } from '../filterUtils';
import { RowSelectionContext, SelectionContext } from '../data-selection/RowSelectionContext';

describe('InMemoryDataManager', () => {
  describe('filtering', () => {
    test('filtering by "string contains"', () => {
      const { getByText, queryByText } = renderWithContext(<DataProcessTest queryParams={{ filter_name: 'ali' }} />);

      getByText('Alice');
      expect(queryByText('Ben')).toBeNull();
    });

    test('filtering by "match any"', () => {
      const { getByText, queryByText } = renderWithContext(
        <DataProcessTest queryParams={{ filter_department: ['Sales', 'Engineering'] }} />,
      );

      getByText('Alice');
      getByText('Ben');
      expect(queryByText('Charles')).toBeNull();
    });

    test('filtering by "custom match"', () => {
      function checkIsOdd(value: number) {
        return value % 2 === 1;
      }

      const customIdFilters: CustomFilter[] = [{ key: 'idIsOddNumber', function: checkIsOdd }];

      const { getByText, queryByText } = renderWithContext(
        <DataProcessTest queryParams={{ filter_custom_id: '1' }} customFilters={{ id: customIdFilters }} />,
      );

      getByText('Alice');
      getByText('Charles');
      expect(queryByText('Ben')).toBeNull();
    });

    test('filtering by "less than"', () => {
      const { getByText, queryByText } = renderWithContext(
        <DataProcessTest queryParams={{ filter_lessThan_id: 3 }} numberKeys={['filter_lessThan_id']} />,
      );

      getByText('Alice');
      getByText('Ben');
      expect(queryByText('Charles')).toBeNull();
    });
  });

  test('sorting', () => {
    const { getAllByTestId } = renderWithContext(<DataProcessTest queryParams={{ order_by: ['-name'] }} />);

    const employeeListItems = getAllByTestId('ListItems');

    expect(employeeListItems[0].innerHTML).toBe('Frank');
    expect(employeeListItems[1].innerHTML).toBe('Eric');
    expect(employeeListItems[2].innerHTML).toBe('Dan');
    expect(employeeListItems[3].innerHTML).toBe('Charles');
    expect(employeeListItems[4].innerHTML).toBe('Ben');
    expect(employeeListItems[5].innerHTML).toBe('Alice');
  });

  test('pagination', () => {
    const { getByText, queryByText } = renderWithContext(
      <DataProcessTest queryParams={{ currentPage: 1, pageSize: 5 }} />,
    );

    getByText('Alice');
    getByText('Ben');
    getByText('Charles');
    getByText('Dan');
    getByText('Eric');
    expect(queryByText('Frank')).toBeNull();
  });

  test('selections', () => {
    const { getByText, queryByText } = renderWithContext(<SelectionTest />);

    const aliceIsSelected = 'ID-1 is selected';
    expect(queryByText(aliceIsSelected)).toBeNull();
    fireEvent.click(getByText('Select Alice'));
    getByText(aliceIsSelected);
    fireEvent.click(getByText('Deselect Alice'));
    expect(queryByText(aliceIsSelected)).toBeNull();
  });
});

const employees: EmployeeType[] = [
  {
    id: 1,
    name: 'Alice',
    department: 'Sales',
  },
  {
    id: 2,
    name: 'Ben',
    department: 'Engineering',
  },
  {
    id: 3,
    name: 'Charles',
    department: 'Marketing',
  },
  {
    id: 4,
    name: 'Dan',
    department: 'Marketing',
  },
  {
    id: 5,
    name: 'Eric',
    department: 'Engineering',
  },
  {
    id: 6,
    name: 'Frank',
    department: 'Sales',
  },
];

function ListOfEmployees({ employees }: ListOfEmployeesProps) {
  return (
    <List>
      {employees.map((employee: EmployeeType) => (
        <List.Item key={employee.id}>{employee.name}</List.Item>
      ))}
    </List>
  );
}

type DataProcessTestProps = Pick<InMemoryDataManagerProps<EmployeeType>, 'customFilters'> &
  Pick<UrlQueryParamsProps, 'numberKeys'> & {
    /**
     * Query params to mimic in url.
     */
    queryParams: UrlQueryParamsProps['defaults'];
  };

function DataProcessTest(props: DataProcessTestProps) {
  const { queryParams, customFilters, numberKeys } = props;

  return (
    <Router>
      <InMemoryDataManager<EmployeeType>
        sourceData={employees}
        customFilters={customFilters}
        urlQueryParamsDefaults={queryParams}
        urlQueryParamsNumberKeys={numberKeys}
      >
        {({ data, totalItemsCount }) => {
          return <ListOfEmployees employees={data} />;
        }}
      </InMemoryDataManager>
    </Router>
  );
}

const SelectionTest: FunctionComponent = () => (
  <Router>
    <InMemoryDataManager<EmployeeType> sourceData={employees} selectionKey="id">
      {({ data, totalItemsCount }) => {
        return (
          <RowSelectionContext.Consumer>
            {(selectionContext: SelectionContext<EmployeeType>) => {
              // selectedIds is a Set
              const { onDeselect, onSelect, selections: selectedIds } = selectionContext;
              return (
                <Box>
                  <List>
                    {data.map((employee: EmployeeType) => (
                      <List.Item key={employee.id}>
                        <Button
                          onClick={() => {
                            onSelect([employee]);
                          }}
                        >
                          Select {employee.name}
                        </Button>
                        <Button
                          onClick={() => {
                            onDeselect([employee]);
                          }}
                        >
                          Deselect {employee.name}
                        </Button>
                      </List.Item>
                    ))}
                  </List>
                  <Box>
                    {Array.from(selectedIds).map((id: number) => (
                      <Box key={id}>ID-{id} is selected</Box>
                    ))}
                  </Box>
                </Box>
              );
            }}
          </RowSelectionContext.Consumer>
        );
      }}
    </InMemoryDataManager>
  </Router>
);
