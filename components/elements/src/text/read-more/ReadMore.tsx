import React, { Component } from 'react';

import { TextBlock, TextBlockProps } from 'zbase';
import { styled } from 'z-frontend-theme';

import Truncate from '../truncate/Truncate';
import Link from '../../action/link/Link';

type ReadMoreProps = TextBlockProps & {
  /** Include a custom expand control. This control will be beside the collapsed text. Defaults to expanding the text. */
  expandControl?: React.ReactNode;
  /** Include a custom collapse control. This control will be beside the expanded text. Defaults to collapsing the text. */
  collapseControl?: React.ReactNode;
  /** The number of lines that will appear before the collapsed text is clipped. */
  lines?: number;
  /** Include different expanded text/formatted text/ different fontStyle or color from the collapsed text. Defaults to using the collapsed text. */
  expandedText?: React.ReactNode;
  /** allows you to expand the text as a consumer. */
  isExpanded?: boolean;
  /** Set to true if you would like your expand control to hide if your collapsed text fits its surrounding and is no longer truncated. */
  isExpandControlHiddenOnResize?: boolean;
};

interface ReadMoreState {
  isExpanded: boolean;
}

const StyledSpan = styled.span`
  float: right;
`;

class ReadMore extends Component<ReadMoreProps, ReadMoreState> {
  static defaultProps = {
    lines: 1,
    fontStyle: 'paragraphs.m',
    color: 'grayscale.d',
    isExpandControlHiddenOnResize: false,
  };

  constructor(props: ReadMoreProps) {
    super(props);
    this.state = { isExpanded: props.isExpanded || false };
  }

  componentWillReceiveProps(nextProps: ReadMoreProps) {
    if (this.state.isExpanded !== !!nextProps.isExpanded) {
      this.setState({ isExpanded: !!nextProps.isExpanded });
    }
  }

  expand = () => {
    this.setState({ isExpanded: true });
  };

  collapse = () => {
    this.setState({ isExpanded: false });
  };

  getExpandControl = () => {
    if (this.props.expandControl) {
      return this.props.expandControl;
    }
    return (
      <Link onClick={this.expand} fontSize__deprecated__doNotUse={0}>
        Show More
      </Link>
    );
  };

  getCollapseControl = () => {
    if (this.props.collapseControl) {
      return this.props.collapseControl;
    }
    return (
      <Link onClick={this.collapse} fontSize__deprecated__doNotUse={0}>
        Show Less
      </Link>
    );
  };

  getExpandedText = () => {
    if (this.props.expandedText) {
      return this.props.expandedText;
    }
    return (
      <TextBlock tag="p" fontStyle={this.props.fontStyle} color={this.props.color}>
        {this.props.children}
      </TextBlock>
    );
  };

  render() {
    const {
      expandControl,
      collapseControl,
      expandedText,
      children,
      lines,
      isExpanded,
      isExpandControlHiddenOnResize,
      ...rest
    } = this.props;

    const rmExpandControl = this.getExpandControl();
    const rmCollapseControl = this.getCollapseControl();
    const expandedTextToRender = this.getExpandedText();
    return (
      <div>
        {!this.state.isExpanded && (
          <Truncate
            lines={lines}
            ellipsisText={<span>{rmExpandControl}</span>}
            isEllipsisHidden={this.state.isExpanded ? this.state.isExpanded : undefined}
            isCustomEllipsisHiddenOnResize={isExpandControlHiddenOnResize}
            {...rest}
          >
            {children}
          </Truncate>
        )}
        {this.state.isExpanded && (
          <>
            <span>{expandedTextToRender}</span>
            <StyledSpan>{rmCollapseControl}</StyledSpan>
          </>
        )}
      </div>
    );
  }
}

export default ReadMore;
