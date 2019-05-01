import React, { Component } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';

import OmniSearchForm from './OmniSearchForm';
import Query from '../../graphql/Query';
import { OmniSearchQueryResult } from '../types';

const omniSearchQuery = gql`
  query OmniSearchQuery {
    dashboard {
      id
      switches
      isSpoofing
      employee {
        id
        allStatus
      }
      zAppInstallSubscriptions {
        id
        status
        inheritedStatus
        preferences
        appInstall {
          id
          status
          preferences
          app {
            id
            uniqueId
            appUrl
            role
            appIconSqUrl
            shortTitle
            status
            preferences
          }
        }
      }
    }
  }
`;

class OmniSearch extends Component<{}> {
  render() {
    return (
      <Query<OmniSearchQueryResult>
        query={omniSearchQuery}
        handleGraphqlProgress={false}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading, error }) => {
          if (error) {
            console.error('OmniSearchQuery error:', error);
            return null;
          }

          if (loading) {
            return null;
          }

          return <OmniSearchForm dashboardData={data.dashboard} />;
        }}
      </Query>
    );
  }
}

export default OmniSearch;
