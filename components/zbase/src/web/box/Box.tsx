import React from 'react';

import { theme } from 'z-frontend-theme';

import { UtilTypeBorder } from '../types';
import { TextAlignProps } from '../../commonTypes';
import withWebUtilProps, {
  borderPropsMap,
  flexItemPropsMap,
  DivProps,
  FlexItemProps,
  ResultWebComponentProps,
} from '../withUtilPropsWeb';

type BoxAdditionalProps = UtilTypeBorder & TextAlignProps & FlexItemProps;

export type BoxProps = ResultWebComponentProps<DivProps, BoxAdditionalProps>;

export const boxCreator = (displayName: string, tagName: keyof JSX.IntrinsicElements) =>
  withWebUtilProps<DivProps, BoxAdditionalProps>({
    displayName,
    additionalPropsMap: {
      textAlign: { cssName: 'text-align' },
      ...borderPropsMap,
      ...flexItemPropsMap,
    },
    defaultUtilProps: {
      borderColor: theme.borderColor,
    },
  })(tagName);

export default boxCreator('Box', 'div');

const _Table = boxCreator('HtmlTable', 'table');

export class Table extends React.Component<BoxProps> {
  static Head = boxCreator('HtmlTableHead', 'thead');
  static Body = boxCreator('HtmlTableBody', 'tbody');
  static ColumnGroup = boxCreator('HtmlTableColGroup', 'colgroup');
  static Column = boxCreator('HtmlTableColumn', 'col');
  static Row = boxCreator('HtmlTableRow', 'tr');
  static Header = boxCreator('HtmlTableRow', 'th');
  static Cell = boxCreator('HtmlTableRow', 'td');
  render() {
    return <_Table {...this.props} />;
  }
}
