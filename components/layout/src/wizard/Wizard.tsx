import React, { Component } from 'react';
import { matchPath, withRouter, RouteComponentProps } from 'react-router-dom';
import _ from 'lodash';

import { LoadingSpinner } from 'z-frontend-elements';
import { Box, Flex } from 'zbase';
import { styled } from 'z-frontend-theme';

import { AppContentContainerFlex } from '../AppContentContainer';
import { LoadingScreen } from '../../index';
import WizardSideNav from './WizardSideNav';
import { WizardFlowFragment, WizardSection, WizardServerState, WizardState, WizardStep } from './types';
import markStepAsCurrent from './utils/markStepAsCurrent';
import updateSectionOnServer from './utils/updateSectionOnServer';
import changeStep from './utils/changeStep';
import initState from './utils/initState';
import { checkStepsMatchPaths, getFullStepPath } from './utils/namePathUtils';

const RelativeFlex = styled(AppContentContainerFlex)`
  position: relative;
`;

export type WizardProps = {
  withServerState?: boolean;
  sequenceEnforced?: boolean;
  transitionToOnComplete: string;
  isLoading?: boolean;
  isReady?: boolean;
  errorText?: any;
  // only needed when withServerState is False
  initialSectionsConfig?: WizardSection[];

  // The following three props are used when withServerState is True
  serverState?: WizardServerState;
  sectionsConfigGenerator?: (severSections: WizardFlowFragment.Sections[]) => WizardSection[];
  flowId?: string;

  wizardPath: string;
  header?: string;
  helpColVisible?: boolean;

  isFullWidth?: boolean;
};

type AllProps = WizardProps & RouteComponentProps<{}>;

class Wizard extends Component<AllProps, Partial<WizardState>> {
  static defaultProps: Partial<AllProps> = {
    header: '',
    helpColVisible: false,
    serverState: null,
    isLoading: false,
    errorText: null,
    withServerState: false,
    isFullWidth: false,
  };

  constructor(props: AllProps) {
    super(props);

    this.state = {
      sectionsConfig: props.initialSectionsConfig ? _.cloneDeep(props.initialSectionsConfig) : [],
    };
  }

  componentDidMount() {
    this.initializeWizard(
      this.state.sectionsConfig,
      this.props.flowId,
      this.props.sequenceEnforced,
      this.props.transitionToOnComplete,
      this.props.sectionsConfigGenerator,
    );
  }

  updateWizardState(newWizardState: Partial<WizardState>) {
    return new Promise<void>(resolve => this.setState(newWizardState, resolve));
  }

  onLocationChange(newPathname: string) {
    if (!this.state) {
      return;
    }

    const { withServerState, serverState } = this.state;

    let { sections } = this.state;
    if (!sections) {
      return;
    }

    let currentSection = sections.find(
      sec => matchPath(newPathname, { path: this.props.wizardPath + sec.path }) && !sec.isDisabled,
    );
    let currentStep =
      currentSection &&
      currentSection.steps.find(
        st =>
          matchPath(newPathname, {
            path: getFullStepPath(this.props.wizardPath, currentSection, st),
          }) && !st.isDisabled,
      );

    const firstIncompleteSection = sections.find(sec => !sec.isComplete && !sec.isDisabled);
    const firstIncompleteStep =
      firstIncompleteSection && firstIncompleteSection.steps.find(st => !st.isComplete && !st.isDisabled);

    if (!currentSection) {
      currentSection = firstIncompleteSection || sections[0];
      currentStep = firstIncompleteStep || currentSection.steps[0];
    }

    if (!currentStep) {
      currentStep = currentSection.steps.find(st => !st.isComplete) || currentSection.steps[0];
    }

    const { lastPath } = this.state;
    const fullCurrentStepPath = getFullStepPath(this.props.wizardPath, currentSection, currentStep);
    const isChildRouteForCurrentStep =
      newPathname !== fullCurrentStepPath && newPathname.indexOf(fullCurrentStepPath) === 0;

    // if current pathname is a child for current step
    if (currentSection.isCurrent && currentStep.isCurrent && isChildRouteForCurrentStep) {
      if (lastPath !== newPathname) {
        this.updateWizardState({
          lastPath: newPathname,
        });
        return;
      } else {
        return;
      }
    }

    const oldSectionMarkedAsCurrent = sections.find(s => s.isCurrent);
    const oldStepMarkedAsCurrent = oldSectionMarkedAsCurrent && oldSectionMarkedAsCurrent.steps.find(s => s.isCurrent);
    const oldPathMarkedAsCurrent =
      oldStepMarkedAsCurrent &&
      getFullStepPath(this.props.wizardPath, oldSectionMarkedAsCurrent, oldStepMarkedAsCurrent);

    sections = markStepAsCurrent({ sections: this.state.sections, section: currentSection, step: currentStep });

    if (withServerState) {
      // don't wait for this request result
      updateSectionOnServer({
        serverState,
        step: currentStep,
        update: {
          isEntered: true,
        },
      });
    }

    if (newPathname !== fullCurrentStepPath && !isChildRouteForCurrentStep) {
      this.props.history.replace(oldPathMarkedAsCurrent || fullCurrentStepPath);
    }

    this.updateWizardState({
      sections,
      lastPath: newPathname,
    });
  }

