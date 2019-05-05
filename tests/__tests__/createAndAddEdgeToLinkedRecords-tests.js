// @flow
import { fetchQuery, commitLocalUpdate } from 'relay-runtime';

import TestQueryViewerPetsQuery from '../__generated__/TestQueryViewerPetsQuery.graphql';
import { ObjectTypes } from '../constants/object-types';
import { createEnvironment, setNextQueryResponse } from '../mockEnvironment';
import { createAndAddEdgeToLinkedRecords } from '../../src/createAndAddEdgeToLinkedRecords';
import { createAndAddNodeToStore } from '../../src/createAndAddNodeToStore';
import { createRelayDataId } from '../../src/createRelayDataId';
import { resolveNestedRecord } from '../../src/resolveNestedRecord';

describe('createAndAddEdgeToLinkedRecord', () => {
  it('should create and add an edge to a linked record', async () => {
    const { environment } = createEnvironment();

    const userDataId = createRelayDataId('1', ObjectTypes.User);
    const petDataId = createRelayDataId('1', ObjectTypes.Pet);

    setNextQueryResponse({
      viewer: {
        id: userDataId,
        name: 'Some User',
        pets: {
          pageInfo: {
            hasNextPage: false,
            endCursor: null
          },
          edges: []
        }
      }
    });

    await fetchQuery(environment, TestQueryViewerPetsQuery, {});

    expect.assertions(2);

    commitLocalUpdate(environment, store => {
      const viewer = resolveNestedRecord(store.getRoot(), ['viewer']);

      if (!viewer) {
        return;
      }

      const createdNode = createAndAddNodeToStore(
        store,
        petDataId,
        ObjectTypes.Pet,
        {
          id: petDataId,
          _id: '1',
          name: 'Pet 1',
          type: null,
          grade: null
        }
      );

      createAndAddEdgeToLinkedRecords(store, {
        node: createdNode,
        linkedRecords: [
          {
            parentID: viewer.getDataID(),
            key: 'pets',
            filters: { first: 2 }
          }
        ],
        edgeName: 'PetEdge'
      });

      // Now check that everything was added properly
      const pets = viewer.getLinkedRecord('pets', { first: 2 });

      if (pets) {
        const edges = pets.getLinkedRecords('edges');

        if (edges) {
          expect(edges.length).toBe(1);

          if (edges[0]) {
            const node = edges[0].getLinkedRecord('node');
            expect(node).toBe(createdNode);
          }
        }
      }
    });
  });
});
