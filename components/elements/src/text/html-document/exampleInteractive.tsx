import React from 'react';

import { Box } from 'zbase';

import HtmlDocumentViewer from './HtmlDocumentViewer';

class InteractiveExample extends React.Component<{}, { html: string; loading: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { html: '<h1>Header</h1>', loading: false };
  }

  render() {
    return (
      <Box>
        <textarea
          value={this.state.html}
          onChange={event => {
            const { value } = event.target;
            this.setState({ loading: true, html: value });
            setTimeout(() => {
              this.setState({
                loading: false,
              });
            }, 300);
          }}
        />
        <HtmlDocumentViewer html={this.state.html} isLoading={this.state.loading} height="100px" w="200px" />
      </Box>
    );
  }
}

export default InteractiveExample;
