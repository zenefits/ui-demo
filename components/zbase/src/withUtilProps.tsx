import React, { Component } from 'react';
import { ObjectOmit } from 'typelevel-ts';
import { capitalize } from 'lodash';

/* tslint:disable:import-filter */
import styledWeb, { ThemedStyledInterface, ThemedStyledProps } from 'styled-components';
/* tslint:enable:import-filter */

import { color, space, fontSizes } from 'z-frontend-theme/utils';

import {
  UtilProp,
  PropsMap,
  PropsMapValue,
  ExtendedPropsMapValue,
  ValueHelperFn,
  removeUtilProps,
  utilTypesMap,
  UtilsType,
} from './commonTypes';

export function getCssStringForPropValue(
  propVal: UtilProp,
  breakpoint: number | null,
  props,
  propsMapValue: PropsMapValue,
) {
  const { cssName, utilFn } = propsMapValue as ExtendedPropsMapValue;
  let { valueHelper } = propsMapValue as ExtendedPropsMapValue;
  if (typeof propsMapValue === 'function') {
    valueHelper = propsMapValue as ValueHelperFn;
  }

  let resultCssVal: string;
  if (utilFn) {
    resultCssVal = utilFn(propVal)(props);
  } else if (valueHelper) {
    if (typeof valueHelper === 'function') {
      resultCssVal = valueHelper(propVal, props);
    } else {
      resultCssVal = valueHelper;
    }
  } else {
    resultCssVal = typeof propVal === 'number' ? propVal.toString() : propVal;
  }

  if (!resultCssVal) {
    return '';
  }

  if (cssName) {
    resultCssVal = `${cssName}: ${resultCssVal};`;
  }

  if (breakpoint != null) {
    if (propVal == null) {
      // miss the breakpoint if prop value is null in an array prop, e.g. w={[1/2, null, 1/4]}
      return '';
    }
    const bpValue = props.theme.breakpoints[Math.min(breakpoint, props.theme.breakpoints.length - 1)];
    return `@media screen and (min-width: ${bpValue}em) { ${resultCssVal} }`;
  }
  return resultCssVal;
}

export function getCssRuleForProp(propName: string, propsMapValue: PropsMapValue) {
  return (props): string => {
    const propVal = props[propName];
    if (propVal === null || propVal === undefined) {
      return '';
    }

    const isArr = Array.isArray(propVal);

    return (isArr ? (propVal as UtilProp[]) : [propVal as UtilProp])
      .map((v, i) => {
        const breakpoint = isArr && i > 0 ? i - 1 : null;
        return getCssStringForPropValue(v, breakpoint, props, propsMapValue);
      })
      .filter(v => v)
      .join('\n');
  };
}

export function getCssFromProps(propsMap: PropsMap, defaultUtilProps = {}) {
  return (props): string =>
    Object.keys(propsMap)
      .map(propName => {
        const arr: PropsMapValue[] = Array.isArray(propsMap[propName])
          ? (propsMap[propName] as PropsMapValue[])
          : [propsMap[propName] as PropsMapValue];
        const propsWithDefaults = Object.assign({}, /* defaultUtilProps, */ props);
        return arr
          .map(propsMapValue => getCssRuleForProp(propName, propsMapValue)(propsWithDefaults))
          .filter(v => v)
          .join('');
      })
      .filter(v => v)
      .join('\n');
}

