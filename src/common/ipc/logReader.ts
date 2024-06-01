import { LogReadResult } from '@common/types/logReader';

export interface IPCLogReader {
  read(filename: string, position?: number): Promise<LogReadResult>;
}
