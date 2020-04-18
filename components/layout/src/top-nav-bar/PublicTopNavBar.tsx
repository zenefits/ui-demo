import React, { ReactNode } from 'react';

import { Flex } from 'zbase';
import { Render } from 'z-frontend-theme';
import { Link } from 'z-frontend-elements';

import TopNavContainer from './components/TopNavBarContainer';
import { bigLogo, smallLogo, Separator } from './TopNavBar';
import ProductTitle from './components/ProductTitle';

type PublicTopNavBarProps = {
  hasShadow?: boolean;
  isFullWidth?: boolean;
  productTitleKey?: string;
  productTitleDefault: string;
  rightColumn?: ReactNode;
  leftColumn?: ReactNode;
};

const PublicTopNavBar: React.FunctionComponent<PublicTopNavBarProps> = ({
  hasShadow,
  isFullWidth,
  productTitleDefault,
  productTitleKey,
  leftColumn,
  rightColumn,
}) => {
  return (
    <TopNavContainer
      hasShadow={hasShadow}
      isFullWidth={isFullWidth}
      leftColumn={
        leftColumn || (
          <Flex align="center">
            <Render forBreakpoints={[true]}>
              {smallLogo}

              <ProductTitle
                productTitleKey={productTitleKey}
                productTitleDefault={productTitleDefault}
                isCompanyHub={false}
                isDemoCenter={false}
              />
            </Render>

            <Render forBreakpoints={[false, true, true, true, true]}>
              {bigLogo}

              <Separator />

              <ProductTitle
                productTitleKey={productTitleKey}
                productTitleDefault={productTitleDefault}
                isCompanyHub={false}
                isDemoCenter={false}
              />
            </Render>
          </Flex>
        )
      }
      rightColumn={rightColumn || <Link fontStyle="paragraphs.m">Sign Up</Link>}
    />
  );
};

export default PublicTopNavBar;
