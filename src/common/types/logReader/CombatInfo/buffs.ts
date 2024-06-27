interface KnownBuff {
  buffType:
    | 'EchoEffect'
    | 'EchoSonata'
    | 'CharacterSkill'
    | 'CharacterOutro'
    | 'CharacterPassive'
    | 'CharacterResonance';
  buffName: string;
  isPartyBuff: boolean;
}

export const KnownBuffMap = {
  '280001002': {
    buffType: 'EchoEffect',
    buffName: 'ThunderingMephis',
    isPartyBuff: false,
  },
  '280002002': {
    buffType: 'EchoEffect',
    buffName: 'InfernoRider',
    isPartyBuff: false,
  },
  '280003005': {
    buffType: 'EchoEffect',
    buffName: 'BellBorne',
    isPartyBuff: true,
  },
  '280004002': {
    buffType: 'EchoEffect',
    buffName: 'TempestMephis',
    isPartyBuff: false,
  },
  '280005002': {
    buffType: 'EchoEffect',
    buffName: 'Crownless',
    isPartyBuff: false,
  },
  '280006002': {
    buffType: 'EchoEffect',
    buffName: 'FeilianBeringal',
    isPartyBuff: false,
  },
  '280007002': {
    buffType: 'EchoEffect',
    buffName: 'LampyMyriad',
    isPartyBuff: false,
  },
  '280008002': {
    buffType: 'EchoEffect',
    buffName: 'MourningAix',
    isPartyBuff: false,
  },
  '280009007': {
    buffType: 'EchoEffect',
    buffName: 'MechAbomination',
    isPartyBuff: false,
  },
  '280010002': {
    buffType: 'EchoEffect',
    buffName: 'ImpermHeron',
    isPartyBuff: false,
  },
  '30000001002': {
    buffType: 'EchoSonata',
    buffName: 'FreezingFrost',
    isPartyBuff: false,
  },
  '30000002002': {
    buffType: 'EchoSonata',
    buffName: 'MoltenRift',
    isPartyBuff: false,
  },
  '30000003004': {
    buffType: 'EchoSonata',
    buffName: 'VoidThunder',
    isPartyBuff: false,
  },
  '30000004002': {
    buffType: 'EchoSonata',
    buffName: 'SierraGale',
    isPartyBuff: false,
  },
  '30000005002': {
    buffType: 'EchoSonata',
    buffName: 'CelestialLight',
    isPartyBuff: false,
  },
  '30000006002': {
    buffType: 'EchoSonata',
    buffName: 'Sunsinking',
    isPartyBuff: false,
  },
  '30000007002': {
    buffType: 'EchoSonata',
    buffName: 'RejuGlow',
    isPartyBuff: true,
  },
  '30000008002': {
    buffType: 'EchoSonata',
    buffName: 'Moonlit',
    isPartyBuff: false,
  },
  '30000009002': {
    buffType: 'EchoSonata',
    buffName: 'LingeringTunes',
    isPartyBuff: false,
  },
  // Verina
  '1503952001': {
    buffType: 'CharacterPassive',
    buffName: 'GraceOfLife',
    isPartyBuff: false,
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
    isPartyBuff: false,
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
    isPartyBuff: false,
  },
  // Mortefi
  '1204080003': {
    buffType: 'CharacterPassive',
    buffName: 'HarmonicControl',
    isPartyBuff: false,
  },
  '1204090002': {
    buffType: 'CharacterPassive',
    buffName: 'RhythmicVibrato',
    isPartyBuff: false,
  },
  '1204030003': {
    buffType: 'CharacterResonance',
    buffName: 'MortefiR3',
    isPartyBuff: false,
  },
  '1204060002': {
    buffType: 'CharacterResonance',
    buffName: 'MortefiR6',
    isPartyBuff: true,
  },
  '2002200811': {
    buffType: 'CharacterOutro',
    buffName: 'MortefiOutro',
    isPartyBuff: false,
  },
  // Baizhi
  '1103411001': {
    buffType: 'CharacterPassive',
    buffName: 'BaizhiEuphonia',
    isPartyBuff: false,
  },
  '1103422001': {
    buffType: 'CharacterResonance',
    buffName: 'BaizhiR2',
    isPartyBuff: false,
  },
  '1103423000': {
    buffType: 'CharacterResonance',
    buffName: 'BaizhiR3',
    isPartyBuff: false,
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
    isPartyBuff: false,
  },
  '1602300011': {
    buffType: 'CharacterPassive',
    buffName: 'Overflow',
    isPartyBuff: false,
  },
  '1602310502': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR1',
    isPartyBuff: false,
  },
  '1602310505': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR4',
    isPartyBuff: false,
  },
  '1602310605': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR5',
    isPartyBuff: false,
  },
  '1602310702': {
    buffType: 'CharacterResonance',
    buffName: 'DanjinR6',
    isPartyBuff: true,
  },
  '2002200511': {
    buffType: 'CharacterOutro',
    buffName: 'DanjinOutro',
    isPartyBuff: false,
  },
  // Sanhua
  '1102901002': {
    buffType: 'CharacterResonance',
    buffName: 'SanhuaR1',
    isPartyBuff: false,
  },
  '1102906002': {
    buffType: 'CharacterResonance',
    buffName: 'SanhuaR6',
    isPartyBuff: true,
  },
  '1102951002': {
    buffType: 'CharacterPassive',
    buffName: 'Condensation',
    isPartyBuff: false,
  },
  '1102952002': {
    buffType: 'CharacterPassive',
    buffName: 'Avalanche',
    isPartyBuff: false,
  },
  '2002200611': {
    buffType: 'CharacterOutro',
    buffName: 'SanhuaOutro',
    isPartyBuff: false,
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
    isPartyBuff: false,
  },
  // Aalto
  '1403905002': {
    buffType: 'CharacterResonance',
    buffName: 'AaltoR5',
    isPartyBuff: false,
  },
  '2002200911': {
    buffType: 'CharacterOutro',
    buffName: 'AaltoOutro',
    isPartyBuff: false,
  },
  // Jianxin
  '1405010002': {
    buffType: 'CharacterResonance',
    buffName: 'JianxinR1',
    isPartyBuff: false,
  },
  '1405040002': {
    buffType: 'CharacterResonance',
    buffName: 'JianxinR4',
    isPartyBuff: false,
  },
  '2002201611': {
    buffType: 'CharacterOutro',
    buffName: 'JianxinOutro',
    isPartyBuff: false,
  },
  // Yinlin
  '1302911001': {
    buffType: 'CharacterPassive',
    buffName: 'PainImmersion',
    isPartyBuff: false,
  },
  '1302912011': {
    buffType: 'CharacterPassive',
    buffName: 'DeadlyFocus',
    isPartyBuff: false,
  },
  '1302904001': {
    buffType: 'CharacterResonance',
    buffName: 'YinlinR4',
    isPartyBuff: false,
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
    isPartyBuff: false,
  },
  '1402901002': {
    buffType: 'CharacterResonance',
    buffName: 'YangyangR1',
    isPartyBuff: false,
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
    isPartyBuff: false,
  },
  '1202951026': {
    buffType: 'CharacterResonance',
    buffName: 'ChixiaR5',
    isPartyBuff: false,
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
    isPartyBuff: false,
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
    isPartyBuff: false,
  },
  '1104101050': {
    buffType: 'CharacterPassive',
    buffName: 'LionsVigor',
    isPartyBuff: false,
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
    isPartyBuff: false,
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
    isPartyBuff: false,
  },
  '1604001004': {
    buffType: 'CharacterPassive',
    buffName: 'DarkSurge',
    isPartyBuff: false,
  },
  '1604007001': {
    buffType: 'CharacterResonance',
    buffName: 'RoverHavocR4',
    isPartyBuff: true,
  },
} as const satisfies Record<string, KnownBuff>;

export type KnownBuffs = typeof KnownBuffMap;
export const KnownBuffDescriptions = Object.values(KnownBuffMap);
