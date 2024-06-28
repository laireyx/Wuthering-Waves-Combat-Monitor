export interface Entity {
  id: number;
  type:
    | 'Proto_Animal'
    | 'Proto_Npc'
    | 'Proto_Monster'
    | 'Proto_Player'
    | 'Proto_Vision'
    | (string & Record<never, never>);
  name: string;
}
