import React from 'react';
import { useQuery, OperationVariables, QueryHookOptions, QueryResult } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { ApolloError } from 'apollo-client';

import { Box, TextBlock } from 'zbase';
import { radius } from 'z-frontend-theme/utils';
import { styled } from 'z-frontend-theme';
import { LoadingSpinner } from 'z-frontend-elements';

declare type UseQueryWithProgressResponse<TData = any, TVariables = OperationVariables> = QueryResult<
  TData,
  TVariables
> & { Loading?: JSX.Element; QueryError?: JSX.Element; data?: TData };

const StyledContainer = styled(Box)`
  border-radius: ${radius()};
`;

function LoadingState() {
  return (
    <StyledContainer>
      <LoadingSpinner s="large" />
    </StyledContainer>
  );
}

declare type ErrorStateProps = { error: ApolloError };
function ErrorState({ error }: ErrorStateProps) {
  console.error('GraphqlProgressBase:', error);
  return (
    <Box>
      <TextBlock color="text.default" className="js-walkme-graphql-error-message">
        Sorry, something went wrong. Please try again later.
      </TextBlock>
    </Box>
  );
}

export default function useQueryWithProgress<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): UseQueryWithProgressResponse<TData> {
  const response = useQuery<TData>(query, options);
  return {
    Loading: response.loading && <LoadingState />,
    QueryError: response.error && <ErrorState error={response.error} />,
    ...response,
  };
}
