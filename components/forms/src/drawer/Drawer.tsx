import React, { Component } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Box, Flex, Icon, Image, P } from 'zbase';
import { Card } from 'z-frontend-layout';
import { css, styled, theme } from 'z-frontend-theme';
import { color, fontStyles, space, zIndex } from 'z-frontend-theme/utils';

import Link, { LinkProps } from '../Link';

const Fragment = (React as any).Fragment;

const StyledBackdrop = styled(Box)`
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in;
  opacity: 0;
`;

const StyledCard = styled(Card)`
  background-color: ${color('grayscale.white')};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  border-radius: unset;
  transform: translateX(-100%);
  transition: all 0.2s ease-in;
`;

const DrawerContainer = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  visibility: hidden;
  z-index: ${props => 1 + zIndex('fixed')(props)};

  &.show {
    visibility: visible;

    > ${StyledBackdrop} {
      transition: all 0.3s ease-out;
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }

    /* stylelint-disable no-duplicate-selectors */
    > ${StyledCard} {
      /* stylelint-enable no-duplicate-selectors */
      transform: none;
      transition: all 0.3s ease-out;
    }
  }
`;

const StyledCardRow = styled(Card.Row)`
  overflow-y: auto;
  height: 100%;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  ${props => fontStyles('controls.l')};
  color: ${color('grayscale.e')};
`;

interface DrawerComponentProps {
  title?: string;
  show?: boolean;
}

interface DrawerComponentState {
  isVisible: boolean;
}

class DrawerComponent extends Component<DrawerComponentProps, DrawerComponentState> {
  backdropEl: HTMLElement;
  documentEventHandlers: [string, (any) => void][];

  constructor(props) {
    super(props);
    this.state = { isVisible: props.show || false };
    this.documentEventHandlers = [
      ['mousedown', this.onOuterAction],
      ['touchstart', this.onOuterAction],
      ['click', this.onOuterAction],
    ];
  }

  componentWillMount() {
    this.documentEventHandlers.forEach(([eventName, handlerFn]) => {
      window.document.addEventListener(eventName, handlerFn);
    });
  }
  componentWillUnmount() {
    this.documentEventHandlers.forEach(([eventName, handlerFn]) => {
      window.document.removeEventListener(eventName, handlerFn);
    });
  }

  onOuterAction = e => {
    if (this.backdropEl.contains(e.target) && this.state.isVisible) {
      this.closeDrawer();
    }
  };

  closeDrawer = () => {
    this.setState({
      isVisible: false,
    });
  };

  openDrawer = () => {
    this.setState({
      isVisible: true,
    });
  };

  render() {
    const { title, children } = this.props;
    return (
      <Fragment>
        <StyledIcon iconName="menu" onClick={this.openDrawer} />
        <DrawerContainer className={this.state.isVisible ? 'show' : ''}>
          <StyledBackdrop
            innerRef={backdropEl => {
              this.backdropEl = backdropEl;
            }}
          />
          <StyledCard>
            <Card.Header>
              <Flex align="center">
                <Image w={12} src={theme.images.logo} />
                <P fontStyle="paragraphs.xl" color="secondary.a" ml={2}>
                  zenefits
                </P>
                <StyledIcon iconName="close" onClick={this.closeDrawer} ml={6} />
              </Flex>
            </Card.Header>
            <StyledCardRow padded={false}>
              <P fontStyle="paragraphs.m" color="grayscale.d" px={4} pt={4} mb={3}>
                {title}
              </P>
              {children}
            </StyledCardRow>
          </StyledCard>
        </DrawerContainer>
      </Fragment>
    );
  }
}

const activeClassName = 'active-class';
const drawerItemCss = css`
  ${fontStyles('paragraphs.s')};
  color: ${color('grayscale.d')};
  display: block;
  padding: ${space(2)} ${space(4)};
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: ${color('secondary.c')};
    color: ${color('grayscale.c')};
    outline: none;
  }

  &:link,
  &:visited {
    color: ${color('grayscale.d')};
  }

  &:active {
    background-color: ${color('tertiary.c')};
    color: ${color('link.hover')};
  }

  &.${activeClassName} {
    color: ${color('grayscale.black')};
  }
`;

const getItemComponent = (StyledComponent, props) => {
  return <StyledComponent {...props}>{props.children}</StyledComponent>;
};

const DrawerLink = (props: LinkProps & { active?: boolean }) => {
  return getItemComponent(
    styled(Link).attrs({ className: props => (props.active ? activeClassName : '') })`
      ${drawerItemCss};
    `,
    props,
  );
};

const DrawerNavLink = (props: NavLinkProps) => {
  return getItemComponent(
    styled(NavLink).attrs({ activeClassName })`
      ${drawerItemCss};
    `,
    props,
  );
};

const DrawerSection = ({ title = '', children }) => {
  return (
    <Box mb={1} mt={3}>
      <P fontStyle="headings.xs" color="grayscale.c" px={4} mb={2}>
        {title}
      </P>
      {children}
    </Box>
  );
};

declare type Drawer = typeof DrawerComponent & {
  Link: typeof DrawerLink;
  NavLink: typeof DrawerNavLink;
  Section: typeof DrawerSection;
};

const Drawer = DrawerComponent as Drawer;
Drawer.Link = DrawerLink;
Drawer.NavLink = DrawerNavLink;
Drawer.Section = DrawerSection;

export default Drawer;
