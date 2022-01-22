export function queryElement<T extends keyof HTMLElementTagNameMap>(
  parent: HTMLElement,
  expectedElementType: T,
  query: string,
): HTMLElementTagNameMap[T] {
  const result = parent.querySelector(query);
  if (result.tagName.toLowerCase() !== expectedElementType) {
    throw new Error(`Expected ${expectedElementType} but got ${result.tagName}`);
  }
  return result as HTMLElementTagNameMap[T];
}
