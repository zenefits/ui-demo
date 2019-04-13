This component is an alias for the Mutation component provided by `apollo-react`.
Please read the [Apollo Mutation docs](https://www.apollographql.com/docs/react/essentials/mutations.html#basic)
for full documentation.

#### Examples

```js static
const exampleMutation = gql`
  mutation ExampleMutation(
    $firstName: String!
    $lastName: String!
  ) {
    addZenefitsEmployee(firstName: $firstName, lastName: $lastName) {
      user {
        first_name
        last_name
      }
    }
  }
`;

<Mutation<ExampleMutation.Mutation> mutation={exampleMutation}>
  {(exampleMutation, { data, loading, error }) => {
    const createJohnDoe = () => exampleMuation({
      variables: {
        firstName: 'John',
        lastName: 'Doe'
      }
    });
    return (
      <Box>
        { data && `${data.first_name} ${data.last_name} added.` }
        <Button onClick={createJohnDoe} inProgress={loading}/>
          Create User
       </Button>
     </Box>
    );
  }}
</Mutation>
```

#### Usage

- Use to expose a graphql mutation function (and resulting data ) to some JSX content

#### Implementation Notes

- Generic type passed in to Mutation component will be auto-generated and can be imported from gqlTypes file.
- Unlike Query component, rendering loading state needs to be handled manually here

#### Related

- [Query](#!/Query)
