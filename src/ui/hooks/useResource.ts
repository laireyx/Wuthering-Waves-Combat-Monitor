import { useState } from 'react';

import ResourceLoader, {
  Lang,
  ResourceName,
} from '../../common/resources/loader';

type PendingResource<T> = () => {
  promise: Promise<T>;
  status: 'pending' | 'ok' | 'error';
  resolvedResource?: T;
  reason?: Error;
};
type Invalidator = (token: number) => void;

const promises = new Map<ResourceName, PendingResource<unknown>>();
const invalidators = new Set<Invalidator>();

export function changeLanguage(resourceLang: Lang) {
  ResourceLoader.switchLanguage(resourceLang);

  invalidators.forEach((invalidator) => invalidator(Date.now()));
  invalidators.clear();
  promises.clear();
}

export function useResource<T>(resourceName: ResourceName) {
  const [, invalidate] = useState(0);
  invalidators.add(invalidate);

  let loadResource = promises.get(resourceName) as
    | PendingResource<T>
    | undefined;

  if (!loadResource) {
    // Initialize

    let status: 'pending' | 'ok' | 'error' = 'pending';
    let resolvedResource: T | undefined = undefined;
    let reason: Error | undefined = undefined;

    const promise = ResourceLoader.load<T>(resourceName);
    promise
      .then((resource) => {
        status = 'ok';
        resolvedResource = resource;
      })
      .catch((err: Error) => {
        status = 'error';
        reason = err;
      });

    loadResource = () => ({
      promise,
      status,
      resolvedResource,
      reason,
    });

    promises.set(resourceName, loadResource);
  }

  const { promise, status, resolvedResource, reason } = loadResource();

  switch (status) {
    case 'pending':
      throw promise;
    case 'ok':
      if (resolvedResource) return resolvedResource;
      else throw new Error(`Resource is undefined: ${resourceName}`);
    case 'error':
      throw reason;
  }
}
