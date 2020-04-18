import React, { Component } from 'react';

import { Box, Flex, FlexProps, Heading } from 'zbase';
import { IconButton } from 'z-frontend-elements';
import { styled } from 'z-frontend-theme';

import DrawerWindow, { DrawersControls } from '../drawer-window/DrawerWindow';

type PanelConfig = {
  openByDefault?: boolean;
  /**
   * Determines whether the cross (close) icon should be displayed
   */
  closable?: boolean;
  minWidth?: number;
} & FlexProps;

const panelConfigDefaultValues = {
  openByDefault: true,
  closable: true,
  minWidth: 200,
};

export type DataLayoutProps = {
  title?: string;
  nav?: React.ReactNode;
  actions?: (filterButton: React.ReactElement<any>) => React.ReactNode;
  leftPanel?: React.ReactNode;
  main?: React.ReactNode;
  rightPanel?: React.ReactNode;
  pager?: React.ReactNode;
  summaryRow?: React.ReactNode;
  addRowButton?: React.ReactNode;
  footer?: React.ReactNode;
  leftPanelConfig?: PanelConfig;
  rightPanelConfig?: PanelConfig;
  showRightPanel?: boolean;
  containerProps?: FlexProps;
};

function getIconButton(props: DrawersControls) {
  return (
    <IconButton iconName="filter-list" onClick={props.left.toggle} aria-label="Toggle filter panel">
      Filter
    </IconButton>
  );
}

const NavContainer = styled.div`
  /* pad nav items (keeping active border at bottom) in order to make header taller for prominence reasons */
  li > a {
    padding: 17px 0;
  }
`;

export default class DataLayout extends Component<DataLayoutProps> {
  render() {
    const {
      title,
      nav,
      actions,
      leftPanel,
      main,
      rightPanel,
      showRightPanel,
      pager,
      addRowButton,
      footer,
      containerProps,
      summaryRow,
    } = this.props;

    const leftPanelConfig = { ...panelConfigDefaultValues, ...this.props.leftPanelConfig };
    const {
      openByDefault: leftPanelOpenByDefault,
      closable: leftPanelClosable,
      ...leftPanelConfigContainerProps
    } = leftPanelConfig;

    const rightPanelConfig = { ...panelConfigDefaultValues, ...this.props.rightPanelConfig };
    const {
      openByDefault: rightPanelOpenByDefault,
      closable: rightPanelClosable,
      ...rightPanelConfigContainerProps
    } = rightPanelConfig;

    if (title && nav) {
      throw new Error('DataLayout cannot support both title and nav.');
    }
    const showHeader = Boolean(title || nav || actions);
    const showPaginationRow = pager || addRowButton;
    const minWidth = (containerProps && containerProps.minWidth) || 500;

    return (
      <Box minWidth={minWidth} data-testid="DataLayout">
        <DrawerWindow
          openStatusDefaults={{
            left: leftPanelOpenByDefault,
            right: rightPanelOpenByDefault,
          }}
          {...containerProps}
        >
          {props => {
            return (
              <>
                {showHeader && (
                  <DrawerWindow.Header py={0} pl={nav ? 2 : 4} pr={4}>
                    <Flex
                      align="center"
                      justify="space-between"
                      minHeight={56} // keep consistent between nav or title
                    >
                      {title && <Heading level={5}>{title}</Heading>}
                      <NavContainer>{nav}</NavContainer>
                      <Box ml={2} mr={-2}>
                        {actions ? actions(getIconButton(props)) : leftPanel && getIconButton(props)}
                      </Box>
                    </Flex>
                  </DrawerWindow.Header>
                )}
                {leftPanel && (
                  <DrawerWindow.LeftDrawer
                    label="Filter panel"
                    width={1 / 5}
                    flex="0 0 auto"
                    {...leftPanelConfigContainerProps}
                  >
                    {React.cloneElement(leftPanel as React.ReactElement<any>, {
                      border: false,
                      onClose: leftPanelClosable ? props.left.toggle : undefined,
                    })}
                  </DrawerWindow.LeftDrawer>
                )}
                <DrawerWindow.MainContent>
                  {main}
                  {summaryRow && (
                    <Box py={2} px={2} borderBottom>
                      {summaryRow}
                    </Box>
                  )}
                  {showPaginationRow && (
                    <Flex
                      py={3}
                      px={4}
                      justify={addRowButton ? 'space-between' : 'flex-end'}
                      direction={['column', 'row']}
                    >
                      {addRowButton && <Box mb={[3, 0]}>{addRowButton}</Box>}
                      {pager && pager}
                    </Flex>
                  )}
                </DrawerWindow.MainContent>
                {rightPanel && showRightPanel && (
                  <DrawerWindow.RightDrawer label="Details panel" width={1 / 5} {...rightPanelConfigContainerProps}>
                    {React.cloneElement(rightPanel as React.ReactElement<any>, {
                      border: false,
                      onClose: rightPanelClosable ? props.right.toggle : undefined,
                    })}
                  </DrawerWindow.RightDrawer>
                )}
              </>
            );
          }}
        </DrawerWindow>
        {footer && (
          <Box bg="grayscale.white" py={3} px={4} borderBottom borderLeft borderRight>
            {footer}
          </Box>
        )}
      </Box>
    );
  }
}
