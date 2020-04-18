import React, { Component, StatelessComponent } from 'react';

import { ButtonDropdown } from 'z-frontend-elements';
import { Box, Flex, Icon, TextInline } from 'zbase';
import { Avatar } from 'z-frontend-composites';
import { Hide, Render } from 'z-frontend-theme';
import { logout } from 'z-frontend-app-bootstrap';
import { SwitchChecker } from 'z-frontend-network';

type AvatarDropdownProps = {
  firstName: string;
  lastName: string;
  employeeId: string;
  employeeNumber: string;
  companyId: string;
  photoUrl: string;
  showInbox: boolean;
  showMyAccounts: boolean;
  showAccountSettings: boolean;
  /**
   * TopNavBar has this prop and it's passed down.
   */
  dropdownItems: React.ReactNode;
  className?: string;
};

const ZenefitsIdDisplay: StatelessComponent<{ zenefitsId: string }> = ({ zenefitsId }) =>
  zenefitsId && (
    <Flex bg="grayscale.white" py={2} pl={3} pr={1} justify="flex-start">
      <Box fontStyle="paragraphs.s" color="grayscale.d">
        Zenefits ID: <TextInline color="text.dark">{zenefitsId}</TextInline>
      </Box>
    </Flex>
  );

class AvatarDropdown extends Component<AvatarDropdownProps> {
  getEmployeeHash = (employeeId: string): string => {
    /*
      For admins that do not have an employee number in the yp database we're generating one on the fly in order for them
      to be able to successfully use the IVR system when calling support. These numbers are backfilled in salesforce in
      order to make the search possible. These constants have been determined experimentally to prevent any collisions
      for the existing admins in the system. If we encounter collisions they would not have a significant impact: the
      IVR search will retrieve all matching profiles for the support representative.
      https://jira.inside-zen.com/browse/HRHUB-4152
    */
    const PRIME_NUMBER = 99991;
    const HASH_SIZE = 6;

    const value = parseInt(employeeId, 10) % PRIME_NUMBER;
    const strValue = value.toString();
    return (
      Array(HASH_SIZE - strValue.length)
        .fill(0)
        .join('') + strValue
    );
  };

  getCustomerSupportNumber = (companyId: string, employeeNumber: string, employeeId: string): string => {
    if (!companyId) {
      return null;
    }

    const displayNumber = employeeNumber || this.getEmployeeHash(employeeId);
    return `${companyId}*${displayNumber}`;
  };
  render() {
    const {
      firstName,
      lastName,
      employeeId,
      companyId,
      employeeNumber,
      photoUrl,
      showInbox,
      showMyAccounts,
      showAccountSettings,
      dropdownItems,
    } = this.props;

    const customerSupportNumber = this.getCustomerSupportNumber(companyId, employeeNumber, employeeId);
    return (
      <ButtonDropdown
        target={
          <Flex align="center" style={{ cursor: 'pointer' }}>
            <Avatar
              firstName={firstName}
              lastName={lastName}
              photoUrl={photoUrl}
              s="small"
              tooltipBody=""
              aria-label="My account"
              className="js-walkme-top-nav-avatar"
            />
            <Hide forBreakpoints={[true]}>
              <Icon iconName="chevron-down" ml={2} />
            </Hide>
          </Flex>
        }
        popperPlacement="bottom-end"
        // TODO: popper is too close to target
        // not quite right: moves left/right when bottom placed
        // popperModifiers={{ offset: { offset: '20%p' } }}
      >
        <Render forBreakpoints={[true]}>
          {showInbox && <ButtonDropdown.ItemLink href="/dashboard/#/inbox-view">Inbox</ButtonDropdown.ItemLink>}
        </Render>

        {showMyAccounts && <ButtonDropdown.ItemLink href="/companySelector">My Accounts</ButtonDropdown.ItemLink>}

        {showAccountSettings && (
          <ButtonDropdown.ItemLink href="/dashboard/#/account-settings/settings">
            Account Settings
          </ButtonDropdown.ItemLink>
        )}

        {dropdownItems}

        <ButtonDropdown.ItemButton
          onClick={() => {
            logout();
          }}
        >
          Log Out
        </ButtonDropdown.ItemButton>
        {/* TODO: drop the employeeId display and remove this after switch is 100% on. */}
        <SwitchChecker switch="employee_number" isNegated>
          <ZenefitsIdDisplay zenefitsId={employeeId} />
        </SwitchChecker>
        <SwitchChecker switch="employee_number">
          <ZenefitsIdDisplay zenefitsId={customerSupportNumber} />
        </SwitchChecker>
      </ButtonDropdown>
    );
  }
}
export default AvatarDropdown;
