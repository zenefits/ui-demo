import { sortBy, uniq } from 'lodash';

import { addDelayToResolvers } from 'z-frontend-app-bootstrap';

import { getEmployees, EmployeeType } from './DataManager.stories';
import { Filters } from './url-filters/urlFilterUtils';

type Option = { id: number; label: string };

type FieldToFilter = Exclude<keyof EmployeeType, 'id'>;

type GraphqlDataManagerMockQueryArgs = {
  order_by?: string[];
  filter?: Filters;
  offset: number;
  limit: number;
};

const employees: EmployeeType[] = getEmployees(50);

export const departmentOptions: Option[] = uniq(employees.map(employee => employee.department)).map(
  (department, index) => ({
    id: index + 1,
    label: department,
  }),
);

const getLabels = (filter: number[], options: Option[]): string[] => {
  const filteredLabels = options.filter(option => filter.includes(option.id)).map(option => option.label);
  return filteredLabels;
};

const getFilteredData = (sourceData: EmployeeType[], labels: string[], fieldToFilter: FieldToFilter) => {
  const filteredData = sourceData.filter((data: EmployeeType) => labels.includes(data[fieldToFilter]));
  return filteredData;
};

const paginatedData = (filteredData: EmployeeType[], args: any) => {
  const iterationLength = args.offset + args.limit;
  const length = iterationLength < employees.length ? iterationLength : filteredData.length;
  return { employees: filteredData.slice(args.offset, length), totalItemsCount: filteredData.length };
};

export const resolvers = addDelayToResolvers(
  {
    Query: {
      gqlDataManagerMockQuery: (root: any, args: GraphqlDataManagerMockQueryArgs) => {
        const isSortingNeeded = args.order_by && args.order_by[0];

        // Neither filtering nor sorting
        if (Object.keys(args.filter).length === 0 && !isSortingNeeded) {
          return paginatedData(employees, args);
        }

        let filteredData = employees;
        if (args.filter.department) {
          const labels = getLabels(args.filter.department as number[], departmentOptions);
          filteredData = getFilteredData(filteredData, labels, 'department');
        }
        if (args.filter.name) {
          filteredData = filteredData.filter(data =>
            data.name.toLowerCase().includes((args.filter.name as string).toLowerCase()),
          );
        }

        if (!isSortingNeeded) {
          return paginatedData(filteredData, args);
        }

        // Only mocking sorting for name field.
        const sortData = sortBy(filteredData, data => data.name);
        const sortedData = args.order_by[0].startsWith('-') ? sortData.reverse() : sortData;
        return paginatedData(sortedData, args);
      },
    },
  },
  300,
);
