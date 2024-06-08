import { open } from 'node:fs/promises';

import { promisified as regedit } from 'regedit';

import { IPCLogReader, IPCLogReaderReadOpts } from '@common/ipc/logReader';
import { ClientLog } from '@common/types/logReader';

import parseBattleLog from './parse/clientLog/battle';
import parseCombatInfoLog from './parse/clientLog/combatInfo';
import { LogLineMatchResult } from './types';
import { Handler, Module } from '../utils/decorators';

function validateMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is LogLineMatchResult {
  return !!(
    matchGroup?.timestamp &&
    matchGroup?.type &&
    matchGroup?.seq &&
    matchGroup?.msg
  );
}

@Module('logReader')
export default class IO implements IPCLogReader {
  @Handler('resolveGamePath')
  async resolveGamePath() {
    const regUninstallerKeys =
      'HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall';

    const listResult = await regedit.list([regUninstallerKeys]);

    const allUninstallerKeys = listResult[regUninstallerKeys].keys
      .filter((key) => key.includes('Wuthering'))
      .map((eachKey) => `${regUninstallerKeys}\\${eachKey}`);

    const uninstallers = await regedit.list(allUninstallerKeys);

    for (const uninstallerKey of allUninstallerKeys) {
      const uninstaller = uninstallers[uninstallerKey];
      if (uninstaller.values.DisplayName?.value === `Wuthering Waves`) {
        return uninstaller.values.InstallPath.value as string;
      }
    }

    return null;
  }

  @Handler('read')
  async read({
    filename,
    position = 0,
    omitUnknownLogs = true,
  }: IPCLogReaderReadOpts) {
    const fd = await open(filename);

    // Check if the log file is rotated.
    const { size } = await fd.stat();
    if (size < position) position = 0;

    const { buffer, bytesRead } = await fd.read({
      buffer: Buffer.alloc(0xffffff),
      position,
    });

    await fd.close();

    const lines = buffer.toString('utf-8').split(/[\r\n]+/);

    const combatData = lines
      .map((combatLine): ClientLog | undefined => {
        const { groups } =
          combatLine.match(
            /^\[(?<timestamp>.*?)\]\[.*?\]\[GameThread\]Puerts:.*?\[(?<seq>\d*?)\]\[I\]\[(?<type>.*?)\]\[.*?\]\[.*?\]\[.*?\] (?<msg>.*)$/,
          ) ?? {};

        if (!validateMatchResult(groups)) return;
        const { type } = groups;

        switch (type) {
          case 'Battle':
            return parseBattleLog(groups);
          case 'CombatInfo':
            return parseCombatInfoLog(groups);
          default:
            return;
        }
      })
      .filter((nullableData): nullableData is ClientLog => !!nullableData);

    return {
      data: omitUnknownLogs
        ? combatData.filter((log) => log.data?.type !== 'Unknown')
        : combatData,
      position: position + bytesRead,
    };
  }
}
