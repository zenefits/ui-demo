import React, { Component } from 'react';

import { TextBlock, TextBlockProps } from 'zbase';
import { styled, ColorString } from 'z-frontend-theme';

import Truncate from '../truncate/Truncate';
import Link from '../../action/link/Link';

type ReadMoreProps = TextBlockProps & {
  /**
   * The number of lines that will appear before the collapsed text is clipped.
   * @default 1
   */
  lines?: number;
  /**
   * Set to true if you would like your expand control to hide if your collapsed text fits its surrounding and is no longer truncated.
   * @default false
   */
  isExpandControlHiddenOnResize?: boolean;
  /** Include different expanded text/formatted text/ different fontStyle or color from the collapsed text. Defaults to using the collapsed text. */
  expandedText?: React.ReactNode;
  /** Allows you to expand the text as a consumer. */
  isExpanded?: boolean;
  /**
   * Match container background (only needed if non-white).
   */
  bg?: ColorString;
};

interface ReadMoreState {
  isExpanded: boolean;
}

const CollapseControl = styled.div`
  text-align: right;
`;

class ReadMore extends Component<ReadMoreProps, ReadMoreState> {
  static defaultProps = {
    lines: 1,
    fontStyle: 'paragraphs.m',
    isExpandControlHiddenOnResize: false,
  };

  constructor(props: ReadMoreProps) {
    super(props);
    this.state = { isExpanded: props.isExpanded || false };
  }

  // tslint:disable-next-line:function-name
  UNSAFE_componentWillReceiveProps(nextProps: ReadMoreProps) {
    if (typeof nextProps.isExpanded !== 'undefined' && this.state.isExpanded !== !!nextProps.isExpanded) {
      this.setState({ isExpanded: !!nextProps.isExpanded });
    }
  }

  expand = (e: React.MouseEvent) => {
    this.setState({ isExpanded: true });
    e.preventDefault();
  };

  collapse = (e: React.MouseEvent) => {
    this.setState({ isExpanded: false });
    e.preventDefault();
  };

  getExpandControl = () => {
    return (
      <Link
        href="#" // focus with keyboard
        onClick={this.expand}
        fontStyle="paragraphs.s"
      >
        Show More
      </Link>
    );
  };

  getCollapseControl = () => {
    return (
      <Link
        href="#" // focus with keyboard
        onClick={this.collapse}
        fontStyle="paragraphs.s"
      >
        Show Less
      </Link>
    );
  };

  getExpandedText = () => {
    return (
      this.props.expandedText || (
        <TextBlock tag="p" m={0} fontStyle={this.props.fontStyle} color={this.props.color}>
          {this.props.children}
        </TextBlock>
      )
    );
  };

  render() {
    const { expandedText, children, lines, isExpanded, isExpandControlHiddenOnResize, ...rest } = this.props;
    return (
      <div>
        {!this.state.isExpanded && (
          <Truncate
            lines={lines}
            ellipsisText={<span>{this.getExpandControl()}</span>}
            isEllipsisHidden={this.state.isExpanded ? this.state.isExpanded : undefined}
            isCustomEllipsisHiddenOnResize={isExpandControlHiddenOnResize}
            {...rest}
          >
            {children}
          </Truncate>
        )}
        {this.state.isExpanded && (
          <>
            {this.getExpandedText()}
            <CollapseControl>{this.getCollapseControl()}</CollapseControl>
          </>
        )}
      </div>
    );
  }
}

export default ReadMore;
