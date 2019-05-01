/* tslint:disable */
import gql from 'graphql-tag';

// @ts-ignore
const queryToUpdate = gql`
  query ProfileQueryAppRoutes {
    dashboard {
      company {
        id
      }
      isConsoleUser
      isMTAPartnerUser
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
`;

// @ts-ignore
const queryToSkip = gql`
  query userQuery {
    user {
      id
      first_name
      last_name
      email
    }
  }
`;

// @ts-ignore
const queryWithExistingId = gql`
  query ProfileQueryAppRoutes {
    dashboard {
      id
      company {
        id
      }
      isConsoleUser
      isMTAPartnerUser
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
`;
