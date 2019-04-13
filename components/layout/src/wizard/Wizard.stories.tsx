import React, { Component } from 'react';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import { cloneDeep } from 'lodash';

import { Box, Heading } from 'zbase';
import { Button, Link } from 'z-frontend-elements';
import { getApollo } from 'z-frontend-app-bootstrap';

import { Query, Wizard, WizardFlowFragment, WizardSection, WizardStepComponentProps } from '../../index';

import { storiesOf } from '../../.storybook/storyHelpers';

import getFakeStepForStory from './getFakeStepForStory';
import { WizardStepWithComponent } from './types';

// Setup steps
const sectionsConfig: WizardSection[] = [
  {
    title: 'User Info',
    path: '/user',
    steps: [
      {
        name: 'my_flow.user.info',
        title: 'User credentials',
        longTitle: 'Add new user credentials',
        path: '/credentials',
        component: getFakeStepForStory(),
      },
      {
        name: 'my_flow.user.address',
        title: 'Address',
        longTitle: `New user's address`,
        path: '/address',
        component: getFakeStepForStory(),
      },
    ],
  },
  {
    title: 'Car Info',
    path: '/car',
    steps: [
      {
        name: 'my_flow.car.brand',
        title: 'Car Brand',
        path: '/brand',
        component: getFakeStepForStory(),
      },
      {
        name: 'my_flow.car.model',
        title: 'Car Model',
        path: '/model',
        component: getFakeStepForStory(),
      },
    ],
  },
];

const addFamilyStepMutation = gql`
  mutation AddFamilyStep($familySize: Int!) {
    addFamilyStep(familySize: $familySize)
  }
`;

const sectionConfigGenerator = (flowSections: WizardFlowFragment.Sections[]): WizardSection[] => {
  const configs = cloneDeep(sectionsConfig);
  configs[0].steps[0].dispatcherArgs = '1';
  configs[0].steps[0].component = getFakeStepForStory({
    beforeNext: async () => {
      await getApollo().mutate({ mutation: addFamilyStepMutation, variables: { familySize: 10 } });
    },
  });
  if (flowSections.find(section => section.name === 'my_flow.user.family')) {
    configs[0].steps.push({
      name: 'my_flow.user.family',
      title: 'Family',
      longTitle: `New user's family`,
      path: '/family',
      component: getFakeStepForStory(),
    } as WizardStepWithComponent);
  }
  return configs;
};

type EnrollmentFlowQueryResult = {
  enrollmentFlow: {
    id: string;
  };
};
const flowQuery = gql`
  query EnrollmentFlowQuery {
    enrollmentFlow {
      id
    }
  }
`;

const RouteInfo = withRouter<{}>((props: RouteComponentProps<{}>) => <Box>{props.location.pathname}</Box>);

