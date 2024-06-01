export interface Entity {
  id: number;
  type:
    | 'Animal'
    | 'Npc'
    | 'Monster'
    | 'Player'
    | 'Vision'
    | (string & Record<never, never>);
  name: string;
}
