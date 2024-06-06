import { style } from '@vanilla-extract/css';

export const combatBuffTitleStyle = style({
  margin: 0,
  textAlign: 'center',
  fontWeight: 'bold',
});

export const combatBuffsStyle = style({
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
