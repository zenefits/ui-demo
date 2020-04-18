import React from 'react';

import { styled } from './web/ThemeProvider';
import { fontStyles } from './utils';
import { ThemeInterface } from './web/theme';

type WithFontStyleProps<P> = P & { fontStyle: string };
export default <P extends { theme: ThemeInterface }>(WrappedComponent: React.ComponentClass<P>) => {
  const StyledWrappedComponent = styled(WrappedComponent)`
    ${(props: WithFontStyleProps<P>) => fontStyles(props.fontStyle)(props)};
  `;

  return class WithFontStyle extends React.Component<WithFontStyleProps<P>> {
    static displayName = `FontStyles(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    render() {
      return <StyledWrappedComponent {...(this.props as any)} />;
    }
  };
};
