import React, { Component } from 'react';

import { Link } from 'z-frontend-elements';
import { styled } from 'z-frontend-theme';
import { color, radius } from 'z-frontend-theme/utils';
import { Box } from 'zbase';
import { LoadingScreen } from 'z-frontend-layout';

interface Props {
  /**
   * The group of stories you want to link to. Such as LiveAgentChat or Wizard. You kind find it on the query param
   */
  selectedKind: string;
  /**
   * The specific story you want to link to within your selectedKind, such as default. You kind find it on the query param
   */
  selectedStory: string;
  /**
   * This hides a link to the storybook for more examples
   */
  hideMoreExamplesLink?: boolean;
  /**
   * Height of the iframe
   */
  height?: string;
}

const Container = styled(Box)`
  margin: 0;
  background-color: ${color('grayscale.g')};
  line-height: 0;
  border: 1px solid ${color('grayscale.f')};
  border-radius: ${radius()};
`;

function getShaFromUrl() {
  if (location.pathname.includes(':')) {
    return location.pathname.replace('/index.html', '');
  }
  return '';
}

type StorybookExampleState = { isLoading: boolean };

class StorybookExample extends Component<Props, StorybookExampleState> {
  static defaultProps = {
    hideMoreExamplesLink: false,
  };

  private iframe;

  constructor(props) {
    super(props);
    this.iframe = React.createRef();
    this.state = {
      isLoading: true,
    };
  }

  getFullSrcString(linkType?) {
    const { selectedKind, selectedStory } = this.props;
    const sha = getShaFromUrl();
    // to run locally, you need to run tools/storybook as well as styleguide
    const filename = linkType === 'iframe' ? 'iframe.html' : 'index.html';
    const pathname = `/app/stories/${filename}${sha}`;
    return `${pathname}?selectedKind=${encodeURIComponent(selectedKind)}&selectedStory=${encodeURIComponent(
      selectedStory,
    )}`;
  }

  onLoad = () => {
    this.setState({ isLoading: false });
    if (!this.props.height) {
      // if no height specified, default to auto-sizing based on content
      const iframe = this.iframe.current;
      iframe.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }
  };

  render() {
    const { hideMoreExamplesLink, height, selectedKind } = this.props;
    const { isLoading } = this.state;
    const viewMoreLabel = selectedKind.replace(/^[^|]+\|/, ''); // strip storybook section, if any
    return (
      <>
        <Container style={{ minHeight: isLoading ? 100 : null, position: 'relative' }}>
          {isLoading && <LoadingScreen />}
          <iframe
            src={this.getFullSrcString('iframe')}
            frameBorder="0"
            width="100%"
            height={height}
            allowFullScreen
            scrolling="no"
            ref={this.iframe}
            onLoad={this.onLoad}
          />
        </Container>
        {!hideMoreExamplesLink && (
          <Box mt={2} textAlign="right">
            <Link href={this.getFullSrcString()} target="_blank">
              View more {viewMoreLabel} examples
            </Link>
          </Box>
        )}
      </>
    );
  }
}

export default StorybookExample;
