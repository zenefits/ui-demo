import React from 'react';
import get from 'lodash/get';
import { styled } from './ThemeProvider';
import { fontStyles } from './fonts';

declare type WithFontStyleProps<P> = P & { fontStyle: string };
export default <P extends {}>(WrappedComponent: React.ComponentClass<P>) => {
  const StyledWrappedComponent = styled(WrappedComponent)`
    ${(props: WithFontStyleProps<P>) => get(fontStyles, props.fontStyle) as any};
  `;

  return class WithFontStyle extends React.Component<WithFontStyleProps<P>> {
    static displayName = `FontStyles(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    render() {
      return <StyledWrappedComponent {...this.props as any} />;
    }
  };
};
