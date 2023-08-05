import {
  KeywordTypeSyntaxKind,
  LiteralSyntaxKind,
  LiteralTypeNode,
  SourceFile,
  SyntaxKind,
  TypeElement
} from 'typescript';
import {isKeywordTypeSyntaxKind} from "./isKeyword";
/**
 * Creates a fake TypeElement with the given `brand` representing a KeywordTypeSyntaxKind property.
 * The `_typeElementBrand` property is set to 'fake' to indicate it is a KeywordTypeSyntaxKind.
 * @param {KeywordTypeSyntaxKind} brand - The brand representing a KeywordTypeSyntaxKind property.
 * @param literalText
 * @returns {TypeElement} - A fake TypeElement with the `_typeElementBrand` set to 'fake'.
 */ export function createFakeTypeElement(
  brand: KeywordTypeSyntaxKind | LiteralTypeNode | SyntaxKind,
  literalText?: string,
): TypeElement {
  return {
    _declarationBrand: brand,
    end: 0,
    flags: undefined,
    kind: undefined,
    parent: undefined,
    pos: 0,
    forEachChild: undefined,
    getChildAt: undefined,
    getChildCount: undefined,
    getChildren: undefined,
    getEnd: undefined,
    getFirstToken: undefined,
    getFullStart: undefined,
    getFullText: undefined,
    getFullWidth: undefined,
    getLastToken: undefined,
    getLeadingTriviaWidth: undefined,
    getSourceFile: undefined,
    getStart: undefined,
    getText: (sourceFile?: SourceFile): string => literalText ?? '',
    getWidth: undefined,
    _typeElementBrand: 'fake',
  };
}
/**
 * Removes duplicate TypeElements from the input array and returns a new array containing unique TypeElements.
 * If a TypeElement has the property '_typeElementBrand' set to 'fake', it represents a KeywordTypeSyntaxKind property
 * added to the TypeElement as a member.
 * @param {TypeElement[]} members - An array of TypeElements to remove duplicates from.
 * @returns {TypeElement[]} - An array containing unique TypeElements, including those with '_typeElementBrand' === 'fake'.
 */
export function removeDuplicateTypeElements(
  members: TypeElement[],
): TypeElement[] {
  const uniqueMembers: TypeElement[] = [];
  uniqueMembers.push(
    ...members.filter(member => member._typeElementBrand ? member._typeElementBrand === 'fake' : false),
  );
  members.forEach(member => {
    if (!uniqueMembers.some(m => areTypeElementsEqual(m, member))) {
      uniqueMembers.push(member);
    }
  });
  return uniqueMembers;
}

/**
 * Function to compare two TypeElements for equality.
 * @param {TypeElement} a - The first TypeElement.
 * @param {TypeElement} b - The second TypeElement.
 * @returns {boolean} - True if the TypeElements are equal, false otherwise.
 */
function areTypeElementsEqual(a: TypeElement, b: TypeElement): boolean {
  // Compare the names and types of the TypeElements.
  return a.getText() === b.getText() && a.kind === b.kind;
}
