// @flow

/**
 * This creates a Relay data IDs. It assumes that you're using data IDs like they're
 * normally created by graphql-relay-js. If you don't, you likely know how to generate
 * your data IDs anyway, so this won't help.
 */

export function createRelayDataId(
  databaseId: string,
  typename: string,
  base64Encode?: (data: string) => string
): string {
  const constructedId = `${typename}:${databaseId}`;

  if (base64Encode) {
    return base64Encode(constructedId);
  }

  if (global && global.btoa) {
    return global.btoa(constructedId);
  }

  throw new Error(
    'Missing way to base64-encode ID. Please provide your own base64 encode function.'
  );
}
