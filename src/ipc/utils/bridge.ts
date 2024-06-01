import { ipcMain, ContextBridge, IpcRenderer } from 'electron';

import { propIpcHandlers, propModuleName } from './symbols';
import { DecoratedModule, InvokeHandler, InvokeHandlerList } from './types';

export function registerModule(module: DecoratedModule) {
  const ipcHandlers = Reflect.getMetadata(
    propIpcHandlers,
    module,
  ) as InvokeHandlerList;

  for (const [messageName, handler] of ipcHandlers.entries()) {
    ipcMain.handle(
      `${module[propModuleName]}:${messageName}`,
      (_, ...args: unknown[]) => handler(...args),
    );
  }
}

export function exposeModule(
  module: DecoratedModule,
  contextBridge: ContextBridge,
  ipcRenderer: IpcRenderer,
) {
  const ipcHandlers = Reflect.getMetadata(
    propIpcHandlers,
    module,
  ) as InvokeHandlerList;

  const expObj: Record<string, InvokeHandler> = {};

  for (const messageName of ipcHandlers.keys()) {
    expObj[messageName] = (...args: unknown[]) =>
      ipcRenderer.invoke(`${module[propModuleName]}:${messageName}`, ...args);
  }

  contextBridge.exposeInMainWorld(module[propModuleName], expObj);
}
