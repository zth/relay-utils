// @flow
import { commitLocalUpdate } from 'relay-runtime';
import { setFieldsOnRecord } from '../../src/setFieldsOnRecord';
import TestQueryQuery_pet from '../__generated__/TestQueryQuery_pet.graphql';
import { ObjectTypes } from '../constants/object-types';
import { createEnvironment } from '../mockEnvironment';
import { createRelayDataId } from '../../src/createRelayDataId';

describe('setFieldsOnRecord', () => {
  it('should set provided fields on record', () => {
    const { environment } = createEnvironment();

    const dataId = createRelayDataId('1', ObjectTypes.Pet);

    commitLocalUpdate(environment, store => {
      const node = store.create(dataId, 'Pet');

      setFieldsOnRecord(node, {
        id: dataId,
        name: 'Some pet',
        grade: 'A'
      });
    });

    const pet = environment.lookup({
      dataID: dataId,
      node: TestQueryQuery_pet,
      variables: {}
    });

    if (!pet) {
      throw new Error('Missing added pet.');
    }

    expect(pet.data).toEqual({
      id: dataId,
      name: 'Some pet',
      grade: 'A'
    });
  });
});
