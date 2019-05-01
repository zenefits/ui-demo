import React, { Component } from 'react';

import { Box, Flex } from 'zbase';

import OverviewHero from './OverviewHero';

interface OverviewLayoutProps {
  /**
   * Whether the hero is currently loading.
   * @default false
   */
  isHeroLoading?: boolean;
  /** The hero card title. */
  heroTitle: string;
  /** The hero card subtitle. */
  heroSubtitle?: string;
  /** Renders the hero card's call to action. Normally a button. */
  heroRender?: () => React.ReactNode;
  /** Renders main content. Normally one or more cards. */
  mainRender?: () => React.ReactNode;
  /** Renders secondary content that responsively appears either on the side or at the bottom. */
  sideRender?: () => React.ReactNode;
}

const columnSpacing = 3;
const rowSpacing = 3;

/**
 * A layout component that serves as an introduction and starting point for an app.
 */
class OverviewLayout extends Component<OverviewLayoutProps> {
  render() {
    const { isHeroLoading, heroTitle, heroSubtitle, heroRender, mainRender, sideRender } = this.props;
    const hero = (
      <OverviewHero title={heroTitle} subtitle={heroSubtitle} isLoading={isHeroLoading} data-testid="overview-hero">
        {heroRender && heroRender()}
      </OverviewHero>
    );
    return (
      <Flex wrap mx={-columnSpacing}>
        <Box px={columnSpacing} w={[1, null, 7 / 10]}>
          <Box pb={rowSpacing}>{hero}</Box>
          {mainRender && (
            <Box pb={rowSpacing} data-testid="overview-main">
              {mainRender()}
            </Box>
          )}
        </Box>
        {sideRender && (
          <Box px={columnSpacing} width={[1, null, 3 / 10]} data-testid="overview-side">
            <Box pb={rowSpacing}>{sideRender()}</Box>
          </Box>
        )}
      </Flex>
    );
  }
}

export default OverviewLayout;
