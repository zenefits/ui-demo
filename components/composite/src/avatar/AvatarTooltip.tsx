import React, { Component, ReactChild, ReactElement, StatelessComponent } from 'react';

import { Box, TextBlock } from 'zbase';
import { Tooltip } from 'z-frontend-overlays';

import { AvatarProps } from './Avatar';

/**
 * Use a custom tooltip body if provided
 * If a falsy value is passed as tooltipBody ('' or null), don't show a tooltip.
 * Otherwise use the default content
 * @param avatarProps
 */
function evaluateTooltipContent(avatarProps: AvatarProps): ReactChild {
  const { tooltipBody, firstName, lastName } = avatarProps;
  if (tooltipBody) {
    return tooltipBody;
  } else if ((tooltipBody !== undefined && !tooltipBody) || !firstName || !lastName) {
    // If falsy value passed in or no firstName/lastName
    return null;
  }

  return <DefaultTooltipContent {...avatarProps} />;
}

/*
    - `${firstName} ${lastName}`
    - IF badge === 'contingent' then add `Content worker - ${workerType}`
    - IF email then add email
*/
const DefaultTooltipContent: StatelessComponent<AvatarProps> = ({ firstName, lastName, email, workerType, badge }) => {
  return (
    <Box p={8} textAlign="center">
      <TextBlock>
        {firstName} {lastName}
      </TextBlock>
      {badge && badge === 'contingent' && (
        <TextBlock fontStyle="paragraphs.s">Contingent Worker{workerType && ` - ${workerType}`}</TextBlock>
      )}
      {email && <TextBlock fontStyle="paragraphs.s">{email}</TextBlock>}
    </Box>
  );
};

type AvatarTooltipProps = AvatarProps & { children: ReactElement<any> };

class AvatarTooltip extends Component<AvatarTooltipProps> {
  render() {
    const tooltipContent = evaluateTooltipContent(this.props);
    if (!tooltipContent) {
      return <>{this.props.children}</>;
    }
    return (
      <Tooltip event="hover" placement="top" showArrow targetBody={this.props.children} {...this.props.tooltipProps}>
        {tooltipContent}
      </Tooltip>
    );
  }
}

export default AvatarTooltip;
