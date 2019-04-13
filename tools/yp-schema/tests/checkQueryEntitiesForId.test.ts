import path from 'path';
import fs from 'fs';
import { buildSchema } from 'graphql';
import * as ts from 'typescript';

import checkQueryEntitiesForId from '../checkQueryEntitiesForId';

const gqlSchema = fs.readFileSync(path.resolve(__dirname, 'testSchema.graphql')).toString();

const generateSimpleGQLTypes = (isMissingId: boolean) => `
export namespace FeaturesQuery {
  export type Variables = {
    appUniqueIds?: string[] | null;
  };

  export type Query = {
    __typename?: 'Query';
    dashboard?: Dashboard | null;
  };

  export type Dashboard = {
    __typename?: 'Dashboard';
    ${isMissingId ? '' : 'id?: string | null'}
    company?: Company | null;
    features?: JSON | null;
    zAppInstallSubscriptions?: (ZAppInstallSubscriptions | null)[] | null;
  };

  export type Company = {
    __typename?: 'Company';
    id?: string | null;
  };

  export type ZAppInstallSubscriptions = {
    __typename?: 'ZAppInstallSubscription';
    id?: string | null;
    status?: number | null;
  };
}`;

const generateGqlTypesWithFragment = (isMissingId: boolean) => `
export namespace Goals {
  export type Variables = {
    goalId?: string | null;
    queryGoal: boolean;
  };

  export type Query = {
    __typename?: 'Query';
    goals: Goals[];
  };

  export type Goals = GoalFieldsInDetails.Fragment;
}

export namespace GoalFieldsInDetails {
  export type Fragment = {
    __typename?: 'Goal';
    id: string;
    owner: Owner;
  };

  export type Owner = {
    __typename?: 'AllEmployee';
    ${isMissingId ? '' : 'id?: string | null;'}
    last_name?: string;
  };
}
`;

describe('checkQueryEntitiesForId', () => {
  const schema = buildSchema(gqlSchema);

  it('reports not errors where ids all exists', () => {
    const quertyTypesAST = ts.createSourceFile('index.ts', generateSimpleGQLTypes(false), ts.ScriptTarget.ES2015, true);

    const errors = checkQueryEntitiesForId(quertyTypesAST, schema);
    expect(errors).toHaveLength(0);
  });

  it('reports missing ids', () => {
    const quertyTypesAST = ts.createSourceFile('index.ts', generateSimpleGQLTypes(true), ts.ScriptTarget.ES2015, true);

    const errors = checkQueryEntitiesForId(quertyTypesAST, schema);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toEqual(['Query<FeaturesQuery>', 'dashboard']);
  });

  it('reports missing ids with fragments', () => {
    const quertyTypesAST = ts.createSourceFile(
      'index.ts',
      generateGqlTypesWithFragment(true),
      ts.ScriptTarget.ES2015,
      true,
    );

    const errors = checkQueryEntitiesForId(quertyTypesAST, schema);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toEqual(['Fragment<GoalFieldsInDetails>', 'owner']);
  });

  it('reports no missing ids with fragments', () => {
    const quertyTypesAST = ts.createSourceFile(
      'index.ts',
      generateGqlTypesWithFragment(false),
      ts.ScriptTarget.ES2015,
      true,
    );

    const errors = checkQueryEntitiesForId(quertyTypesAST, schema);
    expect(errors).toHaveLength(0);
  });

  it('can skip types', () => {
    const quertyTypesAST = ts.createSourceFile('index.ts', generateSimpleGQLTypes(true), ts.ScriptTarget.ES2015, true);

    const errors = checkQueryEntitiesForId(quertyTypesAST, schema, ['Dashboard']);
    expect(errors).toHaveLength(0);
  });
});
