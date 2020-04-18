import React, { Component } from 'react';
import { useQuery } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import { get } from 'lodash';

import { Box, Flex, Image, TextInline } from 'zbase';
import { styled, theme, useUpdateThemePropWhileMounted, Hide, Render } from 'z-frontend-theme';
import { color, px, space } from 'z-frontend-theme/utils';
import { Button, Link } from 'z-frontend-elements';
import { getEventLogger, ErrorBoundary } from 'z-frontend-app-bootstrap';

import { Drawer } from '../../index';
import ClientDrawerContent from '../client-nav-content/ClientDrawerContent';
import DemoCenterRightColumn from './components/DemoCenterRightColumn';

import OmniSearch from './components/OmniSearch';
import AvatarDropdown from './components/AvatarDropdown';
import ProductTitle from './components/ProductTitle';
import ProductNotificationsIcon from './components/ProductNotificationsIcon';
import { buyLink, demoCenterSwitch, freePayrollPromoCode, freePayrollPromoSwitch } from './constants';
import { CompanyNameQuery, TopNavBarQuery } from '../gqlTypes';
import { topNavQuery } from './TopNavBarQueries';
import { redirectIfNecessary } from './components/utils/prerequisiteRedirectUtil';
import TopNavBarContainer, { AbsoluteNav, AbsoluteNavPlaceholder } from './components/TopNavBarContainer';

const dashboardLink = '/dashboard/#/';
const helpLink = '/app/support-flow/#/home';
const anonymousHelpLink = 'https://secure.zenefits.com/public/#/contact-us/login-issues';

const AbsoluteNavBanner = styled(AbsoluteNav)`
  background-color: ${color('affirmation.c')};
  border-top: inherit;
  color: ${color('affirmation.a')};
  justify-content: center;
  align-items: center;
`;

const NavBannerLink = styled(Link)`
  color: ${color('affirmation.a')} !important;
`;

const StyledLogoImage = styled(Image)`
  height: 24px;
`;

export const Separator = styled(Box)`
  height: 24px;
  border-left: 1px solid ${color('primary.a')};
  margin: 0 ${space(3)};
`;

export const smallLogo = (
  <Image w={12} src={theme.images.logo} mr={3} alt="Zenefits" className="js-walkme-top-nav-logo" />
);

export const bigLogo = (
  <Flex align="center" w={103}>
    <StyledLogoImage
      src="https://secure.zenefits.com/static/img/rebranding/zenefits-logo-header-pink.svg"
      alt="Zenefits"
      className="js-walkme-top-nav-logo"
    />
  </Flex>
);

const companyNameQuery = gql`
  query CompanyNameQuery($companyId: ID!) {
    company(id: $companyId) {
      id
      name
    }
  }
`;

// This is currently in this file to avoid a circular dep, but would be good to move some of the sub components like AbsoluteNav to another file so we can move this banner out as well.
const PromoBanner: React.FC = () => {
  useUpdateThemePropWhileMounted('topNavHeightContainer', theme => px(theme.topNavHeightInPx * 2));

  return (
    <AbsoluteNavPlaceholder>
      <AbsoluteNavBanner>
        <NavBannerLink href={buyLink}>
          <TextInline fontStyle="paragraphs.l" color="inherit">
            <b>We’re here to help &hearts; Payroll is now completely free for a year with an annual contract.</b>
          </TextInline>
        </NavBannerLink>
      </AbsoluteNavBanner>
    </AbsoluteNavPlaceholder>
  );
};

// TO-DO:  The productTitleKey/Default api should be simplified
export interface TopNavBarProps {
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
  /**
   * ID of the company whose name will be displayed to the right of Zenefits logo
   */
  companyId?: string;
  /**
   * Indicates if we're on an Ember page. This allows us to hide the PromoBanner since Ember can't account today for the
   * extra height
   */
  isEmber?: boolean;
}

type AllProps = Omit<TopNavBarProps, 'companyId'> & {
  data: TopNavBarQuery.Query;
  companyName?: string;
} & RouteComponentProps<{}>;

type TopNavState = { isDrawerOpen: boolean };

class TopNavBar extends Component<AllProps, TopNavState> {
  static defaultProps = {
    disabled: false,
    hideSearch: false,
    isEmber: false,
    showInbox: false,
    useClientHamburgerContent: false,
  };

  state = {
    isDrawerOpen: false,
  };

  openDrawer = () => this.setState({ isDrawerOpen: true });

  closeDrawer = () => this.setState({ isDrawerOpen: false });