storiesOf('layout|Wizard', module)
  .add('server side state', () => (
    <Box>
      <Link to="/" mr={3}>
        Home
      </Link>
      <Link to="/test">Open the wizard</Link>
      <RouteInfo />

      <Route
        path="/test"
        render={() => (
          <Query<EnrollmentFlowQueryResult> query={flowQuery}>
            {({ data }) => (
              <Wizard
                wizardPath="/test"
                withServerState
                flowId={data.enrollmentFlow.id}
                sequenceEnforced
                initialSectionsConfig={sectionsConfig}
                errorText=""
                transitionToOnComplete="/signature"
              />
            )}
          </Query>
        )}
      />
    </Box>
  ))
  .add('client side state (sequenceEnforced = true)', () => (
    <Box>
      <Link to="/" mr={3}>
        Home
      </Link>
      <Link to="/test">Open client-side-only wizard (sequenceEnforced=true)</Link>
      <RouteInfo />

      <Route
        path="/test"
        render={() => (
          <Query<EnrollmentFlowQueryResult> query={flowQuery}>
            {({ data }) => (
              <Wizard
                wizardPath="/test"
                sequenceEnforced
                initialSectionsConfig={sectionsConfig}
                errorText=""
                transitionToOnComplete="/signature"
              />
            )}
          </Query>
        )}
      />
    </Box>
  ))
  .add('client side state (sequenceEnforced = false)', () => (
    <Box>
      <Link to="/" mr={3}>
        Home
      </Link>
      <Link to="/test">Open client-side-only wizard (sequenceEnforced=false)</Link>
      <RouteInfo />

      <Route
        path="/test"
        render={() => (
          <Query<EnrollmentFlowQueryResult> query={flowQuery}>
            {() => (
              <Wizard
                wizardPath="/test"
                initialSectionsConfig={sectionsConfig}
                errorText=""
                transitionToOnComplete="/signature"
              />
            )}
          </Query>
        )}
      />
    </Box>
  ))
  .add('steps with child routes', () => {
    class CredentialStepMainContent extends Component<WizardStepComponentProps> {
      render() {
        return (
          <Box>
            <Heading level={3}>Main page</Heading>

            <Link to="/test/user/credentials/page1" mr={3}>
              Go back to page 1
            </Link>
            <Link to="/test/user/credentials/page2">Go back to page 2</Link>

            <Box>
              <Button onClick={this.props.saveAndContinue} mr={2}>
                Save and Continue
              </Button>
              <Button onClick={this.props.goToPreviousStep}>Back</Button>
            </Box>
          </Box>
        );
      }
    }

    class CredentialPageWithChildRoutes extends Component<WizardStepComponentProps> {
      render() {
        return (
          <>
            <Heading level={2}>STEP: {this.props.step.title}</Heading>

            <Route
              path="/test/user/credentials/page1"
              render={() => (
                <Box>
                  <Link to="/test/user/credentials" mr={3}>
                    Go back to main page
                  </Link>
                  <Link to="/test/user/credentials/page2">Go back to page 2</Link>
                </Box>
              )}
            />

            <Route
              path="/test/user/credentials/page2"
              render={() => (
                <Box>
                  <Link to="/test/user/credentials" mr={3}>
                    Go back to main page
                  </Link>
                  <Link to="/test/user/credentials/page1">Go back to page 1</Link>
                </Box>
              )}
            />

            <Route path="/test/user/credentials" exact render={() => <CredentialStepMainContent {...this.props} />} />
          </>
        );
      }
    }

    const sectionConfigClone = [...sectionsConfig];

    sectionConfigClone[0] = {
      ...sectionConfigClone[0],
      steps: [
        {
          ...sectionConfigClone[0].steps[0],
          component: CredentialPageWithChildRoutes,
        },
        ...sectionConfigClone[0].steps.slice(1),
      ],
    };

    return (
      <Box>
        <Link to="/" mr={3}>
          Home
        </Link>
        <Link to="/test">Open wizard (steps with child routes)</Link>
        <RouteInfo />

        <Route
          path="/test"
          render={() => (
            <Query<EnrollmentFlowQueryResult> query={flowQuery}>
              {({ data }) => (
                <Wizard
                  wizardPath="/test"
                  withServerState
                  flowId={data.enrollmentFlow.id}
                  initialSectionsConfig={sectionConfigClone}
                  errorText=""
                  transitionToOnComplete="/signature"
                />
              )}
            </Query>
          )}
        />
      </Box>
    );
  })
  .add('dynamic flow model', () => {
    const sectionConfigClone = cloneDeep(sectionsConfig);

    sectionConfigClone[0].steps.splice(1, 0, {
      name: 'my_flow.user.extra',
      title: 'User Extra',
      longTitle: 'Add more user data',
      path: '/extra',
      component: getFakeStepForStory(),
    });

    type DynamicFlowQueryResult = {
      dynamicFlow: {
        id: string;
      };
    };
    const flowQuery = gql`
      query DynamicFlowQuery {
        dynamicFlow {
          id
        }
      }
    `;

    return (
      <Box>
        <Link to="/" mr={3}>
          Home
        </Link>
        <Link to="/test">Open wizard (dynamic flow model)</Link>
        <RouteInfo />

        <Route
          path="/test"
          render={() => (
            <Query<DynamicFlowQueryResult> query={flowQuery}>
              {({ data }) => (
                <Wizard
                  wizardPath="/test"
                  withServerState
                  flowId={data.dynamicFlow.id}
                  initialSectionsConfig={sectionConfigClone}
                  errorText=""
                  transitionToOnComplete="/signature"
                />
              )}
            </Query>
          )}
        />
      </Box>
    );
  })
  .add('sync steps from server', () => {
    type FlowWithMatchingNamesQueryResult = {
      flowWithMatchingNames: {
        id: string;
      };
    };
    const flowQuery = gql`
      query DynamicFlowQuery {
        flowWithMatchingNames {
          id
        }
      }
    `;

    return (
      <Box>
        <Link to="/" mr={3}>
          Home
        </Link>
        <Link to="/test">Open wizard (add a new family step from server)</Link>
        <RouteInfo />

        <Route
          path="/test"
          render={() => (
            <Query<FlowWithMatchingNamesQueryResult> query={flowQuery}>
              {({ data }) => (
                <Wizard
                  wizardPath="/test"
                  withServerState
                  flowId={data.flowWithMatchingNames.id}
                  initialSectionsConfig={[]}
                  sectionsConfigGenerator={sectionConfigGenerator}
                  errorText=""
                  transitionToOnComplete="/signature"
                />
              )}
            </Query>
          )}
        />
      </Box>
    );
  });
