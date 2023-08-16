import {
  isInterfaceDeclaration,
  isTypeParameterDeclaration,
  TypeNode,
} from 'typescript';

export function generateGenericTypeGuard(definition: TypeNode) {
  //NOTE: Supports only interface declarations for now
  if (!isInterfaceDeclaration(definition)) return '';
  const { typeParameters, name } = definition;
  for (const typeParameter of typeParameters) {
    if (isTypeParameterDeclaration(typeParameter)) {
    }
  }
}
