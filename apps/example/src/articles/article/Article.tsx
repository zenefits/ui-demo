import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql, ChildDataProps } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';

import { Box, Flex, Heading, P } from 'zbase';
import { withGraphqlProgress } from 'z-frontend-layout';
import { Link } from 'z-frontend-forms';

import { ArticleQuery } from '../../gqlTypes';

interface MatchProps {
  articleId: string;
}

type Props = RouteComponentProps<MatchProps> & {};

type AllProps = ChildDataProps<Props, ArticleQuery.Query, ArticleQuery.Variables>;

class OverviewPage extends Component<AllProps> {
  render() {
    const { articleId } = this.props.match.params;

    return (
      <Flex column>
        <Heading level={2}>View Article</Heading>
        <P mb={3}>current article id: {articleId}</P>
        <Flex column>
          <Box mb={3}>
            <Link to={`/articles/${articleId}/edit`}>Edit article #{articleId}</Link>
          </Box>
          <Box mb={3}>
            <Link to={`/articles/`}>Articles list</Link>
          </Box>
          <Box mb={3}>
            <Link to={`/overview/`}>Overview</Link>
          </Box>
        </Flex>
      </Flex>
    );
  }
}

const articleQuery = gql`
  query articleQuery($articleId: String!) {
    # this is how the query could look like
    #
    # article(articleId: $articleId) {
    #   id
    #   name
    #   createdAt
    # }

    # this query here just a placeholder
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
  graphql<Props, ArticleQuery.Query, ArticleQuery.Variables>(articleQuery, {
    options: props => ({
      variables: {
        articleId: props.match.params.articleId,
      },
    }),
  }),
  withGraphqlProgress(),
)(OverviewPage);
