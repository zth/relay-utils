/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type Grade = 'A' | 'B' | 'C' | '%future added value';
export type PetType = 'CAT' | 'DOG' | '%future added value';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type TestQueryQuery_pet$ref: FragmentReference;
declare export opaque type TestQueryQuery_pet$fragmentType: TestQueryQuery_pet$ref;
export type TestQueryQuery_pet = {|
  +id: string,
  +_id: string,
  +name: string,
  +type: ?PetType,
  +grade: ?Grade,
  +$refType: TestQueryQuery_pet$ref
|};
export type TestQueryQuery_pet$data = TestQueryQuery_pet;
export type TestQueryQuery_pet$key = {
  +$data?: TestQueryQuery_pet$data,
  +$fragmentRefs: TestQueryQuery_pet$ref
};

const node: ReaderFragment = {
  kind: 'Fragment',
  name: 'TestQueryQuery_pet',
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
    }
  ]
};
// prettier-ignore
(node: any).hash = '246d5c2557fcd22f23a2c2b3883de6fb';
module.exports = node;
