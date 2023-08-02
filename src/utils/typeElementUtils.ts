import { TypeElement } from "typescript";

export function removeDuplicateTypeElements(
  members: TypeElement[],
): TypeElement[] {
  const uniqueMembers: TypeElement[] = [];

  members.forEach((member) => {
    if (!uniqueMembers.some((m) => areTypeElementsEqual(m, member))) {
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
  // Custom logic to compare the TypeElements for equality.
  // You may need to adjust this based on the specific TypeElement properties you want to consider.
  // For example, you could compare the names or types of the TypeElements.
  return a.getText() === b.getText() && a.kind === b.kind;
}
