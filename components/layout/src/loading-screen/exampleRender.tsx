import React from 'react';

import { Box, Text } from 'zbase';

import { LoadingScreen } from '../../index';

class LoadingExample extends React.Component<{}, { loading: boolean; intervalId?: number }> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    const intervalId = setInterval(this.toggleLoading.bind(this), 4000);
    this.setState({ intervalId });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  toggleLoading() {
    this.setState(prevState => ({ loading: !prevState.loading }));
  }
  render() {
    const realContent = <Text p={2}>Done loading for now.</Text>;
    return (
      <Box style={{ height: 100, position: 'relative' }}>{this.state.loading ? <LoadingScreen /> : realContent}</Box>
    );
  }
}

export default () => <LoadingExample />;
