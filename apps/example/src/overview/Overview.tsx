import React, { Component } from 'react';
import gql from 'graphql-tag';

import { Box } from 'zbase';
import { OverviewLayout } from 'z-frontend-layout';
import { Query } from 'z-frontend-network';
import { Button, EmptyState, Link } from 'z-frontend-elements';
import { Card } from 'z-frontend-composites';
import { withErrorBoundary } from 'z-frontend-app-bootstrap';

import { OverviewPageQuery } from '../gqlTypes';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import { getMockedObjects } from '../mockedBackend';

type OverviewPageProps = {};

class OverviewPage extends Component<OverviewPageProps> {
  render() {
    return (
      <Query<OverviewPageQuery.Query> query={overviewPageQuery}>
        {({ data, loading }) => {
          // real app would use data
          const recentObjects = getMockedObjects().slice(0, 2);

          return (
            <OverviewLayout
              isHeroLoading={loading}
              heroTitle="Example App"
              heroSubtitle="A basic starter app to get you started."
              heroRender={() => (
                <Button.RouteLink mode="primary" to="/objects/new">
                  Add Object
                </Button.RouteLink>
              )}
              mainRender={() => (
                <>
                  <Card>
                    <Card.Header>Featured Objects</Card.Header>
                    {!recentObjects.length && <EmptyState message="No featured objects yet." />}
                    {recentObjects.map(object => (
                      <Card.Row py={4} key={object.id}>
                        <Link to={`/objects/${object.id}/edit`}>{object.name}</Link>
                      </Card.Row>
                    ))}
                  </Card>
                  <Card>
                    <Card.Header>Companies</Card.Header>
                    <Card.Row>
                      <Link to="/company/1">Company 1</Link>
                    </Card.Row>
                  </Card>
                </>
              )}
              sideRender={() => (
                <Box>
                  <FrequentlyAskedQuestions />
                </Box>
              )}
            />
          );
        }}
      </Query>
    );
  }
}

const overviewPageQuery = gql`
  query OverviewPageQuery {
    # dashboard query here just a placeholder
    dashboard {
      id
      employee {
        id
      }
    }
  }
`;

export default withErrorBoundary()(OverviewPage);
