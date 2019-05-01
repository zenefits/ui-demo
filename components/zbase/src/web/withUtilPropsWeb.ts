import { HTMLAttributes, TimeHTMLAttributes } from 'react';

import { ThemeInterface } from 'z-frontend-theme';
import { color, fontStyles } from 'z-frontend-theme/utils';

import withUtilProps, { ResultComponentProps, WithUtilPropsOptions } from '../withUtilProps';
import { PropsMap, ValueHelperFn } from '../commonTypes';
import { ResponsiveUtilProp, UtilProps as AllUtilProps } from './types';

export type DivProps = HTMLAttributes<HTMLDivElement>;
export type SpanProps = HTMLAttributes<HTMLSpanElement>;
export type TimeElProps = TimeHTMLAttributes<HTMLTimeElement>;

export type ResultWebComponentProps<
  ComponentProps,
  AdditionalProps = {},
  UtilProps = AllUtilProps
> = ResultComponentProps<ComponentProps, AdditionalProps, UtilProps>;

export default function withWebUtilProps<ComponentProps, AdditionalProps = {}, UtilProps = AllUtilProps>(
  options: WithUtilPropsOptions<ComponentProps, AdditionalProps, UtilProps, ThemeInterface> = {},
) {
  return withUtilProps<ComponentProps, AdditionalProps, UtilProps, ThemeInterface>({
    ...options,
    additionalUtilsPropsMap: {
      fontStyle: {
        valueHelper: (propValue, props) => fontStyles(propValue)(props),
        order: -1,
      },
    },
  });
}

function getBorderHelper(side?: string) {
  const getBorderHelperValueFn: ValueHelperFn = (propValue: boolean, props: any) => {
    if (!propValue) {
      return '';
    }
    const borderSelectorStart = side ? `border-${side}` : 'border';
    const selectors = [
      `${borderSelectorStart}-color: ${color(props.borderColor)(props)};`,
      `${borderSelectorStart}-width: 1px;`,
      `${borderSelectorStart}-style: solid;`,
    ];
    return selectors.join('\n');
  };

  return getBorderHelperValueFn;
}

export const borderPropsMap: PropsMap = {
  border: getBorderHelper(),
  borderTop: getBorderHelper('top'),
  borderRight: getBorderHelper('right'),
  borderBottom: getBorderHelper('bottom'),
  borderLeft: getBorderHelper('left'),
  // borderColor: supported via getBorderHelper()
  // when needed: borderWidth, borderRadius, borderStyle
};

export type FlexItemProps = {
  /**
   * Specify how a flex item will grow or shrink so as to fit the space available in its flex container.
   * This is a shorthand property that sets `flex-grow`, `flex-shrink`, and `flex-basis`.
   */
  flex?: string | string[];
  /**
   * The order used to lay out a flex item in its flex container.
   */
  order?: ResponsiveUtilProp;
};

export const flexItemPropsMap: PropsMap = {
  flex: { cssName: 'flex' },
  order: { cssName: 'order' },
};

export function isFlexItemProp(key: string): boolean {
  return flexItemPropsMap.hasOwnProperty(key);
}
