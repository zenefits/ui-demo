import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { color, radius } from 'z-frontend-theme/utils';
import { Box } from 'zbase';
import { LoadingScreen } from 'z-frontend-elements';

interface FigmaFileProps {
  /** Provided by Figma by clicking "Share" > "Public embed" */
  url: string;
  /**
   * Height of iframe.
   * @default 450
   */
  height: number;
}

const Container = styled(Box)`
  background-color: ${color('grayscale.white')};
  line-height: 0;
  border: 1px solid ${color('grayscale.f')};
  border-radius: ${radius()};
  overflow: hidden;
`;

type FigmaFileState = { isLoading: boolean };

class FigmaFile extends Component<FigmaFileProps, FigmaFileState> {
  static defaultProps = {
    height: 450,
  };

  state = {
    isLoading: true,
  };

  onLoad = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { url, height } = this.props;
    const { isLoading } = this.state;
    const embedUrl = `https://www.figma.com/embed?embed_host=uizenefits&url=${url}`;
    return (
      <>
        <Container style={{ minHeight: isLoading ? 100 : null, position: 'relative', height: height - 100 }} mb={5}>
          {isLoading && <LoadingScreen />}
          <iframe
            src={embedUrl}
            // translate to hide Figma controls etc
            style={{ transform: 'translate(-50px, -50px)' }}
            frameBorder="0"
            width="100%"
            height={height}
            allowFullScreen
            scrolling="no"
            onLoad={this.onLoad}
          />
        </Container>
      </>
    );
  }
}

export default FigmaFile;
