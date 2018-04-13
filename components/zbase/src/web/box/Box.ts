import { theme } from 'z-frontend-theme';

import { ResponsiveUtilProp, UtilTypeBorder } from '../types';
import withWebUtilProps, { borderPropsMap, DivProps, ResultWebComponentProps } from '../withUtilPropsWeb';

type BoxAdditionalProps = UtilTypeBorder & {
  /**
   * Specify how a flex item will grow or shrink so as to fit the space available in its flex container.
   * This is a shorthand property that sets flex-grow, flex-shrink, and flex-basis.
   */
  flex?: string | string[];
  /**
   * The order used to lay out a flex item in its flex container.
   */
  order?: ResponsiveUtilProp;
};

export type BoxProps = ResultWebComponentProps<DivProps, BoxAdditionalProps>;

export default withWebUtilProps<DivProps, BoxAdditionalProps>({
  displayName: 'Box',
  additionalPropsMap: {
    flex: { cssName: 'flex' },
    order: { cssName: 'order' },
    ...borderPropsMap,
  },
  defaultUtilProps: {
    borderColor: theme.borderColor,
  },
})('div');
