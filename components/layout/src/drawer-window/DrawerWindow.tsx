import React, { Component } from 'react';

import { Box, Flex, FlexProps } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';
import { DialogsManager, DialogProps } from 'z-frontend-overlays';
import { Card } from 'z-frontend-composites';

const DIALOG_ARIA_ROLE = 'dialog';
const REGION_ARIA_ROLE = 'region';
type DrawerAriaRole = typeof DIALOG_ARIA_ROLE | typeof REGION_ARIA_ROLE;

const LEFT = 'left';
const RIGHT = 'right';
type DrawerType = typeof LEFT | typeof RIGHT;

type OpenStatusDefaults = { [T in DrawerType]?: boolean };

type WindowDrawerAriaRoles = { [T in DrawerType]: DrawerAriaRole };

type DrawerControls = {
  open: () => Promise<any>;
  close: () => Promise<any>;
  toggle: () => Promise<any>;
  isOpen: boolean;
};

export type DrawersControls = { [T in DrawerType]: DrawerControls };

const DrawerWindowContainer = styled(Flex)<{ layout: 'headerFirst' | 'drawerFirst' }>`
  flex-direction: ${props => (props.layout === 'headerFirst' ? 'column' : 'row')};
`;

DrawerWindowContainer.defaultProps = {
  bg: 'grayscale.white' as ColorString,
  border: true,
};

type DrawerProps = {
  label: string;
  includeHeader?: boolean;
  isOpen?: boolean;
};

const createDrawer = () => {
  const DrawerContainer = styled(Flex)<{
    isOpen?: boolean;
  }>`
    display: ${props => !props.isOpen && 'none'};
    flex-direction: column;
  `;

  const Drawer: React.StatelessComponent<DrawerProps & FlexProps> = props => {
    const { label, includeHeader, children, ...drawerContainerProps } = props;
    return (
      <DrawerContainer aria-label={label} {...drawerContainerProps}>
        {includeHeader && <Card.Header>{label}</Card.Header>}
        {children}
      </DrawerContainer>
    );
  };

  return Drawer;
};

const LeftDrawer = createDrawer();
LeftDrawer.defaultProps = { borderRight: true };
LeftDrawer.displayName = 'DrawerWindowLeftDrawer';

const RightDrawer = createDrawer();
RightDrawer.defaultProps = { borderLeft: true };
RightDrawer.displayName = 'DrawerWindowRightDrawer';

// We're not using default props here to avoid stylelint complaining about empty body
// Stylelint config should be updated to allow this
const MainContent = styled(Box)`
  flex: 1 1 auto;
  overflow: auto; /* allow wide content to scroll */
`;
MainContent.displayName = 'DrawerWindowMainContent';

const Header = styled(Box)`
  flex: 0 0 auto;
`;
Header.defaultProps = {
  p: 2,
  borderBottom: true,
};
Header.displayName = 'DrawerWindowHeader';

export type DrawerWindowProps = {
  /**
   * Object mapping drawer types ('left'/'right') to default open state (boolean)
   */
  openStatusDefaults?: OpenStatusDefaults;
  /**
   * If headerFirst, header will take full width when drawers are open
   * If drawerFirst, drawer will take full height when drawers are open
   */
  layout?: 'headerFirst' | 'drawerFirst';
  children: (drawersControls: DrawersControls) => React.ReactElement<any>;
} & FlexProps;

type DrawerWindowState = {
  drawerAriaRoles: WindowDrawerAriaRoles;
};

const doesComponentMatchType = (element: JSX.Element, Component: { displayName?: string }) =>
  element.type.displayName === Component.displayName;

class DrawerWindow extends Component<DrawerWindowProps, DrawerWindowState> {
  static Header = Header;

  static MainContent = MainContent;

  static LeftDrawer = LeftDrawer;

  static RightDrawer = RightDrawer;

  static DrawerHeader = Card.Header;

  static DrawerRow = Card.Row;

  static defaultProps = {
    layout: 'headerFirst',
  };

  constructor(props: DrawerWindowProps) {
    super(props);

    const openStatusDefaults = {
      left: false,
      right: false,
      ...props.openStatusDefaults,
    };

    this.state = {
      drawerAriaRoles: {
        left: openStatusDefaults.left ? REGION_ARIA_ROLE : DIALOG_ARIA_ROLE,
        right: openStatusDefaults.right ? REGION_ARIA_ROLE : DIALOG_ARIA_ROLE,
      },
    };
  }

