// Type definitions for Rebass 1.0.3
// Project: https://github.com/jxnblk/rebass
// Definitions by: rhysd <https://rhysd.github.io>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4.2

type prop = number | string | [number | string];

export interface RebassOnlyProps {
  // bg?: any;
  // tagName?: string;
  // className?: string;
  // baseStyle?: Object;
  // style?: Object;
  bg?: string | [string];
  color?: string | [string];
  f?: prop;
  fontSize?: prop;
  m?: prop;
  mb?: prop;
  ml?: prop;
  mr?: prop;
  mt?: prop;
  mx?: prop;
  my?: prop;
  p?: prop;
  pb?: prop;
  pl?: prop;
  pr?: prop;
  pt?: prop;
  px?: prop;
  py?: prop;
  w?: prop;
  width?: prop;
}

export interface RebassProps<C> extends RebassOnlyProps, React.HTMLProps<C> {}
