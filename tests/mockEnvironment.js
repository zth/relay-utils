// @flow
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import type { EnvironmentConfig } from 'relay-runtime/store/RelayModernEnvironment';

let nextQueryResponse = { data: { viewer: null } };

export function setNextQueryResponse(data: Object) {
  nextQueryResponse = { data };
}

function fetchQuery() {
  return Promise.resolve({ ...nextQueryResponse });
}

export function createEnvironment(config?: $Shape<EnvironmentConfig>) {
  const network = Network.create(fetchQuery);
  const store = new Store(new RecordSource());

  const environment = new Environment({
    ...config,
    network,
    store
  });

  return { network, store, environment };
}
