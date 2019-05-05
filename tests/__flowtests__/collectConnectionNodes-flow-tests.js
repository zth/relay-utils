// @flow
import type { TestQueryQuery_pet$ref } from '../__generated__/TestQueryQuery_pet.graphql';
import type { TestQueryQuery_user } from '../__generated__/TestQueryQuery_user.graphql';
import { collectConnectionNodes } from '../../src/collectConnectionNodes';

declare var response: TestQueryQuery_user;

const collectedNodes: $ReadOnlyArray<{|
  +_id: string,
  +name: string,
  +$fragmentRefs: TestQueryQuery_pet$ref
|}> = collectConnectionNodes(response ? response.pets : null);

const erroringNodes: $ReadOnlyArray<{|
  +_idddddd: string,
  +name: string,
  +$fragmentRefs: TestQueryQuery_pet$ref
|}> = collectConnectionNodes(
  // $FlowExpectedError
  response ? response.pets : null
);
