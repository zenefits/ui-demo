import { ColorString, FontStyleString } from 'z-frontend-theme';

import {
  UtilsMapCommon,
  UtilProp,
  UtilTypeBg as UtilTypeBgBase,
  UtilTypeBorder as UtilTypeBorderBase,
  UtilTypeColor as UtilTypeColorBase,
  UtilTypeFont as UtilTypeFontBase,
  UtilTypeMargin as UtilTypeMarginBase,
  UtilTypePadding as UtilTypePaddingBase,
  UtilTypeWidth as UtilTypeWidthBase,
} from '../commonTypes';

export type ResponsiveUtilProp = UtilProp | UtilProp[];
type ResponsiveColorProp = ColorString | ColorString[];
export type ResponsiveFontStyleProp = FontStyleString | FontStyleString[];

export interface UtilProps extends UtilsMapCommon<ResponsiveUtilProp, ResponsiveColorProp, ResponsiveFontStyleProp> {}

export interface UtilTypeBg extends UtilTypeBgBase<ResponsiveColorProp> {}
export interface UtilTypeColor extends UtilTypeColorBase<ResponsiveColorProp> {}
export interface UtilTypeFont extends UtilTypeFontBase<ResponsiveUtilProp, ResponsiveFontStyleProp> {}
export interface UtilTypePadding extends UtilTypePaddingBase<ResponsiveUtilProp> {}
export interface UtilTypeWidth extends UtilTypeWidthBase<ResponsiveUtilProp> {}
export interface UtilTypeMargin extends UtilTypeMarginBase<ResponsiveUtilProp> {}
export interface UtilTypeBorder extends UtilTypeBorderBase<ColorString> {}

// NOTE: not supported in react-native for some reason
export interface TextTransformProps {
  /** Transform capitalization via CSS property `text-transform`. */
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | 'initial';
}
