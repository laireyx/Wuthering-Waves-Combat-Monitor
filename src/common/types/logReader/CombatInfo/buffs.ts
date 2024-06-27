interface KnownBuff {
  buffType:
    | 'EchoEffect'
    | 'EchoSonata'
    | 'CharacterSkill'
    | 'CharacterOutro'
    | 'CharacterPassive'
    | 'CharacterResonance';
  buffName: string;
  isPartyBuff?: true;
}

export const KnownBuffMap = {
  '280001002': {
    buffType: 'EchoEffect',
    buffName: 'ThunderingMephis',
  },
  '280002002': {
    buffType: 'EchoEffect',
    buffName: 'InfernoRider',
  },
  '280003005': {
    buffType: 'EchoEffect',
    buffName: 'BellBorne',
    isPartyBuff: true,
  },
  '280004002': {
    buffType: 'EchoEffect',
    buffName: 'TempestMephis',
  },
  '280005002': {
    buffType: 'EchoEffect',
    buffName: 'Crownless',
  },
  '280006002': {
    buffType: 'EchoEffect',
    buffName: 'FeilianBeringal',
  },
  '280007002': {
    buffType: 'EchoEffect',
    buffName: 'LampyMyriad',
  },
  '280008002': {
    buffType: 'EchoEffect',
    buffName: 'MourningAix',
  },
  '280009007': {
    buffType: 'EchoEffect',
    buffName: 'MechAbomination',
  },
  '280010002': {
    buffType: 'EchoEffect',
    buffName: 'ImpermHeron',
  },
  '30000001002': {
    buffType: 'EchoSonata',
    buffName: 'FreezingFrost',
  },
  '30000002002': {
    buffType: 'EchoSonata',
    buffName: 'MoltenRift',
  },
  '30000003004': {
    buffType: 'EchoSonata',
    buffName: 'VoidThunder',
  },
  '30000004002': {
    buffType: 'EchoSonata',
    buffName: 'SierraGale',
  },
  '30000005002': {
    buffType: 'EchoSonata',
    buffName: 'CelestialLight',
  },
  '30000006002': {
    buffType: 'EchoSonata',
    buffName: 'Sunsinking',
  },
  '30000007002': {
    buffType: 'EchoSonata',
    buffName: 'RejuGlow',
    isPartyBuff: true,
  },
  '30000008002': {
    buffType: 'EchoSonata',
    buffName: 'Moonlit',
  },
  '30000009002': {
    buffType: 'EchoSonata',
    buffName: 'LingeringTunes',
  },
  // Verina
  '1503952001': {
    buffType: 'CharacterPassive',
    buffName: 'GraceOfLife',
  },
  '1503031011': {
    buffType: 'CharacterPassive',
    buffName: 'GiftOfNature',
    isPartyBuff: true,
  },
  '1503904001': {
    buffType: 'CharacterResonance',
    buffName: 'VerinaR4',
    isPartyBuff: true,
  },
  '2002201001': {
    buffType: 'CharacterOutro',
    buffName: 'VerinaOutro-Heal',
  },
  '2002201011': {
    buffType: 'CharacterOutro',
    buffName: 'VerinaOutro-DMG',
    isPartyBuff: true,
  },
  // Encore
  '1203904002': {
    buffType: 'CharacterResonance',
    buffName: 'EncoreR4',
    isPartyBuff: true,
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
    isPartyBuff: true,
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
    isPartyBuff: true,
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
    isPartyBuff: true,
  },
  '2002200511': {
    buffType: 'CharacterOutro',
    buffName: 'DanjinOutro',
  },
  // Sanhua
  '1102901002': {
    buffType: 'CharacterResonance',
    buffName: 'SanhuaR1',
  },
  '1102906002': {
    buffType: 'CharacterResonance',
    buffName: 'SanhuaR6',
    isPartyBuff: true,
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
    isPartyBuff: true,
  },
  // Taoqi
  '1601951001': {
    buffType: 'CharacterPassive',
    buffName: 'SteadfastProtection',
    isPartyBuff: true,
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
    isPartyBuff: true,
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
    isPartyBuff: true,
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
    isPartyBuff: true,
  },
  // Yuanwu
  '1303700003': {
    buffType: 'CharacterResonance',
    buffName: 'YuanwuR1',
  },
  '1303700014': {
    buffType: 'CharacterResonance',
    buffName: 'YuanwuR4',
    isPartyBuff: true,
  },
  '1303700006': {
    buffType: 'CharacterResonance',
    buffName: 'YuanwuR6',
    isPartyBuff: true,
  },
  // Lingyang
  '1104101002': {
    buffType: 'CharacterPassive',
    buffName: 'StridingLion',
  },
  '1104101050': {
    buffType: 'CharacterPassive',
    buffName: 'LionsVigor',
  },
  '1104004002': {
    buffType: 'CharacterResonance',
    buffName: 'LingyangR4',
    isPartyBuff: true,
  },
  // Rover(Spectro)
  '1502901002': {
    buffType: 'CharacterResonance',
    buffName: 'RoverSpectroR1',
  },
  '1502904002': {
    buffType: 'CharacterResonance',
    buffName: 'RoverSpectroR4',
    isPartyBuff: true,
  },
  '1502906002': {
    buffType: 'CharacterResonance',
    buffName: 'RoverSpectroR6',
    isPartyBuff: true,
  },
  // Rover(Havoc)
  '1604001003': {
    buffType: 'CharacterPassive',
    buffName: 'DarkSurge',
  },
  '1604001004': {
    buffType: 'CharacterPassive',
    buffName: 'DarkSurge',
  },
  '1604007001': {
    buffType: 'CharacterResonance',
    buffName: 'RoverHavocR4',
    isPartyBuff: true,
  },
} as const satisfies Record<string, KnownBuff>;

export type KnownBuffs = typeof KnownBuffMap;
export const KnownBuffKeys = Object.keys(KnownBuffMap);
export const KnownBuffDescriptions = Object.values(KnownBuffMap);
