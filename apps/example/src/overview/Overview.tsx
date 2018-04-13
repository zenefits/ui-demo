import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql, ChildDataProps } from 'react-apollo';

import { Box, Flex, Heading } from 'zbase';
import { withGraphqlProgress } from 'z-frontend-layout';
import { Link } from 'z-frontend-forms';

import { OverviewPageQuery } from '../gqlTypes';

interface Props {}

type AllProps = ChildDataProps<Props, OverviewPageQuery.Query, OverviewPageQuery.Variables>;

class OverviewPage extends Component<AllProps> {
  render() {
    const article1 = 222;
    const article2 = 333;
    return (
      <Flex column>
        <Heading level={2}>Overview page</Heading>
        <Flex column>
          <Box mb={3}>
            <Link to={`/articles/${article1}`}>Article 1</Link>
          </Box>
          <Box mb={3}>
            <Link to={`/articles/${article2}`}>Article 2</Link>
          </Box>
        </Flex>
      </Flex>
    );
  }
}

const overviewPageQuery = gql`
  query overviewPageQuery {
    allFilms {
      edges {
        node {
          title
        }
      }
    }
  }
`;

export default compose(
  graphql<Props, OverviewPageQuery.Query, OverviewPageQuery.Variables>(overviewPageQuery),
  withGraphqlProgress(),
)(OverviewPage);
