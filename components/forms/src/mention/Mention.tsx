import React, { Component, ReactNode } from 'react';

import { Badge, BadgeProps, TextBlock } from 'zbase';
import { styled } from 'z-frontend-theme';
import { Tooltip } from 'z-frontend-overlays';

const StyledBadge = styled(Badge)`
  display: inline;
  vertical-align: baseline;
`;
/* Mock alternative: background-color: ${props => color(props.color, 0.1)}; */

export type MentionEntry = {
  /** Label to display inline. */
  label: string;
  /** Text to display for more info */
  tooltipText?: string;
};

type MentionProps = BadgeProps &
  MentionEntry & {
    /**
     * Character that indicates a mention.
     * @default '@'
     */
    prefix?: string;
    showTooltip?: boolean; // just for testing
  };

function makeTooltip(label: ReactNode) {
  return (
    <TextBlock p={2} whiteSpace="pre-line" textAlign="center">
      {label}
    </TextBlock>
  );
}

class Mention extends Component<MentionProps> {
  static defaultProps = {
    prefix: '@',
    color: 'link.hover',
    bg: 'tertiary.c',
    mx: 0,
  };

  render() {
    const { label, prefix, showTooltip, tooltipText, ...rest } = this.props;
    const mentionBody = (
      <StyledBadge p="0 2px" {...rest}>
        {prefix}
        {label}
      </StyledBadge>
    );

    if (!tooltipText) {
      return mentionBody;
    }

    // TODO: this is not accessible; you can't interact with tooltips via the keyboard
    const tooltipContent = typeof tooltipText === 'string' ? makeTooltip(tooltipText) : tooltipText;
    return (
      <Tooltip event="hover" placement="top" showArrow showPopover={showTooltip} targetBody={mentionBody}>
        {tooltipContent}
      </Tooltip>
    );
  }
}

export default Mention;
