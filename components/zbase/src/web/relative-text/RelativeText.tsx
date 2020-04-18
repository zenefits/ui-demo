import React, { StatelessComponent } from 'react';
import { DateSource, FormattedRelative } from 'react-intl';

import withWebUtilProps, { ResultWebComponentProps, TimeElProps } from '../withUtilPropsWeb';
import { removeUtilProps } from '../../commonTypes';
import TimeTag from '../time-tag/TimeTag';
import { makeDummyComponentForDocs } from '../docsUtil';

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
      {(str: string) => (
        <TimeTag {...propsWithNoUtils} value={value}>
          {str}
        </TimeTag>
      )}
    </FormattedRelative>
  );
};

export const RelativeTextForDocs = makeDummyComponentForDocs<RelativeTextProps>();
RelativeTextForDocs.displayName = 'RelativeText';

export default withWebUtilProps<TimeElProps, AdditionalProps>({
  displayName: 'RelativeText',
})(TextContainer);
