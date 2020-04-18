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

#### Implementation Notes

- This component accepts all react-apollo Query props documented here: https://www.apollographql.com/docs/react/essentials/queries.html#props
- The argument passed to render prop function is documented here: https://www.apollographql.com/docs/react/essentials/queries.html#render-prop
- Unlike react-apollo, rendering a spinner during loading state is handled internally. Always avoid showing multiple spinners at the same time.

#### Related

- [Mutation](#!/Mutation)
