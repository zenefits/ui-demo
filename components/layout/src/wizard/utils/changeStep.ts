import { WizardSection, WizardStep } from '../types';
import markStepAsCurrent from '../utils/markStepAsCurrent';
import { checkStepsMatchPaths } from './namePathUtils';

export default function changeStep(params: {
  sections: WizardSection[];
  currentSection: WizardSection;
  currentStep: WizardStep;
  goForward: boolean;
  enableNextStepManually: boolean;
}) {
  const { sections: allSections, currentSection, currentStep, goForward, enableNextStepManually } = params;

  let nextSection: WizardSection;
  let nextStep: WizardStep;
  let sections = allSections;
  const indexChange = goForward ? 1 : -1;

  const stepIndex = currentSection.steps.findIndex(st => checkStepsMatchPaths(st, currentStep));
  if (currentSection.steps[stepIndex + indexChange]) {
    nextStep = currentSection.steps[stepIndex + indexChange];
    nextSection = currentSection;
  } else {
    const sectionIndex = allSections.findIndex(sec => sec.path === currentSection.path);
    if (allSections[sectionIndex + indexChange]) {
      nextSection = allSections[sectionIndex + indexChange];
      nextStep = nextSection.steps[goForward ? 0 : nextSection.steps.length - 1];
    }
  }

  if (nextSection && nextStep) {
    if (enableNextStepManually) {
      nextSection.isDisabled = false;
      nextStep.isDisabled = false;
    }

    if (!nextSection.isDisabled && !nextStep.isDisabled) {
      sections = markStepAsCurrent({ sections, section: nextSection, step: nextStep });
    }
  }

  return sections;
}
