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

export const characterIconStyle = style({
  width: '36px',
});

export const characterNameStyle = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '4px',

  padding: '4px',
});

export const characterDetailsStyle = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

  gap: '4px',
});
