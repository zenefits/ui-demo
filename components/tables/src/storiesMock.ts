import { sortBy } from 'lodash';

import { addDelayToResolvers } from 'z-frontend-app-bootstrap';

export type Row = {
  name: string;
  location: string;
  alive: boolean;
  age: number;
  occupation: string;
  duties: string[];
  salary?: number;
  // needed for GraphqlDataManager
  id?: number;
};

export const rows: Row[] = [
  {
    name: 'Fred Flintstone',
    location: 'Bedrock',
    alive: true,
    age: 46,
    occupation: 'Caveman',
    duties: ['Works on rocks', 'Feed Dino'],
    salary: 100,
  },
  {
    name: 'Wilma Flintstone',
    location: 'Bedrock',
    alive: true,
    age: 36,
    occupation: 'Caveman',
    duties: ['Bailing out Fred', 'Caring for Pebbles'],
    salary: 10000,
  },
  {
    name: 'Barney Rubble',
    location: 'Bedrock',
    alive: true,
    age: 48,
    occupation: 'Caveman',
    duties: ['Works on rocks', 'Watch Bamm-Bamm'],
  },
  {
    name: 'Pebbles Flintstone',
    location: 'Bedrock',
    alive: true,
    age: 1,
    occupation: 'Infant',
    duties: ['Be cute', 'Require constant attention'],
  },
  {
    name: 'Luke Skywalker',
    location: 'Tatooine',
    alive: true,
    age: 20,
    occupation: 'Field hand',
    duties: ['Fix droids', 'Learn lightsaber'],
  },
  {
    name: 'Leia Skywalker',
    location: 'Tatooine',
    alive: true,
    age: 20,
    occupation: 'Rebel Leader',
    duties: ['Plan attacks'],
  },
  {
    // This name is in lower case on purpose, to verify sorting is case-insensitive
    name: 'anakin skywalker',
    location: 'Tatooine',
    alive: false,
    age: 50,
    occupation: 'Sith Lord',
    duties: ['Obey the emperor', 'Crush the rebels'],
  },
];

export const petRows: Row[] = [
  {
    name: 'BB-8',
    location: 'Millennium Falcon',
    alive: true,
    age: 2,
    occupation: 'Astromech Droid',
    duties: ['Fixes starfighters', 'Motivates merchandise purchases'],
  },
  {
    name: 'Dino',
    location: 'Bedrock',
    alive: true,
    age: 4,
    occupation: 'Snorkasaurus',
    duties: ['Pet'],
  },
];

const rowsWithId = rows.map((row, index) => ({ id: index, ...row }));

export const locationOptions = [
  {
    id: '1',
    label: 'Bedrock',
  },
  {
    id: '2',
    label: 'Tatooine',
  },
];

const paginatedData = (filteredData: Row[], args: any) => {
  const iterationLength = args.offset + args.limit;
  const length = iterationLength < rowsWithId.length ? iterationLength : filteredData.length;
  return { rows: filteredData.slice(args.offset, length), totalItemsCount: filteredData.length };
};

export const resolvers = addDelayToResolvers(
  {
    Query: {
      dataTableGqlQuery: (root: any, args: any) => {
        const isSortingNeeded = args.order_by && args.order_by[0];
        if (Object.keys(args.filter).length === 0 && !isSortingNeeded) {
          return paginatedData(rowsWithId, args);
        }
        let filteredData = rowsWithId;
        if (args.filter.locations) {
          const labels = locationOptions
            .filter(option => args.filter.locations.includes(option.id))
            .map(option => option.label);
          filteredData = filteredData.filter((data: any) => labels.includes(data['location']));
        }
        if (args.filter.name) {
          filteredData = filteredData.filter(data => data.name.toLowerCase().includes(args.filter.name.toLowerCase()));
        }

        if (!args.order_by || !args.order_by.length) {
          return paginatedData(filteredData, args);
        }

        let sortedData = filteredData;
        if (args.order_by.includes('name') || args.order_by.includes('-name')) {
          const sortData = sortBy(sortedData, data => data.name);
          sortedData = args.order_by.includes('name') ? sortData : sortData.reverse();
        }
        if (args.order_by.includes('age') || args.order_by.includes('-age')) {
          const sortData = sortBy(sortedData, data => data.age);
          sortedData = args.order_by.includes('age') ? sortData : sortData.reverse();
        }
        if (args.order_by.includes('location') || args.order_by.includes('-location')) {
          const sortData = sortBy(sortedData, data => data.location);
          sortedData = args.order_by.includes('location') ? sortData : sortData.reverse();
        }
        return paginatedData(sortedData, args);
      },
    },
  },
  500,
);
