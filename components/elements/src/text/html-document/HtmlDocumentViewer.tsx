import React, { Component } from 'react';
import _ from 'lodash';
// @ts-ignore
import sanitizeHtml from 'sanitize-html';
import { normalize } from 'styled-normalize';

import { getColor, styled, theme, typographyRules } from 'z-frontend-theme';
import { Box, BoxProps, Flex } from 'zbase';

import LoadingSpinner from '../../overlay/loading-spinner/LoadingSpinner';

type ContainerProps = BoxProps & {
  overflowX?: boolean;
  overflowY?: boolean;
};

type HtmlDocumentViewerProps = {
  /**
   * Html to display
   * */
  html: string;

  /**
   * Set to true when html content is loading
   * */
  isLoading?: boolean;

  /**
   * Should z-frontend typography rules be excluded from iframe
   * @default false
   * */
  omitTypography?: boolean;

  /**
   * Any custom CSS styling you want to add to your content
   * @default ''
   * */
  customStyles?: string;

  /**
   * Set to true if you don't want the iframe content to be scrollable
   * @default false
   * */
  dynamicHeight?: boolean;

  /**
   * Sets the height of the document to a value in pixels
   * @default 150
   */
  documentHeight?: number;

  /*
  For now, let's not let users customize sanitization
   * Additional tags to allow (extends defaults)
   * @default []
   *
  allowedTags?: string[];

  /**
   * Attributed to allow (replaces defaults if provided)
   * @default {}
   *
  allowedAttributes?: {
    [key: string]: string[];
  };
  */
  contentPx?: number;
  contentPy?: number;
} & ContainerProps;

const IframeContainer = styled<ContainerProps>(Box)`
  overflow-x: ${props => (props.overflowX ? 'auto' : '')};
  overflow-y: ${props => (props.overflowY ? 'auto' : '')};
`;

const StyledIframe = styled.iframe`
  border-width: 0;
`;

interface State {
  contentHeight: number;
}

class HtmlDocumentViewer extends Component<HtmlDocumentViewerProps, State> {
  iframe: any;

  static defaultProps = {
    includeTypographyRules: true,
    allowedTags: [] as string[],
    dynamicHeight: false,
    customStyles: '',
  };

  constructor(props: HtmlDocumentViewerProps) {
    super(props);
    this.state = {
      contentHeight: 0,
    };
    this.iframe = React.createRef<HTMLIFrameElement>();
  }

  updateIframe = () => {
    if (!this.props.isLoading) {
      const doc = this.iframe.current.contentWindow.document;
      doc.open();
      doc.write(this.processHtml(this.props.html));
      doc.close();
    }
  };

  processHtml = (html: string) => {
    const processedHtml = sanitizeHtml(html, {
      allowedTags: _.without(sanitizeHtml.defaults.allowedTags, 'iframe').concat([
        'h1',
        'h2',
        'style',
        'b',
        'p',
        'img',
        'a',
        'br',
        'i',
        'li',
        'figure',
      ]),
      /*
      in future, we may want to allow customized sanitization
      .concat(this.props.allowedTags),
      allowedAttributes: this.props.allowedAttributes || sanitizeHtml.defaults.allowedAttributes,
      */
    });

    const bodyPaddingx = this.props.contentPx ? theme.fontSizes[this.props.contentPx] : 0;
    const bodyPaddingy = this.props.contentPy ? theme.fontSizes[this.props.contentPy] : 0;
    const typographyStyles = !this.props.omitTypography
      ? `
        ${normalize}
        ${typographyRules}
        * {
          box-sizing: border-box;
        }
        body {
          font-family: ${theme.fonts[0]};
          line-height: 1.75;
          padding: ${bodyPaddingy}px ${bodyPaddingx}px;
          color: ${getColor('text.default')};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `
      : '';

    return `
        <style>
          ${typographyStyles}
          ${this.props.customStyles}
        </style>
        ${processedHtml}
      `;
  };

  onLoad = () =>
    this.setState({
      contentHeight: this.iframe.current.contentWindow.document.body.scrollHeight,
    });

  componentDidUpdate(prevProps: HtmlDocumentViewerProps) {
    if (this.props.html !== prevProps.html || this.props.isLoading !== prevProps.isLoading) {
      this.updateIframe();
    }
  }

  componentDidMount() {
    this.updateIframe();
  }

  render() {
    const { html, isLoading, dynamicHeight, documentHeight, ...containerProps } = this.props;
    const dynamicHeightProps = dynamicHeight
      ? {
          scrolling: 'no',
          height: `${this.state.contentHeight}px`,
          onLoad: this.onLoad,
        }
      : {
          height: documentHeight,
        };

    return (
      <IframeContainer border {...containerProps}>
        {isLoading ? (
          <Flex p={3} justify="center" align="center" height="100%">
            <LoadingSpinner s="small" />
          </Flex>
        ) : (
          <StyledIframe
            width="100%"
            innerRef={this.iframe}
            sandbox="allow-same-origin allow-popups"
            {...dynamicHeightProps}
          />
        )}
      </IframeContainer>
    );
  }
}

export default HtmlDocumentViewer;
