export type Lang = 'en' | 'ko';
export type ResourceName = 'buffs' | 'characters' | 'strings';

export default class ResourceLoader {
  static lang: Lang = 'en';

  static switchLanguage(lang: Lang) {
    this.lang = lang;
  }

  static async load<T>(resourceName: ResourceName) {
    const resource = (await import(`../${this.lang}/index.ts`)) as Record<
      ResourceName,
      T
    >;

    return resource[resourceName];
  }
}
