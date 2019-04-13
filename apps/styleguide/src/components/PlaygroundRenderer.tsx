import React, { Component, ReactNode } from 'react';

import { Card } from 'z-frontend-composites';
import { Box, Flex } from 'zbase';
import { EMBEDDED_STYLEGUIDE_EXAMPLE_CLASS } from 'z-frontend-theme';

interface ReactComponentProps {
  name: string;
  preview: ReactNode;
  previewProps: any;
  tabButtons: ReactNode;
  tabBody: any;
  toolbar: ReactNode;
}

// override default to put everything in a Card and opt into using viewCode when using embeded iframe
// https://github.com/styleguidist/react-styleguidist/blob/master/src/rsg-components/Playground/PlaygroundRenderer.js
class PlaygroundRenderer extends Component<ReactComponentProps> {
  render() {
    const {
      name,
      preview,
      previewProps,
      tabButtons,
      tabBody: {
        props: {
          props: { code },
        },
      },
      tabBody,
      toolbar,
      ...rest
    } = this.props;

    let showViewCodeOption = true;

    if (code && code.indexOf('<StorybookExample') > -1) {
      showViewCodeOption = false;
    }

    return (
      <Box mb={4}>
        <Card {...rest} mb={0} p={showViewCodeOption ? 4 : 0} className={EMBEDDED_STYLEGUIDE_EXAMPLE_CLASS}>
          {preview}
        </Card>
        <>
          <Flex align="center">
            <Box>{tabButtons}</Box>
            <Box>{toolbar}</Box>
          </Flex>
          <Box>{tabBody}</Box>
        </>
      </Box>
    );
  }
}

export default PlaygroundRenderer;
