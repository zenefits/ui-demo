import React from 'react';
import { DateSource } from 'react-intl';

import { ResultWebComponentProps, TimeElProps } from '../withUtilPropsWeb';
import { DateTimeText } from '../index';

type AdditionalProps = {
  /**
   * Date value to format.
   */
  value: DateSource;
};

export type TimeTextProps = ResultWebComponentProps<TimeElProps, AdditionalProps>;

class TimeText extends React.Component<TimeTextProps> {
  render() {
    return <DateTimeText {...this.props} hour="numeric" minute="numeric" />;
  }
}

export default TimeText;
