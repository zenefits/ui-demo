import React, { Component, ComponentType } from 'react';
import gql from 'graphql-tag';

import { Box, Heading } from 'zbase';
import { Button, Link } from 'z-frontend-elements';
import { Mutation, Query } from 'z-frontend-network';

import { WizardStepComponentProps } from '../../index';
import { isWizardStepMatchingServerStep } from './utils/namePathUtils';

type GetFakeStepComponentParam = {
  renderContent?: (props: WizardStepComponentProps) => React.ReactNode;
  beforeNext?: (props: WizardStepComponentProps) => Promise<void>;
};

export default function getFakeStepComponent({
  renderContent,
  beforeNext,
}: GetFakeStepComponentParam = {}): ComponentType<WizardStepComponentProps> {
  const dashboardQuery = gql`
    query FakeQueryForWizardStep {
      dashboard {
        id
        employee {
          id
          first_name
        }
      }
    }
  `;

  const completeStepMutation = gql`
    mutation FakeUpdateFlowSection($flowSectionId: ID!, $flowSectionUpdate: FlowSectionUpdate!) {
      updateFlowSection(flowSectionId: $flowSectionId, flowSectionUpdate: $flowSectionUpdate) {
        id
      }
    }
  `;

  type FakeStepContentProps = WizardStepComponentProps & { saveStepData: any; queryData: any };

  class FakeStepContent extends Component<FakeStepContentProps, { loading: boolean }> {
    constructor(props: FakeStepContentProps) {
      super(props);
      this.state = {
        loading: false,
      };
    }

    saveStepAndGoNext = async () => {
      this.setState({ loading: true });
      if (this.props.serverState) {
        await this.props.saveStepData();
      } else {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      if (beforeNext) {
        await beforeNext(this.props);
      }
      await this.props.saveAndContinue();
    };

    render() {
      const { goToPreviousStep, step, queryData } = this.props;
      const { loading } = this.state;

      return (
        <Box>
          <Heading level={2}>
            STEP: {step.title} {queryData.dashboard.id}
          </Heading>

          <Link to="/test/user/sldfjsldkf">Wrong link</Link>

          <Box>{renderContent ? renderContent(this.props) : null}</Box>

          <Box>
            <Button inProgress={loading} disabled={loading} onClick={this.saveStepAndGoNext} mr={2}>
              Save and Continue
            </Button>
            <Button onClick={() => goToPreviousStep()}>Back</Button>
          </Box>
        </Box>
      );
    }
  }

  class FakeStep extends Component<WizardStepComponentProps> {
    render() {
      const { step, serverState } = this.props;
      return (
        <Query<any> query={dashboardQuery} fetchPolicy="network-only">
          {({ data }) => {
            return (
              <Mutation<any>
                mutation={completeStepMutation}
                variables={{
                  flowSectionId: serverState
                    ? serverState.sections.find(s => isWizardStepMatchingServerStep(step, s)).id
                    : '',
                  flowSectionUpdate: {
                    isComplete: true,
                    isEntered: true,
                  },
                }}
              >
                {(mutate, { loading }) => <FakeStepContent {...this.props} queryData={data} saveStepData={mutate} />}
              </Mutation>
            );
          }}
        </Query>
      );
    }
  }

  return FakeStep;
}
