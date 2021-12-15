export function toggleElement<T>(array: T[], element: T): T[] {
  const index = array.indexOf(element);
  if (index >= 0) {
    return array.slice(0, index).concat(array.slice(index + 1));
  }
  return [...array, element];
}
