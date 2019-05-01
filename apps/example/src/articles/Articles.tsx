import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql, ChildDataProps } from 'react-apollo';

import { Box, Flex, Heading, TextBlock } from 'zbase';
import { withGraphqlProgress } from 'z-frontend-layout';
import { Link } from 'z-frontend-elements';

import { ArticlesQuery } from '../gqlTypes';

interface Props {}

type AllProps = ChildDataProps<Props, ArticlesQuery.Query, ArticlesQuery.Variables>;

class ArticlesPage extends Component<AllProps> {
  render() {
    const { dashboard } = this.props.data;
    const article1 = 222;
    const article2 = 333;
    return (
      <Flex column>
        <Heading level={2}>Articles</Heading>
        <TextBlock mb={3}>employee id: {dashboard.employee.id}</TextBlock>
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

const articlesQuery = gql`
  query ArticlesQuery {
    # this is how the query could look like
    #
    # articles {
    #   id
    #   name
    #   createdAt
    # }

    # dashboard query here just a placeholder
    dashboard {
      id
      employee {
        id
      }
    }
  }
`;

export default compose(
  graphql<Props, ArticlesQuery.Query, ArticlesQuery.Variables>(articlesQuery),
  withGraphqlProgress(),
)(ArticlesPage);
