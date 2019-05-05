// @flow
import type { RecordProxy } from 'relay-runtime/store/RelayStoreTypes';

export function resolveNestedRecord(
  rootRecord: RecordProxy,
  path: Array<string>
): ?RecordProxy {
  let node: ?RecordProxy = rootRecord;

  for (let i = 0; i <= path.length - 1; i += 1) {
    if (node) {
      node = node.getLinkedRecord(path[i]);
    }
  }

  return node !== rootRecord ? node : null;
}
