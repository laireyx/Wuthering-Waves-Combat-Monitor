import { IPCLogReader } from '@common/ipc/logReader';

declare global {
  const logReader: IPCLogReader;
}
