import React, { ReactNode, StatelessComponent } from 'react';
import { FormattedPlural } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps, SpanProps } from '../withUtilPropsWeb';
import { removeUtilProps } from '../../commonTypes';

// from https://github.com/yahoo/react-intl/wiki/Components#formattedplural
type AdditionalProps = {
  /**
   * The numerical value to display.
   */
  value: number;

  style?: 'cardinal' | 'ordinal';
  other: ReactNode;
  zero?: ReactNode;
  one?: ReactNode;
  two?: ReactNode;
  few?: ReactNode;
  many?: ReactNode;
};

export type PluralTextProps = ResultWebComponentProps<SpanProps, AdditionalProps>;

const TextContainer: StatelessComponent<PluralTextProps> = ({
  value,
  style,
  other,
  zero,
  one,
  two,
  few,
  many,
  ...rest
}) => {
  const propsWithNoUtils = removeUtilProps(rest);
  return (
    // FIXME: "should only be used in apps that only need to support one language. If your app supports multiple languages use formatMessage instead."
    // https://github.com/yahoo/react-intl/wiki/API#formatplural
    <FormattedPlural
      {...propsWithNoUtils}
      value={value}
      style={style}
      other={other}
      zero={zero}
      one={one}
      two={two}
      few={few}
      many={many}
    >
      {str => <span {...propsWithNoUtils}>{str}</span>}
    </FormattedPlural>
  );
};

export default withWebUtilProps<SpanProps, AdditionalProps>({
  displayName: 'PluralText',
})(TextContainer);
