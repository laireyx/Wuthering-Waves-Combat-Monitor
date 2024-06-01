import { propModuleName } from './symbols';

export interface DecoratedModule {
  [propModuleName]: string;
}

export type InvokeHandler = (...args: unknown[]) => Promise<unknown>;
export type InvokeHandlerList = Map<string, InvokeHandler>;
