import React, { Component, ComponentType, ReactNode, StatelessComponent } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { Box, BoxProps, Flex, Image, TextBlock } from 'zbase';
import { css, styled, theme } from 'z-frontend-theme';
import { color, fontStyles, space, zIndex } from 'z-frontend-theme/utils';
import { Button, IconButton, Link, LinkProps } from 'z-frontend-elements';

import { Card } from 'z-frontend-composites';

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
   * Whether or not to show the drawer
   * @default false
   */
  show?: boolean;
  /**
   * Whether to use Zenefits logo to replace hamburger menu icon as the button to open drawer
   * @default false
   */
  openDrawerUsingLogo?: boolean;
  /**
   * Callback fired on close drawer event
   */
  onClose: () => void;
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
    styled(Link).attrs<DrawerLinkProps>(props => ({
      className: props.active ? activeClassName : '',
    }))`
      ${drawerItemCss};
    `,
    rest,
  );
};

const DrawerNavLink: StatelessComponent<NavLinkProps> = props => {
  return getItemComponent<NavLinkProps>(
    styled(NavLink).attrs({ activeClassName })<NavLinkProps>`
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

type DrawerOpenButtonProps = { onOpen: () => void; openDrawerUsingLogo?: boolean };

const DrawerOpenButton: StatelessComponent<DrawerOpenButtonProps> = ({ onOpen, openDrawerUsingLogo }) => {
  return (
    <>
      {openDrawerUsingLogo ? (
        <Button mode="transparent" onClick={onOpen}>
          <Logo className="js-walkme-top-nav-open" w={12} src={theme.images.logo} alt="Zenefits logo" />
        </Button>
      ) : (
        <IconButton
          className="js-walkme-top-nav-open"
          iconName="menu"
          color="secondary.a"
          onClick={onOpen}
          mr={1}
          aria-label="Open navigation menu"
        />
      )}
    </>
  );
};

class Drawer extends Component<DrawerComponentProps, DrawerComponentState> {
  backdropEl: HTMLElement;

  documentEventHandlers: [string, (e: any) => void][];

  constructor(props: DrawerComponentProps) {
    super(props);
    this.documentEventHandlers = [
      ['mousedown', this.onOuterAction],
      ['touchstart', this.onOuterAction],
      ['click', this.onOuterAction],
    ];
    this.documentEventHandlers.forEach(([eventName, handlerFn]) => {
      window.document.addEventListener(eventName, handlerFn);
    });
  }

  static Link = DrawerLink;

  static NavLink = DrawerNavLink;

  static Section = DrawerSection;

  static OpenButton = DrawerOpenButton;

  componentWillUnmount() {
    this.documentEventHandlers.forEach(([eventName, handlerFn]) => {
      window.document.removeEventListener(eventName, handlerFn);
    });
  }

  onOuterAction = (e: any) => {
    if (this.backdropEl && this.backdropEl.contains(e.target) && this.props.show) {
      this.props.onClose();
    }
  };

  onInnerAction = (e: any) => {
    if (isLink(e.target) && this.props.show) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <>
        <DrawerContainer className={this.props.show ? 'show' : ''}>
          <StyledBackdrop
            ref={(backdropEl: HTMLElement) => {
              this.backdropEl = backdropEl;
            }}
          />
          <StyledCard>
            <Card.Header flex="0">
              <Flex align="center" justify="space-between">
                <Link href="/dashboard">
                  <Flex align="center">
                    <Image w={12} src={theme.images.logo} alt="" />
                    <TextBlock fontStyle="paragraphs.xl" color="primary.a" ml={2}>
                      zenefits
                    </TextBlock>
                  </Flex>
                </Link>

                <IconButton
                  iconName="close"
                  color="text.light"
                  onClick={this.props.onClose}
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
