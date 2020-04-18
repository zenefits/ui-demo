import gql from 'graphql-tag';
import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';
import { getEventLogger } from 'z-frontend-app-bootstrap';
import { Button, Link } from 'z-frontend-elements';
import { Render } from 'z-frontend-theme';
import { Mutation } from 'z-frontend-network';

import TrialAccountButton from '../../trial-account-button/TrialAccountButton';
import AvatarDropdown from './AvatarDropdown';
import DaysLeft from './DaysLeft';
import { buyLink, tabletBreakpoints } from '../constants';
import { SendDataToMarketo } from '../../gqlTypes';
import { getLeadInfo } from '../utils';

declare global {
  interface Window {
    drift: any;
  }
}

const prospectPostData = getLeadInfo();

const sendDataToMarketo = gql`
  mutation SendDataToMarketo($prospectInfo: ProspectInfo) {
    sendDataToMarketo(prospectInfo: $prospectInfo) {
      success
    }
  }
`;

type Switches = { [key: string]: boolean };

type DemoCenterRightColumnProps = {
  shouldContactSales: boolean;
  companyTypeIsDemo: boolean;
  trialHasFreeLimitedCompany: boolean;
  firstName: string;
  lastName: string;
  employeeId: string;
  employeeNumber: string;
  companyId: string;
  photoUrl: string;
  userEmail: string;
  switches: Switches;
};

const contactSales = (sendDataMarketoFn: Function, companyTypeIsDemo: Boolean) => {
  getEventLogger().log('contact_sales_navbar');
  if (window.drift && companyTypeIsDemo) {
    window.drift.api.startInteraction({ interactionId: 71135 });
  } else {
    console.log('drift not found');
  }
  sendDataMarketoFn();
};

class DemoCenterRightColumn extends React.Component<DemoCenterRightColumnProps> {
  constructor(props: any) {
    super(props);
    prospectPostData.formData.email = this.props.userEmail;
  }

  render() {
    const {
      shouldContactSales,
      companyTypeIsDemo,
      trialHasFreeLimitedCompany,
      firstName,
      lastName,
      photoUrl,
      switches,
      employeeId,
      companyId,
      employeeNumber,
    } = this.props;

    const demoCenterAvatar = (
      <AvatarDropdown
        firstName={firstName}
        lastName={lastName}
        employeeId={employeeId}
        companyId={companyId}
        employeeNumber={employeeNumber}
        photoUrl={photoUrl}
        showInbox={false}
        showMyAccounts={false}
        showAccountSettings={false}
        dropdownItems={undefined}
      />
    );

    return (
      <Mutation<SendDataToMarketo.Mutation> mutation={sendDataToMarketo}>
        {(sendDataToMarketo, { data, loading, error }) => {
          const sendDataMarketo = () =>
            sendDataToMarketo({
              variables: {
                prospectInfo: prospectPostData,
              },
            });

          return (
            <Flex align="center">
              <DaysLeft />
              {shouldContactSales ? (
                <Render forBreakpoints={tabletBreakpoints}>
                  <TextBlock ml={[4, 4, 4, 5, 5]} fontStyle="headings.s" color="secondary.a">
                    Sales: 888-249-3263
                  </TextBlock>
                </Render>
              ) : (
                ''
              )}

              <TrialAccountButton
                companyTypeIsDemo={companyTypeIsDemo}
                trialHasFreeLimitedCompany={trialHasFreeLimitedCompany}
                switches={switches}
                ml={4}
                styleOptions={{
                  fontWeight: 'bold',
                }}
                eventLogSource="top_nav_bar"
                eventLogName="toggle_trial_account_companies"
              />
              <Flex ml={[2, 4, 4, 4, 4]} mr={[2, 3]} align="center">
                {shouldContactSales ? (
                  <Box>
                    <Button
                      mode="primary"
                      s="small"
                      px={4}
                      onClick={() => contactSales(sendDataMarketo, companyTypeIsDemo)}
                      mr={3}
                    >
                      <Render forBreakpoints={tabletBreakpoints}>Contact </Render>
                      Sales
                    </Button>
                  </Box>
                ) : (
                  <Link href={buyLink} className="js-walkme-top-nav-buy-now">
                    <Button
                      mode="primary"
                      s="small"
                      px={4}
                      onClick={() => {
                        getEventLogger().log('buy_now_navbar');
                      }}
                    >
                      Buy
                      <Render forBreakpoints={tabletBreakpoints}> Now</Render>
                    </Button>
                  </Link>
                )}
              </Flex>
              <Flex align="center">{demoCenterAvatar}</Flex>
            </Flex>
          );
        }}
      </Mutation>
    );
  }
}

export default DemoCenterRightColumn;
