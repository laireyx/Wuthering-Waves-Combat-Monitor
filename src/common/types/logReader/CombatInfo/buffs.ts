interface KnownBuff {
  buffType:
    | 'EchoEffect'
    | 'EchoSonata'
    | 'CharacterSkill'
    | 'CharacterOutro'
    | 'CharacterPassive'
    | 'CharacterResonance';
  buffName: string;
}

export const KnownBuffMap = {
  280003005: {
    buffType: 'EchoEffect',
    buffName: 'BellBorne',
  },
  30000008001: {
    buffType: 'EchoSonata',
    buffName: 'Moonlit',
  },
  30000007001: {
    buffType: 'EchoSonata',
    buffName: 'RejuGlow',
  },
  // Verina
  1503031011: {
    buffType: 'CharacterPassive',
    buffName: 'GiftOfNature',
  },
  1503904001: {
    buffType: 'CharacterResonance',
    buffName: 'VerinaR4',
  },
  2002201001: {
    buffType: 'CharacterOutro',
    buffName: 'VerinaOutro',
  },
  // Encore
  1203904001: {
    buffType: 'CharacterResonance',
    buffName: 'EncoreR4',
  },
  // Mortefi
  1204060002: {
    buffType: 'CharacterResonance',
    buffName: 'MortefiR6',
  },
  2002200811: {
    buffType: 'CharacterOutro',
    buffName: 'MortefiOutro',
  },
  // Baizhi
  1103411001: {
    buffType: 'CharacterPassive',
    buffName: 'BaizhiEuphonia',
  },
  2002200401: {
    buffType: 'CharacterOutro',
    buffName: 'BaizhiOutro',
  },
  1103426000: {
    buffType: 'CharacterResonance',
    buffName: 'BaizhiR6',
  },
  // Danjin
  2002200511: {
    buffType: 'CharacterOutro',
    buffName: 'DanjinOutro',
  },
  1602310701: {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR6',
  },
  // Sanhua
  2002200611: {
    buffType: 'CharacterOutro',
    buffName: 'SanhuaOutro',
  },
  1102906001: {
    buffType: 'CharacterResonance',
    buffName: 'SanhuaR6',
  },
  // Taoqi
  2002200701: {
    buffType: 'CharacterOutro',
    buffName: 'TaoqiOutro',
  },
  // Aalto
  2002200911: {
    buffType: 'CharacterOutro',
    buffName: 'AaltoOutro',
  },
  // Jianxin
  2002201611: {
    buffType: 'CharacterOutro',
    buffName: 'JianxinOutro',
  },
  // Yinlin
  2002201701: {
    buffType: 'CharacterOutro',
    buffName: 'YinlinOutro',
  },
  // Yangyang
  1402906001: {
    buffType: 'CharacterResonance',
    buffName: 'YangyangR6',
  },
  // Chixia
  1202952001: {
    buffType: 'CharacterResonance',
    buffName: 'ChixiaR6',
  },
} as const satisfies Record<PropertyKey, KnownBuff>;

export type KnownBuffs = typeof KnownBuffMap;
export const KnownBuffKeys = Object.keys(KnownBuffMap);
export const KnownBuffDescriptions = Object.values(KnownBuffMap);
