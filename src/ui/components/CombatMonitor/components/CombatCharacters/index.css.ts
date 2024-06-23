import { style } from '@vanilla-extract/css';

export const combatCharacterTitleStyle = style({
  margin: 0,
  textAlign: 'center',
  fontWeight: 'bold',
});

export const combatCharactersStyle = style({
  display: 'flex',
  flexDirection: 'column',

  gap: '4px',
});

export const characterInfoStyle = style({});

export const characterNameStyle = style({
  flex: '1 0',

  display: 'flex',
  justifyContent: 'space-between',

  padding: '2px 4px',
  borderRadius: '4px',

  background: 'black',
  color: 'white',
});

export const characterDetailsStyle = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

  gap: '4px',
});