export const widthValueFn = v => {
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

export const spaceValueHelper: ValueHelperFn = (propValue, props) => {
  let result;
  if (typeof propValue === 'number') {
    result = space(propValue, false)(props);
    if (result === undefined || result === null) {
      result = `${propValue}px`;
    }
  } else {
    result = propValue;
  }
  return result;
};

const utilsPropsMap: PropsMap = {
  bg: { cssName: 'background-color', utilFn: color },
  color: { cssName: 'color', utilFn: color },
  f: { cssName: 'font-size', utilFn: fontSizes },
  fontSize: { cssName: 'font-size', utilFn: fontSizes },

  m: { cssName: 'margin', valueHelper: spaceValueHelper },
  mx: [
    { cssName: 'margin-left', valueHelper: spaceValueHelper },
    { cssName: 'margin-right', valueHelper: spaceValueHelper },
  ],
  my: [
    { cssName: 'margin-top', valueHelper: spaceValueHelper },
    { cssName: 'margin-bottom', valueHelper: spaceValueHelper },
  ],
  ml: { cssName: 'margin-left', valueHelper: spaceValueHelper },
  mr: { cssName: 'margin-right', valueHelper: spaceValueHelper },
  mt: { cssName: 'margin-top', valueHelper: spaceValueHelper },
  mb: { cssName: 'margin-bottom', valueHelper: spaceValueHelper },

  p: { cssName: 'padding', valueHelper: spaceValueHelper },
  px: [
    { cssName: 'padding-left', valueHelper: spaceValueHelper },
    { cssName: 'padding-right', valueHelper: spaceValueHelper },
  ],
  py: [
    { cssName: 'padding-top', valueHelper: spaceValueHelper },
    { cssName: 'padding-bottom', valueHelper: spaceValueHelper },
  ],
  pl: { cssName: 'padding-left', valueHelper: spaceValueHelper },
  pr: { cssName: 'padding-right', valueHelper: spaceValueHelper },
  pt: { cssName: 'padding-top', valueHelper: spaceValueHelper },
  pb: { cssName: 'padding-bottom', valueHelper: spaceValueHelper },

  w: { cssName: 'width', valueHelper: widthValueFn },
  width: { cssName: 'width', valueHelper: widthValueFn },
};

export declare type ResultComponentProps<ComponentProps, AdditionalProps = {}, UtilProps = {}> = ObjectOmit<
  ComponentProps,
  keyof (AdditionalProps & UtilProps)
> &
  AdditionalProps &
  UtilProps;

export declare interface WithUtilPropsOptions<ComponentProps, AdditionalProps, UtilProps, Theme> {
  displayName?: string;
  componentAttrs?: {
    [K in keyof (ComponentProps & AdditionalProps & UtilProps)]:
      | ((
          props: ThemedStyledProps<ResultComponentProps<ComponentProps, UtilProps, AdditionalProps>, Theme>,
        ) => (ComponentProps & AdditionalProps & UtilProps)[K])
      | (ComponentProps & AdditionalProps & UtilProps)[K]
  };
  defaultUtilProps?: Partial<ComponentProps & UtilProps & AdditionalProps>;
  additionalPropsMap?: PropsMap;
  additionalCss?: any;
  styled?: ThemedStyledInterface<Theme>;
  additionalUtilsPropsMap?: PropsMap;
  utilTypes?: UtilsType[];
}

function zbase<ComponentProps, AdditionalProps, UtilProps, Theme, StringTag = keyof JSX.IntrinsicElements>({
  displayName,
  componentAttrs,
  defaultUtilProps,
  additionalPropsMap,
  additionalCss,
  styled,
  additionalUtilsPropsMap,
  utilTypes,
}: WithUtilPropsOptions<ComponentProps, AdditionalProps, UtilProps, Theme>) {
  type AllProps = ResultComponentProps<ComponentProps, UtilProps, AdditionalProps>;
  const styledFn = (styled || styledWeb) as ThemedStyledInterface<Theme>;

  return (BaseComponent: StringTag | React.ComponentType<ComponentProps>) => {
    let ComponentToExtend: React.ComponentType<ComponentProps>;
    if (typeof BaseComponent === 'string') {
      const stringTag = BaseComponent as StringTag;
      // TODO: fix this "any"
      ComponentToExtend = (styledFn as any)[stringTag]``; // eg styled['div'] or styled['TouchableHighlight']
    } else {
      ComponentToExtend = BaseComponent as React.ComponentType<ComponentProps>;
    }

    let resultDisplayName: string;
    if (displayName) {
      resultDisplayName = displayName;
    } else {
      if (typeof BaseComponent === 'string') {
        resultDisplayName = capitalize(BaseComponent as string);
      } else {
        const Comp = BaseComponent as React.ComponentType<ComponentProps>;
        resultDisplayName = `zbase(${Comp.displayName || Comp.name || 'Component'}`;
      }
    }

    class ResultComponentRenderer extends Component<AllProps> {
      static displayName = `zbaseInner(${resultDisplayName})`;
      render() {
        const resultProps = removeUtilProps(this.props, additionalPropsMap) as ComponentProps;
        return <ComponentToExtend {...resultProps} />;
      }
    }

    let resultUtilsPropsMap = utilsPropsMap;
    if (utilTypes) {
      resultUtilsPropsMap = utilTypes.reduce((resultMap, type) => {
        Object.keys(utilTypesMap[type]).forEach(k => (resultMap[k] = utilsPropsMap[k]));
        return resultMap;
      }, {});
    }

    const ResultUtilComponent = styledFn(ResultComponentRenderer).attrs<
      AdditionalProps,
      ComponentProps & AdditionalProps
    >(componentAttrs)`
      ${getCssFromProps({ ...resultUtilsPropsMap, ...additionalUtilsPropsMap }, defaultUtilProps)};
      ${additionalCss || ''};
      ${additionalPropsMap ? getCssFromProps(additionalPropsMap) : ''};
    `;

    ResultUtilComponent.defaultProps = defaultUtilProps as AllProps;

    ResultUtilComponent.displayName = resultDisplayName;

    return ResultUtilComponent;
  };
}

export default zbase;
