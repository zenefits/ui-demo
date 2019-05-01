import { WizardFlowFragment, WizardSection, WizardStep, WizardStepWithComponent } from '../types';

export function getStepFullName(step: { name?: string; dispatcherArgs?: string }) {
  return `${step.name}${step.dispatcherArgs ? `.${step.dispatcherArgs}` : ''}`;
}

export function isWizardStepMatchingServerStep(
  wizardStep: WizardStepWithComponent,
  serverStep: WizardFlowFragment.Sections,
) {
  return wizardStep.dispatcherArgs
    ? getStepFullName(wizardStep) === getStepFullName(serverStep)
    : wizardStep.name === serverStep.name;
}

function getStepPath(step: WizardStep) {
  return step.path + (step.dispatcherArgs ? `/${step.dispatcherArgs}` : '');
}

export function getFullStepPath(wizardPath: string, section: WizardSection, step: WizardStep) {
  return wizardPath + section.path + getStepPath(step);
}

export function checkStepsMatchPaths(step1: WizardStep, step2: WizardStep) {
  return getStepPath(step1) === getStepPath(step2);
}
