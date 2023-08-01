import { factory, InterfaceDeclaration, SyntaxKind } from "typescript";

export function handleHeritageClauses(
  definition: InterfaceDeclaration,
  definitions: InterfaceDeclaration[],
): InterfaceDeclaration {
  if (!definition.heritageClauses) return definition;
  // Iterate through each heritage clause
  for (const clause of definition.heritageClauses) {
    // Check if the clause is an 'extends' clause
    if (clause.token === SyntaxKind.ExtendsKeyword) {
      // Iterate through each type reference in the heritage clause
      for (const typeRef of clause.types) {
        // Find the interface definition in the 'definitions' array with the same name as the type reference
        const interfaceDef = definitions.find(
          (def) => def.name.text === typeRef.expression.getText(),
        );
        if (interfaceDef) {
          // Call the function recursively to handle the newly found interface and update its properties
          const updatedInterface = handleHeritageClauses(
            interfaceDef,
            definitions,
          );

          // Merge the properties of the updatedInterface into the current definition
          definition = factory.updateInterfaceDeclaration(
            definition,
            definition.modifiers,
            definition.name,
            definition.typeParameters,
            definition.heritageClauses.concat(updatedInterface.heritageClauses),
            definition.members.concat(updatedInterface.members),
          );
        }
      }
    }
  }
  return definition;
}
