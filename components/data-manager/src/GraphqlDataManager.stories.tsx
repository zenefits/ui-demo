import React from 'react';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import { Box, Flex, Heading } from 'zbase';
import { Button, List } from 'z-frontend-elements';

import { EmployeeType } from './DataManager.stories';
import { storiesOf } from '../.storybook/storyHelpers';
import UrlQueryParamsManager, { UrlQueryParamsContext } from './UrlQueryParamsManager';
import GraphqlDataManager from './GraphqlDataManager';
import { departmentOptions, resolvers } from './GraphqlDataManagerMock';
import UrlFilterText from './url-filters/UrlFilterText';
import UrlFilterSelect from './url-filters/UrlFilterSelect';
import UrlPager from './url-filters/UrlPager';
import { getFieldSortedStatus, getNewOrderBy, transformFiltersToUrlFormat } from './url-filters/urlFilterUtils';

storiesOf('data-manager|GraphqlDataManager', module)
  .add('default', () => <NoFilterExample />)
  .add('with Pagination', () => <NoFilterExample withPagination />)
  .add('Custom Page Size', () => <PaginationExample />)
  .add('Text Filter', () => <TextFilterExample />)
  .add('Select Filter', () => <SelectFilterExample />)
  .add('Sorting', () => <SortingExample />);
interface QueryResult {
  gqlDataManagerMockQuery: {
    employees: EmployeeType[];
    totalItemsCount: number;
  };
}
// @ts-ignore
const FilterType = `
   input Filter {
     name: string
     department: [String]
   }
`;

const gqlDataManagerMockQuery = gql`
  # Use order_by to match tastypie style
  query gqlDataManagerMockQuery($offset: Int!, $limit: Int!, $filter: Filter, $order_by: [String!]) {
    gqlDataManagerMockQuery(offset: $offset, limit: $limit, filter: $filter, order_by: $order_by) @client {
      employees {
        id
        name
        department
        company
      }
      # totalItemsCount is needed for pagination eg: ( 1 to 5) of 7 .
      # here '7' is the totalCount .
      totalItemsCount
    }
  }
`;

export const RouteInfo = withRouter<{}>((props: RouteComponentProps<{}>) => (
  <Box mt={3} mb={10}>
    location.search: {props.location.search}
  </Box>
));

const FilterResults: React.FunctionComponent<{ employees: EmployeeType[] }> = ({ employees }) => {
  return (
    <List itemStyle="disc">
      {employees.map(a => (
        <List.Item key={a.id}>
          {a.name} (Dept: <i>{a.department}</i>)
        </List.Item>
      ))}
    </List>
  );
};

const NoFilterExample: React.FunctionComponent<{ withPagination?: boolean }> = ({ withPagination }) => {
  return (
    <MockedProvider addTypename={false} resolvers={resolvers}>
      <UrlQueryParamsManager>
        <Flex direction="column">
          <Heading w={1 / 2} level={3}>
            Default - {withPagination ? 'with Pagination' : 'without Pagination renders first 25'}
          </Heading>
          <RouteInfo />
        </Flex>
        <GraphqlDataManager<QueryResult, {}>
          query={gqlDataManagerMockQuery}
          queryOptions={{
            fetchPolicy: 'cache-and-network',
          }}
        >
          {({ data }) => {
            const { employees, totalItemsCount } = data.gqlDataManagerMockQuery;
            return (
              <>
                <FilterResults employees={employees} />
                {withPagination && <UrlPager totalItemsCount={totalItemsCount} />}
              </>
            );
          }}
        </GraphqlDataManager>
      </UrlQueryParamsManager>
    </MockedProvider>
  );
};

const TextFilterExample: React.FunctionComponent = () => {
  return (
    <MockedProvider addTypename={false} resolvers={resolvers}>
      <UrlQueryParamsManager defaults={transformFiltersToUrlFormat({ name: 'er' })}>
        {/* Note: provide the defaults for any UrlFilter* as its done above
             transformFiltersToUrlFormat({filterName: defaultValue })
         */}
        <Flex direction="column">
          <Heading w={1 / 2} level={3}>
            Search Names
          </Heading>
          <RouteInfo />
        </Flex>
        <Box w={600}>
          <UrlFilterText filterName="name" format="form-row" label="Employee Name" />
        </Box>
        <GraphqlDataManager<QueryResult, {}>
          query={gqlDataManagerMockQuery}
          queryOptions={{
            fetchPolicy: 'cache-and-network',
          }}
        >
          {({ data }) => {
            const { employees, totalItemsCount } = data.gqlDataManagerMockQuery;
            return (
              <>
                <FilterResults employees={employees} />
                <UrlPager totalItemsCount={totalItemsCount} />
              </>
            );
          }}
        </GraphqlDataManager>
      </UrlQueryParamsManager>
    </MockedProvider>
  );
};

