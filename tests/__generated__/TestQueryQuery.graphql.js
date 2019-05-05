/**
 * @flow
 * @relayHash 37604e00d16cf8e434563cf9cc480b30
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { TestQueryQuery_user$ref } from './TestQueryQuery_user.graphql';
export type TestQueryQueryVariables = {||};
export type TestQueryQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: TestQueryQuery_user$ref
  |}
|};
export type TestQueryQuery = {|
  variables: TestQueryQueryVariables,
  response: TestQueryQueryResponse
|};

/*
query TestQueryQuery {
  viewer {
    ...TestQueryQuery_user
    id
  }
}

fragment TestQueryQuery_user on User {
  name
  pets(first: 2) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        _id
        name
        ...TestQueryQuery_pet
        id
        __typename
      }
      cursor
    }
  }
}

fragment TestQueryQuery_pet on Pet {
  id
  _id
  name
  type
  grade
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
      name: 'id',
      args: null,
      storageKey: null
    };
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'TestQueryQuery',
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
            {
              kind: 'FragmentSpread',
              name: 'TestQueryQuery_user',
              args: null
            }
          ]
        }
      ]
    },
    operation: {
      kind: 'Operation',
      name: 'TestQueryQuery',
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
                  name: 'pageInfo',
                  storageKey: null,
                  args: null,
                  concreteType: 'PageInfo',
                  plural: false,
                  selections: [
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'hasNextPage',
                      args: null,
                      storageKey: null
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'endCursor',
                      args: null,
                      storageKey: null
                    }
                  ]
                },
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
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: '_id',
                          args: null,
                          storageKey: null
                        },
                        (v0 /*: any*/),
                        (v2 /*: any*/),
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'type',
                          args: null,
                          storageKey: null
                        },
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: 'grade',
                          args: null,
                          storageKey: null
                        },
                        {
                          kind: 'ScalarField',
                          alias: null,
                          name: '__typename',
                          args: null,
                          storageKey: null
                        }
                      ]
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'cursor',
                      args: null,
                      storageKey: null
                    }
                  ]
                }
              ]
            },
            {
              kind: 'LinkedHandle',
              alias: null,
              name: 'pets',
              args: (v1 /*: any*/),
              handle: 'connection',
              key: 'TestQuery_viewer_pets',
              filters: null
            },
            (v2 /*: any*/)
          ]
        }
      ]
    },
    params: {
      operationKind: 'query',
      name: 'TestQueryQuery',
      id: null,
      text:
        'query TestQueryQuery {\n  viewer {\n    ...TestQueryQuery_user\n    id\n  }\n}\n\nfragment TestQueryQuery_user on User {\n  name\n  pets(first: 2) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        _id\n        name\n        ...TestQueryQuery_pet\n        id\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment TestQueryQuery_pet on Pet {\n  id\n  _id\n  name\n  type\n  grade\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node: any).hash = '6282f0444fc776e6030bcb03abbc7670';
module.exports = node;
