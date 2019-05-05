// @flow
import {
  fetchQuery,
  commitLocalUpdate,
  ConnectionHandler
} from 'relay-runtime';

import TestQueryQuery from '../__generated__/TestQueryQuery.graphql';
import { ObjectTypes } from '../constants/object-types';
import { createEnvironment, setNextQueryResponse } from '../mockEnvironment';
import { createAndAddEdgeToConnections } from '../../src/createAndAddEdgeToConnections';
import { createAndAddNodeToStore } from '../../src/createAndAddNodeToStore';
import { createRelayDataId } from '../../src/createRelayDataId';
import { resolveNestedRecord } from '../../src/resolveNestedRecord';

describe('createAndAddEdgeToConnection', () => {
  it('should create and add an edge to a connection', async () => {
    const { environment } = createEnvironment();

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
            endCursor: null
          },
          edges: []
        }
      }
    });

    await fetchQuery(environment, TestQueryQuery, {});

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

      createAndAddEdgeToConnections(store, {
        node: createdNode,
        connections: [
          {
            parentID: viewer.getDataID(),
            key: 'TestQuery_viewer_pets'
          }
        ],
        edgeName: 'PetEdge'
      });

      // Now check that everything was added properly
      const connection = ConnectionHandler.getConnection(
        viewer,
        'TestQuery_viewer_pets'
      );

      if (connection) {
        const edges = connection.getLinkedRecords('edges');

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