const SelectFilterExample: React.FunctionComponent = () => {
  return (
    <MockedProvider addTypename={false} resolvers={resolvers}>
      <UrlQueryParamsManager defaults={transformFiltersToUrlFormat({ department: [1] })} numberKeys={['department']}>
        <Flex direction="column">
          <Heading w={1 / 2} level={3}>
            Select Filter
          </Heading>
          <RouteInfo />
        </Flex>
        <Box w={600}>
          <UrlFilterSelect label="Departments" format="form-row" filterName="department" options={departmentOptions} />
        </Box>
        <GraphqlDataManager<QueryResult, {}>
          query={gqlDataManagerMockQuery}
          queryOptions={{
            fetchPolicy: 'cache-and-network',
          }}
        >
          {({ data }) => {
            const { employees, totalItemsCount } = data.gqlDataManagerMockQuery;
            return (
              <>
                <FilterResults employees={employees} />
                <UrlPager totalItemsCount={totalItemsCount} />
              </>
            );
          }}
        </GraphqlDataManager>
      </UrlQueryParamsManager>
    </MockedProvider>
  );
};

const PaginationExample: React.FunctionComponent = () => {
  return (
    <MockedProvider addTypename={false} resolvers={resolvers}>
      <UrlQueryParamsManager defaults={{ pageSize: 10 }}>
        <Flex direction="column">
          <Heading w={1 / 2} level={3}>
            Pagination with pagesize 10
          </Heading>
          <RouteInfo />
        </Flex>
        <GraphqlDataManager<QueryResult, {}, EmployeeType[]>
          query={gqlDataManagerMockQuery}
          queryOptions={{
            fetchPolicy: 'cache-and-network',
          }}
          processData={data => {
            const { employees, totalItemsCount } = data.gqlDataManagerMockQuery;
            return { totalItemsCount, processedData: employees };
          }}
        >
          {({ data: employees, totalItemsCount }) => {
            // Note: totalItemsCount will be null here if the processData does not return a totalItemsCount
            return (
              <>
                <FilterResults employees={employees} />
                <UrlPager totalItemsCount={totalItemsCount} />
              </>
            );
          }}
        </GraphqlDataManager>
      </UrlQueryParamsManager>
    </MockedProvider>
  );
};

export const SortButton: React.FunctionComponent = () => {
  return (
    <UrlQueryParamsContext.Consumer>
      {({ queryParams, updateQueryParams }) => {
        const newOrderBy = getNewOrderBy(queryParams, 'name');
        const { sorted, direction } = getFieldSortedStatus(queryParams, 'name');

        return (
          <Flex>
            <Button m={2} mode="primary" onClick={() => updateQueryParams({ order_by: newOrderBy, currentPage: 1 })}>
              Sort by name
            </Button>
            {sorted && <Flex align="center">Sorted: {direction === 'asc' ? 'Ascending' : 'Descending'}</Flex>}
          </Flex>
        );
      }}
    </UrlQueryParamsContext.Consumer>
  );
};

const SortingExample: React.FunctionComponent = () => {
  return (
    <>
      <RouteInfo />
      <MockedProvider addTypename={false} resolvers={resolvers}>
        <UrlQueryParamsManager defaults={{ pageSize: 10 }}>
          <SortButton />
          <GraphqlDataManager<QueryResult, {}>
            query={gqlDataManagerMockQuery}
            queryOptions={{
              fetchPolicy: 'cache-and-network',
            }}
          >
            {({ data }) => {
              const { employees, totalItemsCount } = data.gqlDataManagerMockQuery;
              return (
                <>
                  <FilterResults employees={employees} />
                  <UrlPager totalItemsCount={totalItemsCount} />
                </>
              );
            }}
          </GraphqlDataManager>
        </UrlQueryParamsManager>
      </MockedProvider>
    </>
  );
};
