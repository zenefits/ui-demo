import React, { Component } from 'react';

import { Box, Flex, Heading } from 'zbase';
import { IconButton, LinkButton } from 'z-frontend-elements';

import { UrlQueryParamsContext } from '../UrlQueryParamsManager';
import DataFilter from '../filter/DataFilter';
import { DataFilterPanelProps as UrlFilterPanelProps } from './DataFilterPanel';
import { clearFilters } from '../url-filters/urlFilterUtils';

export default class UrlFilterPanel extends Component<UrlFilterPanelProps> {
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
      <UrlQueryParamsContext.Consumer>
        {({ queryParams, updateQueryParams }) => {
          return (
            <Box py={3} px={4} style={{ overflowY: 'auto' }} {...rest}>
              <Flex align="center" justify="space-between" mb={3}>
                <Heading level={5}>Filters</Heading>
                <Flex align="center">
                  <LinkButton
                    fontStyle="paragraphs.s"
                    onClick={() => {
                      updateQueryParams(clearFilters(queryParams), true);
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
      </UrlQueryParamsContext.Consumer>
    );
  }
}
