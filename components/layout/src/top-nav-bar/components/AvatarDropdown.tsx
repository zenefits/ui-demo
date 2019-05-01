import React, { Component } from 'react';

import { ButtonDropdown } from 'z-frontend-elements';
import { Flex, Icon } from 'zbase';
import { Avatar } from 'z-frontend-composites';
import { HideFor, RenderFor } from 'z-frontend-theme';
import { logout } from 'z-frontend-app-bootstrap';

import { buyLink, exitTypes } from '../constants';
import { ExitType } from '../types';

type AvatarDropdownProps = {
  firstName: string;
  lastName: string;
  photoUrl: string;
  showInbox: boolean;
  showMyAccounts: boolean;
  showAccountSettings: boolean;
  /**
   * TopNavBar has this prop and it's passed down.
   */
  dropdownItems: React.ReactNode;
  /**
   * This determines whether to show "Log Out" or "Start Your Real Account"
   */
  exitType: ExitType;
};

class AvatarDropdown extends Component<AvatarDropdownProps> {
  render() {
    const {
      firstName,
      lastName,
      photoUrl,
      showInbox,
      showMyAccounts,
      showAccountSettings,
      dropdownItems,
      exitType,
    } = this.props;

    const showLogout = exitType === exitTypes.logout;
    const showStartRealAccount = exitType === exitTypes.startRealAccount;

    return (
      <ButtonDropdown
        target={
          <Flex align="center" style={{ cursor: 'pointer' }}>
            <Avatar firstName={firstName} lastName={lastName} photoUrl={photoUrl} s="small" tooltipBody="" />
            <HideFor breakpoints={[true]}>
              <Icon iconName="chevron-down" ml={2} />
            </HideFor>
          </Flex>
        }
        popperPlacement="bottom-end"
        // TODO: popper is too close to target
        // not quite right: moves left/right when bottom placed
        // popperModifiers={{ offset: { offset: '20%p' } }}
      >
        <RenderFor breakpoints={[true]}>
          {showInbox && <ButtonDropdown.ItemLink href="/dashboard/#/inbox-view">Inbox</ButtonDropdown.ItemLink>}
        </RenderFor>

        {showMyAccounts && <ButtonDropdown.ItemLink href="/companySelector">My Accounts</ButtonDropdown.ItemLink>}

        {showAccountSettings && (
          <ButtonDropdown.ItemLink href="/dashboard/#/account-settings/settings">
            Account Settings
          </ButtonDropdown.ItemLink>
        )}

        {dropdownItems}

        {showLogout && (
          <ButtonDropdown.ItemButton
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </ButtonDropdown.ItemButton>
        )}

        {showStartRealAccount && (
          <ButtonDropdown.ItemLink href={buyLink}>Start Your Real Account</ButtonDropdown.ItemLink>
        )}
      </ButtonDropdown>
    );
  }
}
export default AvatarDropdown;
