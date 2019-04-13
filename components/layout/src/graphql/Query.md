A component that loads Graphql query. Wraps Query from 'react-apollo'

#### Examples

Typical usage:

```js static
const exampleQuery = gql`
  query ExampleQuery {
    currentZenefitsEmployee {
      user {
        first_name
        last_name
      }
    }
  }
`;

<Query<ExampleQuery.Query> query={exampleQuery}>
  {({ data }) => {
    return <Box>Loaded Data: {JSON.stringify(data)}</Box>;
  }}
</Query>;
```

#### Usage

- Use to expose a graphql query function (and resulting data ) to some JSX content

#### Implementation Notes

- This component accepts all react-apollo Query props documented here: https://www.apollographql.com/docs/react/essentials/queries.html#props
- The argument passed to render prop function is documented here: https://www.apollographql.com/docs/react/essentials/queries.html#render-prop
- Unlike react-apollo, rendering a spinner during loading state is handled internally
- Options to configure graphql progress can be provided as prop `graphqlProgressParams`
  The following options may be provided:
  - `showInlineLoading`: boolean; Show an inline loading spinner
  - `renderLoading`: (originalProps?: any) => React.ReactNode; Specify custom JSX to be rendered during loading state
  - `renderError`: (originalProps?: any) => React.ReactNode; Specify custom JSX to be rendered during error state
- Generic type passed in to Mutation component will be auto-generated and can be imported from gqlTypes file.

#### Related

- [Mutation](#!/Mutation)
