// @flow
import type {
  MissingFieldHandler,
  ReadOnlyRecordSourceProxy
} from 'relay-runtime/store/RelayStoreTypes';
import type { NormalizationArgument } from 'relay-runtime/util/NormalizationNode';
import type { Record } from 'relay-runtime/util/RelayCombinedEnvironmentTypes';
import type { DataID, Variables } from 'relay-runtime/util/RelayRuntimeTypes';

/**
 * A small abstraction over the missingFieldHandlers prop on Environment.
 * Lets your set up own strategies for resolving missing fields in responses.
 */

export type MissingFieldReplacerConfig = {|
  name: string,
  alias: ?string,
  args: ?Variables,
  fieldArgs: ?$ReadOnlyArray<NormalizationArgument>,
  ownerTypename: ?string,
  owner: ?Record,
  store: ReadOnlyRecordSourceProxy
|};

type ScalarMissingFieldReplacerFn = (
  config: MissingFieldReplacerConfig
) => ?mixed;

type LinkedFieldMissingFieldReplacerFn = (
  config: MissingFieldReplacerConfig
) => ?DataID;

type PluralLinkedFieldMissingFieldReplacerFn = (
  config: MissingFieldReplacerConfig
) => ?Array<?DataID>;

function processHandlers<THandler: Function>(
  handlers: $ReadOnlyArray<THandler>,
  field,
  record,
  args,
  store
) {
  for (let i = 0; i <= handlers.length - 1; i += 1) {
    const handledVal = handlers[i]({
      name: field.name,
      alias: field.alias,
      fieldArgs: field.args || null,
      args,
      ownerTypename:
        record && record.__typename && typeof record.__typename === 'string'
          ? record.__typename
          : null,
      owner: record,
      store
    });

    if (typeof handledVal !== 'undefined') {
      return handledVal;
    }
  }
}

export function createMissingFieldsHandler(config: {|
  handleScalarField?: $ReadOnlyArray<ScalarMissingFieldReplacerFn>,
  handleLinkedField?: $ReadOnlyArray<LinkedFieldMissingFieldReplacerFn>,
  handlePluralLinkedField?: $ReadOnlyArray<PluralLinkedFieldMissingFieldReplacerFn>
|}): $ReadOnlyArray<MissingFieldHandler> {
  return [
    {
      kind: 'scalar',
      handle: (field, record, args, store) => {
        if (config.handleScalarField) {
          return processHandlers<ScalarMissingFieldReplacerFn>(
            config.handleScalarField,
            field,
            record,
            args,
            store
          );
        }
      }
    },
    {
      kind: 'linked',
      handle: (field, record, args, store) => {
        if (config.handleLinkedField) {
          return processHandlers<LinkedFieldMissingFieldReplacerFn>(
            config.handleLinkedField,
            field,
            record,
            args,
            store
          );
        }
      }
    },
    {
      kind: 'pluralLinked',
      handle: (field, record, args, store) => {
        if (config.handlePluralLinkedField) {
          return processHandlers<PluralLinkedFieldMissingFieldReplacerFn>(
            config.handlePluralLinkedField,
            field,
            record,
            args,
            store
          );
        }
      }
    }
  ];
}
