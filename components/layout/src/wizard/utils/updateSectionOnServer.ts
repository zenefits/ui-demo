import gql from 'graphql-tag';

import { getApollo } from 'z-frontend-app-bootstrap';

import { FlowSectionUpdate, UpdateFlowSection, WizardServerState, WizardStep } from '../types';
import { isWizardStepMatchingServerStep } from './namePathUtils';

export default async function updateSectionOnServer(params: {
  serverState: WizardServerState;
  step: WizardStep;
  update: FlowSectionUpdate;
}) {
  const { serverState, step, update } = params;

  const flowSection = serverState.sections.find(s => isWizardStepMatchingServerStep(step, s));

  // if (update.isEntered && update.isComplete === undefined && flowSection.isEntered) {
  //   return;
  // }

  // if (update.isComplete && update.isEntered === undefined && flowSection.isComplete) {
  //   return;
  // }

  await getApollo().mutate({
    mutation: gql`
      mutation UpdateFlowSection($flowSectionId: ID!, $flowSectionUpdate: FlowSectionUpdate!) {
        updateFlowSection(flowSectionId: $flowSectionId, flowSectionUpdate: $flowSectionUpdate) {
          id
        }
      }
    `,
    variables: {
      flowSectionId: flowSection.id,
      flowSectionUpdate: update,
    } as UpdateFlowSection.Variables,
  });
}
