import 'reflect-metadata';
import { propIpcHandlers, propModuleName } from './symbols';
import { DecoratedModule, HandlerList } from './types';

export function Module(moduleName: string) {
  return function <T extends { new (...args: any[]): object }>(constructor: T) {
    return class extends constructor implements DecoratedModule {
      [propModuleName] = moduleName;
    };
  };
}

export function Handler(messageName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const ipcHandlers: HandlerList =
      Reflect.getMetadata(propIpcHandlers, target) ?? new Map();

    ipcHandlers.set(messageName, descriptor.value);

    Reflect.deleteMetadata(propIpcHandlers, target);
    Reflect.defineMetadata(propIpcHandlers, ipcHandlers, target);
  };
}
