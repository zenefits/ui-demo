import React, { Component } from 'react';

import { Box, BoxProps, Flex, Heading, TextBlock } from 'zbase';
import { LoadingSpinner } from 'z-frontend-elements';

import { Card } from 'z-frontend-composites';

export interface OverviewHeroProps extends BoxProps {
  title: string;
  subtitle?: string;
  /**
   * Whether the hero is currently loading.
   * @default false
   */
  isLoading?: boolean;
}

/**
 * A component for introducing an app as part of the Overview layout.
 */
class OverviewHero extends Component<OverviewHeroProps> {
  render() {
    const { isLoading, title, subtitle, children, ...rest } = this.props;
    return (
      <Card p={5} {...rest}>
        {isLoading ? (
          <Flex style={{ minHeight: 100 }} justify="center" align="center">
            <LoadingSpinner s="large" />
          </Flex>
        ) : (
          <>
            <Box>
              <Heading level={2}>{title}</Heading>
              {subtitle && <TextBlock mt={2}>{subtitle}</TextBlock>}
            </Box>
            {children && <Box pt={3}>{children}</Box>}
          </>
        )}
      </Card>
    );
  }
}

export default OverviewHero;
