# z-frontend-yp-schema

## Description

This package provides:

* **Full schema** for our GraphQL server along with **TypeScript types for the schema**
* **Webpack plugin** which generates TypeScript types for GraphQL queries, mutations and fragments in app files
* **Mock schema** to use in apps with Apollo library

## Developer workflow for server schema changes

When changes to server schema are made, the JSON schema file in your app needs to be synced with server schema.

Usual developer workflow is repeating these 2 steps until changes are good to go:

1. change the GraphQL schema in server
2. sync the schema in your z-frontend app and test the changes

For step 1 changes need to be made in local server repo and then JSON schema should be regenerated. For that need to use zcli tool from your z-fronted app folder:

```
yarn zcli syncSchema
```

This command will start **your local server/graphql** server, download JSON schema to `<your-app>/schema/schema.json` and generate TS types for it in `<your-app>/schema/schemaTypes.d.ts`.

By default, it looks for server repo in `../server`. if you have your server repo in different place, you can provide the location with SERVER env variable:

```
SERVER=../my-server yarn zcli syncSchema
```

After changes to server schema are final, 2 pull requests should be created - one for server with the schema changes and one for z-frontend with regenerated JSON schema, regenerated types and possible app changes.
Please always add a link to other repo PR to the description, so it's easier to review the changes. In most cases the server PR should be merged and deployed first, since **schema changes should always be backward compatible**.

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
  query appQuery {
    dashboard(id: "me") {
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
