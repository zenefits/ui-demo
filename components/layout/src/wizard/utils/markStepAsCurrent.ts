import { WizardSection, WizardStep } from '../types';
import { checkStepsMatchPaths } from './namePathUtils';

export default function markStepAsCurrent(params: {
  sections: WizardSection[];
  section: WizardSection;
  step?: WizardStep;
}) {
  const { sections, section, step } = params;

  return sections.map(sec => {
    let newSec = sec;
    if (sec.isCurrent && sec.path !== section.path) {
      newSec = {
        ...sec,
        isCurrent: false,
        steps: sec.steps.map(st => ({ ...st, isCurrent: false })),
      };
    } else if (!sec.isCurrent && sec.path === section.path) {
      newSec = { ...sec, isCurrent: true, isEntered: true };
    }

    if (newSec.path === section.path) {
      newSec.steps = newSec.steps.map(st => {
        if (!checkStepsMatchPaths(st, step) && st.isCurrent) {
          return { ...st, isCurrent: false };
        } else if (checkStepsMatchPaths(st, step) && !st.isCurrent) {
          return { ...st, isCurrent: true, isEntered: true };
        }
        return st;
      });
    }

    return newSec;
  });
}
