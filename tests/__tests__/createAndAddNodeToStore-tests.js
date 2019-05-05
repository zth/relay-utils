// @flow
import { commitLocalUpdate } from 'relay-runtime';
import TestQueryQuery_pet from '../__generated__/TestQueryQuery_pet.graphql';
import { ObjectTypes } from '../constants/object-types';
import { createEnvironment } from '../mockEnvironment';
import { createAndAddNodeToStore } from '../../src/createAndAddNodeToStore';
import { createRelayDataId } from '../../src/createRelayDataId';

describe('createAndAddNodeToStore', () => {
  it('should insert and add node of provided shape', () => {
    const { environment } = createEnvironment();

    const dataId = createRelayDataId('1', ObjectTypes.Pet);

    commitLocalUpdate(environment, store => {
      createAndAddNodeToStore(store, '1', ObjectTypes.Pet, {
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
