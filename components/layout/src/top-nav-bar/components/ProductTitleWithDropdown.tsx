import React from 'react';

import { Icon } from 'zbase';
import { styled } from 'z-frontend-theme';
import { Button, ButtonDropdown } from 'z-frontend-elements';
import { color } from 'z-frontend-theme/utils';

import { ProductTitleWithDropdownMode } from '../types';
import DemoCenterDropdown from './DemoCenterDropdown';
import CompanyHubDropdown from './CompanyHubDropdown';

type ProductTitleWithDropdownProps = {
  productTitleText: JSX.Element;
  mode: ProductTitleWithDropdownMode;
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
    const { productTitleText, mode } = this.props;

    const buttonDropdownTarget = getButtonDropdownTarget(productTitleText);

    return (
      <ButtonDropdown
        target={buttonDropdownTarget}
        closeOnPopperClick={false}
        popperPlacement="bottom"
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
        {mode === 'demoCenter' && <DemoCenterDropdown />}

        {mode === 'companyHub' && <CompanyHubDropdown />}
      </ButtonDropdown>
    );
  }
}

export default ProductTitleWithDropdown;

function getButtonDropdownTarget(productTitleText: JSX.Element) {
  return (
    <StyledButton mode="transparent" fontStyle="headings.s" color="secondary.a" aria-level={1} role="heading">
      {productTitleText}
      <Icon iconName="chevron-down" ml={2} />
    </StyledButton>
  );
}
