import React, { ReactElement } from 'react';
import { mount, render as renderEnzyme, shallow } from 'enzyme';
// @ts-ignore
import { ThemeContext, ThemeProvider as SCThemeProvider } from 'styled-components';
import { render, RenderResult } from 'react-testing-library';

import { ThemeProvider } from '../index';

/*
Use this when update to styled-components v4 happens

export function mountWithTheme(children: any, context?: any) {
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
    WrappedStatelessComponent.displayName = WrappedStatelessComponent.displayName;

    return mount(<WrappedStatelessComponent {...children.props} />, context);
  }
}
*/

/** @deprecated */
export function mountWithTheme(children: ReactElement<any>) {
  const root = mount(<ThemeProvider>{children}</ThemeProvider>) as any;
  return mount(children, {
    context: root
      .find(SCThemeProvider)
      .instance()
      .getChildContext(),
    childContextTypes: SCThemeProvider.childContextTypes,
  });
}

/** @deprecated */
export function renderWithTheme(children: ReactElement<any>, context?: any) {
  return renderEnzyme(<ThemeProvider>{children}</ThemeProvider>, context);
}

/** @deprecated */
export function shallowWithTheme(children: ReactElement<any>) {
  return shallow(<ThemeProvider>{children}</ThemeProvider>).dive();
}

export function renderWithContext(children: React.ReactNode): RenderResult {
  // TODO: include intl etc too
  return render(<ThemeProvider>{children}</ThemeProvider>);
}
