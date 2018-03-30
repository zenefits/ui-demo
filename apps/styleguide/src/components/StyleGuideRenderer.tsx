import React from 'react';
import { styled, theme, ThemeProvider } from 'z-frontend-theme';
import { Box, Flex, P, Image } from 'zbase';
import { Link } from 'z-frontend-forms';
import { color, space, zIndex } from 'z-frontend-theme/utils';

const topNavHeight = 64;
const sideNavWidth = 200;

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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  width: ${sideNavWidth}px;
  margin-top: ${topNavHeight}px;
  background: ${color('grayscale.white')};
  border-right: 1px solid ${color('grayscale.f')};
`;

const navBorderColor = '#264b74';

const StyledTitle = styled(Box)`
  border-left: 1px solid ${navBorderColor};
`;

class SimpleTopNav extends React.Component {
  render() {
    return (
      <SimpleTopContainer align="center">
        <Link href="/dashboard" color="grayscale.g">
          <Flex align="center">
            <Image w={12} src={theme.images.logo} />
            <P fontStyle="paragraphs.xl" ml={2}>
              zenefits
            </P>
          </Flex>
        </Link>
        <StyledTitle ml={3} pl={3} f={2}>
          {this.props.children}
        </StyledTitle>
      </SimpleTopContainer>
    );
  }
}

const PageContainer = styled.main`
  max-width: ${1200 - sideNavWidth}px;
  margin-left: ${sideNavWidth}px;
  padding: 80px ${space(3)} 0;
`;

interface StyleGuideProps {
  title: string;
  homepageUrl: string;
  children: React.ReactChildren;
  toc: React.ReactNode;
  hasSidebar?: boolean;
}

// override default to provide our theme and add our TopNav
class StyleGuideRenderer extends React.Component<StyleGuideProps> {
  render() {
    const { children, toc, hasSidebar } = this.props;
    return (
      <ThemeProvider>
        <Box>
          <SimpleTopNav>Style Guide</SimpleTopNav>
          <PageContainer>{children}</PageContainer>
          {hasSidebar && <SideNav p={3}>{toc}</SideNav>}
        </Box>
      </ThemeProvider>
    );
  }
}

export default StyleGuideRenderer;
