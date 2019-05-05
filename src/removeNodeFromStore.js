// @flow
import { ConnectionHandler } from 'relay-runtime';
import type {
  RecordProxy,
  RecordSourceProxy
} from 'relay-runtime/store/RelayStoreTypes';
import type { ConnectionConfig } from './createAndAddEdgeToConnections';
import type { LinkedRecordConfig } from './createAndAddEdgeToLinkedRecords';

type RemoveNodeAndConnectionsConfig = {|
  node: RecordProxy,
  connections?: Array<ConnectionConfig>,
  linkedRecords?: Array<LinkedRecordConfig>
|};

export function removeNodeFromStore(
  store: RecordSourceProxy,
  config: RemoveNodeAndConnectionsConfig
): void {
  const { node } = config;

  if (!node) {
    if (__DEV__) {
      console.warn('Could not find source node');
    }
    return;
  }

  if (config.connections) {
    config.connections.forEach(connectionConfig => {
      const owner = store.get(connectionConfig.parentID);

      if (owner) {
        const connection = ConnectionHandler.getConnection(
          owner,
          connectionConfig.key,
          connectionConfig.filters
        );

        if (connection) {
          ConnectionHandler.deleteNode(connection, node.getDataID());
        } else {
          if (__DEV__) {
            console.warn('Could not find connection.');
          }
        }
      } else {
        if (__DEV__) {
          console.warn('Could not find owner');
        }
      }
    });
  }

  if (config.linkedRecords) {
    config.linkedRecords.forEach(linkedRecordConfig => {
      const owner = store.get(linkedRecordConfig.parentID);

      if (owner) {
        const linkedRecord = owner.getLinkedRecord(
          linkedRecordConfig.key,
          linkedRecordConfig.filters
        );

        if (linkedRecord) {
          ConnectionHandler.deleteNode(linkedRecord, node.getDataID());
        } else {
          if (__DEV__) {
            console.warn('Could not find linked record');
          }
        }
      } else {
        if (__DEV__) {
          console.warn('Could not find owner');
        }
      }
    });
  }

  store.delete(node.getDataID());
}
