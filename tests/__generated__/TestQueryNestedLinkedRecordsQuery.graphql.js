/**
 * @flow
 * @relayHash ba0ca0cfdc686a9fb3a979061918bb7e
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type TestQueryNestedLinkedRecordsQueryVariables = {||};
export type TestQueryNestedLinkedRecordsQueryResponse = {|
  +viewer: ?{|
    +favoritePet: ?{|
      +owner: ?{|
        +name: string
      |}
    |}
  |}
|};
export type TestQueryNestedLinkedRecordsQuery = {|
  variables: TestQueryNestedLinkedRecordsQueryVariables,
  response: TestQueryNestedLinkedRecordsQueryResponse
|};

/*
query TestQueryNestedLinkedRecordsQuery {
  viewer {
    favoritePet {
      owner {
        name
        id
      }
      id
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
    v1 = {
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
      name: 'TestQueryNestedLinkedRecordsQuery',
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
              kind: 'LinkedField',
              alias: null,
              name: 'favoritePet',
              storageKey: null,
              args: null,
              concreteType: 'Pet',
              plural: false,
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'owner',
                  storageKey: null,
                  args: null,
                  concreteType: 'User',
                  plural: false,
                  selections: [(v0 /*: any*/)]
                }
              ]
            }
          ]
        }
      ]
    },
    operation: {
      kind: 'Operation',
      name: 'TestQueryNestedLinkedRecordsQuery',
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
              kind: 'LinkedField',
              alias: null,
              name: 'favoritePet',
              storageKey: null,
              args: null,
              concreteType: 'Pet',
              plural: false,
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'owner',
                  storageKey: null,
                  args: null,
                  concreteType: 'User',
                  plural: false,
                  selections: [(v0 /*: any*/), (v1 /*: any*/)]
                },
                (v1 /*: any*/)
              ]
            },
            (v1 /*: any*/)
          ]
        }
      ]
    },
    params: {
      operationKind: 'query',
      name: 'TestQueryNestedLinkedRecordsQuery',
      id: null,
      text:
        'query TestQueryNestedLinkedRecordsQuery {\n  viewer {\n    favoritePet {\n      owner {\n        name\n        id\n      }\n      id\n    }\n    id\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node: any).hash = 'e8661a2fb0245b765d66505ca7b715d2';
module.exports = node;
