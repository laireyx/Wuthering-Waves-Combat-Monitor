interface KnownBuff {
  buffType:
    | 'EchoEffect'
    | 'EchoSonata'
    | 'CharacterSkill'
    | 'CharacterOutro'
    | 'CharacterPassive';
  buffName: string;
}

export const KnownBuffMap = {
  '乌龟-增伤': {
    buffType: 'EchoEffect',
    buffName: 'BellBorne',
  },
  '拐套-使用退场技后，下一个人攻击力+22.5%，15秒。': {
    buffType: 'EchoSonata',
    buffName: 'Moonlit',
  },
  '奶套-触发治疗为全队加攻15%，30秒。': {
    buffType: 'EchoSonata',
    buffName: 'RejuGlow',
  },

  '全队加攻击力20%': {
    buffType: 'CharacterPassive',
    buffName: 'GiftOfNature',
  },
} as const satisfies Record<PropertyKey, KnownBuff>;

export type KnownBuffs = typeof KnownBuffMap;
export const KnownBuffKeys = Object.keys(KnownBuffMap);
export const KnownBuffDescriptions = Object.values(KnownBuffMap);
