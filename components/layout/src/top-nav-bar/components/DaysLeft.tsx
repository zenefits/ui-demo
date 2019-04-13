import React from 'react';
import gql from 'graphql-tag';
import moment from 'moment';

import { Box, Flex, TextBlock } from 'zbase';
import { styled, RenderFor } from 'z-frontend-theme';
import { color } from 'z-frontend-theme/utils';

import { Query } from '../../..';
import { DaysLeftQuery } from '../../gqlTypes';

function getDaysLeft(trialToExpireAt: string): number {
  const today = moment().startOf('day');
  const toExpireDate = moment(trialToExpireAt).startOf('day');
  const daysLeft = moment(toExpireDate).diff(today, 'days');
  return daysLeft >= 0 ? daysLeft : 0;
}

const StyledFlex = styled(Flex)`
  border-radius: 50%;
  border-color: ${color('primary.a')};
  border-top-color: ${color('grayscale.f')};
  border-width: 2px;
  width: 32px;
  height: 32px;
  transform: rotate(45deg);
`;

const StyledBox = styled(Box)`
  transform: rotate(-45deg);
`;

const daysLeftQuery = gql`
  query DaysLeftQuery {
    dashboard {
      id
      trialToExpireAt
      isTrialCompany
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
      <Query<DaysLeftQuery.Query> query={daysLeftQuery} handleGraphqlProgress={false}>
        {({ data, loading, error }) => {
          if (error || loading) {
            return null;
          }

          const {
            dashboard: { trialToExpireAt },
          } = data;

          if (!trialToExpireAt) return null;

          const daysLeft: number = getDaysLeft(trialToExpireAt);

          return (
            <Flex align="center">
              <StyledFlex border fontStyle="controls.s" color="primary.a" p={1} align="center" justify="center">
                <StyledBox>{daysLeft}</StyledBox>
              </StyledFlex>
              <RenderFor breakpoints={[false, false, true, true, true]}>
                <TextBlock ml={2} fontStyle="headings.xs" color="grayscale.e">
                  days left in trial
                </TextBlock>
              </RenderFor>
            </Flex>
          );
        }}
      </Query>
    );
  }
}

export default DaysLeft;
