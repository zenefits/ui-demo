const sunsetOrange = '#FF5745';
const navyBlue = '#123466';
const botticelli = '#D6DEE9';
const catskillWhite = '#F1F7F9';
const turquoise = '#2FCDD0';
const morningGlory = '#8BDDDF';
const iceberg = '#D3F3F3';

const black = '#000';
const mirage = '#1C2534';
const shuttleGray = '#53616E';
const regentGray = '#8D9BA7';
const submarine = '#B4BDC5';
const iron = '#DBDFE3';
const white = '#FFF';

const java = '#12AED3';
const deepCerulean = '#0081AA';
const chathamsBlue = '#144E6F';
const bossanova = '#4E2E5E';
const eden = '#155457';
const verdunGreen = '#3B7101';
const sushi = '#84C341';
const caper = '#C3EB9B';
const riceFlower = '#F0FFE0';
const monza = '#C00316';
const vividTangerine = '#FF897C';
const yourPink = '#FFCBC6';
const bridesmaid = '#FEF1F0';
const spicyMustard = '#6F5D0F';
const festival = '#FDE66B';
const lemonChiffon = '#FFF9CD';

const rhino = '#303162';
const bismark = '#446384';
const chathamsBlue2 = '#133F61';
const bostonBlue = '#3998AA';
const easternBlue = '#26A5A8';
const elm = '#1E7C7F';

const primaryHover = '#F25341';
const primaryActive = '#E64F3E';
const defaultNormal = '#D6DEE9';
const defaultHover = '#C8D0DB';
const defaultActive = '#BCC4CF';

export declare type ColorString =
  | 'primary.a'
  | 'secondary.a'
  | 'secondary.b'
  | 'secondary.c'
  | 'tertiary.a'
  | 'tertiary.b'
  | 'tertiary.c'
  | 'grayscale.black'
  | 'grayscale.white'
  | 'grayscale.a'
  | 'grayscale.b'
  | 'grayscale.c'
  | 'grayscale.d'
  | 'grayscale.e'
  | 'grayscale.f'
  | 'grayscale.g'
  | 'link.normal'
  | 'link.hover'
  | 'link.active'
  | 'auxiliary.a'
  | 'auxiliary.b'
  | 'affirmation.a'
  | 'affirmation.b'
  | 'affirmation.c'
  | 'affirmation.d'
  | 'negation.a'
  | 'negation.b'
  | 'negation.c'
  | 'negation.d'
  | 'caution.a'
  | 'caution.b'
  | 'caution.c'
  | 'button.defaultNormal'
  | 'button.defaultHover'
  | 'button.defaultActive'
  | 'button.primaryHover'
  | 'button.primaryActive'
  | 'button.primaryNormal';

export default {
  primary: {
    a: sunsetOrange,
  },
  secondary: {
    a: navyBlue,
    b: botticelli,
    c: catskillWhite,
  },
  tertiary: {
    a: turquoise,
    b: morningGlory,
    c: iceberg,
  },
  grayscale: {
    black,
    white,
    a: black,
    b: mirage,
    c: shuttleGray,
    d: regentGray,
    e: submarine,
    f: iron,
    g: white,
  },
  link: {
    normal: java,
    hover: deepCerulean,
    active: chathamsBlue,
  },
  auxiliary: {
    a: bossanova,
    b: eden,
  },
  affirmation: {
    a: verdunGreen,
    b: sushi,
    c: caper,
    d: riceFlower,
  },
  negation: {
    a: monza,
    b: vividTangerine,
    c: yourPink,
    d: bridesmaid,
  },
  caution: {
    a: spicyMustard,
    b: festival,
    c: lemonChiffon,
  },
  button: {
    defaultNormal,
    defaultHover,
    defaultActive,
    primaryHover,
    primaryActive,
    primaryNormal: sunsetOrange,
  },
  avatar: {
    a: rhino,
    b: bossanova,
    c: bismark,
    d: chathamsBlue2,
    e: bostonBlue,
    f: easternBlue,
    g: elm,
    h: eden,
  },
};
