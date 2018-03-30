import { ViewProperties } from 'react-native';
import { css, theme } from 'z-frontend-theme/native';
import { PropsMap } from '../commonTypes';
import { UtilTypeBorder } from './types';
import withUtilPropsNative, {
  ResultNativeComponentProps,
  FlexOnlyAdditionalProps,
  flexOnlyPropsMap,
  borderPropsMap,
} from './withUtilPropsNative';

// Flex
type FlexJustifyProp = 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between';
type FlexAlignProp = 'flex-start' | 'center' | 'flex-end' | 'stretch';
type FlexDirectionProp = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface FlexAdditionalProps extends FlexOnlyAdditionalProps, UtilTypeBorder {
  /**
   * Space distribution between and around content items along the main axis of their container.
   */
  justify?: FlexJustifyProp;
  /**
   * Space distribution between and around flex items along the cross-axis of their container.
   */
  align?: FlexAlignProp;
  /**
   * The main axis and the direction.
   */
  direction?: FlexDirectionProp;
  /**
   * Set main axis to row ("flex-direction: row;")
   */
  row?: boolean;
  /**
   * Enable wrapping flex items onto multiple lines ("flex-wrap: wrap;")
   */
  wrap?: boolean;
}

export type FlexProps = ResultNativeComponentProps<ViewProperties, FlexAdditionalProps>;

const flexPropsMap: PropsMap = Object.assign({}, flexOnlyPropsMap, {
  justify: { cssName: 'justify-content' },
  align: { cssName: 'align-items' },
  row: { cssName: 'flex-direction', valueHelper: (row: boolean) => (row ? 'row' : 'column') },
  direction: { cssName: 'flex-direction' },
  wrap: { cssName: 'flex-wrap', valueHelper: (wrap: boolean) => (wrap ? 'wrap' : 'nowrap') },
  ...borderPropsMap,
});

export const Flex = withUtilPropsNative<ViewProperties, FlexAdditionalProps>({
  displayName: 'Flex',
  additionalPropsMap: flexPropsMap,
  additionalCss: css`
    display: flex;
  `,
  defaultUtilProps: {
    borderColor: theme.borderColor,
  },
})('View');
