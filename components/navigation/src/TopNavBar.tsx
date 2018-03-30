import React, { Component } from 'react';
import { compose, graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';

import { Flex, FlexProps, Box, P, Image, Icon, Text } from 'zbase';
import { styled, theme } from 'z-frontend-theme';
import { color, zIndex } from 'z-frontend-theme/utils';
import { Link, ButtonDropdown, Avatar } from 'z-frontend-forms';

import { AppContentContainerFlex } from './AppContentContainer';

const AbsoluteNav = styled<FlexProps & { hasShadow?: boolean }>(Flex)`
  position: fixed;
  height: 64px;
  left: 0;
  right: 0;
  top: 0;
  z-index: ${props => 1 + zIndex('fixed')(props)};
  background-color: ${color('grayscale.white')};
  color: ${color('secondary.a')};
  box-shadow: ${props => (props.hasShadow ? '0 2px 6px 0 rgba(18, 52, 102, 0.1)' : '')};
`;

const AbsoluteNavPlaceholder = styled(Box)`
  height: 64px;
`;

declare type UserSettingsQueryResult = {
  dashboard: any; // TODO: these types currently live in talent
  currentZenefitsEmployee: any;
};
declare type AllProps = {
  dropdownItems?: any;
  data?: QueryProps & UserSettingsQueryResult;
  hasShadow?: boolean;
  /**
   * By default children are aligned to the right in the nav bar. Set this to align children to the left.
   */
  contentAlignLeft?: boolean;
  /**
   * Product title key in locale data. e.g. "nav.productTitle"
   */
  productTitleKey?: string;
  /**
   * Default product title. This prop is required.
   */
  productTitleDefault: string;
};

class TopNavBar extends Component<AllProps> {
  render() {
    const {
      children,
      dropdownItems,
      data,
      hasShadow,
      contentAlignLeft,
      productTitleDefault,
      productTitleKey,
    } = this.props;
    const employee = !data.loading && data.dashboard && data.dashboard.employee;
    const user = !data.loading && data.currentZenefitsEmployee && data.currentZenefitsEmployee.user;
    const { first_name = undefined, last_name = undefined, photoUrl = undefined } = employee || user || {};
    return (
      <AbsoluteNavPlaceholder>
        <AbsoluteNav hasShadow={hasShadow}>
          <AppContentContainerFlex w={1} align="center" justify="space-between">
            <Flex align="center">
              <Link href="/dashboard" color="primary.a">
                <Flex align="center">
                  <Image w={12} src={theme.images.logo} />
                  <P fontStyle="paragraphs.xl" ml={2}>
                    zenefits
                  </P>
                </Flex>
              </Link>
              <Box ml={3} pl={3} borderLeft borderColor="primary.a" f={2}>
                <Flex justify="space-between" align="center">
                  {productTitleKey ? (
                    <Text textKey={productTitleKey} textDefault={productTitleDefault} />
                  ) : (
                    <Text>{productTitleDefault}</Text>
                  )}
                  {contentAlignLeft && children}
                </Flex>
              </Box>
            </Flex>
            <Flex align="center">
              {!contentAlignLeft && <Box mr={4}>{children}</Box>}
              <Link href="/dashboard/#/support" color="secondary.a" mr={5} f={1}>
                Help
              </Link>
              <ButtonDropdown
                target={
                  <Flex align="center" style={{ cursor: 'pointer' }}>
                    <Avatar firstName={first_name} lastName={last_name} photoUrl={photoUrl} s="small" />
                    <Icon iconName="chevron-down" ml={2} />
                  </Flex>
                }
                popperPlacement="bottom-end"
                // TODO: popper is too close to target
                // not quite right: moves left/right when bottom placed
                // popperModifiers={{ offset: { offset: '20%p' } }}
              >
                {dropdownItems}
              </ButtonDropdown>
            </Flex>
          </AppContentContainerFlex>
        </AbsoluteNav>
      </AbsoluteNavPlaceholder>
    );
  }
}

const userSettingsQuery = gql`
  query {
    dashboard(id: "me") {
      employee {
        id
        first_name
        last_name
        photoUrl
      }
    }
    currentZenefitsEmployee {
      user {
        first_name
        last_name
      }
    }
  }
`;

export default compose(
  graphql<UserSettingsQueryResult, {}, AllProps>(userSettingsQuery, {
    options: () => ({
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    }),
  }),
)(TopNavBar) as typeof TopNavBar;
