import React from 'react';
import gql from 'graphql-tag';

import { Box, Flex } from 'zbase';
import { LoadingSpinner } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import Query from './Query';

const exampleQuery = gql`
  query ExampleQuery {
    currentZenefitsEmployee {
      user {
        first_name
        last_name
      }
    }
  }
`;

storiesOf('layout|Query', module)
  .addDecorator((getStory: Function) => (
    <Flex p={20} w={[1, 1 / 2]}>
      {getStory()}
    </Flex>
  ))
  .add('default', () => (
    <Query query={exampleQuery}>
      {({ data }) => {
        return <Box>Loaded Data: {JSON.stringify(data)}</Box>;
      }}
    </Query>
  ))
  .add('handle loading manually', () => (
    <Query query={exampleQuery} handleGraphqlProgress={false}>
      {({ data, loading, error }) => {
        const shouldRenderData = !loading && !error;
        return (
          <Flex direction="column">
            <Box> Show this block always </Box>
            {loading && <LoadingSpinner s="large" />}
            {error && <Box>{error.message}</Box>}
            {shouldRenderData && <Box>Loaded Data: {JSON.stringify(data)}</Box>}
          </Flex>
        );
      }}
    </Query>
  ))
  .add('skip query', () => (
    <Query query={exampleQuery} skip>
      {() => {
        return <Box>Content</Box>;
      }}
    </Query>
  ));
