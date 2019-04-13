import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql, ChildDataProps } from 'react-apollo';

import { Box } from 'zbase';
import { withGraphqlProgress, OverviewLayout } from 'z-frontend-layout';
import { Button, Link } from 'z-frontend-elements';
import { Card } from 'z-frontend-composites';

import { OverviewPageQuery } from '../gqlTypes';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';

interface Props {}

type AllProps = ChildDataProps<Props, OverviewPageQuery.Query, OverviewPageQuery.Variables>;

class OverviewPage extends Component<AllProps> {
  render() {
    const article1 = 222;
    const article2 = 333;
    return (
      <OverviewLayout
        isHeroLoading={this.props.data.loading}
        heroTitle="Example App"
        heroSubtitle="Example App Sub Header"
        heroRender={() => (
          <Button.RouteLink mode="primary" to="/widgets/new">
            Create Widget
          </Button.RouteLink>
        )}
        mainRender={() => (
          <Card>
            <Card.Header>Recent Articles</Card.Header>
            <Card.Row>
              <Box mb={3}>
                <Link to={`/articles/${article1}`}>Article 1</Link>
              </Box>
              <Box mb={3}>
                <Link to={`/articles/${article2}`}>Article 2</Link>
              </Box>
            </Card.Row>
          </Card>
        )}
        sideRender={() => (
          <Box>
            <FrequentlyAskedQuestions />
          </Box>
        )}
      />
    );
  }
}

const overviewPageQuery = gql`
  query OverviewPageQuery {
    dashboard {
      id
      employee {
        id
      }
    }
  }
`;

export default compose(
  graphql<Props, OverviewPageQuery.Query, OverviewPageQuery.Variables>(overviewPageQuery),
  withGraphqlProgress(),
)(OverviewPage);
