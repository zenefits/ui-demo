import { css, theme } from 'z-frontend-theme';

import { PropsMap, TextAlignProps } from '../../commonTypes';
import { UtilTypeBorder } from '../types';
import withWebUtilProps, {
  borderPropsMap,
  flexItemPropsMap,
  DivProps,
  FlexItemProps,
  ResultWebComponentProps,
} from '../withUtilPropsWeb';
import { makeDummyComponentForDocs } from '../docsUtil';

// NOTE: 'space-evenly' and 'stretch' are not widely supported so not included
type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between';

export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse' | null;

type FlexAdditionalProps = UtilTypeBorder &
  TextAlignProps &
  FlexItemProps & {
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
  };

const flexPropsMap: PropsMap = {
  justify: { cssName: 'justify-content' },
  align: { cssName: 'align-items' },
  column: { cssName: 'flex-direction', valueHelper: column => (column ? 'column' : 'row') },
  direction: { cssName: 'flex-direction' },
  wrap: { cssName: 'flex-wrap', valueHelper: wrap => (wrap ? 'wrap' : 'nowrap') },
  textAlign: { cssName: 'text-align' },
  ...borderPropsMap,
  ...flexItemPropsMap,
};
export type FlexProps = ResultWebComponentProps<DivProps, FlexAdditionalProps>;

export const FlexForDocs = makeDummyComponentForDocs<FlexProps>();
FlexForDocs.displayName = 'Flex';

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
