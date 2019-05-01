import React from 'react';

import { Box, Flex, TextBlock } from 'zbase';
import { getEventLogger } from 'z-frontend-app-bootstrap';
import { Button, Link } from 'z-frontend-elements';
import { RenderFor } from 'z-frontend-theme';

import DaysLeft from './DaysLeft';
import { buyLink, tabletBreakpoints } from '../constants';

declare global {
  interface Window {
    drift: any;
  }
}

type DemoCenterRightColumnProps = {
  shouldContactSales: boolean;
};

class DemoCenterRightColumn extends React.Component<DemoCenterRightColumnProps> {
  constructor(props: any) {
    super(props);
  }

  contactSales() {
    getEventLogger().log('contact_sales_navbar');
    if (window.drift) {
      window.drift.api.startInteraction({ interactionId: 71135 });
    } else {
      console.error('drift not found');
    }
  }

  render() {
    const { shouldContactSales } = this.props;

    const ctaButton = shouldContactSales ? (
      <Box>
        <Button mode="primary" s="small" px={4} className="js-demo-center-nav-cta" onClick={this.contactSales} mr={3}>
          Contact Sales
        </Button>
      </Box>
    ) : (
      <Link href={buyLink}>
        <Button mode="primary" s="small" px={4} className="js-demo-center-nav-cta">
          Buy
          <RenderFor breakpoints={tabletBreakpoints}> Now</RenderFor>
        </Button>
      </Link>
    );

    return (
      <Flex align="center">
        <DaysLeft />

        {shouldContactSales ? (
          <RenderFor breakpoints={tabletBreakpoints}>
            <TextBlock ml={[4, 4, 4, 5, 5]} fontStyle="headings.s" color="secondary.a">
              Sales: 888-249-3263
            </TextBlock>
          </RenderFor>
        ) : (
          ''
        )}

        <Flex ml={[3, 5, 4, 5, 5]} align="center">
          {ctaButton}
        </Flex>
      </Flex>
    );
  }
}

export default DemoCenterRightColumn;
