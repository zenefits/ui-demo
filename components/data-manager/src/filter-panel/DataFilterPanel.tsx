import React, { Component } from 'react';

import { Box, BoxProps, Flex, Heading } from 'zbase';
import { IconButton, LinkButton } from 'z-frontend-elements';

import { DataManagerContext } from '../DataManager';
import DataFilter from '../filter/DataFilter';

export type DataFilterPanelProps = BoxProps & {
  /**
   * Whether the panel is currently visible
   * @default true
   */
  isVisible?: boolean;

  /** Action to take when panel is closed (ie toggle `isVisible`) */
  onClose?: () => void;
};

type DataFilterPanelState = {};

export default class DataFilterPanel extends Component<DataFilterPanelProps, DataFilterPanelState> {
  static defaultProps = {
    isVisible: true,
    border: true,
  };

  render() {
    const { isVisible, onClose, ...rest } = this.props;
    if (!isVisible) {
      // TODO: animation like Drawer
      return null;
    }
    return (
      <DataManagerContext.Consumer>
        {({ filtering }) => {
          return (
            <Box py={3} px={4} style={{ overflowY: 'auto' }} {...rest}>
              <Flex align="center" justify="space-between" mb={3}>
                <Heading level={5}>Filters</Heading>
                <Flex align="center">
                  <LinkButton
                    fontStyle="paragraphs.s"
                    onClick={() => {
                      filtering.onChange({});
                    }}
                  >
                    Reset
                  </LinkButton>
                  {onClose && (
                    <Box my={-2} ml={2} mr={-2}>
                      <IconButton
                        iconName="close"
                        color="text.light"
                        onClick={onClose}
                        aria-label="Close filter panel"
                      />
                    </Box>
                  )}
                </Flex>
              </Flex>
              <DataFilter>{this.props.children}</DataFilter>
            </Box>
          );
        }}
      </DataManagerContext.Consumer>
    );
  }
}
