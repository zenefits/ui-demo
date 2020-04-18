import React, { ReactElement } from 'react';
import { mount, render as renderEnzyme, shallow } from 'enzyme';
// @ts-ignore
import { ThemeContext, ThemeProvider as SCThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { ThemeProvider } from '../index';

export function mountEnzymeWithTheme(children: any, context?: any) {
  if (children.type.prototype instanceof React.Component) {
    const ChildClass = children.type as any;

    class ChildClassWrapper extends ChildClass {
      render() {
        return <ThemeProvider>{super.render()}</ThemeProvider>;
      }
    }

    const ComponentToMount = ChildClassWrapper as any;
    ComponentToMount.defaultProps = ChildClass.defaultProps;
    ComponentToMount.displayName = ChildClass.displayName;

    return mount(<ComponentToMount {...children.props} />, context);
  } else {
    const WrappedStatelessComponent: React.StatelessComponent<any> = (props: any) => (
      <ThemeProvider>{React.cloneElement(children, { ...children.props, ...props })}</ThemeProvider>
    );
    WrappedStatelessComponent.defaultProps = children.type.defaultProps;
    // eslint-disable-next-line no-self-assign
    WrappedStatelessComponent.displayName = WrappedStatelessComponent.displayName;

    return mount(<WrappedStatelessComponent {...children.props} />, context);
  }
}

/** @deprecated */
export function renderEnzymeWithTheme(children: ReactElement<any>, context?: any) {
  return renderEnzyme(<ThemeProvider>{children}</ThemeProvider>, context);
}

/** @deprecated */
export function shallowEnzymeWithTheme(children: ReactElement<any>) {
  return shallow(<ThemeProvider>{children}</ThemeProvider>).dive();
}

type RenderOptions = {
  locale?: string;
  messages?: { [key: string]: string };
};

export function renderWithContext(children: React.ReactNode, options: RenderOptions = {}): RenderResult {
  return render(
    <IntlProvider locale={options.locale || 'en'} messages={options.messages || { foo: 'bar' }}>
      <ThemeProvider>{children}</ThemeProvider>
    </IntlProvider>,
  );
}
