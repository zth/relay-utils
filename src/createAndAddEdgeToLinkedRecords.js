// @flow
import { ConnectionHandler } from 'relay-runtime';
import type {
  RecordProxy,
  RecordSourceProxy
} from 'relay-runtime/store/RelayStoreTypes';

export type LinkedRecordConfig = {|
  parentID: string,
  key: string,
  filters?: Object
|};

type CreateAndAddEdgeToLinkedRecordConfig = {|
  node: RecordProxy,
  linkedRecords: Array<LinkedRecordConfig>,
  edgeName: string,
  insertAt?: 'START' | 'END'
|};

export function createAndAddEdgeToLinkedRecords(
  store: RecordSourceProxy,
  config: CreateAndAddEdgeToLinkedRecordConfig
): void {
  const { node } = config;

  config.linkedRecords.forEach(linkedRecordConfig => {
    const linkedRecordOwner = store.get(linkedRecordConfig.parentID);

    if (!node || !linkedRecordOwner) {
      if (__DEV__) {
        console.warn(
          'Could not find node to create edge from or linked record owner to create edge on.'
        );
      }
      return;
    }

    const linkedRecord = linkedRecordOwner.getLinkedRecord(
      linkedRecordConfig.key,
      linkedRecordConfig.filters
    );

    if (!linkedRecord) {
      if (__DEV__) {
        console.warn('Could not find linked record.');
      }
      return;
    }

    const edge = ConnectionHandler.createEdge(
      store,
      linkedRecord,
      node,
      config.edgeName
    );

    if (config.insertAt === 'START') {
      ConnectionHandler.insertEdgeBefore(linkedRecord, edge);
    } else {
      ConnectionHandler.insertEdgeAfter(linkedRecord, edge);
    }
  });
}
