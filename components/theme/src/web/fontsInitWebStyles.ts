import { fontStyles, FontStyleString } from './fonts';

// import local fonts
// import '../fonts/my-font.eot';
// import '../fonts/my-font.svg';
// import '../fonts/my-font.ttf';
// import '../fonts/my-font.woff';
// import '../fonts/my-font-medium.eot';
// import '../fonts/my-font-medium.svg';
// import '../fonts/my-font-medium.ttf';
// import '../fonts/my-font-medium.woff';

// import material design icons
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.eot';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.svg';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.ttf';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff2';

export const fontStyleTagMap: { [key: string]: FontStyleString } = {
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
    src: url('assets/fonts/my-font-medium.eot') format('eot');
    src: url('assets/fonts/my-font-medium.eot?#iefix') format('eot'),
    url('assets/fonts/my-font-medium.woff') format('woff'),
    url('assets/fonts/my-font-medium.ttf') format('truetype'),
    url('assets/fonts/my-font-medium.svg') format('svg');
  }

  @font-face {
    font-family: 'Circular';
    font-weight: 400;
    src: url('assets/fonts/my-font.eot') format('eot');
    src: url('assets/fonts/my-font.eot?#iefix') format('eot'),
    url('assets/fonts/my-font.woff') format('woff'),
    url('assets/fonts/my-font.ttf') format('truetype'),
    url('assets/fonts/my-font.svg') format('svg');
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
const elementRules = Object.keys(fontStyleTagMap)
  .map(tag => `${tag} { ${fontStyles[fontStyleTagMap[tag]]} }`)
  .join('\n');

export const typographyRules = fontFaceRules + elementRules;
