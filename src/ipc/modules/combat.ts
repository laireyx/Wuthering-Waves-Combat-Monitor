import { open } from 'node:fs/promises';

import { IPCCombat } from '@common/ipc/combat';
import { CombatData } from '@common/schema/combat';

import { Handler, Module } from '../utils/decorators';

@Module('combat')
export default class IO implements IPCCombat {
  @Handler('read')
  async read(filename: string, position = 0) {
    const fd = await open(filename);
    const { buffer, bytesRead } = await fd.read({
      buffer: Buffer.alloc(0xffffff),
      position,
    });
    await fd.close();

    const lines = buffer.toString('utf-8').split(/[\r\n]+/);

    const combatData = lines
      .map((combatLine) => {
        const matchResult = combatLine.match(
          /^\[(?<timestamp>.*?)\]\[.*?\]\[GameThread\]Puerts:.*?\[\d*?\]\[I\]\[(?<type>.*?)\]\[.*?\]\[.*?\]\[.*?\] (?<msg>.*)$/,
        );

        if (!matchResult?.groups) return;
        const { timestamp, type, msg } = matchResult.groups;

        if (type !== 'Battle' && type !== 'CombatInfo') return;

        return { timestamp, type, msg } satisfies CombatData;
      })
      .filter(
        (nullableData): nullableData is NonNullable<CombatData> =>
          !!nullableData,
      );

    return { data: combatData, position: position + bytesRead };
  }
}