  async onCompleteStepAndNext(section: WizardSection, step: WizardStep, updatedWizardState: Partial<WizardState>) {
    let latestState = this.state;
    let sections: WizardSection[];
    if (updatedWizardState) {
      latestState = {
        ...latestState,
        ...updatedWizardState,
      };
      sections = latestState.sections;
    } else {
      sections = latestState.sections.map(sec => {
        if (sec.path === section.path) {
          const steps = sec.steps.map(st => {
            if (checkStepsMatchPaths(st, step)) {
              return {
                ...st,
                isComplete: true,
                isDisabled: false,
              };
            }
            return st;
          });
          return {
            ...sec,
            steps,
            isComplete: !steps.some(s => !s.isComplete),
            isDisabled: steps[0].isDisabled,
          };
        }
        return sec;
      });
    }

    const currentSectionRefreshed = sections.find(s => s.path === section.path);
    const currentStepRefreshed = currentSectionRefreshed.steps.find(s => checkStepsMatchPaths(s, step));
    sections = changeStep({
      sections,
      currentSection: currentSectionRefreshed,
      currentStep: currentStepRefreshed,
      goForward: true,
      enableNextStepManually: !this.state.withServerState && this.props.sequenceEnforced,
    });

    const wizardIsComplete = !sections.some(s => s.steps.some(st => !st.isComplete));

    await this.updateWizardState({
      sections,
      wizardIsComplete,
      serverState: latestState.serverState,
    });
  }

  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.onLocationChange(nextProps.location.pathname);
    }
  }

  async initializeWizard(
    sectionsConfig: WizardSection[],
    flowId: string,
    sequenceEnforced: boolean,
    transitionToOnComplete: string,
    sectionsConfigGenerator?: (serverState: WizardFlowFragment.Sections[]) => WizardSection[],
  ) {
    const pathname = this.props.location.pathname;

    const { newWizardState, pathToPush } = await initState({
      sectionsConfig,
      flowId,
      sequenceEnforced,
      transitionToOnComplete,
      pathname,
      sectionsConfigGenerator,
      wizardPath: this.props.wizardPath,
    });

    // change location before initializing the wizard, so loading indicator holds during location change
    // usually changing from root wizard path to a particular step path
    if (pathToPush) {
      this.props.history.push(pathToPush);
    }

    await this.updateWizardState({
      isInitialized: true,
      initInProgress: false,
      ...newWizardState,
    });

    // mark initial step as entered
    if (this.props.withServerState) {
      const { currentStep } = this.getCurrentSectionAndStep();
      // don't wait for this request result
      updateSectionOnServer({
        serverState: this.state.serverState,
        step: currentStep,
        update: {
          isEntered: true,
        },
      });
    }
  }

  goToStep(section: WizardSection, step: WizardStep) {
    this.props.history.push(getFullStepPath(this.props.wizardPath, section, step));
  }

  async goToPreviousStep(currentSection: WizardSection, currentStep: WizardStep) {
    const sections = changeStep({
      currentSection,
      currentStep,
      sections: this.state.sections,
      goForward: false,
      enableNextStepManually: false,
    });
    await this.updateWizardState({
      sections,
    });

    this.pushCurrentPath();
  }

  async goToNextStep(currentSection: WizardSection, currentStep: WizardStep, markStepAsComplete: boolean) {
    let newWizardState: Partial<WizardState>;

    if (markStepAsComplete) {
      if (this.props.withServerState) {
        // reload server state
        const pathname = this.props.location.pathname;
        const newData = await initState({
          pathname,
          wizardPath: this.props.wizardPath,
          sectionsConfig: this.state.sectionsConfig,
          flowId: this.props.flowId,
          sequenceEnforced: this.props.sequenceEnforced,
          transitionToOnComplete: this.props.transitionToOnComplete,
          sectionsConfigGenerator: this.props.sectionsConfigGenerator,
        });

        newWizardState = newData.newWizardState;
      } else if (this.props.sequenceEnforced) {
        // if client-side only AND sequenceEnforced, manually enable next step
      }

      // mark step as complete
      await this.onCompleteStepAndNext(currentSection, currentStep, newWizardState);

      // go to next page (next step or final destination)
      const { wizardIsComplete, sections } = this.state;
      const isLastStep =
        currentSection.path === _.last(sections).path &&
        checkStepsMatchPaths(currentStep, _.last(_.last(sections).steps));
      if (wizardIsComplete && isLastStep) {
        // last step in wizard

        // if (withServerState) {
        // TODO: set isComplete on flow object
        // }

        // TODO: clean up OR reset redux state for the wizard?
        // await dispatch(push(transitionToOnComplete) as any);
        this.props.history.push(this.props.transitionToOnComplete);
      } else {
        this.pushCurrentPath();
      }
    } else {
      const sections = changeStep({
        currentSection,
        currentStep,
        sections: this.state.sections,
        goForward: true,
        enableNextStepManually: false,
      });

      await this.updateWizardState({
        sections,
      });

      this.pushCurrentPath();
    }
  }

  getCurrentSectionAndStep() {
    const { sections } = this.state;
    const currentSection = sections.find(sec => sec.isCurrent);
    const currentStep = currentSection && currentSection.steps.find(st => st.isCurrent);
    return {
      currentSection,
      currentStep,
    };
  }

  pushCurrentPath() {
    const { currentSection, currentStep } = this.getCurrentSectionAndStep();
    const desiredPath = getFullStepPath(this.props.wizardPath, currentSection, currentStep);

    if (!matchPath(this.props.location.pathname, { path: desiredPath })) {
      this.props.history.push(desiredPath);
    } else {
      console.log(`wizard: trying to push same path ${desiredPath}`);
    }
  }

  addStepToSection = (newStep: WizardStep, sectionPath: string) => {
    const section = this.state.sectionsConfig.find(sec => sec.path === sectionPath);
    if (!section) {
      throw new Error(`addStepToSection: section with path "${sectionPath}" is not found`);
    }
    if (section.steps.some(st => checkStepsMatchPaths(st, newStep))) {
      console.log(
        `addStepToSection: step with this full path already exists (${getFullStepPath(
          this.props.wizardPath,
          section,
          newStep,
        )})`,
      );
    } else {
      section.steps.push({ ...newStep });
    }
  };

  render() {
    if (this.props.errorText) {
      return <div>Error loaing data... {this.props.errorText}</div>;
    } else if (this.props.isLoading || !this.state.isInitialized) {
      return <LoadingScreen />;
    }

    const wizardPath = this.props.wizardPath;
    const sections = this.state.sections;
    const currentPath = this.props.location.pathname;
    const currentSection = sections.find(s => s.isCurrent);
    const currentStep = currentSection.steps.find(s => s.isCurrent);
    const CurrentStepComponent = this.state.sectionsConfig
      .find(s => s.path === currentSection.path)
      .steps.find(s => checkStepsMatchPaths(s, currentStep)).component;

    const fullStepPath = currentStep && currentSection && getFullStepPath(wizardPath, currentSection, currentStep);

    return (
      <RelativeFlex wrap isFullWidth={this.props.isFullWidth}>
        <Box w={[1, 1, 1 / 4, 2 / 12]}>
          <WizardSideNav
            header={this.props.header}
            sections={sections}
            // onClickStep={this.props.goToStep}
            disableMobileNav={currentPath !== fullStepPath}
            wizardPath={wizardPath}
          />
        </Box>

        {this.props.isLoading ? (
          <Flex
            w={[1, 1, 3 / 4, 10 / 12]}
            py={5}
            justify="center"
            align="center"
            style={{ height: 'calc(100vh - 65px - 32px - 37px)' }}
          >
            <LoadingSpinner s="large" />
          </Flex>
        ) : (
          <Box w={[1, 1, 3 / 4, 10 / 12]} px={[1, 1, 3]}>
            <CurrentStepComponent
              {...currentStep.props || {}}
              currentPath={currentPath}
              fullStepPath={fullStepPath}
              step={currentStep}
              section={currentSection}
              wizardPath={wizardPath}
              serverState={this.state.serverState}
              saveAndContinue={() => this.goToNextStep(currentSection, currentStep, true)}
              goToNextStep={() => this.goToNextStep(currentSection, currentStep, false)}
              goToPreviousStep={() => this.goToPreviousStep(currentSection, currentStep)}
              goToStep={(section: WizardSection, step: WizardStep) => this.goToStep(section, step)}
              sections={sections}
              addStepToSection={this.addStepToSection}
            />
          </Box>
        )}
      </RelativeFlex>
    );
  }
}

export default withRouter<WizardProps>(Wizard);
