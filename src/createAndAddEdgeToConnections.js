// @flow
import { ConnectionHandler } from 'relay-runtime';
import type {
  RecordProxy,
  RecordSourceProxy
} from 'relay-runtime/store/RelayStoreTypes';

export type ConnectionConfig = {|
  parentID: string,
  key: string,
  filters?: Object
|};

type CreateAndAddEdgeToConnectionConfig = {|
  node: RecordProxy,
  connections: Array<ConnectionConfig>,
  edgeName: string,
  insertAt?: 'START' | 'END'
|};

export function createAndAddEdgeToConnections(
  store: RecordSourceProxy,
  config: CreateAndAddEdgeToConnectionConfig
): void {
  const { node } = config;
  config.connections.forEach(connectionConfig => {
    const connectionOwner = store.get(connectionConfig.parentID);

    if (!connectionOwner) {
      return;
    }

    const connection = ConnectionHandler.getConnection(
      connectionOwner,
      connectionConfig.key,
      connectionConfig.filters
    );

    if (!connection) {
      if (__DEV__) {
        console.warn('Could not find connection.');
      }

      return;
    }

    const edge = ConnectionHandler.createEdge(
      store,
      connection,
      node,
      config.edgeName
    );

    if (config.insertAt === 'START') {
      ConnectionHandler.insertEdgeBefore(connection, edge);
    } else {
      ConnectionHandler.insertEdgeAfter(connection, edge);
    }
  });
}
