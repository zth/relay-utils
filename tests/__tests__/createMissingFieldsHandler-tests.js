// @flow
import {
  fetchQuery,
  createOperationDescriptor,
  ROOT_TYPE
} from 'relay-runtime';

import TestQueryQuery from '../__generated__/TestQueryQuery.graphql';
import TestQueryUserWithAgeQuery from '../__generated__/TestQueryUserWithAgeQuery.graphql';
import TestQueryGetSinglePetQuery from '../__generated__/TestQueryGetSinglePetQuery.graphql';
import TestQueryQuery_userWithAge from '../__generated__/TestQueryQuery_userWithAge.graphql';
import { ObjectTypes } from '../constants/object-types';
import { createEnvironment, setNextQueryResponse } from '../mockEnvironment';
import { createMissingFieldsHandler } from '../../src/createMissingFieldsHandler';
import { createRelayDataId } from '../../src/createRelayDataId';

describe('createMissingFieldsHandler', () => {
  it('should create missing fields handlers', async () => {
    const { environment } = createEnvironment({
      missingFieldHandlers: createMissingFieldsHandler({
        handleScalarField: [
          ({ ownerTypename, name }) => {
            if (ownerTypename === ObjectTypes.User && name === 'age') {
              return 12;
            }
          }
        ],
        handleLinkedField: [
          ({ name, ownerTypename, args, store }) => {
            if (
              ownerTypename === ROOT_TYPE &&
              name === 'Pet' &&
              args &&
              args.petId
            ) {
              const dataId = createRelayDataId(args.petId, 'Pet');

              const maybeExistingPet = store.get(dataId);

              if (maybeExistingPet) {
                return dataId;
              }
            }
          }
        ]
      })
    });

    const userDataId = createRelayDataId('1', ObjectTypes.User);
    const petDataId = createRelayDataId('1', ObjectTypes.Pet);

    setNextQueryResponse({
      viewer: {
        id: userDataId,
        _id: '1',
        name: 'Some User',
        pets: {
          pageInfo: {
            hasNextPage: false,
            endCursor: '123'
          },
          edges: [
            {
              node: {
                id: petDataId,
                _id: '1',
                __typename: ObjectTypes.Pet,
                name: 'Pet 1',
                type: null,
                grade: null
              },
              cursor: '123'
            }
          ]
        }
      }
    });

    await fetchQuery(environment, TestQueryQuery, {});

    const operation = createOperationDescriptor(TestQueryUserWithAgeQuery, {});

    // This handles the missing data
    environment.check(operation.root);

    // Simple scalar field
    const user = environment.lookup({
      dataID: userDataId,
      node: TestQueryQuery_userWithAge,
      variables: {}
    });

    if (!user) {
      throw new Error();
    }

    expect(user.data).toEqual({
      name: 'Some User',
      age: 12
    });

    // More complex, getting a full type
    const petOperation = createOperationDescriptor(TestQueryGetSinglePetQuery, {
      petId: '1'
    });

    // This handles the missing data
    environment.check(petOperation.root);
    const pet = environment.lookup(petOperation.fragment);

    expect(pet.data).toEqual({
      Pet: {
        _id: '1',
        id: petDataId,
        name: 'Pet 1'
      }
    });
  });
});
