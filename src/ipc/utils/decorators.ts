import 'reflect-metadata';
import { propIpcHandlers, propModuleName } from './symbols';
import { DecoratedModule, InvokeHandlerList } from './types';

export function Module(moduleName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <T extends new (...args: any[]) => object>(constructor: T) {
    return class extends constructor implements DecoratedModule {
      [propModuleName] = moduleName;
    };
  };
}

export function Handler(messageName: string) {
  return function (
    target: object,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const ipcHandlers: InvokeHandlerList =
      (Reflect.getMetadata(propIpcHandlers, target) as InvokeHandlerList) ??
      new Map();

    ipcHandlers.set(
      messageName,
      descriptor.value as (...args: unknown[]) => Promise<unknown>,
    );

    Reflect.deleteMetadata(propIpcHandlers, target);
    Reflect.defineMetadata(propIpcHandlers, ipcHandlers, target);
  };
}
