import React, { Component, Ref } from 'react';
import { ObjectOmit } from 'typelevel-ts';
import { capitalize, castArray, flatten, sortBy } from 'lodash';

/* tslint:disable:import-filter */
import styledWeb, { StyledComponentClass, ThemedStyledInterface, ThemedStyledProps } from 'styled-components';
/* tslint:enable:import-filter */

import { color, fontSizes, space } from 'z-frontend-theme/utils';

import {
  removeUtilProps,
  utilTypesMap,
  ExtendedPropsMapValue,
  PropsMap,
  PropsMapValue,
  UtilsType,
  UtilProp,
  ValueHelperFn,
} from './commonTypes';

export function getCssStringForPropValue(
  propVal: UtilProp,
  breakpoint: number | null,
  props: any,
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
  return (props: any): string => {
    const propVal = props[propName];
    if (propVal === null || propVal === undefined) {
      return '';
    }

    const isArray = Array.isArray(propVal);
    return castArray(propVal)
      .map((v, i) => {
        const breakpoint = isArray && i > 0 ? i - 1 : null;
        return getCssStringForPropValue(v, breakpoint, props, propsMapValue);
      })
      .filter(v => v)
      .join('\n');
  };
}

export function getCssFromProps(propsMap: PropsMap, defaultUtilProps = {}) {
  const normalizedPropsMap = flatten(
    Object.keys(propsMap).map(propName => {
      const propsMapValues: PropsMapValue[] = castArray(propsMap[propName]);
      return propsMapValues.map(propsMapValue => {
        return { propName, propsMapValue };
      });
    }),
  );
  const sortedPropsMap = sortBy(normalizedPropsMap, value => (value.propsMapValue as ExtendedPropsMapValue).order || 0);

  return (props: any): string => {
    const propsWithDefaults = Object.assign({}, /* defaultUtilProps, */ props);
    return sortedPropsMap
      .map(propsMap => {
        return getCssRuleForProp(propsMap.propName, propsMap.propsMapValue)(propsWithDefaults);
      })
      .filter(v => v)
      .join('\n');
  };
}

export const widthValueFn = (v: any) => {
  if (typeof v === 'number') {
    if (v <= 1) {
      return (v / 1) * 100 + '%';
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
  fontSize__deprecated__doNotUse: { cssName: 'font-size', utilFn: fontSizes },

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
  minWidth: { cssName: 'min-width', valueHelper: widthValueFn },
  maxWidth: { cssName: 'max-width', valueHelper: widthValueFn },
  minHeight: { cssName: 'min-height', valueHelper: widthValueFn },
  maxHeight: { cssName: 'max-height', valueHelper: widthValueFn },
  height: { cssName: 'height', valueHelper: widthValueFn },
};

export type ResultComponentProps<ComponentProps, AdditionalProps = {}, UtilProps = {}> = ObjectOmit<
  ComponentProps,
  Extract<keyof (AdditionalProps & UtilProps), string>
> &
  AdditionalProps &
  UtilProps & { elementRef?: Ref<any> };

export interface WithUtilPropsOptions<ComponentProps, AdditionalProps, UtilProps, Theme> {
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
    type ComponentToExtendProps = ComponentProps & ({ elementRef?: Ref<any> } | { innerRef?: (instance: any) => void });
    let ComponentToExtend: React.ComponentType<ComponentToExtendProps>;
    const isBaseStyledComponent = typeof BaseComponent === 'string';
    if (isBaseStyledComponent) {
      const stringTag = BaseComponent as StringTag;
      // TODO: fix this "any"
      ComponentToExtend = (styledFn as any)[stringTag]``; // eg styled['div'] or styled['TouchableHighlight']
    } else {
      ComponentToExtend = BaseComponent as React.ComponentType<ComponentToExtendProps>;
    }

    let resultDisplayName: string;
    if (displayName) {
      resultDisplayName = displayName;
    } else {
      if (typeof BaseComponent === 'string') {
        resultDisplayName = capitalize(BaseComponent as string);
      } else {
        const Comp = BaseComponent as React.ComponentType<ComponentToExtendProps>;
        resultDisplayName = `zbase(${Comp.displayName || Comp.name || 'Component'}`;
      }
    }

    class ResultComponentRenderer extends Component<AllProps> {
      static displayName = `zbaseInner(${resultDisplayName})`;
      render() {
        const resultProps = removeUtilProps(this.props, additionalPropsMap) as ComponentProps;
        const otherProps = isBaseStyledComponent
          ? { innerRef: this.props.elementRef }
          : { elementRef: this.props.elementRef };
        return <ComponentToExtend {...resultProps} {...otherProps} />;
      }
    }

    let resultUtilsPropsMap = utilsPropsMap;
    if (utilTypes) {
      resultUtilsPropsMap = utilTypes.reduce((resultMap: any, type) => {
        Object.keys(utilTypesMap[type]).forEach(k => (resultMap[k] = utilsPropsMap[k]));
        return resultMap;
      }, {});
    }

    // We are using a css-namespace plugin that automatically bumps up the priority
    // of css styles added by styled-components.
    // @quickbaseoss/babel-plugin-styled-components-css-namespace
    //
    // This template tag is not recognized by the plugin as a styled tag, so we
    // need to use && to bump the specificity directly.
    // This should be removed if we remove the plugin
    const ResultUtilComponentWithOriginalType = styledFn(ResultComponentRenderer).attrs<
      AllProps,
      ComponentProps & AdditionalProps
    >(componentAttrs || ({} as any))`
      &&&& {
        ${getCssFromProps({ ...resultUtilsPropsMap, ...additionalUtilsPropsMap }, defaultUtilProps)};
        ${additionalCss || ''};
        ${additionalPropsMap ? getCssFromProps(additionalPropsMap) : ''};
      }
    `;

    const extendProps = function<NewProps>() {
      return (ResultUtilComponent as any) as StyledComponentClass<AllProps & NewProps, Theme>;
    };

    const ResultUtilComponent = ResultUtilComponentWithOriginalType as typeof ResultUtilComponentWithOriginalType & {
      extendProps: typeof extendProps;
    };

    ResultUtilComponent.extendProps = extendProps;

    ResultUtilComponent.defaultProps = defaultUtilProps as AllProps;

    ResultUtilComponent.displayName = resultDisplayName;

    return ResultUtilComponent;
  };
}

export default zbase;
