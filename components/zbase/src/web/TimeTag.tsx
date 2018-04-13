import React, { StatelessComponent } from 'react';
import moment from 'moment';
import { injectIntl, DateSource, InjectedIntl } from 'react-intl';

import { TimeElProps } from './withUtilPropsWeb';

const TimeTag: StatelessComponent<TimeElProps & { value: DateSource; intl?: InjectedIntl }> = ({
  value,
  intl,
  ...rest
}) => (
  <time
    dateTime={moment(value).toISOString(true)}
    title={intl.formatDate(value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    })}
    {...rest}
  >
    {rest.children}
  </time>
);

export default injectIntl(TimeTag);
