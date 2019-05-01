import React from 'react';
// @ts-ignore
import { proxyPropTypes } from 'react-cosmos-shared/react';
import { ThemeProvider } from 'styled-components';

const defaults = {
  theme: {},
};

const createStyledComponentsProxy = (options: any) => {
  const { theme = {} } = { ...defaults, ...options };

  const StyledComponentsProxy = ({ nextProxy, ...rest }: any) => {
    const { value: NextProxy, next } = nextProxy;

    return (
      <ThemeProvider theme={theme}>
        <NextProxy {...rest} nextProxy={next()} />
      </ThemeProvider>
    );
  };

  (StyledComponentsProxy as React.ComponentType).propTypes = proxyPropTypes;

  return StyledComponentsProxy;
};

export default createStyledComponentsProxy;
