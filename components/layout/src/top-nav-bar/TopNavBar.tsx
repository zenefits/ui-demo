import React, { Component } from 'react';
import { graphql, ChildDataProps } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import { Box, Flex, FlexProps, Image, TextInline } from 'zbase';
import { styled, theme, HideFor, RenderFor } from 'z-frontend-theme';
import { color, space, zIndex } from 'z-frontend-theme/utils';
import { Button, Link } from 'z-frontend-elements';

import { AppContentContainerFlex, Drawer } from '../../index';
import ClientDrawerContent from '../client-nav-content/ClientDrawerContent';
import ProductTitleWithDropdown from './components/ProductTitleWithDropdown';
import DemoCenterRightColumn from './components/DemoCenterRightColumn';
import { ExitType, ProductTitleWithDropdownMode } from './types';
import OmniSearch from './components/OmniSearch';
import AvatarDropdown from './components/AvatarDropdown';
import { demoCenterSwitch, exitTypes } from './constants';

const dashboardLink = '/dashboard/#/';

const AbsoluteNav = styled<FlexProps & { hasShadow?: boolean }>(Flex)`
  position: fixed;
  height: ${props => props.theme.topNavHeight};
  left: 0;
  right: 0;
  top: 0;
  /* top padding, to match ember top nav vertical alignment */
  border-top: 2px solid ${color('grayscale.white')};
  z-index: ${props => 1 + zIndex('fixed')(props)};
  background-color: ${color('grayscale.white')};
  color: ${color('secondary.a')};
  box-shadow: ${props => (props.hasShadow ? '0 2px 6px 0 rgba(18, 52, 102, 0.1)' : '')};
`;

const AbsoluteNavPlaceholder = styled(Box)`
  height: ${props => props.theme.topNavHeight};
`;

const StyledLogoImage = styled(Image)`
  height: 24px;
`;

const Separator = styled(Box)`
  height: 24px;
  border-left: 1px solid ${color('primary.a')};
  margin: 0 ${space(3)};
`;

const smallLogo = <Image w={12} src={theme.images.logo} mr={3} />;

const bigLogo = (
  <Flex align="center" w={103}>
    <StyledLogoImage src="https://secure.zenefits.com/static/img/rebranding/zenefits-logo-header-pink.svg" />
  </Flex>
);

interface UserSettingsQueryResult {
  dashboard: any; // TODO: these types currently live in talent
}

// TO-DO:  The productTitleKey/Default api should be simplified
export interface Props {
  /**
   * An array of items to show in the right side dropdown list
   */
  dropdownItems?: React.ReactNode;
  /**
   * Whether to add box-shadow for the component
   * @default false
   */
  hasShadow?: boolean;
  /**
   * Stretch to full width? By default, the top nav bar has a max-width.
   * @default false
   */
  isFullWidth?: boolean;
  /**
   * By default children are aligned to the right in the nav bar. Set this to align children to the left.
   * @default false
   */
  contentAlignLeft?: boolean;
  /**
   * Product title key in locale data. e.g. "nav.productTitle"
   *
   * Translation is no longer a business goal, so this prop should not be used.
   */
  productTitleKey?: string;
  /**
   * Default product title.
   */
  productTitleDefault?: string;
  /**
   * Whether to show "Inbox" button. Adding this doesn't guarantee showing Inbox because it also depends on other things.
   * @default false
   */
  showInbox?: boolean;
  /** Renders the content of the hamburger (navigation) menu. */
  renderHamburgerContent?: () => React.ReactNode;
  /**
   * Use this flag to show the hamburger menu with standard client navigation items, and
   * renderHamburgerContent will be ignored in this case.
   * @default false
   */
  useClientHamburgerContent?: boolean;
  /**
   * Whether to disable interactions in TopNavBar
   * When this prop set to true, TopNavBar will
   * 1. ignore useClientHamburgerContent and renderHamburgerContent, i.e. hide hamburger menu
   * 2. remove link on zenefits logo
   * 3. hide app title, omni search, inbox link, and help link
   * 4. hide "My Accounts" link in avatar dropdown
   * @default false
   */
  disabled?: boolean;
  /**
   * Omni search is automatically hidden for console and partner users, and when children is passed to TopNavBar.
   * Use this to hide search for other cases.
   * @default false
   */
  hideSearch?: boolean;
}

type AllProps = ChildDataProps<Props, UserSettingsQueryResult>;

