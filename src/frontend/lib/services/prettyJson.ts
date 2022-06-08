export function prettyJson(object: unknown) {
  return JSON.stringify(object, null, 2);
}
