import { style } from '@vanilla-extract/css';

export const partyBuffTitleStyle = style({
  margin: 0,
  textAlign: 'center',
  fontWeight: 'bold',
});

export const partyBuffStyle = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

  gap: '4px',
});

export const fightStatusInFightStyle = style({
  color: '#c77',
});
