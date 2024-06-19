import { UiCoreLog } from '@common/types/logReader';

import { LogLineMatchResult } from '../../types';

function validateMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  viewName: string;
  sequenceName: string;
} {
  return !!(matchGroup?.viewName && matchGroup.sequenceName);
}

export default function parseUiCoreLog({
  timestamp,
  seq,
  msg,
}: LogLineMatchResult): UiCoreLog | undefined {
  if (msg.startsWith('播放界面动画')) {
    const { groups } =
      msg.match(
        /播放界面动画(.*?)\(开始\) \[ViewName: (?<viewName>.*?)\]\[SequenceName: (?<sequenceName>.*?)\]/,
      ) ?? {};

    if (!validateMatchResult(groups)) return;
    const { viewName, sequenceName } = groups;

    return {
      timestamp,
      type: 'UiCore',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'PlayInterfaceAnimation',
        viewName,
        sequenceName,
      },
    };
  }
}
