import gql from 'graphql-tag';

import { getApollo } from './getApollo';
import loadWalkme, { WalkMeEnvironment } from './loadWalkme';
import { WalkmeCompanySetupQuery, WalkmeUserDataQuery } from './gqlTypes';
import { getEventLogger } from './event-logger';

declare global {
  interface Window {
    walkmeSettings: any;
  }
}

interface BootWalkmeArgs {
  userId: string;
}

const walkmeEnvironments: { [key: string]: WalkMeEnvironment } = {
  'secure.zenefits.com': 'production',
  'console.zenefits.com': 'production',
  default: 'test',
};

const companySetupQuery = gql`
  query WalkmeCompanySetupQuery {
    companySetupTasks {
      id
      isComplete
      name
    }
  }
`;

const userDataQuery = gql`
  query WalkmeUserDataQuery {
    dashboard {
      id
      isConsoleUser
      permission
      # Employee is query seems to be necessary for permission to be returned correctly
      employee {
        id
      }
    }
  }
`;

async function hasCompletedCompanySetup() {
  const result = await getApollo().query<WalkmeCompanySetupQuery.Query>({
    query: companySetupQuery,
  });
  const tasks = result.data && result.data.companySetupTasks;
  return !!tasks && !!tasks.length && !!tasks.every(task => !!task && !!task.isComplete);
}

async function queryUserData() {
  const result = await getApollo().query<WalkmeUserDataQuery.Query>({
    query: userDataQuery,
  });
  const permission = result.data && result.data.dashboard && result.data.dashboard.permission;
  return {
    isConsoleUser: result.data.dashboard && result.data.dashboard.isConsoleUser,
    isAdmin: permission && permission.isAdmin,
  };
}

export default async ({ userId }: BootWalkmeArgs) => {
  if (__DEVELOPMENT__ || window.__WITHIN_EMBER_APP__) {
    return;
  }

  try {
    // We do the console user check before segmentation since queries such as companySetupTasks will fail for console users without a company
    const { isConsoleUser, isAdmin } = await queryUserData();
    if (isConsoleUser) {
      return;
    }

    // Only admins can complete the checklist
    const hasCompletedOnboardingChecklist = isAdmin ? await hasCompletedCompanySetup() : false;

    const walkmeEnvironment = walkmeEnvironments[window.location.hostname] || walkmeEnvironments['default'];
    window.walkmeSettings = {
      userId,
      isAdmin,
      hasCompletedOnboardingChecklist,
    };

    await loadWalkme(walkmeEnvironment);
  } catch (err) {
    err.message = `Failed to load Walkme with error: ${err.message}`;
    getEventLogger().logError(err);
  }
};
