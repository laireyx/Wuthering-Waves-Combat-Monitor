import { exposeModule, registerModule } from './utils/bridge';
import { ContextBridge, IpcRenderer } from 'electron';

export async function registerModules(moduleNames: string[]) {
  for (const filename of moduleNames) {
    const { default: Module } = await import(`./modules/${filename}.ts`);

    registerModule(new Module());
  }
}

// Should be synchronous because we cannot use top-level await in preload
// (tsc recognizes preload script as commonjs module)
export async function exposeModules(
  contextBridge: ContextBridge,
  ipcRenderer: IpcRenderer,
  moduleNames: string[],
) {
  for (const filename of moduleNames) {
    const { default: Module } = await import(`./modules/${filename}.ts`);

    exposeModule(new Module(), contextBridge, ipcRenderer);
  }
}
