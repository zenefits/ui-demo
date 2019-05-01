import React, { Component, ComponentType, ReactNode, StatelessComponent } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Box, BoxProps, Flex, Image, TextBlock } from 'zbase';
import { css, styled, theme } from 'z-frontend-theme';
import { color, fontStyles, space, zIndex } from 'z-frontend-theme/utils';
import { Button, IconButton, Link, LinkProps } from 'z-frontend-elements';

import { Card } from 'z-frontend-composites';

// using .div here because need access to innerRef, and with styled(Box) innerRef returns a react component, not a node
const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in;
  opacity: 0;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  background-color: ${color('grayscale.white')};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  border-radius: unset;
  transform: translateX(-100%);
  transition: all 0.2s ease-in;
`;

const DrawerContainer = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  overflow: hidden;
  visibility: hidden;
  z-index: ${props => 1 + zIndex('fixed')(props)};

  &.show {
    visibility: visible;

    > ${/* sc-selector */ StyledBackdrop} {
      transition: all 0.3s ease-out;
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }

    > ${StyledCard} {
      transform: none;
      transition: all 0.3s ease-out;
    }
  }
`;

const StyledCardRow = styled(Card.Row)`
  overflow-y: auto;
  height: 100%;
  flex: 1;
`;

const Logo = styled(Image)`
  cursor: pointer;
`;

interface DrawerComponentProps extends BoxProps {
  /**
   * Whether to show the content initially
   * @default false
   */
  show?: boolean;
  /**
   * Whether to use Zenefits logo to replace hamburger menu icon as the button to open drawer
   * @default false
   */
  openDrawerUsingLogo?: boolean;
}

interface DrawerComponentState {
  isVisible: boolean;
}

function isLink(domNode: HTMLElement): boolean {
  return domNode.tagName.toLowerCase() === 'a';
}

const activeClassName = 'active-class';
const drawerItemCss = css`
  ${fontStyles('paragraphs.m')};
  display: block;
  padding: ${space(2)} ${space(4)};
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: ${color('secondary.c')};
    color: ${color('grayscale.c')};
    outline: none;
  }

  &:link {
    color: ${color('grayscale.d')};
  }

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

function getItemComponent<TProps extends { children?: ReactNode }>(
  StyledComponent: ComponentType<TProps>,
  props: TProps,
) {
  return <StyledComponent {...props}>{props.children}</StyledComponent>;
}

type DrawerLinkProps = LinkProps & { active?: boolean };

const DrawerLink: StatelessComponent<DrawerLinkProps> = ({ active, ...rest }: DrawerLinkProps) => {
  return getItemComponent<DrawerLinkProps>(
    styled<DrawerLinkProps>(Link).attrs<DrawerLinkProps, DrawerLinkProps>({
      className: props => (props.active ? activeClassName : ''),
    })`
      ${drawerItemCss};
    `,
    rest,
  );
};

const DrawerNavLink: StatelessComponent<NavLinkProps> = props => {
  return getItemComponent<NavLinkProps>(
    styled<NavLinkProps>(NavLink).attrs({ activeClassName })`
      ${drawerItemCss};
    `,
    props,
  );
};

type DrawerSectionProps = { title?: string };

const DrawerSection: StatelessComponent<DrawerSectionProps> = ({ title = '', children }) => {
  return (
    <Box mb={1} mt={3}>
      <TextBlock fontStyle="headings.xs" color="grayscale.c" px={4} mb={2}>
        {title}
      </TextBlock>
      {children}
    </Box>
  );
};

class Drawer extends Component<DrawerComponentProps, DrawerComponentState> {
  backdropEl: HTMLElement;
  documentEventHandlers: [string, (e: any) => void][];

  constructor(props: DrawerComponentProps) {
    super(props);
    this.state = { isVisible: props.show || false };
    this.documentEventHandlers = [
      ['mousedown', this.onOuterAction],
      ['touchstart', this.onOuterAction],
      ['click', this.onOuterAction],
    ];
  }

  static Link = DrawerLink;
  static NavLink = DrawerNavLink;
  static Section = DrawerSection;

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

  onOuterAction = (e: any) => {
    if (this.backdropEl && this.backdropEl.contains(e.target) && this.state.isVisible) {
      this.closeDrawer();
    }
  };

  onInnerAction = (e: any) => {
    if (isLink(e.target) && this.state.isVisible) {
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
    const { children, openDrawerUsingLogo } = this.props;
    return (
      <>
        {openDrawerUsingLogo ? (
          <Button mode="transparent" onClick={this.openDrawer}>
            <Logo w={12} src={theme.images.logo} />
          </Button>
        ) : (
          <IconButton
            iconName="menu"
            color="secondary.a"
            onClick={this.openDrawer}
            mr={1}
            aria-label="Open navigation menu"
          />
        )}

        <DrawerContainer className={this.state.isVisible ? 'show' : ''}>
          <StyledBackdrop
            innerRef={backdropEl => {
              this.backdropEl = backdropEl;
            }}
          />
          <StyledCard>
            <Card.Header flex="0">
              <Flex align="center" justify="space-between">
                <Link href="/dashboard">
                  <Flex align="center">
                    <Image w={12} src={theme.images.logo} />
                    <TextBlock fontStyle="paragraphs.xl" color="primary.a" ml={2}>
                      zenefits
                    </TextBlock>
                  </Flex>
                </Link>

                <IconButton
                  iconName="close"
                  color="text.light"
                  onClick={this.closeDrawer}
                  aria-label="Close navigation menu"
                />
              </Flex>
            </Card.Header>
            <StyledCardRow padded={false} onClick={this.onInnerAction}>
              {children}
            </StyledCardRow>
          </StyledCard>
        </DrawerContainer>
      </>
    );
  }
}

export default Drawer;
