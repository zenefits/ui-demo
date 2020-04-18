import React, { Component } from 'react';
import gql from 'graphql-tag';

import { getEventLogger } from 'z-frontend-app-bootstrap';
import { Button, LoadingSpinner } from 'z-frontend-elements';
import { Box, Flex, ResponsiveFontStyleProp } from 'zbase';
import { DialogManager, Modal } from 'z-frontend-overlays';
import { ColorString } from 'z-frontend-theme';
import { Mutation } from 'z-frontend-network';

import { CreateFreeLimitedTrialCompany, ToggleTrialAccountCompanies } from '../gqlTypes';

const createFreeLimitedTrialCompany = gql`
  mutation CreateFreeLimitedTrialCompany {
    createFreeLimitedTrialCompany {
      success
      redirectUrl
    }
  }
`;

const toggleTrialAccountCompanies = gql`
  mutation ToggleTrialAccountCompanies {
    toggleTrialAccountCompanies {
      success
      redirectUrl
    }
  }
`;

type Switches = { [key: string]: boolean };

type TrialAccountButtonProps = {
  companyTypeIsDemo: Boolean;
  trialHasFreeLimitedCompany: Boolean;
  py?: number;
  px?: number;
  w?: number;
  ml?: number;
  s?: 'small' | 'medium' | 'large' | 'xsmall';
  styleOptions?: Object;
  fontStyle?: ResponsiveFontStyleProp;
  bg?: ColorString;
  color?: ColorString;
  buttonTextParam?: string;
  destination?: string;
  onClickRedirectOverride?: string;
  switches: Switches;
  eventLogName?: string;
  eventLogSource?: string;
};
type TrialAccountButtonState = {};

export default class TrialAccountButton extends Component<TrialAccountButtonProps, TrialAccountButtonState> {
  checkAndCreateFreeLimitedTrialCompany = (
    createFreeLimitedTrialCompanyMutation: any,
    eventLogSource: string,
  ) => async () => {
    const response = await createFreeLimitedTrialCompanyMutation();
    const data = response.data.createFreeLimitedTrialCompany;
    if (data.success) {
      let eventName = 'create_free_limited_company';
      if (eventLogSource) {
        eventName = `${eventLogSource}_${eventName}`;
      }
      this.logEvent(eventName);
      window.location.href = data.redirectUrl;
    }
  };

  toggleTrialAccounts = (
    toggleCompaniesMutation: any,
    companyTypeIsDemo: Boolean,
    destination: string,
    onClickRedirectOverride: string,
    eventLogName: string,
    eventLogSource: string,
  ) => async () => {
    let redirectUrl = null;
    let dest = destination;

    if (!dest) {
      dest = companyTypeIsDemo ? 'trial' : 'demo';
    }

    if ((companyTypeIsDemo && dest !== 'demo') || (!companyTypeIsDemo && dest === 'demo')) {
      const response = await toggleCompaniesMutation();
      const data = response.data.toggleTrialAccountCompanies;
      ({ redirectUrl } = data);
    } else {
      redirectUrl = '/dashboard/';
    }

    if (onClickRedirectOverride) {
      redirectUrl = onClickRedirectOverride;
    }

    if (eventLogName) {
      let eventName = eventLogName;
      if (eventLogSource) {
        eventName = `${eventLogSource}_${eventName}`;
      }
      this.logEvent(eventName);
    }

    window.location.href = redirectUrl;
  };

  logEvent(eventName: string) {
    getEventLogger().log(eventName);
  }

  render() {
    const {
      companyTypeIsDemo,
      trialHasFreeLimitedCompany,
      switches,
      onClickRedirectOverride,
      styleOptions,
      py = 0,
      px = 0,
      w = 100,
      ml = 0,
      s: size = 'small',
      fontStyle: fontStyle = 'paragraphs.s',
      bg = 'secondary.b',
      color = 'secondary.a',
      buttonTextParam = '',
      destination = null,
      eventLogName = null,
      eventLogSource = null,
    } = this.props;

    const buttonText = buttonTextParam || (companyTypeIsDemo ? 'Return to Trial' : 'Explore Demo');
    const buttonDestinationIsDemo = destination === 'demo';

    const trialFreeLimitedCompanySwitchActive = switches && switches['free_limited_trial_company'];
    const showToggleAccountsButton = trialHasFreeLimitedCompany || buttonDestinationIsDemo;

    return (
      <Box>
        {showToggleAccountsButton ? (
          <Mutation<ToggleTrialAccountCompanies.Mutation> mutation={toggleTrialAccountCompanies}>
            {(toggleCompaniesMutation, { data, loading, error }) => {
              return (
                <Box ml={ml}>
                  <Button.Link
                    fontStyle={fontStyle}
                    s={size}
                    onClick={this.toggleTrialAccounts(
                      toggleCompaniesMutation,
                      companyTypeIsDemo,
                      destination,
                      onClickRedirectOverride,
                      eventLogName,
                      eventLogSource,
                    )}
                    py={py}
                    px={px}
                    w={w}
                    bg={bg}
                    color={color}
                    style={styleOptions}
                  >
                    {buttonText}
                  </Button.Link>
                </Box>
              );
            }}
          </Mutation>
        ) : (
          <Box>
            {trialFreeLimitedCompanySwitchActive && (
              <Mutation<CreateFreeLimitedTrialCompany.Mutation> mutation={createFreeLimitedTrialCompany}>
                {(createFreeLimitedTrialCompanyMutation, { data, loading, error }) => {
                  return (
                    <Box ml={ml}>
                      <Box>
                        <DialogManager
                          render={({ open, close, isVisible, controlEl }) => {
                            const modalProps = {
                              controlEl,
                              isVisible: isVisible || loading,
                              title: 'Creating Free Trial',
                              onCancel: close,
                              renderHeader: () => <Modal.Header bg="grayscale.white" pt={0} pb={0} />,
                            };
                            return (
                              <Modal {...modalProps}>
                                <Modal.Body>
                                  <Box textAlign="center" pb={4}>
                                    Creating free trial account
                                  </Box>
                                  <Flex justify="center">
                                    <Box height={50} width={50}>
                                      <LoadingSpinner />
                                    </Box>
                                  </Flex>
                                </Modal.Body>
                              </Modal>
                            );
                          }}
                        />
                        <Button.Link
                          s={size}
                          onClick={this.checkAndCreateFreeLimitedTrialCompany(
                            createFreeLimitedTrialCompanyMutation,
                            eventLogSource,
                          )}
                          px={px}
                          py={py}
                          w={w}
                          bg={bg}
                          color={color}
                          style={styleOptions}
                          className="js-walkme-start-trial"
                        >
                          Start Free Trial
                        </Button.Link>
                      </Box>
                    </Box>
                  );
                }}
              </Mutation>
            )}
          </Box>
        )}
      </Box>
    );
  }
}
