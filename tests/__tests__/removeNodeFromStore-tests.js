// @flow
import {
  fetchQuery,
  commitLocalUpdate,
  ConnectionHandler
} from 'relay-runtime';

import TestQueryQuery from '../__generated__/TestQueryQuery.graphql';
import { ObjectTypes } from '../constants/object-types';
import { createEnvironment, setNextQueryResponse } from '../mockEnvironment';
import { createRelayDataId } from '../../src/createRelayDataId';
import { removeNodeFromStore } from '../../src/removeNodeFromStore';

describe('removeNodeFromStore', () => {
  it('should resolve remove a node from the store, and from configured connections', async () => {
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

    expect.assertions(2);

    commitLocalUpdate(environment, store => {
      const petNode = store.get(petDataId);
      const userNode = store.get(userDataId);

      if (!petNode || !userNode) {
        return;
      }

      removeNodeFromStore(store, {
        node: petNode,
        connections: [
          {
            parentID: userNode.getDataID(),
            key: 'TestQuery_viewer_pets'
          }
        ]
      });

      expect(store.get(petDataId)).toBe(null);

      // Check that the node was removed from the connection
      const connection = ConnectionHandler.getConnection(
        userNode,
        'TestQuery_viewer_pets'
      );

      if (connection) {
        const edges = connection.getLinkedRecords('edges');

        if (edges) {
          expect(edges.length).toBe(0);
        }
      }
    });
  });
});
