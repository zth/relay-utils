/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type TestQueryQuery_petWithOwner$ref: FragmentReference;
declare export opaque type TestQueryQuery_petWithOwner$fragmentType: TestQueryQuery_petWithOwner$ref;
export type TestQueryQuery_petWithOwner = {|
  +id: string,
  +_id: string,
  +name: string,
  +owner: ?{|
    +name: string
  |},
  +$refType: TestQueryQuery_petWithOwner$ref
|};
export type TestQueryQuery_petWithOwner$data = TestQueryQuery_petWithOwner;
export type TestQueryQuery_petWithOwner$key = {
  +$data?: TestQueryQuery_petWithOwner$data,
  +$fragmentRefs: TestQueryQuery_petWithOwner$ref
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
    name: 'TestQueryQuery_petWithOwner',
    type: 'Pet',
    metadata: null,
    argumentDefinitions: [],
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
      (v0 /*: any*/),
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
  };
})();
// prettier-ignore
(node: any).hash = 'e4922bc1f6c669caab1a5fdec90c9a59';
module.exports = node;