class TopNavBar extends Component<AllProps> {
  static defaultProps = {
    disabled: false,
    hideSearch: false,
    showInbox: false,
    useClientHamburgerContent: false,
  };
  render() {
    const {
      children,
      contentAlignLeft,
      data,
      disabled,
      dropdownItems,
      hasShadow,
      hideSearch,
      isFullWidth,
      productTitleDefault,
      productTitleKey,
      renderHamburgerContent,
      showInbox: showInboxProp,
      useClientHamburgerContent,
    } = this.props;

    if (data.loading) {
      return <AbsoluteNavPlaceholder />;
    }

    const dashboard = data.dashboard;

    const permission = dashboard && dashboard.permission;
    const switches = dashboard && dashboard.switches;
    const canSeeDemoCenter = dashboard && dashboard.canSeeDemoCenter;
    const employee = dashboard && dashboard.employee;
    const user = dashboard && dashboard.user;
    const isMTAUser = dashboard && dashboard.isMTAUser;
    const isMTAPartnerUser = dashboard && dashboard.isMTAPartnerUser;
    const isConsoleUser = dashboard && dashboard.isConsoleUser;
    const isSpoofing = dashboard && dashboard.isSpoofing;
    const isTrialCompany = dashboard && dashboard.isTrialCompany;
    const isTrialPasswordless = dashboard && dashboard.isTrialPasswordless;
    /**
     * isTrialSales means it's a trial account with password, for example, account executives use these accounts.
     * When isTrialCompany is true, either isTrialPassowrdless or isTrialSales will be true.
     */
    const isTrialSales = dashboard && dashboard.isTrialSales;
    const partnerCompanyId = dashboard && _.get(dashboard, 'partner.companyId');
    const regEmployeeCount = dashboard && _.get(dashboard, 'company.regEmployeeCount');
    const shouldContactSales = regEmployeeCount && regEmployeeCount > 10;

    const isAdmin = permission && permission.isAdmin;
    const isAdminOrEmployeeUser = !isConsoleUser && !isMTAPartnerUser;
    const isInTrialAsEE = isTrialCompany && !isAdmin && window.sessionStorage.getItem('isAdminInEE');
    const isInTrialAsEEOrDisabled = isInTrialAsEE || disabled;

    const helpLink = partnerCompanyId ? `/dashboard?company=${partnerCompanyId}/#/support` : `/dashboard/#/support`;
    const { first_name = undefined, last_name = undefined, photoUrl = undefined } = employee || user || {};

    let showHamburger: boolean = false;
    const showOmniSearch = !hideSearch && !children && isAdminOrEmployeeUser && !isInTrialAsEEOrDisabled;
    const showMyAccounts = !disabled && isMTAUser && isAdminOrEmployeeUser;
    const showAccountSettings = !disabled && !isSpoofing && !isTrialCompany && isAdminOrEmployeeUser;
    const showProductTitle = !isInTrialAsEEOrDisabled;
    const showInbox = showInboxProp && !isInTrialAsEEOrDisabled;
    const showHelp = !isInTrialAsEEOrDisabled && (!isTrialCompany || isTrialSales);
    const showAvatarDropdown = !isInTrialAsEE;
    const linkOnLogo = !isInTrialAsEEOrDisabled;

    if (useClientHamburgerContent) {
      // Using standard hamburger menu
      showHamburger = !(isInTrialAsEE || disabled);
    } else if (renderHamburgerContent) {
      showHamburger = !disabled;
    }

    const drawerChildren =
      showHamburger &&
      (useClientHamburgerContent ? <ClientDrawerContent /> : renderHamburgerContent && renderHamburgerContent());

    // TopNavBar will render a company-hub specific dropdown for the product title if (isCompanyHub === true)
    // TODO: remove "&& false" to enable conditional rendering for company-hub
    const isCompanyHub = showMyAccounts && false;

    /**
     * logic for demo-center
     */
    const isDemoCenterSwitchOn = switches && switches[demoCenterSwitch];
    const isDemoCenter = isDemoCenterSwitchOn && canSeeDemoCenter;

    const productTitleText = isDemoCenter ? (
      <TextInline>Demo Center</TextInline>
    ) : productTitleKey ? (
      <TextInline textKey={productTitleKey} textDefault={productTitleDefault} />
    ) : productTitleDefault ? (
      <TextInline>{productTitleDefault}</TextInline>
    ) : null;

    let productTitle;
    const showProductTitleWithDropdown = isDemoCenter || isCompanyHub;

    if (showProductTitleWithDropdown) {
      // demo center has higher priority than company hub
      const productTitleWithDropdownMode: ProductTitleWithDropdownMode = isDemoCenter ? 'demoCenter' : 'companyHub';

      productTitle = (
        <ProductTitleWithDropdown productTitleText={productTitleText} mode={productTitleWithDropdownMode} />
      );
    } else {
      // Default product title is just text
      productTitle = productTitleText ? (
        <Flex align="center" fontStyle="headings.s" color="secondary.a">
          {productTitleText}
        </Flex>
      ) : null;
    }

    /**
     * exitType determines whether to show "Log Out" or "Start Your Real Account" in avatar dropdown
     */
    const exitType: ExitType = isTrialCompany && isTrialPasswordless ? exitTypes.startRealAccount : exitTypes.logout;

    return (
      <AbsoluteNavPlaceholder>
        <AbsoluteNav hasShadow={hasShadow}>
          <AppContentContainerFlex w={1} align="center" justify="space-between" isFullWidth={isFullWidth}>
            {/* left column */}
            <Flex align="center">
              <RenderFor breakpoints={[true]}>
                {showHamburger ? (
                  <Drawer openDrawerUsingLogo>{drawerChildren}</Drawer>
                ) : linkOnLogo ? (
                  <Link href={dashboardLink}>{smallLogo}</Link>
                ) : (
                  smallLogo
                )}
              </RenderFor>

              <RenderFor breakpoints={[false, true, true, true, true]}>
                {showHamburger && <Drawer>{drawerChildren}</Drawer>}

                {linkOnLogo ? (
                  <Link href={dashboardLink} color="primary.a">
                    {bigLogo}
                  </Link>
                ) : (
                  bigLogo
                )}

                {showProductTitle && productTitle && <Separator />}
              </RenderFor>

              {/* TODO: refactor productTitle to a component */}
              {showProductTitle && productTitle}

              <HideFor breakpoints={[true]}>{contentAlignLeft && children}</HideFor>
            </Flex>

            {/* right column */}

            {isDemoCenter ? (
              <DemoCenterRightColumn shouldContactSales={shouldContactSales} />
            ) : (
              <Flex align="center">
                <HideFor breakpoints={[true]}>
                  {children && !contentAlignLeft && <Box mr={4}>{children}</Box>}

                  {showOmniSearch && (
                    <Box mr={4}>
                      <OmniSearch />
                    </Box>
                  )}

                  {showInbox && (
                    <Link href="/dashboard/#/inbox-view" color="secondary.a" mr={4} fontSize__deprecated__doNotUse={1}>
                      Inbox
                    </Link>
                  )}
                </HideFor>

                {showHelp && (
                  <Link href={helpLink} color="secondary.a" mr={4} fontSize__deprecated__doNotUse={1}>
                    Help
                  </Link>
                )}

                {showAvatarDropdown ? (
                  <AvatarDropdown
                    firstName={first_name}
                    lastName={last_name}
                    photoUrl={photoUrl}
                    showInbox={showInbox}
                    showMyAccounts={showMyAccounts}
                    showAccountSettings={showAccountSettings}
                    dropdownItems={dropdownItems}
                    exitType={exitType}
                  />
                ) : (
                  <Button onClick={() => switchToAdmin()}>Switch back to Admin</Button>
                )}
              </Flex>
            )}
          </AppContentContainerFlex>
        </AbsoluteNav>
      </AbsoluteNavPlaceholder>
    );
  }
}

const userSettingsQuery = gql`
  query TopNavBarQuery {
    dashboard {
      id
      isMTAUser
      isMTAPartnerUser
      isConsoleUser
      isSpoofing
      isDemoAccount
      isTrialCompany
      isTrialPasswordless
      isTrialSales
      switches
      permission
      canSeeDemoCenter
      user {
        id
        first_name
        last_name
      }
      employee {
        id
        first_name
        last_name
        photoUrl
      }
      partner {
        id
        companyId
      }
      company {
        id
        regEmployeeCount
      }
    }
  }
`;

export default graphql<Props, UserSettingsQueryResult>(userSettingsQuery, {
  options: () => ({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  }),
})(TopNavBar);

function switchToAdmin() {
  window.location.replace('/accounts/switch-to-trial-admin/');
}
