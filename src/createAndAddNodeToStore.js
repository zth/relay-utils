// @flow
import type {
  RecordProxy,
  RecordSourceProxy
} from 'relay-runtime/store/RelayStoreTypes';
import { createRelayDataId } from './createRelayDataId';
import { setFieldsOnRecord } from './setFieldsOnRecord';

export function createAndAddNodeToStore(
  store: RecordSourceProxy,
  uniqueId: string,
  typename: string,
  objShape: { [key: string]: mixed },
  base64encode?: (data: string) => string
): RecordProxy {
  const dataId = createRelayDataId(uniqueId, typename, base64encode);
  const newNode = store.create(dataId, typename);
  newNode.setValue(dataId, 'id');
  setFieldsOnRecord(newNode, objShape);
  return newNode;
}
