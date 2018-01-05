import { ThemedStyledFunction, ThemedStyledProps } from 'styled-components';
import { color, space, fontSizes } from '../utils';
import { ColorString } from '../colors';

type UtilProp = number | string;
type ResponsiveUtilProp = UtilProp | UtilProp[];
type ResponsiveColorProp = ColorString | ColorString[];

interface UtilsMapCommon<PropType, ColorPropType> {
  bg?: ColorPropType;
  color?: ColorPropType;
  f?: PropType;
  fontSize?: PropType;
  m?: PropType;
  mb?: PropType;
  ml?: PropType;
  mr?: PropType;
  mt?: PropType;
  mx?: PropType;
  my?: PropType;
  p?: PropType;
  pb?: PropType;
  pl?: PropType;
  pr?: PropType;
  pt?: PropType;
  px?: PropType;
  py?: PropType;
  w?: PropType;
  width?: PropType;
}

export interface UtilPropsNative extends UtilsMapCommon<UtilProp, ColorString> {}
export interface UtilPropsWeb extends UtilsMapCommon<ResponsiveUtilProp, ResponsiveColorProp> {}

type UtilComponentProps = { [key: string]: ResponsiveUtilProp };
type ValueHelper = ((propValue: any, props: any) => string) | string;
type UtilFn = ((any) => (any) => string);

interface PropsMapValue {
  css: string;
  value?: ValueHelper;
  utilFn?: UtilFn;
}

interface PropsMap {
  [key: string]: PropsMapValue | PropsMapValue[];
}

function getCssStringForPropValue(
  propVal: UtilProp,
  breakpoint: number | null,
  props,
  cssPropName: string,
  value?: ValueHelper,
  utilFn?: UtilFn,
) {
  let cssPropVal;
  if (utilFn) {
    cssPropVal = utilFn(propVal)(props);
  } else if (value) {
    if (typeof value === 'function') {
      cssPropVal = value(propVal, props);
    } else {
      cssPropVal = value;
    }
  } else {
    cssPropVal = propVal;
  }

  if (!cssPropVal) {
    return '';
  }

  if (breakpoint != null) {
    return `@media screen and (min-width: ${props.theme.breakpoints[breakpoint]}em) { ${cssPropName}: ${cssPropVal}; }`;
  }
  return `${cssPropName}: ${cssPropVal};`;
}

function getCssRuleForProp({
  cssPropName,
  key,
  value,
  utilFn,
}: {
  cssPropName: string;
  key: string;
  value?: ValueHelper;
  utilFn?: UtilFn;
}) {
  return (props): string => {
    const propVal = (props as UtilComponentProps)[key];
    if (!propVal) {
      return '';
    }

    const isArr = Array.isArray(propVal);

    return (isArr ? (propVal as UtilProp[]) : [propVal as UtilProp])
      .map((v, i) => {
        const breakpoint = isArr && i > 0 ? i - 1 : null;
        return getCssStringForPropValue(v, breakpoint, props, cssPropName, value, utilFn);
      })
      .join('');
  };
}

function getCssFromProps(propsMap: PropsMap, defaultUtilProps = {}) {
  return (props): string =>
    Object.keys(propsMap)
      .map(propName => {
        if (Array.isArray(propsMap[propName])) {
          return (propsMap[propName] as PropsMapValue[])
            .map(d =>
              getCssRuleForProp({ cssPropName: d.css, key: propName, value: d.value, utilFn: d.utilFn })(
                Object.assign({}, defaultUtilProps, props),
              ),
            )
            .join('');
        }
        return getCssRuleForProp({
          cssPropName: (propsMap[propName] as PropsMapValue).css,
          key: propName,
          value: (propsMap[propName] as PropsMapValue).value,
          utilFn: (propsMap[propName] as PropsMapValue).utilFn,
        })(Object.assign({}, defaultUtilProps, props));
      })
      .join('');
}

const widthValueFn = v => {
  if (typeof v === 'number') {
    if (v <= 1) {
      return v / 1 * 100 + '%';
    } else {
      return v + 'px';
    }
  } else {
    return v;
  }
};

const utilsPropsMap: PropsMap = {
  bg: { css: 'background-color', utilFn: color },
  color: { css: 'color', utilFn: color },
  f: { css: 'font-size', utilFn: fontSizes },
  fontSize: { css: 'font-size', utilFn: fontSizes },

  m: { css: 'margin', utilFn: space },
  mx: [{ css: 'margin-left', utilFn: space }, { css: 'margin-right', utilFn: space }],
  my: [{ css: 'margin-top', utilFn: space }, { css: 'margin-bottom', utilFn: space }],

  ml: { css: 'margin-left', utilFn: space },
  mr: { css: 'margin-right', utilFn: space },
  mt: { css: 'margin-top', utilFn: space },
  mb: { css: 'margin-bottom', utilFn: space },

  p: { css: 'padding', utilFn: space },
  px: [{ css: 'padding-left', utilFn: space }, { css: 'padding-right', utilFn: space }],
  py: [{ css: 'padding-top', utilFn: space }, { css: 'padding-bottom', utilFn: space }],

  pl: { css: 'padding-left', utilFn: space },
  pr: { css: 'padding-right', utilFn: space },
  pt: { css: 'padding-top', utilFn: space },
  pb: { css: 'padding-bottom', utilFn: space },

  w: { css: 'width', value: widthValueFn },
  width: { css: 'width', value: widthValueFn },
};

export const utilHocFactory = function<UtilProps, Theme>(styled, css, useResponsive = false) {
  function withUtilProps<ComponentProps, AdditionalProps = {}>({
    componentAttrs,
    defaultUtilProps,
    additionalPropsMap,
    additionalCss,
  }: {
    componentAttrs?: {
      [K in keyof (ComponentProps & AdditionalProps)]:
        | ((props: ThemedStyledProps<ComponentProps & AdditionalProps, Theme>) => (ComponentProps & AdditionalProps)[K])
        | (ComponentProps & AdditionalProps)[K]
    };
    defaultUtilProps?: UtilProps & AdditionalProps;
    additionalPropsMap?: PropsMap;
    additionalCss?: any;
  }) {
    return (component: ThemedStyledFunction<ComponentProps & AdditionalProps & UtilProps, Theme>) =>
      component.attrs<AdditionalProps, ComponentProps & AdditionalProps>(componentAttrs)`
      ${getCssFromProps(utilsPropsMap, defaultUtilProps)}
      ${additionalCss || ''}
      ${additionalPropsMap ? getCssFromProps(additionalPropsMap) : ''};
    `;
  }

  return withUtilProps;
};
