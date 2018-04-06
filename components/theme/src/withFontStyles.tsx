import React from 'react';
import { styled } from './web/ThemeProvider';
import { fontStyles } from './utils';

declare type WithFontStyleProps<P> = P & { fontStyle: string };
export default <P extends {}>(WrappedComponent: React.ComponentClass<P>) => {
  const StyledWrappedComponent = styled(WrappedComponent)`
    ${(props: WithFontStyleProps<P>) => fontStyles(props.fontStyle)(props) as any};
  `;

  return class WithFontStyle extends React.Component<WithFontStyleProps<P>> {
    static displayName = `FontStyles(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    render() {
      return <StyledWrappedComponent {...this.props as any} />;
    }
  };
};
