// @flow
import type { RecordProxy } from 'relay-runtime/store/RelayStoreTypes';

export function setFieldsOnRecord(
  record: RecordProxy,
  fieldsObj: { [key: string]: mixed }
): void {
  Object.keys(fieldsObj).forEach(key => {
    record.setValue(fieldsObj[key], key);
  });
}
