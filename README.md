# relay-utils

This package contains utilities for working with Relay (modern) in general, and the Relay store + updates to the store in particular.

**Looking for contributions for TypeScript definitions**. I don't actively use TypeScript myself, but I'll gladly accept PRs for TS type definitions.

## Installation

`yarn add relay-utils`

## Table of Contents

- [collectConnectionNodes](#collectconnectionnodes) - Type safe way of collecting all nodes from a connection.
- [createRelayDataId](#createrelaydataid) - Create Relay data IDs.
- [resolveNestedRecord](#resolvenestedrecord) - Resolves a record in the store from a path.
- [setFieldsOnRecord](#setfieldsonrecord) - Sets fields of provided object on a record.
- [createAndAddNodeToStore](#createandaddnodetostore) - Creates a node of given type and shape and adds it to the store.
- [createAndAddEdgeToConnections](#createandaddedgetoconnections) - Creates an edge for a node and adds that edge + node to one or more connections.
- [createAndAddEdgeToLinkedRecords](#createandaddedgetolinkedrecords) - Same as `createAndAddEdgeToConnection` but for linked records.
- [removeNodeFromStore](#removenodefromstore) - Removes a node and cleans it + edges from connections/linked records.
- [createMissingFieldsHandler](#createmissingfieldshandler) - Creates handlers for resolving missing fields in the store.

## Usage

### collectConnectionNodes

Takes a connection, collects all nodes from the edges, and filters out nulls.

#### Example

Whenever you use a connection (with or without the `@connection`-annotation)...

```graphql
fragment SomeFragment_user on User {
  pets(first: 10) @connection(key: "SomeFragment_user_pets") {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
      }
    }
  }
}
```

...and you want to map over or just use the connection nodes, you can use `collectConnectionNodes`:

```javascript
type Props = {|
  user: SomeFragment_user
|};

const MyFragmentComponent = ({ user }: Props) => {
  // This is fully type safe, so pets is now $ReadOnlyArray<{| +id: string, +name: string |}>
  const pets = collectConnectionNodes(user ? user.pets : null);

  return pets.map(pet => (
    <div key={pet.id}>
      <h3>{pet.name}</h3>
    </div>
  ));
};
```

### createRelayDataId

A simple function to create data IDs for Relay. Useful for a number of scenarios.

#### Example

Imagine you have a field in your schema for each type that represents the database id for that object, like this:

```graphql
type Pet {
  id: ID! # The Relay data id from the server
  _id: ID! # Your internal database ID that you use when querying for just this node, using it in mutations etc
}
```

Now, imagine you want to look for a `Pet` in the store without passing its data id all the way to your updater when you already have the `_id` database id:

```javascript
const updater = store => {
  // This gets the Pet with database id petInput.id
  const petNode = store.get(
    createRelayDataId(
      petInput.id, // The database id
      'Pet'
    )
  );
};
```

#### Signature

```javascript
function createRelayDataId(
  databaseId: string,
  typename: string,
  base64Encode?: (data: string) => string // If you're doing SSR or similar, you can pass your own base64 function here. If nothing is passed, it defaults to trying to use the browser built-in btoa.
  ): string
```

##### Hint: Pair with `graphql-generate-flow-schema-assets` for type safety

`graphql-generate-flow-schema-assets` generates Flow types for your enums and object types from your `schema.graphql`. You can use that output to create your own, type safe variant of `createRelayDataId` like this:

```javascript
import type { ObjectTypesEnum } from '../path/to/the/generated/object-types.js';

// Ensures only object types in your schema can be passed to the creator function
export function myCreateRelayDataId(
  databaseId: string,
  objName: ObjectTypesEnum
): string {
  return createRelayDataId(databaseId, objName);
}
```

### resolveNestedRecord

Tries to resolve linked records from a `path` you give it.

#### Example

For this data structure:

```graphql
type RootQuery {
  viewer: User
}

type User {
  name: string
  favoritePet: Pet
}

type Pet {
  owner: User!
}

query ViewerFavoritePetQuery {
  viewer {
    favoritePet {
      owner {
        name
      }
    }
  }
}
```

...this accessor would work:

```javascript
const updater = store => {
  const petOwner = resolveNestedRecord(store.getRoot(), [
    'viewer',
    'favoritePet',
    'owner'
  ]);

  // You can use it on any record
  const viewerNode = store.get(viewerDataId);
  const petOwner = resolveNestedRecord(viewerNode, ['favoritePet', 'owner']);
};
```

#### Signature

```javascript
function resolveNestedRecord(
  rootNode: RecordProxy, // store.getRoot() for the root, but could be any record retrieved from the store
  path: Array<string> // Array of strings making up a path, like ['viewer', 'favoritePet', 'owner']
): ?RecordProxy
```

### setFieldsOnRecord

Simple helper to set values of object on record.

#### Example

```javascript
import { commitLocalUpdate } from 'relay-runtime';

commitLocalUpdate(environment, store => {
  const someUserNode = store.get(someUserDataId);

  setFieldsOnRecord(someUserNode, {
    name: 'Some Name',
    age: 59
  });
});
```

#### Signature

```javascript
function setFieldsOnRecord(
  record: RecordProxy,
  fieldsObj: { [key: string]: mixed }
): void
```

### createAndAddNodeToStore

Creates a node of a given type and shape, and adds it to the store.

#### Example

```javascript
import { commitLocalUpdate } from 'relay-runtime';

commitLocalUpdate(environment, store => {
  const newUser = createAndAddNodeToStore(store, newUserDatabaseId, 'User', {
    name: 'Some Name',
    age: 59
  });
});
```

#### Signature

```javascript
function createAndAddNodeToStore(
  store: RecordSourceProxy,
  uniqueId: string, // Typically the database ID
  typename: string,
  objShape: { [key: string]: mixed },
  base64encode?: (data: string) => string // Check out createRelayDataId for an explanation of when you'd want to pass this
): RecordProxy
```

### createAndAddEdgeToConnections

It's pretty common that GraphQL API:s return just the newly created node on mutations that lets you create nodes. Imagine something like:

```graphql
mutation AddPetMutation($input: AddPetInput!) {
  addPet(input: $input) {
    addedPet {
      id
      name
    }
  }
}
```

Now, often you'll end up in a scenario where you want to attach that node to a list of some sort, like a connection or a linked list.
`createAndAddEdgeToConnection` makes adding that created node to a connection easier:

#### Example

```javascript
const updater = store => {
  // Get the mutation payload from the store
  const addedPet = resolveNestedRecord(store.getRootField('addPet'), [
    'addedPet'
  ]);

  if (addedPet) {
    createAndAddEdgeToConnections(store, {
      node: addedPet,
      edgeName: 'PetEdge',
      connections: [
        {
          parentID: petOwnerDataId,
          key: 'SomeFragment_user_pets',
          insertAt: 'START'
        }
      ]
    });
  }
};
```

#### Signature

```javascript
function createAndAddEdgeToConnections(
  store: RecordSourceProxy, // The Relay store
  config: CreateAndAddEdgeToConnectionConfig
): void

type CreateAndAddEdgeToConnectionConfig = {|
  node: RecordProxy, // From the Relay store
  connections: Array<ConnectionConfig>,
  edgeName: string,
  insertAt?: 'START' | 'END'
|};

type ConnectionConfig = {|
  parentID: string,
  key: string,
  filters?: Object
|};
```

### createAndAddEdgeToLinkedRecords

A close sibling of `createAndAddEdgeToConnections`, `createAndAddEdgeToLinkedRecords` does the same thing, but for connections that are not annotated with `@connection`.

#### Example

Following the example of `createAndAddEdgeToConnections`, you'd write an updater like this instead for `createAndAddEdgeToLinkedRecords`:

```javascript
const updater = store => {
  // Get the mutation payload from the store
  const addedPet = resolveNestedRecord(store.getRootField('addPet'), [
    'addedPet'
  ]);

  const petOwner = store.get(petOwnerDataId); // Omitted since it's an example, but the node that owns the connection

  if (addedPet) {
    createAndAddEdgeToLinkedRecords(store, {
      node: addedPet,
      edgeName: 'PetEdge',
      linkedRecords: [
        {
          parentID: petOwner.getDataId(),
          key: 'pets', // The field key this connection is at on the owner record
          filters: { first: 2 }, // Remember, when there's no @connection annotation, the first/after arguments matter for record access in the store.
          insertAt: 'START'
        }
      ]
    });
  }
};
```

#### Signature

```javascript
function createAndAddEdgeToLinkedRecords(
  store: RecordSourceProxy, // The Relay store
  config: CreateAndAddEdgeToLinkedRecordConfig
): void

type CreateAndAddEdgeToLinkedRecordConfig = {|
  node: RecordProxy,
  linkedRecords: Array<LinkedRecordConfig>,
  edgeName: string,
  insertAt?: 'START' | 'END'
|};

type LinkedRecordConfig = {|
  parentID: string,
  key: string,
  filters?: Object
|};
```

### removeNodeFromStore

Whenever you delete something through your GraphQL API, and you can't/don't want to refetch everything that might've been affected by the delete,
you'll need to do some cleanup in the store to remove the deleted record. This involves deleting the record, as well as removing it + its edges from connections
or other linked records that might have the node in the store. `removeNodeFromStore` helps with that.

#### Example

You delete something:

```graphql
mutation DeletePet($input: DeletePetInput!) {
  deletePet(input: $input) {
    ok
  }
}
```

Now, you want to clean up that node + things that use it:

```javascript
const updater = store => {
  const deletedPetNode = store.get(deletedPetId); // The data ID of the deleted pet node

  // This might exist in the viewers pets connection
  const viewer = store.get(viewerDataId);

  // It might also exist in a second users pets list. This list however is not annotated with @connection, so we'll need to remove it as a linked record.
  const secondPossibleOwner = store.get(secondPossibleOwnerDataId);

  removeNodeFromStore(store, {
    node: deletedPetNode,
    connections: [
      {
        parentID: viewer.getDataID(),
        key: 'SomeFragment_user_pets',
        filters: {} // Add filters here if you have any
      }
    ],
    linkedRecords: [
      {
        parentID: secondPossibleOwner.getDataID(),
        key: 'pets', // Field key of the edges to look in
        filters: { first: 10 } // Remember, when things aren't annotated as a @connection, first/after is treated as a filter
      }
    ]
  });
};
```

_PLEASE NOTE_ that `removeNodeFromStore` does no automatic deletion - it relies on you providing it with all connections/linked record owner that might have the node.

#### Signature

```javascript
function removeNodeFromStore(
  store: RecordSourceProxy,
  config: RemoveNodeAndConnectionsConfig
): void

type RemoveNodeAndConnectionsConfig = {|
  node: RecordProxy,
  connections?: Array<ConnectionConfig>,
  linkedRecords?: Array<LinkedRecordConfig>
|};

type ConnectionConfig = {|
  parentID: string,
  key: string,
  filters?: Object
|};

type LinkedRecordConfig = {|
  parentID: string,
  key: string,
  filters?: Object
|};
```

### createMissingFieldsHandler

Sets up resolvers for missing fields in the graph. Uses the built in `missingFieldHandlers` on the Relay `Environment`.

#### Example

A fairly common thing is to have two separate id's for your types in your schema - one that's a Relay data id for global uniqueness, and one that's your database id or similar, that you use when updating/deleting and otherwise referencing the object when interacting with the API/backend.
In this example we'll say that you have a type that looks like this:

```graphql
type Pet {
  id: ID! # The Relay data ID, globally unique and generated by the backend
  _id: ID! # The database ID of this object, used when updating/deleting etc
}
```

It's easier to use the database ID when interacting with the backend. Imagine you have a query that looks like this:

```graphql
query SinglePetQuery($id: ID!) {
  # id here is not the Relay data ID, but the actual database ID
  Pet(id: $id) {
    name
  }
}
```

Lets say you want to use `SinglePetQuery` to get the `Pet` with id `123`. But, in your store, there's already
enough data for the `Pet` with id `123` to be resolved without a round-trip to the database, since you've fetched that `Pet` as part of another query.

Relay should just resolve this from the cache then, right? Well, Relay has no clue how to use your `id` query argument (that's a database id) to look up a `Pet` in the local store.
Lets use `createMissingFieldsHandler` to teach it how to do that so we won't have to make a round-trip to the database:

```javascript
// Missing field handlers are defined when creating the Environment
const environment = new Environment({
  network,
  store,
  missingFieldHandlers: createMissingFieldsHandler({
    /**
     * You can define handlers for scalar fields, linked fields, and plural linked fields.
     * More about scalar/plural linked fields in the Signature section, here we'll focus on
     * the linked field, since that's what our top-level Pet field is.
     */
    handleLinkedField: [
      // See the full signature in the Signature section
      ({
        name, // Name of the field
        ownerTypename, // Typename of the owning node
        args // Arguments used for this query
      }) => {
        /**
         * Here we want to match whenever the Pet field on the root level cannot be resolved from the store.
         * We then want to extract the `id` used, which is the database id in our case, and turn it into a
         * data id that Relay can use to look for the Pet in the store.
         */
        if (
          ownerTypename === ROOT_TYPE && // ROOT_TYPE comes from relay-runtime, and is the typename for the root of the store.
          name === 'Pet' && // The name of the field we're interested in
          args &&
          args.id // The id argument provided with the query, which here is our database id.
        ) {
          // We create and return a Relay data id from our database id
          return createRelayDataId(args.id, 'Pet');
        }
      }
    ]
  })
});
```

This teaches Relay how to use your query argument `id` on your root-level field `Pet` to resolve a `Pet` already in the store.

#### Signature

```javascript
function createMissingFieldsHandler(config: {|
  /**
   * handleScalarField allows you to provide missing values for scalar fields like
   * string/number/boolean and other scalars in your schema.
   */
  handleScalarField?: $ReadOnlyArray<ScalarMissingFieldReplacerFn>,

  /**
   * handleLinkedField handles linked fields, which basically means links between records.
   */
  handleLinkedField?: $ReadOnlyArray<LinkedFieldMissingFieldReplacerFn>,

  /**
   * handlePluralLinkedField handles lists of linked fields, which means lists of records.
   */
  handlePluralLinkedField?: $ReadOnlyArray<PluralLinkedFieldMissingFieldReplacerFn>
|}): $ReadOnlyArray<MissingFieldHandler>

type DataID = string;

type ScalarMissingFieldReplacerFn = (
  config: MissingFieldReplacerConfig
) => ?mixed; // Return whatever you want as value for the scalar field here, or undefined if you want the field to remain missing.

type LinkedFieldMissingFieldReplacerFn = (
  config: MissingFieldReplacerConfig
) => ?DataID;

type PluralLinkedFieldMissingFieldReplacerFn = (
  config: MissingFieldReplacerConfig
) => ?Array<?DataID>;

type MissingFieldReplacerConfig = {|
  name: string, // The name of the original field, regardless of alias
  alias: ?string, // If the field is aliased to something, this will be set
  args: ?Variables, // Arguments for the operation/query the field is found in
  fieldArgs: ?$ReadOnlyArray<NormalizationArgument>, // Arguments for this specific field. Check out NormalizationArgument in the Relay code base for more info
  ownerTypename: ?string, // The typename of the record owning the field. This will be ROOT_TYPE imported from relay-runtime when the field is a root field
  owner: ?Record, // The record that owns this field
  store: ReadOnlyRecordSourceProxy // The full Relay store
|};
```

#### Notes

This is an opinionated abstraction on top of Relays own `missingFieldHandlers`. You might not want to use `createMissingFieldHandlers`,
but use Relays API directly. [Check out Relays own type definition for missingFieldHandlers here](https://github.com/facebook/relay/blob/cccc3d62e662a11e58721bcadf5e727d8ceb42a1/packages/relay-runtime/store/RelayStoreTypes.js#L504). The `missingFieldHandlers` is then attached when creating the `Environment`, as illustrated in the example above.
