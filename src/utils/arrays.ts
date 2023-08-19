/**
 * Replace all occurences of a string in a string.
 * @param input - The string to replace the occurences in.
 * @param search - The string to search for.
 * @param replacement - The string to replace the occurences with.
 */
export function replaceAll(
  input: string,
  search: string,
  replacement: string,
): string {
  return input.replace(new RegExp(search, 'g'), replacement);
}
