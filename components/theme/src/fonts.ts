export const fontSizes = [12, 14, 16, 19, 24, 32, 45];
export const fonts = ['Source Sans Pro, sans-serif', 'Source Serif Pro, serif'];
export const weights = [300, 400, 600];

// import material design icons
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.eot';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.svg';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.ttf';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff';
import 'material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff2';

export const fontInfo = [
  {
    tag: 'h1',
    family: 1,
    size: 6,
    weight: 0,
  },
  {
    tag: 'h2',
    family: 1,
    size: 5,
    weight: 0,
  },
  {
    tag: 'h3',
    family: 1,
    size: 4,
    weight: 0,
  },
  {
    tag: 'h4',
    family: 1,
    size: 3,
    weight: 0,
  },
  {
    tag: 'h5',
    family: 0,
    size: 2,
    weight: 2,
  },
  {
    tag: 'h6',
    family: 0,
    size: 0,
    weight: 2,
  },
  {
    tag: 'p',
    family: 0,
    size: 2,
    weight: 1,
  },
  {
    tag: 'label',
    family: 0,
    size: 1,
    weight: 2,
  },
  {
    tag: 'caption',
    family: 0,
    size: 1,
    weight: 1,
  },
  {
    tag: 'li',
    family: 0,
    size: 2,
    weight: 1,
  },
];

const fontFaceRules = `
  @font-face {
    font-family: 'Material-Design-Iconic-Font';
    src: url('/assets/fonts/Material-Design-Iconic-Font.woff2') format('woff2'), url('/assets/fonts/Material-Design-Iconic-Font.woff') format('woff'), url('/assets/fonts/Material-Design-Iconic-Font.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    src: local('Source Sans Pro'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v9/ODelI1aHBYDBqgeIAH2zlCxe5Tewm2_XWfbGchcXw4g.woff2) format('woff2');
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    src: local('Source Sans Pro'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v9/ODelI1aHBYDBqgeIAH2zlIa1YDtoarzwSXxTHggEXMw.woff2) format('woff2');
    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    src: local('Source Sans Pro'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v9/ODelI1aHBYDBqgeIAH2zlJbPFduIYtoLzwST68uhz_Y.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
  }

  /* latin-ext */
  @font-face {
    font-family: 'Source Serif Pro';
    font-style: normal;
    font-weight: 400;
    src: local('Source Serif Pro'), local('SourceSerifPro-Regular'), url(https://fonts.gstatic.com/s/sourceserifpro/v4/CeUM4np2c42DV49nanp55bjTNMXmj3xV6BEVxFZkUvg.woff2) format('woff2');
    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Source Serif Pro';
    font-style: normal;
    font-weight: 400;
    src: local('Source Serif Pro'), local('SourceSerifPro-Regular'), url(https://fonts.gstatic.com/s/sourceserifpro/v4/CeUM4np2c42DV49nanp55fwyBZ-rE6leZUadLL2YbCE.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
  }
`;

const elementRules = fontInfo
  .map(
    font =>
      `${font.tag} {font-family: ${fonts[font.family]}; font-size: ${fontSizes[font.size]}px; font-weight: ${weights[
        font.weight
      ]};}`,
  )
  .join('\n');

export const typographyRules = fontFaceRules + elementRules;
