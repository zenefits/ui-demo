import * as ts from 'typescript';

import {
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLUnionType,
} from 'graphql';

export default function checkQueryEntitiesForId(
  sourceFile: ts.SourceFile,
  schema: GraphQLSchema,
  typesToSkip?: string[],
) {
  const idChecker = new IdChecker(sourceFile, schema, typesToSkip);
  return idChecker.performCheck();
}

type SearchContext = {
  namespace: string;
  typeName: string;
};

class IdChecker {
  missingIdPaths: string[][] = [];
  sourceFile: ts.SourceFile;
  schema: GraphQLSchema;
  typesToSkip: string[];
  typesMap: {
    [namespace: string]: {
      [typeName: string]: { isMissingId: boolean; type: ts.TypeLiteralNode | ts.TypeReferenceNode };
    };
  } = {};

  constructor(sourceFile: ts.SourceFile, schema: GraphQLSchema, typesToSkip: string[] = []) {
    this.sourceFile = sourceFile;
    this.schema = schema;
    this.typesToSkip = typesToSkip;
  }

  performCheck() {
    // Reset state
    this.missingIdPaths = [];
    this.typesMap = {};

    this.buildTypeErrors(this.sourceFile);
    this.evaluateErrorPaths(this.sourceFile);
    return this.missingIdPaths;
  }

  // Build map of all types containing the Type declaration and whether the type is missing an id,
  private buildTypeErrors = (node: ts.Node) => {
    if (ts.isModuleDeclaration(node)) {
      const namespace = node.name.getText();
      this.searchForTypeErrorsInNamespace(namespace, node);
    } else {
      ts.forEachChild(node, this.buildTypeErrors);
    }
  };

  /**
   * Iterate through all Type declarations within a given namespace.
   * For Type literals if there is no id property and the associated gql type has an id flag it as missing.
   */
  private searchForTypeErrorsInNamespace(namespace: string, node: ts.Node) {
    if (ts.isTypeAliasDeclaration(node)) {
      this.typesMap[namespace] = this.typesMap[namespace] || {};

      if (ts.isTypeLiteralNode(node.type)) {
        const schemaTypeHasId = this.doesSchemaTypeHaveId(node.type);
        const hasId = node.type.members.some(member => !!member && !!member.name && member.name.getText() === 'id');
        this.typesMap[namespace][node.name.getText()] = { isMissingId: schemaTypeHasId && !hasId, type: node.type };
      } else if (ts.isTypeReferenceNode(node.type)) {
        // These are references to a fragment.
        this.typesMap[namespace][node.name.getText()] = { isMissingId: false, type: node.type };
      }
    } else {
      ts.forEachChild(node, this.searchForTypeErrorsInNamespace.bind(this, namespace));
    }
  }

  private doesSchemaTypeHaveId(node: ts.TypeLiteralNode): boolean {
    const typePropertySignature = node.members.find(
      member => !!member.name && member.name.getText() === '__typename',
    ) as ts.PropertySignature;
    if (!typePropertySignature) {
      return false;
    }
    const type = typePropertySignature.type as ts.LiteralTypeNode;
    const schemaTypeName = type.literal.getText().replace(/\'/g, '');

    if (this.typesToSkip.includes(schemaTypeName)) {
      return false;
    }

    // literal.getText() returns quoted value for some reason.
    const schemaType = this.schema.getType(schemaTypeName);
    if (
      schemaType instanceof GraphQLInterfaceType ||
      schemaType instanceof GraphQLObjectType ||
      schemaType instanceof GraphQLInputObjectType
    ) {
      return !!schemaType.getFields().id;
    } else if (schemaType instanceof GraphQLUnionType) {
      console.error('Unhandled union type!', type.getText());
    }
    return false;
  }

  // Walk through queries to get paths to types with errors

  private evaluateErrorPaths = (node: ts.Node) => {
    if (ts.isModuleDeclaration(node)) {
      const entryPoints = ['Query', 'Mutation', 'Fragment'];
      entryPoints.forEach(entryPoint =>
        this.walkQuery(
          {
            namespace: node.name.getText(),
            typeName: entryPoint,
          },
          [`${entryPoint}<${node.name.getText()}>`],
        ),
      );
    } else {
      ts.forEachChild(node, this.evaluateErrorPaths);
    }
  };

  /**
   * Walk through the tree of a query. At each level check for any types that've flagged previously as missing an id.
   * We walk through the query in this fashion so that we can report a path for types missing ids.
   */
  private walkQuery(searchContext: SearchContext, queryPath: string[]) {
    const typeData = this.typesMap[searchContext.namespace][searchContext.typeName];
    if (!typeData) {
      return;
    }

    // If the type is a type literal iterate though all of it's properties
    if (ts.isTypeLiteralNode(typeData.type)) {
      if (typeData.isMissingId) {
        this.missingIdPaths.push(queryPath);
      }
      typeData.type.members.forEach(member => {
        if (ts.isPropertySignature(member)) {
          const nextType = member.type && this.unwrapType(member.type);
          if (nextType) {
            this.walkQuery(
              {
                ...searchContext,
                typeName: nextType.typeName.getText(),
              },
              [...queryPath, member.name.getText()],
            );
          }
        }
      });
    }
  }

  // Find an underlying type in cases like  foo: Dashboard[] or foo: Dashboard | null
  private unwrapType(type: ts.TypeNode): ts.TypeReferenceNode | null {
    if (ts.isTypeReferenceNode(type)) {
      return type;
    } else if (ts.isArrayTypeNode(type)) {
      return this.unwrapType(type.elementType);
    } else if (ts.isUnionTypeNode(type)) {
      return type.types.map(underlyingType => this.unwrapType(underlyingType)).find(mappedType => !!mappedType) || null;
    }
    // Cases the value doesn't have a type ex: scalar just return null
    return null;
  }
}
