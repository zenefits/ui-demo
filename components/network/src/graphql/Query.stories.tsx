import React, { Component } from 'react';
import gql from 'graphql-tag';
import { QueryResult } from 'react-apollo';
import { MockedProvider } from '@apollo/react-testing';

import { Box, Flex } from 'zbase';
import { EmptyState, LoadingSpinner } from 'z-frontend-elements';
import { paddedBox, Example } from 'z-frontend-storybook-config';

import { storiesOf } from '../../.storybook/storyHelpers';
import Query from './Query';

const queryWithSuccess = gql`
  query ExampleQuery {
    hero {
      firstName
      lastName
    }
  }
`;

const queryWithError = gql`
  query ExampleQuery2 {
    fooBar {
      foo
    }
  }
`;

const mocks = [
  {
    request: {
      query: queryWithSuccess,
      variables: {},
    },
    result: {
      data: {
        hero: {
          firstName: 'Inigo',
          lastName: 'Montoya',
        },
      },
    },
  },
  {
    request: {
      query: queryWithError,
      variables: {},
    },
    error: new Error('intentional error'),
  },
];

class ExampleBody extends Component<{ result: QueryResult<any> }> {
  render() {
    const { loading, data } = this.props.result;
    return (
      <Flex direction="column">
        <Box>Content</Box>
        {/* NOTE: would typically only specify loading state when handleLoading is false */}
        {loading && <LoadingSpinner s="large" />}
        {!loading && data && (
          <Box>
            Loaded data: <pre>{JSON.stringify(data, null, 2)}</pre>
          </Box>
        )}
      </Flex>
    );
  }
}
const mockProps = {
  mocks,
  addTypename: false,
};

storiesOf('network|Query', module)
  .addDecorator(paddedBox)
  .add('default', () => (
    <MockedProvider {...mockProps}>
      <Query query={queryWithSuccess}>
        {({ data }) => {
          return (
            <Box>
              Loaded data: <pre>{JSON.stringify(data, null, 2)}</pre>
            </Box>
          );
        }}
      </Query>
    </MockedProvider>
  ))
  .add('states', () => (
    <MockedProvider {...mockProps}>
      <>
        <Example label="Success">
          <Query query={queryWithSuccess}>{props => <ExampleBody result={props} />}</Query>
        </Example>
        <Example label="Success with manual loading">
          <Query query={queryWithSuccess} handleLoading={false}>
            {props => <ExampleBody result={props} />}
          </Query>
        </Example>
        <Example label="Error">
          <Query query={queryWithError}>{props => <ExampleBody result={props} />}</Query>
        </Example>
        <Example label="Error with manual handleError">
          <Query query={queryWithError} handleError={false}>
            {props => (props.error ? <>Error</> : <ExampleBody result={props} />)}
          </Query>
        </Example>
        <Example label="Error with empty renderError">
          <Query
            query={queryWithError}
            renderError={() => null} // do not show any message
          >
            {props => <ExampleBody result={props} />}
          </Query>
        </Example>
        <Example label="Error with pretty renderError">
          <Query query={queryWithError} renderError={() => <EmptyState />}>
            {props => <ExampleBody result={props} />}
          </Query>
        </Example>
        <Example label="Skip query">
          <Query query={queryWithSuccess} skip>
            {props => <ExampleBody result={props} />}
          </Query>
        </Example>
      </>
    </MockedProvider>
  ));
