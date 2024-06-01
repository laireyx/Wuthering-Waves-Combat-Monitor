import { ipcMain, ContextBridge, IpcRenderer } from 'electron';
import { DecoratedModule, HandlerList } from './types';
import { propIpcHandlers, propModuleName } from './symbols';

export function registerModule(module: DecoratedModule) {
  const ipcHandlers: HandlerList = Reflect.getMetadata(propIpcHandlers, module);

  for (const [messageName, handler] of ipcHandlers.entries()) {
    ipcMain.handle(
      `${module[propModuleName]}:${messageName}`,
      (_, ...args: any[]) => handler(...args),
    );
  }
}

export function exposeModule(
  module: DecoratedModule,
  contextBridge: ContextBridge,
  ipcRenderer: IpcRenderer,
) {
  const ipcHandlers: HandlerList = Reflect.getMetadata(propIpcHandlers, module);

  const expObj: Record<string, (...args: any[]) => any> = {};

  for (const messageName of ipcHandlers.keys()) {
    expObj[messageName] = (...args: any[]) =>
      ipcRenderer.invoke(`${module[propModuleName]}:${messageName}`, ...args);
  }

  contextBridge.exposeInMainWorld(module[propModuleName], expObj);
}
