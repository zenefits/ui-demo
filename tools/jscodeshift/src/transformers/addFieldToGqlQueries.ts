import { parse, visit, FieldNode, Kind } from 'graphql';

import runPrettier from '../utils/runPrettier';

type TransformerOptions = {
  fieldName: string;
  entityName: string;
};

export default function(fileInfo: any, api: any, options: TransformerOptions) {
  if (!options.fieldName || !options.entityName) {
    throw new Error('Must pass in an entityName and fieldName arguments');
  }
  const j = api.jscodeshift;
  const updatedFile = j(fileInfo.source)
    .find(api.jscodeshift.TaggedTemplateExpression, {
      tag: {
        name: 'gql',
      },
    })
    .replaceWith((templateExpression: any) => modifyGQLTemplateLiteral(j, templateExpression, options));
  return runPrettier(updatedFile.toSource());
}

function modifyGQLTemplateLiteral(j: any, templateExpression: any, options: TransformerOptions) {
  const templateLiteral = templateExpression.get('quasi');
  const updatedQuasis = templateLiteral.node.quasis.map((quasi: any) => {
    if (quasi.value.raw.trim() === '') {
      return quasi;
    }

    return j.templateElement(
      {
        raw: updateQuery(quasi.value.raw, options),
        cooked: updateQuery(quasi.value.cooked, options),
      },
      false,
    );
  });
  return j.taggedTemplateExpression(
    templateExpression.node.tag,
    j.templateLiteral(updatedQuasis, templateLiteral.node.expressions),
  );
}

// Parses string to gql ast and uses the ast to find places where we need to insert a given field
function updateQuery(templateString: string, options: TransformerOptions): string {
  const ast = parse(templateString);

  let locToAddId;
  visit(ast, {
    [Kind.FIELD]: {
      enter(node: FieldNode) {
        if (node.name && node.name.value === options.entityName) {
          const hasId = node.selectionSet.selections.some(
            selection => selection.kind === Kind.FIELD && selection.name.value === options.fieldName,
          );
          if (!hasId) {
            locToAddId = node.selectionSet.loc.start + 1;
          }
        }
        return node;
      },
    },
  });

  // We can't just print the gql ast because it won't retain comments. Instead use gql ast to find where we need to insert the field
  if (locToAddId) {
    // Need to add one at a time as locations will change
    return updateQuery([templateString.slice(0, locToAddId), 'id', templateString.slice(locToAddId)].join(''), options);
  }
  return templateString;
}
