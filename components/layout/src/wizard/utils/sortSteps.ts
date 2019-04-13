import { WizardFlowFragment, WizardStepWithComponent } from '../types';
import { getStepFullName } from './namePathUtils';

export default function sortSteps(
  steps: WizardStepWithComponent[],
  serverState?: WizardFlowFragment.Sections[],
): WizardStepWithComponent[] {
  if (serverState) {
    const serverStepIndexMap: { [stepName: string]: number } = serverState.reduce(
      (acc, step) => {
        acc[getStepFullName(step)] = step.index;
        acc[step.name] = step.index;
        return acc;
      },
      {} as { [stepName: string]: number },
    );

    return steps.sort((a, b) => {
      if (serverStepIndexMap[getStepFullName(a)] > serverStepIndexMap[getStepFullName(b)]) {
        return 1;
      } else if (serverStepIndexMap[getStepFullName(a)] < serverStepIndexMap[getStepFullName(b)]) {
        return -1;
      }
      return 0;
    });
  }
  return steps;
}
