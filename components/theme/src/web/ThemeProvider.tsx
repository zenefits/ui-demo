/* eslint-disable zenefits-custom-rules/import-filter */
import React, { createContext } from 'react';
import { findDOMNode } from 'react-dom';

import {
  createGlobalStyle as baseCreateGlobalStyle,
  css as baseCss,
  default as baseStyled,
  keyframes as baseKeyframes,
  withTheme as baseWithTheme,
  ThemedStyledComponentsModule,
  ThemeProvider as BaseThemeProvider,
} from 'styled-components';
import styledNormalize from 'styled-normalize';

import { theme, ThemeInterface } from './theme';
import { typographyRules } from './fontsInitWebStyles';
import { getColor } from '../colors';

declare global {
  interface Window {
    __WITHIN_EMBER_APP__: boolean;
  }
}

const { default: styled, css, withTheme, ThemeProvider, createGlobalStyle, keyframes } = {
  default: baseStyled,
  css: baseCss,
  keyframes: baseKeyframes,
  createGlobalStyle: baseCreateGlobalStyle,
  withTheme: baseWithTheme,
  ThemeProvider: BaseThemeProvider,
} as ThemedStyledComponentsModule<ThemeInterface>;

export const APP_STYLE_ROOT_CLASS = `${__APP_NAME__.replace('/', '--')}-app-style-root`;
export const EMBEDDED_STYLEGUIDE_EXAMPLE_CLASS = 'z-styleguide-embedded-example';

const isStyleguide = __APP_NAME__ === 'z-styleguide';
const cssRootSelector = `.${isStyleguide ? EMBEDDED_STYLEGUIDE_EXAMPLE_CLASS : APP_STYLE_ROOT_CLASS}`;

export const ZFrontendThemeContext = createContext<{
  theme: ThemeInterface;
  // NOTE This should be used very rarely. This will update the global theme so could have unwanted side effects.
  setThemeProp: (propPath: string, newValue: any) => void;
}>({ theme, setThemeProp: () => {} });

class ZFrontendThemeProvider extends React.Component<{}, { theme: ThemeInterface }> {
  state = {
    theme,
  };
  componentDidMount() {
    if (__IS_STORYBOOK__) {
      const rootEl = findDOMNode(this) as HTMLElement;
      if (rootEl) {
        const parentEl = rootEl.parentElement as HTMLElement;
        parentEl.classList.add(APP_STYLE_ROOT_CLASS);
      } else {
        const errorMessage = [
          'Your story did not render any dom elements.',
          'You can fix this by adding a decorator to your stories. eg:',
          "storiesOf('MyComponent', module)",
          '.addDecorator((getStory: Function) => <Box>{getStory()}</Box>)',
        ].join('\n');
        throw new Error(errorMessage);
      }
    }
  }

  setThemeProp = (prop: keyof ThemeInterface, newValue: any) => {
    this.setState(state => ({
      theme: { ...state.theme, [prop]: newValue },
    }));
  };

  render() {
    return (
      <ZFrontendThemeContext.Provider value={{ theme: this.state.theme, setThemeProp: this.setThemeProp }}>
        <ThemeProvider theme={this.state.theme}>{this.props.children as any}</ThemeProvider>
        <GlobalStyle />
      </ZFrontendThemeContext.Provider>
    );
  }
}

const inheritFont = css`
  font-size: inherit;
  font: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const GlobalStyle = createGlobalStyle`
  ${!window.__WITHIN_EMBER_APP__ ? `body { background-color: ${getColor('grayscale.g')}; margin: 0; }` : ''}

  ${cssRootSelector}  {
    * {
      box-sizing: border-box;
    }

    font-family: ${theme.fonts[0]};
    color: ${getColor('text.default')};
    letter-spacing: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    div, span, applet, object, iframe,
    blockquote, abbr, acronym, address,
    big, cite, del, dfn, img, ins, kbd,
    q, s, samp, small, strike, sub, sup, tt, var,
    center, dl, dt, dd, fieldset,
    form, label, legend, table, caption,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      ${inheritFont};
      margin: 0;
      padding: 0;
      color: inherit;
      vertical-align: baseline;
    }

    h1, h2, h3, h4, h5, h6 {
      padding: 0px;
    }

    ol, ul, li {
      ${inheritFont}
      color: inherit;
      vertical-align: baseline;
    }

    td, th, tr {
      ${inheritFont};
      color: inherit;
      vertical-align: inherit;
    }

    p, b, u, i, em, strong, pre, code {
      ${inheritFont};
      margin: 0;
      padding: 0;
      color: inherit;
      vertical-align: baseline;
    }

    a {
      ${inheritFont}
      vertical-align: baseline;
    }

    em, i {
      font-style: italic
    }

    p {
      margin-top: 1em;
      margin-bottom: 1em;
    }

    th {
      font-weight: bold;
    }

    /* styles on <html> tag from normalize  */
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;

    ${styledNormalize}
    ${typographyRules}
  }

  ${
    isStyleguide
      ? `
    body {
      * {
        box-sizing: border-box;
      }
      font-family: ${theme.fonts[0]};
      color: ${getColor('text.default')};
      letter-spacing: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
    }

    ${styledNormalize}
    ${typographyRules}
  `
      : ''
  }
`;

function createThemeProvider() {
  return [ZFrontendThemeProvider, {}];
}

export type WithThemeProps = {
  theme: ThemeInterface;
};

export { ZFrontendThemeProvider, createThemeProvider, styled, css, withTheme, keyframes };