  makeDrawerDialog(drawer: DrawerType) {
    this.setState(state => ({
      drawerAriaRoles: {
        ...state.drawerAriaRoles,
        [drawer]: DIALOG_ARIA_ROLE,
      },
    }));
  }

  transformDrawer = (child: React.ReactElement<any>, drawerType: DrawerType, isDrawerOpen: boolean) => {
    return React.cloneElement(child as React.ReactElement<any>, {
      isOpen: isDrawerOpen,
      role: this.state.drawerAriaRoles[drawerType],
    });
  };

  render() {
    const { openStatusDefaults, layout, ...boxProps } = this.props;

    return (
      <DrawerWindowContainer {...boxProps} layout={layout}>
        <DialogsManager
          dialogsCount={3}
          openByDefault={[
            openStatusDefaults && openStatusDefaults.left,
            openStatusDefaults && openStatusDefaults.right,
          ]}
          render={(dialogsProps: DialogProps[]) => {
            const drawersControls = [LEFT, RIGHT].reduce((acc: Partial<DrawersControls>, drawer: DrawerType, i) => {
              const { open, close: closeDialog, isVisible: isOpen } = dialogsProps[i];

              const close = async () => {
                await closeDialog();
                if (this.state.drawerAriaRoles[drawer] === REGION_ARIA_ROLE) {
                  this.makeDrawerDialog(drawer);
                }
              };

              acc[drawer] = {
                isOpen,
                open,
                close,
                toggle: () => {
                  if (isOpen) {
                    return close();
                  } else {
                    return open();
                  }
                },
              };

              return acc;
            }, {}) as DrawersControls;

            const rendered = this.props.children(drawersControls);

            type RenderedChildren = {
              leftDrawer?: JSX.Element;
              rightDrawer?: JSX.Element;
              header?: JSX.Element;
              main?: JSX.Element;
            };

            const renderedChildren: RenderedChildren = React.Children.toArray(rendered.props.children).reduce(
              (renderedMap: RenderedChildren, child: React.ReactElement<any>) => {
                if (!child) {
                  return renderedMap;
                }

                const allowedChildComponents = [
                  DrawerWindow.Header.displayName,
                  DrawerWindow.MainContent.displayName,
                  DrawerWindow.LeftDrawer.displayName,
                  DrawerWindow.RightDrawer.displayName,
                ];
                if (child && !allowedChildComponents.includes((child.type as any).displayName)) {
                  throw new Error(
                    `Children of DrawerWindow must be one the following components:\n${allowedChildComponents.join(
                      '\n',
                    )}`,
                  );
                }

                const isHeader = doesComponentMatchType(child, DrawerWindow.Header);
                const isLeftDrawer = doesComponentMatchType(child, DrawerWindow.LeftDrawer);
                const isRightDrawer = doesComponentMatchType(child, DrawerWindow.RightDrawer);

                if (isLeftDrawer) {
                  renderedMap.leftDrawer = this.transformDrawer(child, LEFT, drawersControls[LEFT].isOpen);
                } else if (isRightDrawer) {
                  renderedMap.rightDrawer = this.transformDrawer(child, RIGHT, drawersControls[RIGHT].isOpen);
                } else if (isHeader) {
                  renderedMap.header = child;
                } else {
                  renderedMap.main = child;
                }

                return renderedMap;
              },
              {},
            );

            return layout === 'headerFirst' ? (
              <>
                {renderedChildren.header}
                <Flex align="stretch" flex="1 1">
                  {renderedChildren.leftDrawer}
                  {renderedChildren.main}
                  {renderedChildren.rightDrawer}
                </Flex>
              </>
            ) : (
              <>
                {renderedChildren.leftDrawer}
                <Flex align="stretch" flex="1 1" direction="column">
                  {renderedChildren.header}
                  {renderedChildren.main}
                </Flex>
                {renderedChildren.rightDrawer}
              </>
            );
          }}
        />
      </DrawerWindowContainer>
    );
  }
}

export default DrawerWindow;
