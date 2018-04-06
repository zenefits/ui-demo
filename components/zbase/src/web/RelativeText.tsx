import React, { StatelessComponent } from 'react';
import { FormattedRelative, DateSource } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps, TimeElProps } from './withUtilPropsWeb';
import { removeUtilProps } from '../commonTypes';
import TimeTag from './TimeTag';

// TODO: document other props
// https://github.com/yahoo/react-intl/wiki/Components#formattedrelative
type AdditionalProps = {
  style?: 'best-fit' | 'numeric';
  units?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
  updateInterval?: number;
  initialNow?: any;
  /**
   * Date value to format.
   */
  value: DateSource;
  format?: string;
};

export type RelativeTextProps = ResultWebComponentProps<TimeElProps, AdditionalProps>;

const TextContainer: StatelessComponent<RelativeTextProps> = ({
  value,
  style,
  units,
  updateInterval,
  initialNow,
  format,
  ...rest
}) => {
  const propsWithNoUtils = removeUtilProps(rest);
  return (
    <FormattedRelative
      {...propsWithNoUtils}
      value={value}
      style={style}
      units={units}
      updateInterval={updateInterval}
      initialNow={initialNow}
      format={format}
    >
      {str => (
        <TimeTag {...propsWithNoUtils} value={value}>
          {str}
        </TimeTag>
      )}
    </FormattedRelative>
  );
};

export default withWebUtilProps<TimeElProps, AdditionalProps>({
  displayName: 'RelativeText',
})(TextContainer);
