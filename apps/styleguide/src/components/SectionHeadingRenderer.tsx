import React from 'react';
import { Box, Heading } from 'zbase';
import { styled } from 'z-frontend-theme';

const topNavOffset = `${64 + 16 + 16}px`;

const StyledHeading = styled(Heading)`
  &:target {
    padding-top: ${topNavOffset};
    margin-top: -${topNavOffset};
  }
`;

const InconspicuousLink = styled.a`
  text-decoration: none;
  color: inherit;
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
class SectionHeadingRenderer extends React.Component<SectionHeadingProps> {
  render() {
    // TODO: handle deprecated
    const { children, id, href, depth } = this.props;

    const headingLevel = Math.min(6, depth + 1);
    // do not render section categories
    // if (headingLevel <= 1) {
    //   return null;
    // }

    return (
      <Box>
        <StyledHeading level={headingLevel} id={id}>
          <InconspicuousLink href={href}>{children}</InconspicuousLink>
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
