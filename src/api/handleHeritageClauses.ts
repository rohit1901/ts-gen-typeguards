import {factory, HeritageClause, InterfaceDeclaration, SyntaxKind} from 'typescript';

export function handleHeritageClauses(
  definition: InterfaceDeclaration,
  definitions: InterfaceDeclaration[],
): InterfaceDeclaration {
  if (!definition.heritageClauses) return definition;
  // Iterate through each heritage clause
  for (const clause of definition.heritageClauses) {
    // Check if the clause is an 'extends' clause
    if (clause.token === SyntaxKind.ExtendsKeyword) {
      definition = processHeritageClause(clause, definitions, definition);
    }
  }
  return definition;
}

/**
 * Merge the properties of the source interface into the target interface
 * @param target
 * @param source
 */
function mergeInterfaceProperties(
    target: InterfaceDeclaration,
    source: InterfaceDeclaration
): InterfaceDeclaration {
  return factory.updateInterfaceDeclaration(
      target,
      target.modifiers,
      target.name,
      target.typeParameters,
      target.heritageClauses.concat(source.heritageClauses),
      target.members.concat(source.members),
  );
}

/**
 * Process an 'extends' heritage clause and update the properties of the current definition (InterfaceDeclaration)
 * @param clause
 * @param definitions
 * @param currentDefinition
 */
function processHeritageClause(clause: HeritageClause, definitions: InterfaceDeclaration[], currentDefinition: InterfaceDeclaration) {
  // Iterate through each type reference in the heritage clause
  for (const typeRef of clause.types) {
    // Find the interface definition in the 'definitions' array with the same name as the type reference
    const interfaceDef = definitions.find(
        def => def.name.text === typeRef.expression.getText(),
    );
    if (interfaceDef) {
      // Call the function recursively to handle the newly found interface and update its properties
      const updatedInterface = handleHeritageClauses(
          interfaceDef,
          definitions,
      );

      // Merge the properties of the updatedInterface into the current definition
      currentDefinition = mergeInterfaceProperties(currentDefinition, updatedInterface);
    }
  }
  return currentDefinition;
}
