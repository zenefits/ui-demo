import React, { Component, RefObject } from 'react';

import { styled } from 'z-frontend-theme';
import { color, depth, space, zIndex } from 'z-frontend-theme/utils';
import { Box, BoxProps, TextBlock, TextBlockProps } from 'zbase';

export type EllipsisProps = TextBlockProps & {
  children?: string | string[];
  /**
   * Where to position full text tooltip relative to elided text.
   * @default bottom
   */
  fullTextPlacement?: 'bottom' | 'right';
};

type TextBlockState = {
  showTooltip: boolean;
};

// Flex elements have as implicit min-width equal to the content width, which doesn't allow them to shrink
// so in some cases, you need to apply this to get ellipsis to work
// https://css-tricks.com/flexbox-truncated-text/
export const truncateFix = { minWidth: 0 };

const EllipsisContainer = styled(Box)`
  position: relative;
  outline: none;
  min-width: 0; /* required for truncate https://css-tricks.com/flexbox-truncated-text/#article-header-id-3 */
`;

type OverlaidTooltipProps = BoxProps & { placement: any };

const OverlaidTooltip = styled<OverlaidTooltipProps>(({ placement, ...rest }: OverlaidTooltipProps) => (
  <Box {...rest} />
))`
  display: none;
  ${depth(2)};
  background-color: ${color('grayscale.white')};
  color: ${color('text.dark')};
  overflow-y: auto;
  max-height: 80vh;
  font-size: 90%; /* slightly reduce font relative to original */
  position: absolute;
  top: 100%; /* scale with line-height */
  left: 0;
  z-index: ${zIndex('tooltip')};
  padding: ${space(3)} ${space(4)};
  white-space: pre-line; /* show line breaks between paragraphs */
  ${props => (props.placement === 'right' ? 'left: 100%; top: -50%;' : '')};

  ${/* sc-selector */ EllipsisContainer}:active &,
  ${EllipsisContainer}:focus &,
  ${EllipsisContainer}:hover & {
    display: block;
  }
`;

function isEllipsisActive(elem: HTMLDivElement) {
  return elem && elem.offsetWidth < elem.scrollWidth;
}

class Ellipsis extends Component<EllipsisProps, TextBlockState> {
  private textRef: RefObject<HTMLDivElement>;

  static defaultProps = {
    fontStyle: 'paragraphs.m',
    fullTextPlacement: 'bottom',
  };

  constructor(props: EllipsisProps) {
    super(props);
    this.textRef = React.createRef<HTMLDivElement>();
    this.state = {
      showTooltip: false,
    };
  }

  componentDidMount() {
    this.setState({
      showTooltip: this.textRef.current ? isEllipsisActive(this.textRef.current) : false,
    });
  }

  render() {
    const { children, fullTextPlacement, ...rest } = this.props;
    return (
      <EllipsisContainer tabIndex={0} w={1}>
        <TextBlock ellipsis elementRef={this.textRef} {...rest}>
          {children}
        </TextBlock>
        {this.state.showTooltip && <OverlaidTooltip placement={fullTextPlacement}>{children}</OverlaidTooltip>}
      </EllipsisContainer>
    );
  }
}

export default Ellipsis;

// export at end to avoid confusing documentation
export { OverlaidTooltip };
