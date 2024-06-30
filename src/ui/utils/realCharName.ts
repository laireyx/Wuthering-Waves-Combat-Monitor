type RealName = string;

const KnownCharacterNameMap = {
  Sanhua: 'Sanhua',
  BaiLian: 'Baizhi',
  Lingyang: 'Lingyang',
  Maxiaofang: 'Chixia',
  Anke: 'Encore',
  Baer: 'Mortefi',
  Kakaluo: 'Calcharo',
  Yinlin: 'Yinlin',
  Yuanwu: 'Yuanwu',
  Yangyang: 'Yangyang',
  Qiushui: 'Aalto',
  Jiyan: 'Jiyan',
  Jianxin: 'Jianxin',
  Jueyuan: 'Verina',
  Taohua: 'Taoqi',
  Micai: 'Danjin',
  DarkNvzhu: 'Rover(Havoc)',
  Nvzhu: 'Rover(Spectro)',
  DarkNanzhu: 'Rover(Havoc)',
  Nanzhu: 'Rover(Spectro)',

  Jinxi: 'Jinhsi',
  ChangLi: 'Changli',
} as const satisfies Record<string, RealName>;

type KnownCharacterNames = typeof KnownCharacterNameMap;

function isValidMatchResult(
  matchResult: string,
): matchResult is keyof KnownCharacterNames {
  return matchResult in KnownCharacterNameMap;
}

export { KnownCharacterNameMap };
export type { KnownCharacterNames };

export default function realCharName(characterName: string) {
  const matchResult = characterName.match(/BP_(.*?)_/)?.[1] ?? characterName;
  if (!isValidMatchResult(matchResult)) return 'N/A';

  return KnownCharacterNameMap[matchResult];
}
