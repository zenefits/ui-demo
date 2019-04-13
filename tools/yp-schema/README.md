# z-frontend-yp-schema

## Description

This package provides:

- **Full schema** for our GraphQL server ([yourPeople3/graphql](https://github.com/zenefits/yourPeople3/tree/master/graphql)) along with **TypeScript types for the schema**
- **Webpack plugin** which generates TypeScript types for GraphQL queries, mutations and fragments in app files
- **Mock schema** to use in apps with Apollo library

## Developer workflow for yp3 schema changes

When changes to yp3 schema are made, the JSON schema file in your app needs to be synced with yp3 schema.

Usual developer workflow is repeating these 2 steps until changes are good to go:

1.  change the GraphQL schema in yp3
2.  sync the schema in your z-frontend app and test the changes

For step 1 changes need to be made in local yp3 repo and then JSON schema should be regenerated. For that need to use zcli tool from your z-fronted app folder:

```
yarn zcli syncSchema
```

This command will start **your local yp3/graphql** server, download GraphQL schema to `<your-app>/schema/schema.generated.graphql` and generate TS types for it in `<your-app>/schema/schemaTypes.ts`.

By default, it looks for yp3 repo in `../yourPeople3`. if you have your yp3 repo in different place, you can provide the location with YP3 env variable:

```
YP3=../yp3 yarn zcli syncSchema
```

After changes to yp3 schema are final, 2 pull requests should be created - one for yp3 with the schema changes and one for z-frontend with regenerated JSON schema, regenerated types and possible app changes.
Please always add a link to other repo PR to the description, so it's easier to review the changes. In most cases the yp3 PR should be merged and deployed first, since **schema changes should always be backward compatible**.

## Developer workflow for query/mutation changes in z-frontend apps

Every time an app file containing a GraphQL query, a mutation or a fragment is changed, webpack automatically regenerates TypeScript types for them. This tool check all usages of `graphql-tag` modules and extracts GraphQL from the `gql` tagged templates.

Default location for generated types is `<app_folder>/src/gqlTypes.d.ts`

Types for every GraphQL query, mutation or fragment are exported under a TypeScript namespace with a capitalized name of the corresponding GraphQL queriy, mutation or fragment.
This namespace exports a type of whole query, mutation or fragment as `Query`, `Mutation` or `Fragment`. A type for variables is also exported as `Variables`. And every node in the GraphQL graph of the query, mutation or fragment is also exported with capitalized name.

### Example:

#### App code

```ts
import gql from 'graphql-tag';

const MyQuery = gql`
  query AppQuery {
    dashboard {
      id
      user_id
      employee {
        id
      }
      company {
        id
      }
      features
    }
  }
`;
```

#### Generated types

```ts
export namespace AppQuery {
  export type Variables = {};

  export type Query = {
    dashboard?: Dashboard | null;
  };

  export type Dashboard = {
    user_id?: string | null;
    employee?: Employee | null;
    company?: Company | null;
    features?: JSON | null;
  };

  export type Employee = {
    id?: string | null;
  };

  export type Company = {
    id?: string | null;
  };
}
```

#### How to use the types

```tsx
import { graphql, ChildProps } from 'react-apollo';
import { AppQuery } from '../../gqlTypes';

type OtherProps = {};

type Props = ChildProps<OtherProps, AppQuery.Query>;

class AppRoutes extends Component<Props> {
  render() {
    return <Box>Current User ID: {this.props.data.dashboard.employee.id}</Box>;
  }
}
```
