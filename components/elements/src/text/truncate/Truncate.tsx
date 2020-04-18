import React, { Component, ReactNode } from 'react';
import { FlattenInterpolation } from 'styled-components';
import { debounce, get } from 'lodash';

import { css, fontDescriptions, styled, theme, ColorString, FontStyleString } from 'z-frontend-theme';
import { Box, TextBlock, TextBlockProps, TextInline } from 'zbase';
import { color } from 'z-frontend-theme/utils';

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

interface TruncateState {
  isEllipsisHidden: boolean;
}

function getLineHeightPx(fontStyle: FontStyleString) {
  const fd = get(fontDescriptions, fontStyle);
  const { lineHeight } = fd;
  const fontSizeKey = fd.fontSize;
  const fontSize = theme.fontSizes[fontSizeKey as any];
  return Number(lineHeight) * fontSize;
}

export function getHeight(props: TruncateProps) {
  return getLineHeightPx(props.fontStyle as FontStyleString) * (props.lines as number);
}

const truncatedTextStyle: FlattenInterpolation<TruncateProps> = css`
  margin: 0;
  max-height: ${(props: TruncateProps) => getHeight(props)}px;
  overflow: hidden;
  width: 100%;
  word-break: break-word;
`;

const StyledTruncatedText = styled(TextBlock)`
  ${truncatedTextStyle};
`;

function gradientHelper(props: any) {
  const bg = color(props.bg as ColorString)(props);
  const bgWithAlpha = color(props.bg as ColorString, 0)(props);
  return `linear-gradient(to right, ${bgWithAlpha}, ${bg} 30%, ${bg})`;
}

const EllipsisText = styled(TextInline)`
  white-space: nowrap;
  float: right;
  position: relative;
  top: -${(props: any) => getLineHeightPx(props.fontStyle)}px;
  background: ${gradientHelper};
  padding-left: 30px; /* leave space for fade */
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
`;

/**
 * A helper component that renders truncated text. You should generally use Ellipsis or ReadMore.
 */
class Truncate extends Component<TruncateProps, TruncateState> {
  static defaultProps = {
    lines: 1,
    isEllipsisHidden: false,
    fontStyle: 'paragraphs.m' as 'paragraphs.m',
    isCustomEllipsisHiddenOnResize: false,
    bg: 'grayscale.white',
  };

  ellipsisEl: React.RefObject<HTMLSpanElement>;

  truncateSpanEl: React.RefObject<HTMLSpanElement>;

  containerEl: React.RefObject<HTMLDivElement>;

  textEl: HTMLSpanElement;

  ellipsisElWidth: number;

  maxHeight: number;

  isEdgeOrInternetExplorer: boolean;

  constructor(props: TruncateProps) {
    super(props);
    this.state = {
      isEllipsisHidden: !!props.isEllipsisHidden,
    };
    const browserName = getBrowserName();
    this.isEdgeOrInternetExplorer = browserName === 'edge' || browserName === 'ie';

    this.ellipsisEl = React.createRef<HTMLSpanElement>();
    this.truncateSpanEl = React.createRef<HTMLSpanElement>();
    this.containerEl = React.createRef<HTMLDivElement>();
  }

  componentDidMount() {
    if (!this.ellipsisEl.current || !this.truncateSpanEl.current || !this.containerEl.current) {
      return;
    }
    this.ellipsisElWidth = this.ellipsisEl.current.offsetWidth + 4;
    const clipWidth = this.containerEl.current.offsetWidth - this.ellipsisElWidth;
    let hideEllipsis = false;
    if (this.props.lines === 1 && !this.isEdgeOrInternetExplorer) {
      if (
        this.props.isEllipsisHidden ||
        (this.props.isCustomEllipsisHiddenOnResize && clipWidth >= this.truncateSpanEl.current.offsetWidth)
      ) {
        hideEllipsis = true;
      }
      this.setState(
        {
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

  // tslint:disable-next-line:function-name
  UNSAFE_componentWillReceiveProps(nextProps: TruncateProps) {
    this.setState({ isEllipsisHidden: !!nextProps.isEllipsisHidden }, this.getComponentResize);
  }

  onResize = debounce(() => {
    this.getComponentResize();
  });

  getComponentResize = () => {
    if (!this.containerEl.current) {
      return;
    }
    const clipWidth = this.containerEl.current.offsetWidth - this.ellipsisElWidth;
    if (clipWidth <= 0) {
      return;
    }

    const { isCustomEllipsisHiddenOnResize, lines } = this.props;
    // NOTE: if isCustomEllipsisHiddenOnResize = true, in IE and Edge the Ellipsis will still hide as textEl width does not overflow like it does in other browsers
    // window browsers will use maxHeight instead
    if (lines === 1 && !this.isEdgeOrInternetExplorer) {
      const isEllipsisHidden = Boolean(isCustomEllipsisHiddenOnResize && this.textEl.offsetWidth <= clipWidth);
      this.setState({
        isEllipsisHidden,
      });
    } else {
      const isEllipsisHidden = Boolean(isCustomEllipsisHiddenOnResize && this.textEl.offsetHeight < this.maxHeight);
      this.setState({
        isEllipsisHidden,
      });
    }
  };

  render() {
    const {
      children,
      ellipsisText,
      lines,
      fontStyle,
      color,
      isEllipsisHidden,
      isCustomEllipsisHiddenOnResize,
      bg,
      ...rest
    } = this.props;
    return (
      <RelativeContainer ref={this.containerEl}>
        <Box elementRef={this.truncateSpanEl}>
          <StyledTruncatedText
            // use standard <TextBlock ellipsis /> unless IE, which will not show ellipsisText
            ellipsis={lines === 1 && !this.isEdgeOrInternetExplorer}
            lines={lines}
            fontStyle={fontStyle}
            color={color}
            {...rest}
          >
            <span ref={(textEl: any) => (this.textEl = textEl)}>{children}</span>
          </StyledTruncatedText>
        </Box>
        {!this.state.isEllipsisHidden && (
          <EllipsisText bg={bg} fontStyle={fontStyle} elementRef={this.ellipsisEl}>
            {ellipsisText}
          </EllipsisText>
        )}
      </RelativeContainer>
    );
  }
}
export default Truncate;
