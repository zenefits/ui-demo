import { ComponentType } from 'react';

import { FlowQuery, UpdateFlowSection, WizardFlowFragment } from './wizardGraphqlTypes';

export { FlowQuery, WizardFlowFragment, UpdateFlowSection };

export interface FlowSectionUpdate {
  isEntered?: boolean | null;
  isComplete?: boolean | null;
}

interface WizardStepCommon {
  name?: string;
  /**
   * If this is set, it will be used as part of the route path (path + '/' + dispatcherArgs)
   * and to find matching FlowSection model (should have the same dispatcherArgs value)
   */
  dispatcherArgs?: string;
  path: string;
  title: string;
  longTitle?: string;
  isCurrent?: boolean;
  isComplete?: boolean;
  isEntered?: boolean;
  isDisabled?: boolean;
  isEnabledOnServer?: boolean;
  props?: any;
}

export interface WizardStepWithComponent extends WizardStepCommon {
  component: ComponentType<WizardStepComponentProps>;
}

export type WizardStep = WizardStepWithComponent;

export interface WizardSection {
  path: string;
  title: string;
  isCurrent?: boolean;
  isComplete?: boolean;
  isEntered?: boolean;
  isDisabled?: boolean;
  steps: WizardStep[];
}

export interface WizardState {
  sections: WizardSection[];
  isInitialized: boolean;
  initInProgress: boolean;
  wizardIsComplete: boolean;
  sequenceEnforced: boolean;
  transitionToOnComplete: string;
  lastPath: string;
  withServerState: boolean;
  serverState?: WizardServerState;
  sectionsConfig: WizardSection[];
}

export type WizardStepComponentProps<CustomStepProps = {}> = CustomStepProps & {
  step: WizardStep;
  section: WizardSection;
  wizardPath: string;
  sections: WizardSection[];
  serverState?: WizardServerState;
  currentPath: string;
  fullStepPath: string;
  saveAndContinue: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (section: WizardSection, step: WizardStep) => void;
  /**
   * Add new step to existing wizard section
   * New step must have unique path or path+dispatcherArgs
   * This function does not cause a re-render, new step will appear after navigation event (e.g going to next step)
   */
  addStepToSection: (newStep: WizardStep, sectionPath: string) => void;
};

export type WizardServerState = FlowQuery.Flow;
