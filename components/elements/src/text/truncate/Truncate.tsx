import React, { Component, ReactNode } from 'react';
import get from 'lodash/get';
import { FlattenInterpolation } from 'styled-components';
import _ from 'lodash';

import { css, fontDescriptions, styled, theme } from 'z-frontend-theme';
import { TextBlock, TextBlockProps } from 'zbase';

import { getBrowserName } from '../../utils/detectionUtils';

export type TruncateProps = TextBlockProps & {
  /** The number of lines that will appear before the text is clipped */
  lines?: number;
  /** Include a custom ellipsis, like a link. This is useful for lines > 1 as the text will not get the css ... accompaniment */
  ellipsisText?: ReactNode;
  /** This controls if the ellipsis is hidden, this is mainly used by the ReadMore component */
  isEllipsisHidden?: boolean;
  /** Set to true if you would like your custom ellipsis to hide if your text fits its surrounding and is no longer truncated */
  isCustomEllipsisHiddenOnResize?: boolean;
};

interface State {
  isEllipsisHidden: boolean;
  wrap: number;
  truncateWidth: number;
}

export function getHeight(props: TruncateProps) {
  const fd = get(fontDescriptions, props.fontStyle as any);
  const lineHeight = fd.lineHeight;
  const fontSizeKey = fd.fontSize;
  const fontSize = theme.fontSizes[fontSizeKey as any];
  const maxHeight = Number(lineHeight) * fontSize * (props.lines as number);
  return maxHeight;
}

const truncatedTextStyle: FlattenInterpolation<TruncateProps & { wrap: number }>[] = css`
  display: inline-block;
  margin: 0;
  max-height: ${props => getHeight(props)}px;
  overflow: hidden;
  width: 100%;
  word-break: break-all;
  ${props => (props.wrap === 0 ? '' : 'white-space: nowrap')};
  ${props => (props.lines === 1 ? 'text-overflow: ellipsis' : '')};
  -ms-text-overflow: ellipsis;
`;

// had to delay the nowrap so text would take up the right amount of space
const StyledTrucatedText = styled(TextBlock)`
  ${truncatedTextStyle};
`;

const StyledEllipsisSpan = styled.span`
  float: right;
  white-space: nowrap;
  position: absolute;
  right: 0;
`;

// can add bottom: 0 but its not inline with the text
const truncateSpanStyle: FlattenInterpolation<{ width: number }>[] = css`
  width: ${props => (props.width > 0 ? `${props.width}px` : '')};
  min-width: ${props => (props.width > 0 ? `${props.width}px` : '')};
`;

const StyledTruncateSpan = styled.span`
  display: inline-block;
  ${truncateSpanStyle};
`;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;

/**
 * A helper component that renders truncated text. You should generally use Ellipsis or ReadMore.
 */
class Truncate extends Component<TruncateProps, State> {
  static defaultProps = {
    lines: 1,
    isEllipsisHidden: false,
    fontStyle: 'paragraphs.m' as 'paragraphs.m',
    isCustomEllipsisHiddenOnResize: false,
  };

  truncateSpanEl: HTMLSpanElement;
  ellipsisEl: HTMLSpanElement;
  containerEl: HTMLDivElement;
  textEl: HTMLSpanElement;
  ellipsisElWidth: number;
  maxHeight: number;
  isEdgeOrInternetExplorer: boolean;

  constructor(props: TruncateProps) {
    super(props);
    this.state = {
      isEllipsisHidden: !!props.isEllipsisHidden,
      wrap: 0,
      truncateWidth: 0,
    };
    const browserName = getBrowserName();
    this.isEdgeOrInternetExplorer = browserName === 'edge' || browserName === 'ie';
  }

  componentDidMount() {
    this.ellipsisElWidth = this.ellipsisEl.offsetWidth + 4;
    const clipWidth = this.containerEl.offsetWidth - this.ellipsisElWidth;
    let hideEllipsis = false;
    if (this.props.lines === 1 && !this.isEdgeOrInternetExplorer) {
      if (
        this.props.isEllipsisHidden ||
        (this.props.isCustomEllipsisHiddenOnResize && clipWidth >= this.truncateSpanEl.offsetWidth)
      ) {
        hideEllipsis = true;
      }
      this.setState(
        {
          wrap: 1,
          truncateWidth: clipWidth,
          isEllipsisHidden: hideEllipsis,
        },
        this.onResize,
      );
    } else {
      this.maxHeight = getHeight(this.props);
      if (
        this.props.isEllipsisHidden ||
        (this.props.isCustomEllipsisHiddenOnResize && this.textEl.offsetHeight < this.maxHeight)
      ) {
        hideEllipsis = true;
      }
      this.setState(
        {
          truncateWidth: clipWidth,
          isEllipsisHidden: hideEllipsis,
        },
        this.onResize,
      );
    }
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentWillReceiveProps(nextProps: TruncateProps) {
    this.setState({ isEllipsisHidden: !!nextProps.isEllipsisHidden }, this.getComponentResize);
  }

  onResize = _.debounce(() => {
    this.getComponentResize();
  });

  getDefaultEllipsis = () => {
    if (this.props.ellipsisText) {
      return this.props.ellipsisText;
    }
  };

  getComponentResize = () => {
    const clipWidth = this.containerEl.offsetWidth - this.ellipsisElWidth;
    let hideEllipsis = false;

    if (clipWidth <= 0) {
      return;
    }

    // NOTE: if this.props.isCustomEllipsisHiddenOnResize = true, in ie and edge the Ellipsiss will still hide as textEl width doesnot overflow like it does in other browsers
    // window browsers will use maxHeight instead
    if (this.props.lines === 1 && !this.isEdgeOrInternetExplorer) {
      if (this.props.isCustomEllipsisHiddenOnResize && this.textEl.offsetWidth <= clipWidth) {
        hideEllipsis = true;
      }
      this.setState({
        isEllipsisHidden: hideEllipsis,
        truncateWidth: clipWidth,
      });
    } else {
      if (this.props.isCustomEllipsisHiddenOnResize && this.textEl.offsetHeight < this.maxHeight) {
        hideEllipsis = true;
      }
      this.setState({
        isEllipsisHidden: hideEllipsis,
        truncateWidth: clipWidth,
      });
    }
  };

  render() {
    const {
      children,
      ellipsisText,
      lines,
      fontStyle = 'paragraphs.m',
      color,
      isEllipsisHidden,
      isCustomEllipsisHiddenOnResize,
      ...rest
    } = this.props;
    const truncatedEllipsis = this.getDefaultEllipsis();

    return (
      <StyledContainer innerRef={containerEl => (this.containerEl = containerEl)}>
        <StyledTruncateSpan
          width={this.state.truncateWidth}
          innerRef={truncateSpanEl => (this.truncateSpanEl = truncateSpanEl)}
        >
          <StyledTrucatedText lines={lines} fontStyle={fontStyle} color={color} {...rest} wrap={this.state.wrap}>
            <span ref={(textEl: any) => (this.textEl = textEl)}>{children}</span>
          </StyledTrucatedText>
        </StyledTruncateSpan>
        {!this.state.isEllipsisHidden && (
          <StyledEllipsisSpan innerRef={ellipsisEl => (this.ellipsisEl = ellipsisEl)}>
            {truncatedEllipsis}
          </StyledEllipsisSpan>
        )}
      </StyledContainer>
    );
  }
}
export default Truncate;
