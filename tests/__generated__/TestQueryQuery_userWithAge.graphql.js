/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type TestQueryQuery_userWithAge$ref: FragmentReference;
declare export opaque type TestQueryQuery_userWithAge$fragmentType: TestQueryQuery_userWithAge$ref;
export type TestQueryQuery_userWithAge = {|
  +name: string,
  +age: ?number,
  +$refType: TestQueryQuery_userWithAge$ref
|};
export type TestQueryQuery_userWithAge$data = TestQueryQuery_userWithAge;
export type TestQueryQuery_userWithAge$key = {
  +$data?: TestQueryQuery_userWithAge$data,
  +$fragmentRefs: TestQueryQuery_userWithAge$ref
};

const node: ReaderFragment = {
  kind: 'Fragment',
  name: 'TestQueryQuery_userWithAge',
  type: 'User',
  metadata: null,
  argumentDefinitions: [],
  selections: [
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
      name: 'age',
      args: null,
      storageKey: null
    }
  ]
};
// prettier-ignore
(node: any).hash = '2c76a7241f76c3a28b40a57f4d3a144a';
module.exports = node;
