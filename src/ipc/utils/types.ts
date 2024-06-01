import { propModuleName } from './symbols';

export interface DecoratedModule {
  [propModuleName]: string;
}

export type HandlerList = Map<string, (...args: any[]) => Promise<any>>;
