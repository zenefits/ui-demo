import { addDelayToResolvers } from 'z-frontend-app-bootstrap';

export type EmployeeMock = {
  id: number;
  name: string;
  type: string;
  status: string;
  title: string;
  department: string;
  location: string;
  dateHire: Date;
};

type FieldsToFilter = keyof EmployeeMock;

type Option = { id: string | number; label: string };

const mockData: EmployeeMock[] = [
  {
    id: 1,
    name: 'Cecilia Nelson',
    type: 'FT',
    status: 'Onboarding',
    title: 'Manager',
    department: 'Payroll',
    location: 'BLR',
    dateHire: new Date('2019-12-10'),
  },
  {
    id: 2,
    name: 'Dwight Obrien',
    type: 'PT',
    status: 'Active',
    title: 'Manager',
    department: 'Payroll',
    location: 'SF',
    dateHire: new Date('2019-12-11'),
  },
  {
    id: 3,
    name: 'Raquel Robbins',
    type: 'FT',
    status: 'Onboarding',
    title: 'SDE1',
    department: 'Benefits',
    location: 'BLR',
    dateHire: new Date('2019-12-12'),
  },
  {
    id: 4,
    name: 'Ernest Bates',
    type: 'PT',
    status: 'Terminated',
    title: 'SDE1',
    department: 'Payroll',
    location: 'SF',
    dateHire: new Date('2019-12-13'),
  },
  {
    id: 5,
    name: 'Tammy Powers',
    type: 'FT',
    status: 'Active',
    title: 'Manager',
    department: 'Benefits',
    location: 'YVR',
    dateHire: new Date('2019-12-14'),
  },
  {
    id: 6,
    name: 'Karla Jordan',
    type: 'PT',
    status: 'Onboarding',
    title: 'SDE2',
    department: 'HR',
    location: 'SF',
    dateHire: new Date('2019-12-15'),
  },
  {
    id: 7,
    name: 'Sherri Wagner',
    type: 'FT',
    status: 'Terminated',
    title: 'SDE2',
    department: 'Benefits',
    location: 'YVR',
    dateHire: new Date('2019-12-16'),
  },
  {
    id: 8,
    name: 'Stephen Garner',
    type: 'PT',
    status: 'Active',
    title: 'Manager',
    department: 'HR',
    location: 'SF',
    dateHire: new Date('2019-12-17'),
  },
  {
    id: 9,
    name: 'Laurie Hayes',
    type: 'Contractor',
    status: 'Onboarding',
    title: 'SDE1',
    department: 'HR',
    location: 'YVR',
    dateHire: new Date('2019-12-18'),
  },
  {
    id: 10,
    name: 'Angela Allison',
    type: 'Contractor',
    status: 'Active',
    title: 'SDE2',
    department: 'Benefits',
    location: 'SF',
    dateHire: new Date('2019-12-19'),
  },
];

export const locationOptions = [
  {
    id: '1',
    label: 'BLR',
  },
  {
    id: '2',
    label: 'YVR',
  },
  {
    id: '3',
    label: 'SF',
  },
];

export const departmentOptions = [
  {
    id: '5',
    label: 'Payroll',
  },
  {
    id: '6',
    label: 'Benefits',
  },
  {
    id: '7',
    label: 'HR',
  },
];

const getLabels = (filter: any, options: Option[]): string[] => {
  const filteredLabels = options.filter(option => filter.includes(option.id)).map(option => option.label);
  return filteredLabels;
};

const getFilteredData = (sourceData: EmployeeMock[], labels: string[], fieldToFilter: FieldsToFilter) => {
  const filteredData = sourceData.filter((data: any) => labels.includes(data[fieldToFilter]));
  return filteredData;
};

export const resolvers = addDelayToResolvers(
  {
    Query: {
      urlFiltersMockQuery: (root: any, args: any) => {
        let filteredData = mockData;
        if (Object.keys(args.filter).length === 0) {
          return filteredData;
        }
        if (args.filter.departments) {
          const labels = getLabels(args.filter.departments, departmentOptions);
          filteredData = getFilteredData(filteredData, labels, 'department');
        }
        if (args.filter.locations) {
          const labels = getLabels(args.filter.locations, locationOptions);
          filteredData = getFilteredData(filteredData, labels, 'location');
        }
        if (args.filter.name) {
          filteredData = filteredData.filter(data => data.name.toLowerCase().includes(args.filter.name.toLowerCase()));
        }
        if (args.filter.checkbox_location) {
          const labels = getLabels(args.filter.checkbox_location, locationOptions);
          filteredData = getFilteredData(filteredData, labels, 'location');
        }
        if (args.filter.hired_before && args.filter.hired_after) {
          filteredData = filteredData.filter(
            employee =>
              employee.dateHire <= new Date(args.filter.hired_before) &&
              employee.dateHire >= new Date(args.filter.hired_after),
          );
        }
        if (args.filter.hired_before) {
          filteredData = filteredData.filter(employee => employee.dateHire <= new Date(args.filter.hired_before));
        }
        if (args.filter.hired_after) {
          filteredData = filteredData.filter(employee => employee.dateHire >= new Date(args.filter.hired_after));
        }
        return filteredData;
      },
    },
  },
  300,
);
