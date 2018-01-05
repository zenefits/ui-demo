import get from 'lodash/get';
import { ThemedCssFunction } from 'styled-components';

export const fontSizes = [12, 14, 16, 19, 24, 32, 45, 48];
export const fonts = ['Circular, serif'];
export const weights = [400, 600, 700]; // TODO: update them to only the ones we support

// import circular
import './fonts/circular/lineto-circular-pro-book.eot';
import './fonts/circular/lineto-circular-pro-book.svg';
import './fonts/circular/lineto-circular-pro-book.ttf';
import './fonts/circular/lineto-circular-pro-book.woff';
import './fonts/circular/lineto-circular-pro-medium.eot';
import './fonts/circular/lineto-circular-pro-medium.svg';
import './fonts/circular/lineto-circular-pro-medium.ttf';
import './fonts/circular/lineto-circular-pro-medium.woff';

// import material design icons
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.eot';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.svg';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.ttf';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff2';

export const fontDescriptions = {
  headings: {
    xxl: {
      fontFamily: 0,
      fontSize: 7,
      lineHeight: '1',
      fontWeight: 1,
    },
    xl: {
      fontFamily: 0,
      fontSize: 5,
      lineHeight: '1.25',
      fontWeight: 2,
    },
    l: {
      fontFamily: 0,
      fontSize: 4,
      lineHeight: '1.33',
      fontWeight: 2,
    },
    m: {
      fontFamily: 0,
      fontSize: 3,
      lineHeight: '1.26',
      fontWeight: 2,
    },
    s: {
      fontFamily: 0,
      fontSize: 2,
      lineHeight: '1.5',
      fontWeight: 0,
    },
    xs: {
      fontFamily: 0,
      fontSize: 0,
      lineHeight: '1.33',
      fontWeight: 2,
      uppercase: true,
    },
  },
  controls: {
    xxl: {
      fontFamily: 0,
      fontSize: 4,
      lineHeight: '1.17',
      fontWeight: 1,
    },
    xl: {
      fontFamily: 0,
      fontSize: 3,
      lineHeight: '1.26',
      fontWeight: 1,
    },
    l: {
      fontFamily: 0,
      fontSize: 2,
      lineHeight: '1.25',
      fontWeight: 1,
    },
    m: {
      fontFamily: 0,
      fontSize: 1,
      lineHeight: '1.14',
      fontWeight: 1,
    },
    s: {
      fontFamily: 0,
      fontSize: 0,
      lineHeight: '1',
      fontWeight: 1,
    },
  },
  paragraphs: {
    xxl: {
      fontFamily: 0,
      fontSize: 4,
      lineHeight: '1.33',
      fontWeight: 0,
    },
    xl: {
      fontFamily: 0,
      fontSize: 3,
      lineHeight: '1.47',
      fontWeight: 0,
    },
    l: {
      fontFamily: 0,
      fontSize: 2,
      lineHeight: '1.5',
      fontWeight: 0,
    },
    m: {
      fontFamily: 0,
      fontSize: 1,
      lineHeight: '1.43',
      fontWeight: 0,
    },
    s: {
      fontFamily: 0,
      fontSize: 0,
      lineHeight: '1.33',
      fontWeight: 0,
    },
  },
};

export const fontStyles: { [key: string]: { [key: string]: ThemedCssFunction<any> } } = Object.keys(
  fontDescriptions,
).reduce((rules, categoryName) => {
  const fontDescription = fontDescriptions[categoryName];
  rules[categoryName] = Object.keys(fontDescription).reduce((sizeRules, sizeKey) => {
    const sizeRule = fontDescription[sizeKey];
    sizeRules[sizeKey] =
      `
      font-family: ${fonts[sizeRule.fontFamily]};
      font-size: ${fontSizes[sizeRule.fontSize]}px;
      line-height: ${sizeRule.lineHeight};
      font-weight: ${weights[sizeRule.fontWeight]};
    ` + (sizeRule.uppercase ? 'text-transform: uppercase;' : '');
    return sizeRules;
  }, {});
  return rules;
}, {});

export const fontStyleTagMap = {
  h1: 'headings.xxl',
  h2: 'headings.xl',
  h3: 'headings.l',
  h4: 'headings.m',
  h5: 'headings.s',
  h6: 'headings.xs',
};

const fontFaceRules = `
  @font-face {
    font-family: 'Material-Design-Iconic-Font';
    src: url('assets/fonts/Material-Design-Iconic-Font.woff2') format('woff2'), url('assets/fonts/Material-Design-Iconic-Font.woff') format('woff'), url('assets/fonts/Material-Design-Iconic-Font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular';
    font-style: normal;
    font-weight: 600;
    src: url('assets/fonts/lineto-circular-pro-medium.eot') format('eot');
    src: url('assets/fonts/lineto-circular-pro-medium.eot?#iefix') format('eot'),
    url('assets/fonts/lineto-circular-pro-medium.woff') format('woff'),
    url('assets/fonts/lineto-circular-pro-medium.ttf') format('truetype'),
    url('assets/fonts/lineto-circular-pro-medium.svg') format('svg');
  }

  @font-face {
    font-family: 'Circular';
    font-weight: 400;
    src: url('assets/fonts/lineto-circular-pro-book.eot') format('eot');
    src: url('assets/fonts/lineto-circular-pro-book.eot?#iefix') format('eot'),
    url('assets/fonts/lineto-circular-pro-book.woff') format('woff'),
    url('assets/fonts/lineto-circular-pro-book.ttf') format('truetype'),
    url('assets/fonts/lineto-circular-pro-book.svg') format('svg');
  }


  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
const elementRules = Object.keys(fontStyleTagMap)
  .map(tag => `${tag} { ${get(fontStyles, fontStyleTagMap[tag])} }`)
  .join('\n');

export const typographyRules = fontFaceRules + elementRules;
