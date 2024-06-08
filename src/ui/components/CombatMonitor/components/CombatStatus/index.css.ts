import { style } from '@vanilla-extract/css';

export const combatStatusTitleStyle = style({
  margin: 0,
  textAlign: 'center',
  fontWeight: 'bold',
});

export const combatStatusStyle = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

  gap: '4px',
});

export const fightStatusInFightStyle = style({
  color: '#c77',
});

export const damageStyle = style({
  color: '#c00',
  fontWeight: 'bold',
});
