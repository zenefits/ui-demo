import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { cleanup } from '@testing-library/react';
import gql from 'graphql-tag';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

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

describe('Query', () => {
  afterEach(cleanup);

  it('shows loading', () => {
    const { getByTestId } = renderWithContext(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Query query={queryWithSuccess}>{props => <div>Content</div>}</Query>
      </MockedProvider>,
    );
    getByTestId('GraphqlLoadingDisplay');
  });

  it('shows content on success', () => {
    const { getByText } = renderWithContext(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Query query={queryWithSuccess} handleLoading={false}>
          {props => <div>Content</div>}
        </Query>
      </MockedProvider>,
    );
    getByText('Content');
  });

  it('does not show content on error', () => {
    const { queryByText } = renderWithContext(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Query query={queryWithError}>{props => <div>Content</div>}</Query>
      </MockedProvider>,
    );
    expect(queryByText('Content')).toBeNull();
  });
});
