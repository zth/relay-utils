// @flow
import { fetchQuery, commitLocalUpdate } from 'relay-runtime';

import TestQueryNestedLinkedRecordsQuery from '../__generated__/TestQueryNestedLinkedRecordsQuery.graphql';
import { ObjectTypes } from '../constants/object-types';
import { createEnvironment, setNextQueryResponse } from '../mockEnvironment';
import { createRelayDataId } from '../../src/createRelayDataId';
import { resolveNestedRecord } from '../../src/resolveNestedRecord';

describe('resolveNestedRecord', () => {
  it('should resolve a nested field', async () => {
    const { environment } = createEnvironment();

    const userDataId = createRelayDataId('1', ObjectTypes.User);
    const petDataId = createRelayDataId('1', ObjectTypes.Pet);

    setNextQueryResponse({
      viewer: {
        id: userDataId,
        favoritePet: {
          id: petDataId,
          owner: {
            id: userDataId,
            name: 'Some User'
          }
        }
      }
    });

    await fetchQuery(environment, TestQueryNestedLinkedRecordsQuery, {});

    expect.assertions(2);

    commitLocalUpdate(environment, store => {
      const record = resolveNestedRecord(store.getRoot(), [
        'viewer',
        'favoritePet',
        'owner'
      ]);

      expect(record).toBeDefined();

      if (record) {
        expect(record.getValue('name')).toBe('Some User');
      }
    });
  });
});
