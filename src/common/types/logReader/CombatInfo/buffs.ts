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
  '280003005': {
    buffType: 'EchoEffect',
    buffName: 'BellBorne',
  },
  '30000008001': {
    buffType: 'EchoSonata',
    buffName: 'Moonlit',
  },
  '30000007001': {
    buffType: 'EchoSonata',
    buffName: 'RejuGlow',
  },
  // Verina
  '1503952001': {
    buffType: 'CharacterPassive',
    buffName: 'GraceOfLife',
  },
  '1503031011': {
    buffType: 'CharacterPassive',
    buffName: 'GiftOfNature',
  },
  '1503904001': {
    buffType: 'CharacterResonance',
    buffName: 'VerinaR4',
  },
  '2002201001': {
    buffType: 'CharacterOutro',
    buffName: 'VerinaOutro-Heal',
  },
  '2002201011': {
    buffType: 'CharacterOutro',
    buffName: 'VerinaOutro-DMG',
  },
  // Encore
  '1203904002': {
    buffType: 'CharacterResonance',
    buffName: 'EncoreR4',
  },
  '1203906002': {
    buffType: 'CharacterResonance',
    buffName: 'EncoreR6',
  },
  // Mortefi
  '1204080003': {
    buffType: 'CharacterPassive',
    buffName: 'HarmonicControl',
  },
  '1204090002': {
    buffType: 'CharacterPassive',
    buffName: 'RhythmicVibrato',
  },
  '1204030003': {
    buffType: 'CharacterResonance',
    buffName: 'MortefiR3',
  },
  '1204060002': {
    buffType: 'CharacterResonance',
    buffName: 'MortefiR6',
  },
  '2002200811': {
    buffType: 'CharacterOutro',
    buffName: 'MortefiOutro',
  },
  // Baizhi
  '1103411001': {
    buffType: 'CharacterPassive',
    buffName: 'BaizhiEuphonia',
  },
  '1103422001': {
    buffType: 'CharacterResonance',
    buffName: 'BaizhiR2',
  },
  '1103423000': {
    buffType: 'CharacterResonance',
    buffName: 'BaizhiR3',
  },
  '1103426000': {
    buffType: 'CharacterResonance',
    buffName: 'BaizhiR6',
  },
  // Danjin
  '1602300008': {
    buffType: 'CharacterPassive',
    buffName: 'CrimsonLight',
  },
  '1602300011': {
    buffType: 'CharacterPassive',
    buffName: 'Overflow',
  },
  '1602310502': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR1',
  },
  '1602310505': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR4',
  },
  '1602310605': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR5',
  },
  '1602310702': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR6',
  },
  '2002200511': {
    buffType: 'CharacterOutro',
    buffName: 'DanjinOutro',
  },
  '1602310701': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR6',
  },
  // Sanhua
  '1102901002': {
    buffType: 'CharacterResonance',
    buffName: 'SanhuaR1',
  },
  '1102906002': {
    buffType: 'CharacterResonance',
    buffName: 'SanhuaR6',
  },
  '1102951002': {
    buffType: 'CharacterPassive',
    buffName: 'Condensation',
  },
  '1102952002': {
    buffType: 'CharacterPassive',
    buffName: 'Avalanche',
  },
  '2002200611': {
    buffType: 'CharacterOutro',
    buffName: 'SanhuaOutro',
  },
  '1102906001': {
    buffType: 'CharacterResonance',
    buffName: 'SanhuaR6',
  },
  // Taoqi
  '1601951001': {
    buffType: 'CharacterPassive',
    buffName: 'SteadfastProtection',
  },
  '2002200701': {
    buffType: 'CharacterOutro',
    buffName: 'TaoqiOutro',
  },
  // Aalto
  '1403905002': {
    buffType: 'CharacterResonance',
    buffName: 'AaltoR5',
  },
  '2002200911': {
    buffType: 'CharacterOutro',
    buffName: 'AaltoOutro',
  },
  // Jianxin
  '1405010002': {
    buffType: 'CharacterResonance',
    buffName: 'JianxinR1',
  },
  '1405040002': {
    buffType: 'CharacterResonance',
    buffName: 'JianxinR4',
  },
  '2002201611': {
    buffType: 'CharacterOutro',
    buffName: 'JianxinOutro',
  },
  // Yinlin
  '1302911001': {
    buffType: 'CharacterPassive',
    buffName: 'PainImmersion',
  },
  '1302912011': {
    buffType: 'CharacterPassive',
    buffName: 'DeadlyFocus',
  },
  '1302904001': {
    buffType: 'CharacterResonance',
    buffName: 'YinlinR4',
  },
  '2002201701': {
    buffType: 'CharacterOutro',
    buffName: 'YinlinOutro',
  },
  // Yangyang
  '1402802002': {
    buffType: 'CharacterPassive',
    buffName: 'LazulineMercy',
  },
  '1402901002': {
    buffType: 'CharacterResonance',
    buffName: 'YangyangR1',
  },
  '1402906001': {
    buffType: 'CharacterResonance',
    buffName: 'YangyangR6',
  },
  // Chixia
  '1202951012': {
    buffType: 'CharacterPassive',
    buffName: 'NumbinglySpicy!',
  },
  '1202951026': {
    buffType: 'CharacterResonance',
    buffName: 'ChixiaR5',
  },
  '1202952002': {
    buffType: 'CharacterResonance',
    buffName: 'ChixiaR6',
  },
  // Yuanwu
  '1303700003': {
    buffType: 'CharacterResonance',
    buffName: 'YuanwuR1',
  },
  '1303700014': {
    buffType: 'CharacterResonance',
    buffName: 'YuanwuR4',
  },
  '1303700006': {
    buffType: 'CharacterResonance',
    buffName: 'YuanwuR6',
  },
  // Rover(Spectro)
  '1502901002': {
    buffType: 'CharacterResonance',
    buffName: 'RoverSpectroR1',
  },
  '1502904002': {
    buffType: 'CharacterResonance',
    buffName: 'RoverSpectroR4',
  },
  '1502906002': {
    buffType: 'CharacterResonance',
    buffName: 'RoverSpectroR6',
  },
} as const satisfies Record<string, KnownBuff>;

export type KnownBuffs = typeof KnownBuffMap;
export const KnownBuffKeys = Object.keys(KnownBuffMap);
export const KnownBuffDescriptions = Object.values(KnownBuffMap);
