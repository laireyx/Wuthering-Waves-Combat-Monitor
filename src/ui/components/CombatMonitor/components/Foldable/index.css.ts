import { style } from '@vanilla-extract/css';

export const foldableStyle = style({
  display: 'flex',
  flexDirection: 'column',

  gap: '8px',
});

export const foldableTitleStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '2px 4px',
  borderRadius: '4px',

  background: 'black',
  color: 'white',
});

export const foldButtonStyle = style({
  width: 16,
  height: 16,
  filter: 'invert(100%)',
});
