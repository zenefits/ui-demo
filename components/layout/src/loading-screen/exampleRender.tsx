import React, { Component } from 'react';

import { Box, TextInline } from 'zbase';

import { LoadingScreen } from '../../index';

class LoadingExample extends Component<{}, { loading: boolean; intervalId?: number }> {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const intervalId = setInterval(this.toggleLoading.bind(this), 3000);
    this.setState({ intervalId });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  toggleLoading() {
    this.setState(prevState => ({ loading: !prevState.loading }));
  }
  render() {
    const realContent = <TextInline p={2}>Done loading for now.</TextInline>;
    return (
      <Box style={{ height: 100, position: 'relative' }}>{this.state.loading ? <LoadingScreen /> : realContent}</Box>
    );
  }
}

export default () => <LoadingExample />;
