import React from 'react';
import gql from 'graphql-tag';
import moment from 'moment';

import { Flex, TextBlock } from 'zbase';
import { Render } from 'z-frontend-theme';
import { Query } from 'z-frontend-network';

import { DaysLeftQuery } from '../../gqlTypes';
import CircularProgress from './CircularProgress';

function getDaysLeft(trialToExpireAt: string): number {
  const today = moment().startOf('day');
  const toExpireDate = moment(trialToExpireAt).startOf('day');
  const daysLeft = moment(toExpireDate).diff(today, 'days');
  return daysLeft >= 0 ? daysLeft : 0;
}

const daysLeftQuery = gql`
  query DaysLeftQuery {
    dashboard {
      id
      trialToExpireAt
      isTrialCompany
      companyTypeIsDemo
    }
  }
`;

/**
 * DaysLeft will display the number of days left based on data from dashboard query
 * `trialToExpireAt` field. It will not display anything if the data is not available.
 */
class DaysLeft extends React.Component<{}> {
  render() {
    return (
      <Query<DaysLeftQuery.Query> query={daysLeftQuery} handleLoading={false} handleError={false}>
        {({ data, loading, error }) => {
          if (error || loading) {
            return null;
          }

          const {
            dashboard: { trialToExpireAt, companyTypeIsDemo },
          } = data;

          if (!trialToExpireAt) return null;

          const daysLeft: number = getDaysLeft(trialToExpireAt);
          const maximumDays = 14;
          const percent = Math.min(daysLeft, maximumDays) / maximumDays;

          return (
            <Flex align="center" className="js-walkme-top-nav-demo-days-left">
              <CircularProgress percent={percent} text={`${daysLeft}`} />
              <Render forBreakpoints={[false, false, true, true, true]}>
                <TextBlock ml={2} bold color="grayscale.e">
                  days left in {companyTypeIsDemo ? 'demo' : 'trial'}
                </TextBlock>
              </Render>
            </Flex>
          );
        }}
      </Query>
    );
  }
}

export default DaysLeft;
