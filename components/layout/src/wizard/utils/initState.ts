import gql from 'graphql-tag';
import { matchPath } from 'react-router-dom';
import { cloneDeep, sortBy } from 'lodash';

import { getApollo } from 'z-frontend-app-bootstrap';

import {
  FlowQuery,
  WizardFlowFragment,
  WizardSection,
  WizardServerState,
  WizardState,
  WizardStep,
  WizardStepWithComponent,
} from '../types';
import sortSteps from './sortSteps';
import {
  checkStepsMatchPaths,
  getFullStepPath,
  getStepFullName,
  isWizardStepMatchingServerStep,
} from './namePathUtils';

export const wizardFlowFragment = gql`
  fragment WizardFlowFragment on Flow {
    id
    flowId: id
    isComplete
    isActive
    dispatcherArgs
    version_id
    resource_uri
    sections {
      id
      isReady
      isEntered
      isComplete
      isActive
      index
      name
      dispatcherArgs
      resource_uri
      errors {
        id
        code
        reasonCode
      }
    }
  }
`;

export const flowQuery = gql`
  query FlowQuery($flowId: ID!) {
    flow(id: $flowId) {
      ...WizardFlowFragment
    }
  }
  ${wizardFlowFragment}
`;

export default async function initState(params: {
  wizardPath: string;
  sectionsConfig: WizardSection[];
  flowId: string;
  sequenceEnforced: boolean;
  transitionToOnComplete: string;
  pathname: string;
  sectionsConfigGenerator?: (serverSections: WizardFlowFragment.Sections[]) => WizardSection[];
}) {
  const {
    wizardPath,
    sectionsConfig,
    flowId,
    sequenceEnforced,
    transitionToOnComplete,
    pathname,
    sectionsConfigGenerator,
  } = params;

  const withServerState = !!flowId;
  let flowDataModel: WizardServerState;
  let pathToPush;

  if (withServerState) {
    const result = await getApollo().query<FlowQuery.Query>({
      query: flowQuery,
      variables: { flowId },
      fetchPolicy: 'network-only',
    });

    flowDataModel = result.data.flow;

    // TODO load error models
    // const sectionsData = getApiDataFromState(getState(), 'flowSection').data;
    // flow.sections.map(sId => sectionsData[sId])
    // if (sectionsData && sectionsData.data) {

    // }
    // if (flow.errors && flow.errors.length > 0) {
    //   return dispatch(apiFind('flowError', flow.errors));
    // }
  }

  let sections = sectionsConfig.map(
    (sec, i) =>
      ({
        ...sec,
        isCurrent: false,
        isComplete: false,
        isEntered: false,
        isDisabled: sec.isDisabled !== undefined ? sec.isDisabled : sequenceEnforced && i !== 0,
        steps: sec.steps.map(
          (st, j) =>
            ({
              ...st,
              isCurrent: false,
              isComplete: false,
              isEntered: false,
              isDisabled: st.isDisabled !== undefined ? st.isDisabled : sequenceEnforced && (i !== 0 || j !== 0),
            } as WizardStep),
        ),
      } as WizardSection),
  );

  if (withServerState) {
    const flowSections = flowDataModel.sections || [];

    // const allFlowErrors = getApiDataFromState(getState(), 'flowError').data;
    // const flowErrors = (flow.errors || []).map(errorId => allFlowErrors[errorId]);
    if (sectionsConfigGenerator) {
      sections = cloneDeep(sectionsConfigGenerator(flowSections));
      sections.forEach(newSection => {
        const oldSection = sectionsConfig.find(s => s.path === newSection.path);
        if (oldSection) {
          newSection.steps.forEach(newStep => {
            const oldStep = oldSection.steps.find(s => checkStepsMatchPaths(s, newStep));
            if (!oldStep) {
              // add the new step to the configure
              oldSection.steps.push({ ...newStep });
            }
          });
        } else {
          // add the new section to the configure
          sectionsConfig.push(newSection);
        }
      });
    }

    const serverSteps: { [stepName: string]: WizardFlowFragment.Sections } = flowSections.reduce((acc: any, sec) => {
      acc[getStepFullName(sec)] = sec;
      acc[sec.name] = sec;
      return acc;
    }, {});

    sections = sections.map(sec => ({
      ...sec,
      steps: sortSteps(
        sec.steps.filter(st => serverSteps[getStepFullName(st)]),
        flowSections,
      ),
    }));

    const allSteps: WizardStepWithComponent[] = sections.reduce((all, sec) => all.concat(sec.steps), []);
    let restOfFlowDisabled = false;
    sortBy(flowSections, 'index').forEach(fs => {
      const configStep = allSteps.find(s => isWizardStepMatchingServerStep(s, fs));
      if (!configStep) {
        return;
      }
      configStep.isComplete = fs.isComplete;
      configStep.isEntered = fs.isEntered;
      configStep.isDisabled = !fs.isReady;
      if (sequenceEnforced && restOfFlowDisabled) {
        configStep.isDisabled = true;
      }
      if (!fs.isComplete && sequenceEnforced) {
        restOfFlowDisabled = true;
      }
    });
  }

  sections.forEach(sec => {
    sec.isComplete = sec.steps.filter(st => st.isComplete).length === sec.steps.length;
    sec.isDisabled = sec.steps.filter(st => st.isDisabled).length === sec.steps.length;
    sec.isEntered = sec.steps.some(st => st.isEntered);
  });

  // //////////////////////////////////////////////////////////////////////////////

  // if current location maps to an accessible step, then keep it and mark as current
  // otherwise send to first accessible step of current section if section is accessible
  // or to the first incomplete step

  const pathSection = sections.find(sec => !!matchPath(pathname, { path: wizardPath + sec.path }));
  const pathStep =
    pathSection &&
    pathSection.steps.find(
      st =>
        !!matchPath(pathname, {
          path: getFullStepPath(wizardPath, pathSection, st),
        }),
    );

  let currentSection;
  let currentStep;
  if (pathSection && pathStep && !pathStep.isDisabled && !pathSection.isDisabled) {
    // keep current location
    currentSection = pathSection;
    currentStep = pathStep;
  } else {
    const firstAccessibleStep = pathSection && !pathSection.isDisabled && pathSection.steps.find(st => !st.isDisabled);
    if (firstAccessibleStep) {
      currentSection = pathSection;
      currentStep = firstAccessibleStep;
    } else {
      currentSection = sections.find(sec => !sec.isComplete) || sections[0];
      currentStep = currentSection.steps.find(st => !st.isComplete) || currentSection.steps[0];
    }
  }

  currentSection.isCurrent = true;
  currentStep.isCurrent = true;

  const desiredPath = getFullStepPath(wizardPath, currentSection, currentStep);

  if (!matchPath(pathname, { path: desiredPath }) && pathname.indexOf(wizardPath) === 0) {
    pathToPush = desiredPath;
  }

  const newWizardState: Partial<WizardState> = {
    sections,
    withServerState,
    sequenceEnforced,
    transitionToOnComplete,
    serverState: flowDataModel,
    wizardIsComplete: !sections.some(s => s.steps.some(st => !st.isComplete)),
  };

  return {
    newWizardState,
    pathToPush,
  };
}
