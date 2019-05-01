require('material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.eot');
require('material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.svg');
const materialDesignIconicTtf = require('material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.ttf');
const materialDesignIconicWoff = require('material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff');
const materialDesignIconicWoff2 = require('material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff2');

import { fontStyles, FontStyleString } from './fonts';
import { theme } from './theme';
const circularLightEot = require('../fonts/circular/lineto-circular-pro-book.eot');
const circularLightSvg = require('../fonts/circular/lineto-circular-pro-book.svg');
const circularLightTtf = require('../fonts/circular/lineto-circular-pro-book.ttf');
const circularLightWoff = require('../fonts/circular/lineto-circular-pro-book.woff');
const circularMediumEot = require('../fonts/circular/lineto-circular-pro-medium.eot');
const circularMediumSvg = require('../fonts/circular/lineto-circular-pro-medium.svg');
const circularMediumTtf = require('../fonts/circular/lineto-circular-pro-medium.ttf');
const circularMediumWoff = require('../fonts/circular/lineto-circular-pro-medium.woff');

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
    src: url('${materialDesignIconicWoff2}') format('woff2'), url('${materialDesignIconicWoff}') format('woff'), url('${materialDesignIconicTtf}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular';
    font-style: normal;
    font-weight: 600;
    src: url('${circularMediumEot}') format('eot');
    src: url('${circularMediumEot}?#iefix') format('eot'),
    url('${circularMediumWoff}') format('woff'),
    url('${circularMediumTtf}') format('truetype'),
    url('${circularMediumSvg}') format('svg');
  }

  @font-face {
    font-family: 'Circular';
    font-weight: 400;
    src: url('${circularLightEot}') format('eot');
    src: url('${circularLightEot}?#iefix') format('eot'),
    url('${circularLightWoff}') format('woff'),
    url('${circularLightTtf}') format('truetype'),
    url('${circularLightSvg}') format('svg');
  }
`;

const elementRules = Object.keys(fontStyleTagMap)
  .map(
    tag => `${tag} {
    ${fontStyles[fontStyleTagMap[tag]]}
    font-family: ${theme.fonts[0]};
  }`,
  )
  .join('\n');

export const typographyRules = fontFaceRules + elementRules;
