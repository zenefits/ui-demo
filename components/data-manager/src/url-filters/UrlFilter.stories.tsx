import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import { Box, Flex, TextInline } from 'zbase';
import { List } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import DataFilter from '../filter/DataFilter';
import { departmentOptions, locationOptions, resolvers, EmployeeMock as Employee } from './UrlFiltersGraphqlMock';
import GraphqlDataManager from '../GraphqlDataManager';
import UrlQueryParamsManager from '../UrlQueryParamsManager';

// @ts-ignore
const FilterType = `
  input Filter {
  department: [String]
  checkbox_location: [String]
  name: String
  hired_after: String
  hired_before: String
}`;

export const urlFiltersMockQuery = gql`
  query urlFiltersMockQuery($offset: Int!, $limit: Int!, $filter: Filter) {
    urlFiltersMockQuery(offset: $offset, limit: $limit, filter: $filter) @client {
      id
      name
      type
      department
      location
      status
      title
      dateHire
    }
  }
`;

interface QueryResult {
  urlFiltersMockQuery: Employee[];
}

export class FilterResults extends Component<{ results: Employee[] }> {
  render() {
    return (
      <>
        <TextInline>Results:</TextInline>
        <List itemStyle="disc">
          {this.props.results.map(a => (
            <List.Item key={a.id} data-testid="filter-result">
              {a.name}
            </List.Item>
          ))}
        </List>
      </>
    );
  }
}

storiesOf('data-manager|UrlFilters', module)
  .addDecorator((getStory: Function) => (
    <Box p={20} w={[1, 900]} bg="grayscale.white">
      {getStory()}
    </Box>
  ))
  .add('default', () => <UrlFiltersDefaultExample />);

export const UrlFiltersDefaultExample: React.FunctionComponent = () => (
  <GraphqlDataManagerWrapper>
    <UrlFilters />
  </GraphqlDataManagerWrapper>
);

export const UrlFilters: React.FunctionComponent = () => (
  <DataFilter.Section label="Employee">
    <DataFilter.UrlFilterText label="Name" filterName="name" placeholder="Search by employee name" />
    <DataFilter.UrlFilterMultiSelect
      label="Select Departments"
      filterName="departments"
      options={departmentOptions}
      placeholder="Select Departments"
    />
    <DataFilter.UrlFilterCheckboxGroup
      label="Select Locations"
      options={locationOptions}
      filterName="checkbox_location"
    />
    <DataFilter.UrlFilterDateRange label="Hired" filterName="hired" />
  </DataFilter.Section>
);

const RouteInfo = withRouter<{}>((props: RouteComponentProps<{}>) => (
  <Box mt={3}>location.search: {props.location.search}</Box>
));

export const GraphqlDataManagerWrapper: React.FunctionComponent = props => (
  <MockedProvider addTypename={false} resolvers={resolvers}>
    <UrlQueryParamsManager>
      <GraphqlDataManager<QueryResult, {}>
        query={urlFiltersMockQuery}
        queryOptions={{
          fetchPolicy: 'cache-and-network',
        }}
      >
        {({ data }) => {
          const { urlFiltersMockQuery } = data;
          return (
            <>
              <Flex>
                <Box w={2 / 4}>{props.children}</Box>
                <Box w={2 / 4} ml={5}>
                  <FilterResults results={urlFiltersMockQuery} />
                </Box>
              </Flex>
              <RouteInfo />
            </>
          );
        }}
      </GraphqlDataManager>
    </UrlQueryParamsManager>
  </MockedProvider>
);
