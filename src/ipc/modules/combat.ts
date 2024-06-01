import { IPCCombat } from '@common/ipc/combat';
import { Handler, Module } from '../utils/decorators';
import { readFile } from 'node:fs/promises';
import { CombatData } from '@common/schema/combat';

@Module('combat')
export default class IO implements IPCCombat {
  @Handler('read')
  async read(filename: string, position: number = 0) {
    const rawData = await readFile(filename, { encoding: 'utf-8' });
    const lines = rawData.split(/[\r\n]+/);

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

    return combatData;
  }
}
