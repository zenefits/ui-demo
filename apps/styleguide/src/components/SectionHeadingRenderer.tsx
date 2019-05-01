import React from 'react';

import { Box, Heading } from 'zbase';

interface SectionHeadingProps {
  children?: React.ReactChildren;
  toolbar?: React.ReactNode;
  id: string;
  href: string;
  depth: number;
  deprecated: boolean;
}

// override default to use our Heading, remove link styling, and hide toolbar
class SectionHeadingRenderer extends React.Component<SectionHeadingProps> {
  render() {
    // TODO: handle deprecated
    const { children, id, depth } = this.props;

    const headingLevel = Math.min(6, depth + 1);
    // do not render section categories
    // if (headingLevel <= 1) {
    //   return null;
    // }

    return (
      <Box>
        <Heading level={headingLevel} id={id}>
          {children}
        </Heading>
        {/*
        TODO: custom ToolbarButtonRenderer?
        <Box className="toolbar">{toolbar}</Box>
        */}
      </Box>
    );
  }
}

export default SectionHeadingRenderer;
