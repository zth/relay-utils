/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { TestQueryQuery_pet$ref } from './TestQueryQuery_pet.graphql';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type TestQueryQuery_user$ref: FragmentReference;
declare export opaque type TestQueryQuery_user$fragmentType: TestQueryQuery_user$ref;
export type TestQueryQuery_user = {|
  +name: string,
  +pets: ?{|
    +pageInfo: {|
      +hasNextPage: boolean,
      +endCursor: ?string
    |},
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +_id: string,
        +name: string,
        +$fragmentRefs: TestQueryQuery_pet$ref
      |}
    |}>
  |},
  +$refType: TestQueryQuery_user$ref
|};
export type TestQueryQuery_user$data = TestQueryQuery_user;
export type TestQueryQuery_user$key = {
  +$data?: TestQueryQuery_user$data,
  +$fragmentRefs: TestQueryQuery_user$ref
};

const node: ReaderFragment = (function() {
  var v0 = {
    kind: 'ScalarField',
    alias: null,
    name: 'name',
    args: null,
    storageKey: null
  };
  return {
    kind: 'Fragment',
    name: 'TestQueryQuery_user',
    type: 'User',
    metadata: {
      connection: [
        {
          count: null,
          cursor: null,
          direction: 'forward',
          path: ['pets']
        }
      ]
    },
    argumentDefinitions: [],
    selections: [
      (v0 /*: any*/),
      {
        kind: 'LinkedField',
        alias: 'pets',
        name: '__TestQuery_viewer_pets_connection',
        storageKey: null,
        args: null,
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
                  {
                    kind: 'ScalarField',
                    alias: null,
                    name: '__typename',
                    args: null,
                    storageKey: null
                  },
                  {
                    kind: 'FragmentSpread',
                    name: 'TestQueryQuery_pet',
                    args: null
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
      }
    ]
  };
})();
// prettier-ignore
(node: any).hash = 'd3d538791a1bfa8bc8190e5f1cf446d3';
module.exports = node;
