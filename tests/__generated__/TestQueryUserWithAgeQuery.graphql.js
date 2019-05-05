/**
 * @flow
 * @relayHash ed0ba8e1cd07679767c9b90968117ef5
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { TestQueryQuery_userWithAge$ref } from './TestQueryQuery_userWithAge.graphql';
export type TestQueryUserWithAgeQueryVariables = {||};
export type TestQueryUserWithAgeQueryResponse = {|
  +viewer: ?{|
    +age: ?number,
    +$fragmentRefs: TestQueryQuery_userWithAge$ref
  |}
|};
export type TestQueryUserWithAgeQuery = {|
  variables: TestQueryUserWithAgeQueryVariables,
  response: TestQueryUserWithAgeQueryResponse
|};

/*
query TestQueryUserWithAgeQuery {
  viewer {
    age
    ...TestQueryQuery_userWithAge
    id
  }
}

fragment TestQueryQuery_userWithAge on User {
  name
  age
}
*/

const node: ConcreteRequest = (function() {
  var v0 = {
    kind: 'ScalarField',
    alias: null,
    name: 'age',
    args: null,
    storageKey: null
  };
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'TestQueryUserWithAgeQuery',
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
              kind: 'FragmentSpread',
              name: 'TestQueryQuery_userWithAge',
              args: null
            }
          ]
        }
      ]
    },
    operation: {
      kind: 'Operation',
      name: 'TestQueryUserWithAgeQuery',
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
              kind: 'ScalarField',
              alias: null,
              name: 'name',
              args: null,
              storageKey: null
            },
            {
              kind: 'ScalarField',
              alias: null,
              name: 'id',
              args: null,
              storageKey: null
            }
          ]
        }
      ]
    },
    params: {
      operationKind: 'query',
      name: 'TestQueryUserWithAgeQuery',
      id: null,
      text:
        'query TestQueryUserWithAgeQuery {\n  viewer {\n    age\n    ...TestQueryQuery_userWithAge\n    id\n  }\n}\n\nfragment TestQueryQuery_userWithAge on User {\n  name\n  age\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node: any).hash = 'd59459033d811d9512c28783a9f8653f';
module.exports = node;
