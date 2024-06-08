import { LogReadResult } from '@common/types/logReader';

export interface IPCLogReaderReadOpts {
  filename: string;
  position?: number;
  omitUnknownLogs?: boolean;
}

export interface IPCLogReader {
  read(opts: IPCLogReaderReadOpts): Promise<LogReadResult>;
  resolveGamePath(): Promise<string | null>;
}
