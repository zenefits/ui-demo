import React, { Component, Fragment } from 'react';

import { Box, BoxProps, Icon } from 'zbase';
import { IconButton, Link } from 'z-frontend-elements';
import { getColor, styled } from 'z-frontend-theme';
import { color, icon, zIndex } from 'z-frontend-theme/utils';

import { NavBar } from '../../index';
import { WizardSection } from './types';
import { getFullStepPath } from './utils/namePathUtils';

const MobileTopBar = styled(Box)`
  display: none;

  @media screen and (max-width: ${p => p.theme.breakpoints[1]}em) {
    display: block;
  }
`;

type StepState = 'active' | 'disabled' | 'complete' | 'ready';

const stepStateContentMap = {
  complete: icon('check'),
  disabled: icon('lock-outline'),
  active: '',
  ready: '',
};
const StepContainer = styled(Box)<{ stepState: StepState }>`

      
  padding-left: 15px;
  position: relative;
  

  ::before {
    border-left: ${props => (props.stepState === 'active' ? `2px solid ${getColor('primary.a')}` : 'none')};    
    font-family: ${props =>
      props.stepState === 'complete' || props.stepState === 'disabled' ? 'Material-Design-Iconic-Font' : 'inherit'};
    margin-left: -15px;
    content: '${props => stepStateContentMap[props.stepState]}';
    position: absolute;
    top: 0;
    bottom: 0;
    font-weight: ${props => props.theme.weights[0]};
  }
`;

/* display: ${props => (props.isOpen ? 'block' : 'none')}; */
const NavContainerWrapper = styled<BoxProps & { isOpen?: boolean }>(Box)`
  @media screen and (max-width: ${p => p.theme.breakpoints[1]}em) {
    bottom: calc(100vh - ${props => props.theme.topNavHeight});
    transition: bottom 0.3s ease-in-out;
    top: 0;
    position: absolute;
    z-index: ${zIndex('fixed')};
    width: 100%;
  }
`;

const NavContainer = styled<BoxProps & { isOpen?: boolean }>(Box)`
  @media screen and (max-width: ${p => p.theme.breakpoints[1]}em) {
    height: calc(100vh - ${props => props.theme.topNavHeight});
    top: ${props => (props.isOpen ? 0 : `calc(${props.theme.topNavHeight} - 100vh)`)};
    transition: top 0.3s ease-in-out;
    background-color: ${color('grayscale.g')};
    position: absolute;
    overflow: hidden;
    z-index: ${zIndex('fixed')};
    width: 100%;
    box-shadow: inset 0 -30px 30px -13px rgba(0, 0, 0, 0.2);
  }
`;

const NavContainerInner = styled(Box)`
  height: 100%;
  overflow: auto;
`;

const CrossIconContainer = styled(Box)`
  display: none;

  @media screen and (max-width: ${p => p.theme.breakpoints[1]}em) {
    display: block;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    right: 24px;
    top: 18px;
  }
`;

const StyledBox = styled(Box)`
  @media screen and (max-width: ${p => p.theme.breakpoints[1]}em) {
    top: 0;
    position: relative;
  }
`;

interface Props {
  wizardPath: string;
  sections: WizardSection[];
  header?: string;
  disableMobileNav?: boolean;
  // onClickStep: (section: WizardSection, step: WizardStep) => void;
}

interface State {
  expandedSectionPath: string;
  isMobileMenuOpen: boolean;
}

class WizardSideNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const currentSection = props.sections && props.sections.find(sec => sec.isCurrent);

    this.state = {
      isMobileMenuOpen: false,
      expandedSectionPath: currentSection ? currentSection.path : null,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const currentSection = nextProps.sections.find(sec => sec.isCurrent);

    if (currentSection && currentSection.path !== this.state.expandedSectionPath) {
      this.setState({
        expandedSectionPath: currentSection.path,
      });
    }
  }
  onClickSection(e: React.MouseEvent<HTMLAnchorElement>, sectionPath: string) {
    e.preventDefault();
    const newSectionPath = this.state.expandedSectionPath === sectionPath ? null : sectionPath;
    this.setState({
      expandedSectionPath: newSectionPath,
    });
  }
  // onClickStep(e: React.MouseEvent<HTMLAnchorElement>, step: WizardStep, section: WizardSection) {
  //   e.preventDefault();
  //   this.props.onClickStep(section, step);
  // }

  openMobileNav = () => {
    this.setState({ isMobileMenuOpen: true });
  };

  onClickMobileNavBarLink = (e: React.MouseEvent<HTMLAnchorElement>, sectionPath: string, stepPath: string) => {
    // e.preventDefault();
    this.setState({ isMobileMenuOpen: true });
  };

  closeMobileNav = () => {
    this.setState({ isMobileMenuOpen: false });
  };

  render() {
    const currentSection = this.props.sections.find(section => section.isCurrent);
    const currentStep = currentSection && currentSection.steps.find(step => step.isCurrent);

    return (
      <StyledBox role="navigation" aria-label={this.props.header || 'Wizard navigation'}>
        {/* {this.props.header && <Heading level={5}>{this.props.header}</Heading>} */}

        {!this.props.disableMobileNav && (
          <MobileTopBar color="secondary.a" w={1} py={2}>
            <IconButton
              iconName="menu"
              color="secondary.a"
              onClick={this.openMobileNav}
              aria-label="Open wizard menu"
            />
            {currentStep ? (
              <>
                <Link color="secondary.a" aria-label="Open wizard menu" onClick={this.openMobileNav}>
                  {currentSection.title}
                </Link>
              </>
            ) : (
              <Link onClick={this.openMobileNav}>Navigation</Link>
            )}
          </MobileTopBar>
        )}

        <NavContainerWrapper isOpen={this.state.isMobileMenuOpen}>
          <NavContainer py={2} isOpen={this.state.isMobileMenuOpen}>
            {!this.props.disableMobileNav && (
              <CrossIconContainer onClick={this.closeMobileNav}>
                <Icon iconName="close" s="large" />
              </CrossIconContainer>
            )}
            <NavContainerInner px={2}>
              <NavBar disableActiveIndicator indentNestedLists={false} mode="side" listType="ul">
                {this.props.sections.map((section, i) => {
                  const totalSteps = section.steps.length;
                  const completedSteps = section.steps.filter(step => step.isComplete).length;

                  return (
                    <Fragment key={section.path}>
                      <NavBar.RouterNavLink
                        to={this.props.wizardPath + section.path}
                        // completed={section.isComplete}
                        // active={section.isCurrent}
                        onClick={e => this.onClickSection(e, section.path)}
                        fontStyle="controls.m"
                      >
                        {section.title} ({completedSteps}/{totalSteps})
                      </NavBar.RouterNavLink>

                      {this.state.expandedSectionPath === section.path && (
                        <NavBar disableActiveIndicator mode="side" listType="ul">
                          {section.steps.map((step, j) => {
                            let stepState: StepState = 'ready';

                            if (section.isCurrent && step.isCurrent) {
                              stepState = 'active';
                            }
                            if (step.isComplete) {
                              stepState = 'complete';
                            } else if (step.isDisabled) {
                              stepState = 'disabled';
                            }

                            return (
                              <NavBar.RouterNavLink
                                key={getFullStepPath(this.props.wizardPath, section, step)}
                                to={getFullStepPath(this.props.wizardPath, section, step)}
                                // completed={step.isComplete}
                                disabled={step.isDisabled}
                                // active={section.isCurrent && step.isCurrent}
                                onClick={this.closeMobileNav}
                                fontStyle="controls.m"
                              >
                                <StepContainer stepState={stepState}>{step.title}</StepContainer>
                              </NavBar.RouterNavLink>
                            );
                          })}
                        </NavBar>
                      )}
                    </Fragment>
                  );
                })}
              </NavBar>
            </NavContainerInner>
          </NavContainer>
        </NavContainerWrapper>
      </StyledBox>
    );
  }
}

export default WizardSideNav;
