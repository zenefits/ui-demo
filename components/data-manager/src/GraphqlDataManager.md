### GraphqlDataManager

A component which supports server side pagination, filtering and sorting.

### Implementation Details

1. It uses the UrlQueryParamsContext to access the filter, pagination and sort states from the url and fires a GraphQL query using these states as variables.

2. Always wrap the GraphqlDataManager with UrlQueryParamsManager.

   ```jsx static
   <UrlQueryParamsManager>
     <GraphqlDataManager {...props}>
       { .... }
     </GraphqlDataManager>
   </UrlQueryParamsManager>
   ```

3. The Query passed to this component should always have 'offset' and 'limit' as variables and the `totalItemsCount` field to control pagination. Always use `<UrlPager />` component when using GraphqlDataManager.

   ```js static
   query gqlDataManagerMockQuery($offset: Int!, $limit: Int!) {
     gqlDataManagerMockQuery(offset: $offset, limit: $limit) {
       employees {
         id
         name
         department
         company
       }
       totalItemsCount // you should always have this if you are doing pagination
     }
   }
   ```

4. The Query will be fired with the default set of variables + additional variables. These additional variables can be passed into the component via the `queryVariables` prop.

5. When no additional variables are provided, the GraphQL request will be fired with a default set of variables and values.

   ```gql static
   {
     offset: 0,
     limit: 25,
   }
   ```

Here we will be displaying the first 25 records. The default pageSize can be overridden in the UrlQueryParamsManager's defaults prop.
