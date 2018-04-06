import { css, theme } from 'z-frontend-theme';
import { PropsMap } from '../commonTypes';
import { ResponsiveUtilProp, UtilTypeBorder } from './types';
import withWebUtilProps, { ResultWebComponentProps, DivProps, borderPropsMap } from './withUtilPropsWeb';

// NOTE: 'space-evenly' and 'stretch' are not widely supported so not included
type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between';

export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type FlexAdditionalProps = UtilTypeBorder & {
  /**
   * Specify how a flex item will grow or shrink so as to fit the space available in its flex container.
   * This is a shorthand property that sets `flex-grow`, `flex-shrink`, and `flex-basis`.
   */
  flex?: string | string[];
  /**
   * Space distribution between and around content items along the main axis of their container.
   */
  justify?: FlexJustify | FlexJustify[];
  /**
   * Space distribution between and around flex items along the cross-axis of their container.
   */
  align?: FlexAlign | FlexAlign[];
  /**
   * The main axis and the direction.
   */
  direction?: FlexDirection | FlexDirection[];
  /**
   * Set main axis to column (`flex-direction: column;`)
   */
  column?: boolean | boolean[];
  /**
   * Enable wrapping flex items onto multiple lines (`flex-wrap: wrap;`)
   */
  wrap?: boolean | boolean[];
  /**
   * The order used to lay out a flex item in its flex container.
   */
  order?: ResponsiveUtilProp;
};

const flexPropsMap: PropsMap = {
  flex: { cssName: 'flex' },
  justify: { cssName: 'justify-content' },
  align: { cssName: 'align-items' },
  column: { cssName: 'flex-direction', valueHelper: column => (column ? 'column' : 'row') },
  direction: { cssName: 'flex-direction' },
  wrap: { cssName: 'flex-wrap', valueHelper: wrap => (wrap ? 'wrap' : 'nowrap') },
  order: { cssName: 'order' },
  ...borderPropsMap,
};

export type FlexProps = ResultWebComponentProps<DivProps, FlexAdditionalProps>;

export default withWebUtilProps<DivProps, FlexAdditionalProps>({
  displayName: 'Flex',
  additionalPropsMap: flexPropsMap,
  additionalCss: css`
    display: flex;
  `,
  defaultUtilProps: {
    borderColor: theme.borderColor,
  },
})('div');
