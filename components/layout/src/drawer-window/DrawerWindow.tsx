import React, { Component } from 'react';
import _ from 'lodash';

import { Box, Flex, FlexProps } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';
import { Dialog, DialogsManager, DialogProps } from 'z-frontend-overlays';
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

type DrawersControls = { [T in DrawerType]: DrawerControls };

const DrawerWindowContainer = styled(Flex)`
  flex-direction: column;
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
  const DrawerContainer = styled(
    Flex.extendProps<{
      isOpen?: boolean;
    }>(),
  )`
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

const RightDrawer = createDrawer();
RightDrawer.defaultProps = { borderLeft: true };

// We're not using default props here to avoid stylelint complaining about empty body
// Stylelint config should be updated to allow this
const MainContent = styled(Box)`
  flex: 1 1;
`;

const Header = styled(Box)`
  flex: 0 0;
`;
Header.defaultProps = {
  p: 2,
  borderBottom: true,
};

type DrawerWindowProps = {
  /**
   * Object mapping drawer types ('left'/'right') to default open state (boolean)
   */
  openStatusDefaults?: OpenStatusDefaults;
  children: (drawersControls: DrawersControls) => React.ReactElement<any>;
} & FlexProps;

type DrawerWindowState = {
  drawerAriaRoles: WindowDrawerAriaRoles;
};

class DrawerWindow extends Component<DrawerWindowProps, DrawerWindowState> {
  static Header = Header;
  static MainContent = MainContent;
  static LeftDrawer = LeftDrawer;
  static RightDrawer = RightDrawer;
  static DrawerHeader = Card.Header;
  static DrawerRow = Card.Row;

  constructor(props: DrawerWindowProps) {
    super(props);

    const openStatusDefaults = {
      left: false,
      right: false,
      ...props.openStatusDefaults,
    };

    this.state = {
      drawerAriaRoles: _.mapValues(openStatusDefaults, openStatus =>
        openStatus ? REGION_ARIA_ROLE : DIALOG_ARIA_ROLE,
      ),
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
    if (this.state.drawerAriaRoles[drawerType] === DIALOG_ARIA_ROLE) {
      return (
        <Dialog isVisible={isDrawerOpen} height="100%">
          {() => React.cloneElement(child as React.ReactElement<any>, { isOpen: true, height: '100%' })}
        </Dialog>
      );
    } else {
      return React.cloneElement(child as React.ReactElement<any>, { isOpen: isDrawerOpen, role: REGION_ARIA_ROLE });
    }
  };

  render() {
    const { openStatusDefaults, ...boxProps } = this.props;

    return (
      <DrawerWindowContainer {...boxProps}>
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

            let renderedHeader = null;

            const renderedChildren = React.Children.map(rendered.props.children, (child: React.ReactElement<any>) => {
              const allowedChildComponents = [
                DrawerWindow.Header,
                DrawerWindow.MainContent,
                DrawerWindow.LeftDrawer,
                DrawerWindow.RightDrawer,
              ];
              if (!_.isObject(child) || allowedChildComponents.indexOf(child.type as any) === -1) {
                throw new Error(
                  'Children of DrawerWindow must be one the following components:\n' +
                    allowedChildComponents.join('\n'),
                );
              }
              const isHeader = child.type === Header;
              const isLeftDrawer = child.type === LeftDrawer;
              const isRightDrawer = child.type === RightDrawer;

              if (isLeftDrawer) {
                return this.transformDrawer(child, LEFT, drawersControls[LEFT].isOpen);
              } else if (isRightDrawer) {
                return this.transformDrawer(child, RIGHT, drawersControls[RIGHT].isOpen);
              } else if (isHeader) {
                renderedHeader = child;
                return null;
              }
              return child;
            });

            return (
              <>
                {renderedHeader}
                <Flex align="stretch" flex="1 1">
                  {renderedChildren}
                </Flex>
              </>
            );
          }}
        />
      </DrawerWindowContainer>
    );
  }
}

export default DrawerWindow;
