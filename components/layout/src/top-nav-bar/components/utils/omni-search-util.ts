import gql from 'graphql-tag';

import { getApollo } from 'z-frontend-app-bootstrap';

import { OmniSearchDashboardQuery } from '../../../gqlTypes';

const omniSearchDashboardQuery = gql`
  query OmniSearchDashboardQuery {
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

let data: OmniSearchDashboardQuery.Dashboard;

export async function getDashboardData(): Promise<OmniSearchDashboardQuery.Dashboard> {
  if (!data) {
    const response = await getApollo().query<OmniSearchDashboardQuery.Query>({
      query: omniSearchDashboardQuery,
    });
    data = response.data.dashboard;
  }
  return data;
}
