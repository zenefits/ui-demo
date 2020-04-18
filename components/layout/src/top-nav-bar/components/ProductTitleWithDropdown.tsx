import React from 'react';

import { Icon } from 'zbase';
import { styled, Render } from 'z-frontend-theme';
import { Button, ButtonDropdown } from 'z-frontend-elements';
import { color } from 'z-frontend-theme/utils';

import { ProductTitleWithDropdownMode, UserInfoBusinessCase } from '../types';
import DemoCenterDropdown from './DemoCenterDropdown';
import CompanyHubDropdown from './CompanyHubDropdown';

type ProductTitleWithDropdownProps = {
  productTitleText: JSX.Element;
  mode: ProductTitleWithDropdownMode;
  userInfo: UserInfoBusinessCase;
};

// Overwrite the default style for Button so that the text color doesn't change
const StyledButton = styled(Button)`
  &.simulate-focus,
  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    color: ${color('secondary.a')};
  }
`;

class ProductTitleWithDropdown extends React.Component<ProductTitleWithDropdownProps> {
  render() {
    const { productTitleText, mode, userInfo } = this.props;

    const buttonDropdownTarget = getButtonDropdownTarget(productTitleText);

    return (
      <ButtonDropdown
        target={buttonDropdownTarget}
        closeOnPopperClick={false}
        popperPlacement="bottom"
        className="js-walkme-productTitle-dropdown"
        popperModifiers={{
          flip: {
            behavior: ['bottom', 'top'],
          },
          preventOverflow: {
            boundariesElement: 'viewport',
            escapeWithReference: false,
          },
        }}
      >
        {mode === 'demoCenter' && <DemoCenterDropdown userInfo={userInfo} />}

        {mode === 'companyHub' && <CompanyHubDropdown />}
      </ButtonDropdown>
    );
  }
}

export default ProductTitleWithDropdown;

function getButtonDropdownTarget(productTitleText: JSX.Element) {
  return (
    <StyledButton
      mode="transparent"
      fontStyle="headings.s"
      color="secondary.a"
      aria-level={1}
      role="heading"
      data-testid="ProductTitle"
    >
      {productTitleText}
      <Render forBreakpoints={[false, true, true, true]}>
        <Icon iconName="chevron-down" ml={2} />
      </Render>
    </StyledButton>
  );
}
