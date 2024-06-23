import { style } from '@vanilla-extract/css';

export const foldableStyle = style({
  display: 'flex',
  flexDirection: 'column',

  gap: '8px',
});

export const foldableTitleStyle = style({
  flex: '1 0',

  display: 'flex',
  justifyContent: 'space-between',

  padding: '2px 4px',
  borderRadius: '4px',

  background: 'black',
  color: 'white',
});