  render() {
    const {
      children,
      contentAlignLeft,
      data,
      disabled,
      dropdownItems,
      hasShadow,
      hideSearch,
      isEmber,
      isFullWidth,
      productTitleDefault,
      productTitleKey,
      renderHamburgerContent,
      showInbox: showInboxProp,
      useClientHamburgerContent,
      companyName,
    } = this.props;

    const { dashboard } = data;

    const permission = dashboard && dashboard.permission;
    const switches = dashboard && dashboard.switches;
    const canSeeDemoCenter = dashboard && dashboard.canSeeDemoCenter;
    const isSelfServeTrial = dashboard && dashboard.isSelfServeTrial;
    const employee = dashboard && dashboard.employee;
    const employeeId = employee && employee.id;
    const loggedInCompanyId = dashboard && dashboard.company && dashboard.company.id;
    const employeeNumber = employee && employee.employeeNumber;
    const user = dashboard && dashboard.user;
    const isMTAUser = dashboard && dashboard.isMTAUser;
    const isMTAPartnerUser = dashboard && dashboard.isMTAPartnerUser;
    const isConsoleUser = dashboard && dashboard.isConsoleUser;
    const isSpoofing = dashboard && dashboard.isSpoofing;
    const isTrialCompany = dashboard && dashboard.isTrialCompany;
    const userHash = dashboard && dashboard.userIntercomHash;
    /**
     * isTrialSales means it's a trial account with password, for example, account executives use these accounts.
     * When isTrialCompany is true, either isTrialPassowrdless or isTrialSales will be true.
     */
    const isTrialSales = dashboard && dashboard.isTrialSales;
    const trialHasFreeLimitedCompany = dashboard && dashboard.trialHasFreeLimitedCompany;
    const companyTypeIsDemo = dashboard && dashboard.companyTypeIsDemo;

    const regEmployeeCount = dashboard && get(dashboard, 'company.regEmployeeCount');
    const shouldContactSales = !isSelfServeTrial && regEmployeeCount && regEmployeeCount > 10;

    const isAdmin = permission && permission.isAdmin;
    const isAdminOrEmployeeUser = !isConsoleUser && !isMTAPartnerUser;
    const isInTrialAsEE = isTrialCompany && !isAdmin && window.sessionStorage.getItem('isAdminInEE');
    const isInTrialAsEEOrDisabled = isInTrialAsEE || disabled;

    const { first_name = undefined, last_name = undefined } = employee || user || {};
    const { photoUrl = undefined } = employee || {};

    let showHamburger: boolean = false;
    const showOmniSearch =
      !hideSearch && !children && isAdminOrEmployeeUser && !isInTrialAsEEOrDisabled && !isConsoleUser;
    const showMyAccounts = !disabled && isMTAUser && isAdminOrEmployeeUser;
    const showAccountSettings = !disabled && !isSpoofing && !isTrialCompany && isAdminOrEmployeeUser;
    const showInbox = showInboxProp && !isInTrialAsEEOrDisabled && !isConsoleUser;
    const showHelp = !isInTrialAsEEOrDisabled && (!isTrialCompany || isTrialSales) && !isConsoleUser;
    const showAvatarDropdown = !isInTrialAsEE;
    const linkOnLogo = !isInTrialAsEEOrDisabled;
    const onCompanyHub = window.location.href.includes('company-hub');

    const redirects = data.prerequisiteRedirect || [];
    redirectIfNecessary(redirects, window.location.pathname, this.props.location.pathname);

    if (useClientHamburgerContent) {
      // Using standard hamburger menu
      showHamburger = !(isInTrialAsEE || disabled) && !isConsoleUser;
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

    const isFreePayrollPromoSwitchActive = switches && switches[freePayrollPromoSwitch];
    const hasTrialPromoCode = dashboard && dashboard.trialPromoCode === freePayrollPromoCode;
    const validRoute = __APP_NAME__ !== 'boot' || window.document.location.hash === '#/';
    const hasPromoBanner = isFreePayrollPromoSwitchActive && hasTrialPromoCode && validRoute && !isEmber;
    const showProductTitle = !isInTrialAsEEOrDisabled && (isDemoCenter || productTitleKey || productTitleDefault);

    const userInfo = {
      companyName: companyName || dashboard?.company?.name,
      firstName: first_name,
      lastName: last_name,
      userEmail: (user && user.email) || '',
    };

    const productTitleProps = {
      isDemoCenter,
      isCompanyHub,
      productTitleKey,
      productTitleDefault,
      userInfo,
    };

    const companyNameFlex = companyName && <Flex align="center">{companyName}</Flex>;

    return (
      <>
        {hasPromoBanner && <PromoBanner />}
        <TopNavBarContainer
          hasShadow={hasShadow}
          hasBannerAbove={hasPromoBanner}
          isFullWidth={isFullWidth}
          leftColumn={
            <Flex align="center">
              <Render forBreakpoints={[true]}>
                {showHamburger ? (
                  <Drawer.OpenButton onOpen={this.openDrawer} openDrawerUsingLogo />
                ) : linkOnLogo ? (
                  <Link href={dashboardLink}>{smallLogo}</Link>
                ) : (
                  smallLogo
                )}

                {/* For mobile, show either company name or product title */}
                {companyNameFlex || (showProductTitle && <ProductTitle {...productTitleProps} />)}
              </Render>

              <Render forBreakpoints={[false, true, true, true, true]}>
                {showHamburger && <Drawer.OpenButton onOpen={this.openDrawer} />}

                {linkOnLogo ? (
                  <Link href={dashboardLink} color="primary.a">
                    {bigLogo}
                  </Link>
                ) : (
                  bigLogo
                )}

                {companyNameFlex && <Separator />}

                {companyNameFlex}

                {showProductTitle && <Separator />}

                {showProductTitle && <ProductTitle {...productTitleProps} />}
              </Render>

              <Hide forBreakpoints={[true]}>{contentAlignLeft && children}</Hide>
            </Flex>
          }
          rightColumn={
            <>
              {isDemoCenter ? (
                <DemoCenterRightColumn
                  shouldContactSales={shouldContactSales}
                  firstName={first_name}
                  lastName={last_name}
                  employeeId={employeeId}
                  companyId={loggedInCompanyId}
                  employeeNumber={employeeNumber}
                  photoUrl={photoUrl}
                  userEmail={user && user.email}
                  companyTypeIsDemo={companyTypeIsDemo}
                  trialHasFreeLimitedCompany={trialHasFreeLimitedCompany}
                  switches={switches}
                />
              ) : (
                <Flex align="center">
                  <Hide forBreakpoints={[true]}>
                    {children && !contentAlignLeft && <Box mr={4}>{children}</Box>}

                    {showOmniSearch && (
                      <Box mr={4}>
                        <OmniSearch />
                      </Box>
                    )}

                    {showInbox && (
                      <Link
                        href="/dashboard/#/inbox-view"
                        color="secondary.a"
                        mr={4}
                        fontSize__deprecated__doNotUse={1}
                      >
                        Inbox
                      </Link>
                    )}
                  </Hide>

                  {showHelp && (
                    <Link
                      href={onCompanyHub ? anonymousHelpLink : helpLink}
                      color="secondary.a"
                      mr={4}
                      fontSize__deprecated__doNotUse={1}
                    >
                      Help
                    </Link>
                  )}

                  <ProductNotificationsIcon userId={userHash} isAdmin={isAdmin} switches={switches} />

                  {showAvatarDropdown ? (
                    <AvatarDropdown
                      firstName={first_name}
                      lastName={last_name}
                      employeeId={employeeId}
                      companyId={loggedInCompanyId}
                      employeeNumber={employeeNumber}
                      photoUrl={photoUrl}
                      showInbox={showInbox}
                      showMyAccounts={showMyAccounts}
                      showAccountSettings={showAccountSettings}
                      dropdownItems={dropdownItems}
                      className="js-walkme-top-nav-avatar"
                    />
                  ) : (
                    <Button onClick={() => switchToAdmin()}>Switch back to Admin</Button>
                  )}
                </Flex>
              )}
            </>
          }
        />
        <Drawer show={this.state.isDrawerOpen} onClose={this.closeDrawer}>
          {drawerChildren}
        </Drawer>
      </>
    );
  }
}

const TopNavBarWithQueries: React.FunctionComponent<TopNavBarProps & RouteComponentProps<{}>> = props => {
  const { loading: topNavLoading, data: topNavData } = useQuery<TopNavBarQuery.Query>(topNavQuery, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'ignore',
  });

  const { loading: companyNameLoading, data: companyNameData } = useQuery<CompanyNameQuery.Query>(companyNameQuery, {
    errorPolicy: 'ignore',
    skip: !props.companyId,
    variables: { companyId: props.companyId },
  });

  if (topNavLoading || companyNameLoading) {
    return <AbsoluteNavPlaceholder />;
  }

  const companyName = companyNameData?.company?.name;
  return (
    <Hide inEmbeddedNativeView>
      <ErrorBoundary
        text="Sorry, we were unable to load the page header."
        onError={() => {
          getEventLogger().logError(new Error('Failed to load TopNavBar'));
        }}
      >
        <TopNavBar {...props} data={topNavData} companyName={companyName} />
      </ErrorBoundary>
    </Hide>
  );
};

export default withRouter<TopNavBarProps>(TopNavBarWithQueries);

function switchToAdmin() {
  window.location.replace('/accounts/switch-to-trial-admin/');
}
