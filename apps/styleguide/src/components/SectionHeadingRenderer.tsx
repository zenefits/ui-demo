import React from 'react';

import { Box, Heading } from 'zbase';
import { styled } from 'z-frontend-theme';

const HeadingOnly = ({ deprecated, level, ...props }) => <Heading level={level} {...props} />;

const StyledHeading = styled(HeadingOnly)<{ deprecated?: boolean }>`
  ${props => (props.deprecated ? 'text-decoration: line-through' : '')}
`;

interface SectionHeadingProps {
  children?: React.ReactChildren;
  toolbar?: React.ReactNode;
  id: string;
  href: string;
  depth: number;
  deprecated: boolean;
}

// override default to use our Heading, remove link styling, and hide toolbar
// https://github.com/styleguidist/react-styleguidist/blob/master/src/client/rsg-components/SectionHeading/SectionHeadingRenderer.js
class SectionHeadingRenderer extends React.Component<SectionHeadingProps> {
  render() {
    const { children, id, depth, deprecated } = this.props;

    const headingLevel = Math.min(6, depth + 1);
    // do not render section categories
    // if (headingLevel <= 1) {
    //   return null;
    // }

    return (
      <Box>
        <StyledHeading level={headingLevel} id={id} deprecated={deprecated}>
          {children}
        </StyledHeading>
        {/*
        TODO: custom ToolbarButtonRenderer?
        <Box className="toolbar">{toolbar}</Box>
        */}
      </Box>
    );
  }
}

export default SectionHeadingRenderer;
