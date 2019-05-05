/**
 * @flow
 * @relayHash 300865f9ffbabca3b9a6e8289cd78cc7
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type TestQueryViewerPetsQueryVariables = {||};
export type TestQueryViewerPetsQueryResponse = {|
  +viewer: ?{|
    +name: string,
    +pets: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +_id: string,
          +name: string
        |}
      |}>
    |}
  |}
|};
export type TestQueryViewerPetsQuery = {|
  variables: TestQueryViewerPetsQueryVariables,
  response: TestQueryViewerPetsQueryResponse
|};

/*
query TestQueryViewerPetsQuery {
  viewer {
    name
    pets(first: 2) {
      edges {
        node {
          _id
          name
          id
        }
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function() {
  var v0 = {
      kind: 'ScalarField',
      alias: null,
      name: 'name',
      args: null,
      storageKey: null
    },
    v1 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 2
      }
    ],
    v2 = {
      kind: 'ScalarField',
      alias: null,
      name: '_id',
      args: null,
      storageKey: null
    },
    v3 = {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null
    };
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'TestQueryViewerPetsQuery',
      type: 'RootQuery',
      metadata: null,
      argumentDefinitions: [],
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'viewer',
          storageKey: null,
          args: null,
          concreteType: 'User',
          plural: false,
          selections: [
            (v0 /*: any*/),
            {
              kind: 'LinkedField',
              alias: null,
              name: 'pets',
              storageKey: 'pets(first:2)',
              args: (v1 /*: any*/),
              concreteType: 'PetConnection',
              plural: false,
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'edges',
                  storageKey: null,
                  args: null,
                  concreteType: 'PetEdge',
                  plural: true,
                  selections: [
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'node',
                      storageKey: null,
                      args: null,
                      concreteType: 'Pet',
                      plural: false,
                      selections: [(v2 /*: any*/), (v0 /*: any*/)]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    operation: {
      kind: 'Operation',
      name: 'TestQueryViewerPetsQuery',
      argumentDefinitions: [],
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'viewer',
          storageKey: null,
          args: null,
          concreteType: 'User',
          plural: false,
          selections: [
            (v0 /*: any*/),
            {
              kind: 'LinkedField',
              alias: null,
              name: 'pets',
              storageKey: 'pets(first:2)',
              args: (v1 /*: any*/),
              concreteType: 'PetConnection',
              plural: false,
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'edges',
                  storageKey: null,
                  args: null,
                  concreteType: 'PetEdge',
                  plural: true,
                  selections: [
                    {
                      kind: 'LinkedField',
                      alias: null,
                      name: 'node',
                      storageKey: null,
                      args: null,
                      concreteType: 'Pet',
                      plural: false,
                      selections: [
                        (v2 /*: any*/),
                        (v0 /*: any*/),
                        (v3 /*: any*/)
                      ]
                    }
                  ]
                }
              ]
            },
            (v3 /*: any*/)
          ]
        }
      ]
    },
    params: {
      operationKind: 'query',
      name: 'TestQueryViewerPetsQuery',
      id: null,
      text:
        'query TestQueryViewerPetsQuery {\n  viewer {\n    name\n    pets(first: 2) {\n      edges {\n        node {\n          _id\n          name\n          id\n        }\n      }\n    }\n    id\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node: any).hash = '222d1de07fd0aed9ec8471cfeed7cf17';
module.exports = node;
