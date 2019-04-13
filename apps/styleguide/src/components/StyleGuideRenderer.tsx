import React, { Component } from 'react';

import { styled, theme, APP_STYLE_ROOT_CLASS, ThemeProvider } from 'z-frontend-theme';
import { Box, Flex, Image, TextBlock } from 'zbase';
import { Link } from 'z-frontend-elements';
import { color, space, zIndex } from 'z-frontend-theme/utils';

const topNavHeight = 64;
const sideNavWidth = 225;

const SimpleTopContainer = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex('fixed')};
  height: ${topNavHeight}px;
  background-color: ${color('secondary.a')};
  color: ${color('grayscale.white')};
  width: 100%;
  padding: 0 ${space(3)};
`;

// TODO: semantically <nav>
const SideNav = styled(Box)`
  width: 100%;
  overflow: auto;
  margin-top: ${topNavHeight}px;
  background: ${color('grayscale.white')};
  border-bottom: 1px solid ${color('grayscale.f')};

  @media (min-width: ${props => props.theme.breakpoints[0]}em) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${sideNavWidth}px;
    border-right: 1px solid ${color('grayscale.f')};
  }
`;

class SimpleTopNav extends React.Component {
  render() {
    return (
      <SimpleTopContainer align="center">
        <Flex align="center">
          <Image w={12} src={theme.images.logo} />
          <TextBlock fontStyle="paragraphs.xl" ml={2} color="grayscale.white">
            zenefits
          </TextBlock>
        </Flex>
        <Box borderLeft borderColor="avatar.c" ml={3} pl={3} fontStyle="headings.s">
          <Link href="#!/Introduction" color="grayscale.white">
            {this.props.children}
          </Link>
        </Box>
      </SimpleTopContainer>
    );
  }
}

const PageContainer = styled.main`
  width: 100%;
  padding: 80px ${space(3)} 0;
  max-width: ${1300 - sideNavWidth}px;
  margin-left: ${sideNavWidth}px;

  @media (max-width: ${props => props.theme.breakpoints[0]}em) {
    max-width: ${1000 - sideNavWidth}px;
    margin-left: 0;
  }
`;

interface StyleGuideProps {
  title: string;
  homepageUrl: string;
  children: React.ReactChildren;
  toc: React.ReactNode;
  hasSidebar?: boolean;
}

// override default to provide our theme and add our TopNav
// https://github.com/styleguidist/react-styleguidist/blob/master/src/rsg-components/StyleGuide/StyleGuideRenderer.js
class StyleGuideRenderer extends Component<StyleGuideProps> {
  render() {
    const { children, toc, hasSidebar } = this.props;
    return (
      <ThemeProvider>
        <div className={APP_STYLE_ROOT_CLASS}>
          <SimpleTopNav>Design System</SimpleTopNav>
          {hasSidebar && <SideNav p={3}>{toc}</SideNav>}
          <PageContainer>{children}</PageContainer>
        </div>
      </ThemeProvider>
    );
  }
}

export default StyleGuideRenderer;
