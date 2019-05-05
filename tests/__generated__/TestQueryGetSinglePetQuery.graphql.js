/**
 * @flow
 * @relayHash 6d4e017ca98d99ddb8a11ed32291aac6
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type TestQueryGetSinglePetQueryVariables = {|
  petId: string
|};
export type TestQueryGetSinglePetQueryResponse = {|
  +Pet: ?{|
    +id: string,
    +_id: string,
    +name: string
  |}
|};
export type TestQueryGetSinglePetQuery = {|
  variables: TestQueryGetSinglePetQueryVariables,
  response: TestQueryGetSinglePetQueryResponse
|};

/*
query TestQueryGetSinglePetQuery(
  $petId: ID!
) {
  Pet(petId: $petId) {
    id
    _id
    name
  }
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'petId',
        type: 'ID!',
        defaultValue: null
      }
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'Pet',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'petId',
            variableName: 'petId'
          }
        ],
        concreteType: 'Pet',
        plural: false,
        selections: [
          {
            kind: 'ScalarField',
            alias: null,
            name: 'id',
            args: null,
            storageKey: null
          },
          {
            kind: 'ScalarField',
            alias: null,
            name: '_id',
            args: null,
            storageKey: null
          },
          {
            kind: 'ScalarField',
            alias: null,
            name: 'name',
            args: null,
            storageKey: null
          }
        ]
      }
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'TestQueryGetSinglePetQuery',
      type: 'RootQuery',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    operation: {
      kind: 'Operation',
      name: 'TestQueryGetSinglePetQuery',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/)
    },
    params: {
      operationKind: 'query',
      name: 'TestQueryGetSinglePetQuery',
      id: null,
      text:
        'query TestQueryGetSinglePetQuery(\n  $petId: ID!\n) {\n  Pet(petId: $petId) {\n    id\n    _id\n    name\n  }\n}\n',
      metadata: {}
    }
  };
})();
// prettier-ignore
(node: any).hash = '46dfff23efb1c7558327808ba9f48d76';
module.exports = node;
