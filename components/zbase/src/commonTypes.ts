export type UtilProp = number | string;

export const utilTypesMap = {
  padding: {
    p: true,
    pb: true,
    pl: true,
    pr: true,
    pt: true,
    px: true,
    py: true,
  },
  margin: {
    m: true,
    mb: true,
    ml: true,
    mr: true,
    mt: true,
    mx: true,
    my: true,
  },
  font: {
    fontStyle: true,
    f: true,
    fontSize: true,
  },
  color: {
    color: true,
  },
  bg: {
    bg: true,
  },
  width: {
    w: true,
    width: true,
  },
};

export type UtilsType = keyof (typeof utilTypesMap);

export interface UtilTypeMargin<PropType> {
  /**
   * Margin area separating the component from its neighbors.
   * @see See [Spacing](#spacing) for details.
   * */
  m?: PropType;
  mb?: PropType;
  ml?: PropType;
  mr?: PropType;
  mt?: PropType;
  mx?: PropType;
  my?: PropType;
}

export interface UtilTypePadding<PropType> {
  /**
   * Padding that extends the component's content area.
   * @see See [Spacing](#spacing) for details.
   * */
  p?: PropType;
  pb?: PropType;
  pl?: PropType;
  pr?: PropType;
  pt?: PropType;
  px?: PropType;
  py?: PropType;
}

export interface UtilTypeFont<PropType, FontPropType> {
  /**
   * Shorthand for `fontSize`.
   * */
  f?: PropType;
  /**
   * @see See [Typography](#typography) for details.
   * */
  fontSize?: PropType; // TODO: replace with fontStyle
  fontStyle?: FontPropType;
}

export interface UtilTypeWidth<PropType> {
  /**
   * Shorthand for `width`.
   * */
  w?: PropType;
  /**
   * Width of a component (border area), typically specified as a fraction (eg `w={1 / 2}`).
   * */
  width?: PropType;
}

export interface UtilTypeBg<ColorPropType> {
  /**
   * Background color of the component, specified by key from our theme.
   * @see See [Color](#color) for details.
   */
  bg?: ColorPropType;
}

export interface UtilTypeColor<ColorPropType> {
  /**
   * Foreground color of the component's text content, specified by key from our theme.
   * @see See [Color](#color) for details.
   * */
  color?: ColorPropType;
}

export interface UtilTypeBorder<ColorStringType> {
  /**
   * Display a solid border around the component with default width and color.
   */
  border?: boolean;
  /**
   * Display a solid top border with default width and color.
   */
  borderTop?: boolean;
  /**
   * Display a solid right border with default width and color.
   */
  borderRight?: boolean;
  /**
   * Display a solid bottom border with default width and color.
   */
  borderBottom?: boolean;
  /**
   * Display a solid left border with default width and color.
   */
  borderLeft?: boolean;
  /**
   * Override color for all specified borders.
   */
  borderColor?: ColorStringType;
}

export interface UtilsMapCommon<PropType, ColorPropType, FontPropType>
  extends UtilTypeMargin<PropType>,
    UtilTypePadding<PropType>,
    UtilTypeFont<PropType, FontPropType>,
    UtilTypeWidth<PropType>,
    UtilTypeBg<ColorPropType>,
    UtilTypeColor<ColorPropType> {}

const utilPropsMap: { [key in keyof UtilsMapCommon<any, any, any>]: any } = {
  bg: true,
  color: true,
  f: true,
  fontSize: true,
  fontStyle: true,
  m: true,
  mb: true,
  ml: true,
  mr: true,
  mt: true,
  mx: true,
  my: true,
  p: true,
  pb: true,
  pl: true,
  pr: true,
  pt: true,
  px: true,
  py: true,
  w: true,
  width: true,
};

export function removeUtilProps(props, additionalProps = {}) {
  const result = {};
  Object.keys(props).forEach(key => {
    const inAdditionalProps = additionalProps && additionalProps[key];
    if (!utilPropsMap[key] && !inAdditionalProps) {
      result[key] = props[key];
    }
  });
  return result;
}

export function isUtilProp(key): boolean {
  return utilPropsMap.hasOwnProperty(key);
}

export type ValueHelperFn = ((propValue: any, props: any) => string);
type ValueHelper = ValueHelperFn | string;
type UtilFn = ((propValue: any) => (props: any) => string);

export type PropsMapValue = ValueHelperFn | ExtendedPropsMapValue;

export interface ExtendedPropsMapValue {
  /**
   * name of the css rule, e.g. 'border-bottom'
   */
  cssName?: string;
  valueHelper?: ValueHelper;
  utilFn?: UtilFn;
}

export interface PropsMap {
  [key: string]: PropsMapValue | PropsMapValue[] | ValueHelperFn | ValueHelperFn[];
}

export interface IntlTextProps {
  /**
   * Unique identifier of the message to find and display.
   */
  textKey?: string;
  /**
   * Shallow object used to fill placeholders in the message.
   */
  textValues?: { [key: string]: string };
  /**
   * Fallback message to display if no message for current locale.
   */
  textDefault?: string;
}
