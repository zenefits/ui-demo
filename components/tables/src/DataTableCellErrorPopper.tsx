import React, { Component, ReactNode, RefObject } from 'react';

import { TextBlock, TextBlockProps } from 'zbase';
import { styled, theme } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';
import { Tethered } from 'z-frontend-overlays';

type EditableTableErrorProps = TextBlockProps & {
  /**
   * Error message to display.
   */
  error: string;
  hasFocus: boolean;
  target: ReactNode;
};

const StyledTextBlock = styled(TextBlock)`
  border: 1px solid ${color('negation.c')};
  position: absolute;
  white-space: normal;
`;

type ErrorPopperState = {
  isTargetHovered: boolean;
};

class DataTableCellErrorPopper extends Component<EditableTableErrorProps, ErrorPopperState> {
  state = {
    isTargetHovered: false,
  };

  targetRef: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

  onTargetMouseEnter = () => this.setState({ isTargetHovered: true });

  onTargetMouseLeave = () => this.setState({ isTargetHovered: false });

  render() {
    const { error, target, hasFocus, ...rest } = this.props;

    const { isTargetHovered } = this.state;
    const shouldShowError = error && (hasFocus || isTargetHovered);

    return (
      <>
        <div
          style={{ width: '100%' }}
          ref={this.targetRef}
          onMouseEnter={this.onTargetMouseEnter}
          onMouseLeave={this.onTargetMouseLeave}
        >
          {target}
        </div>
        {shouldShowError && (
          <Tethered
            matchWidth
            target={this.targetRef}
            containerProps={{ zIndex: theme.zIndex.dropdown - 1 }}
            options={{ positionFixed: true }}
          >
            <StyledTextBlock
              fontStyle="paragraphs.m"
              role="alert"
              bg="negation.d"
              color="negation.a"
              px={3}
              py={2}
              w={1}
              {...rest}
            >
              {error}
            </StyledTextBlock>
          </Tethered>
        )}
      </>
    );
  }
}

export default DataTableCellErrorPopper;
