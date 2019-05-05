// @flow

/**
 * Collects all nodes from a connection and filters out nulls.
 */

export function collectConnectionNodes<T>(
  connectionObj: ?{
    +edges: ?$ReadOnlyArray<?{
      +node: ?T
    }>
  }
): $ReadOnlyArray<T> {
  if (connectionObj && connectionObj.edges && connectionObj.edges.length > 0) {
    return connectionObj.edges.reduce((acc, curr) => {
      if (curr && curr.node) {
        acc.push(curr.node);
      }

      return acc;
    }, []);
  }

  return [];
}
