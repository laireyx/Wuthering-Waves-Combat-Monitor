import { style } from '@vanilla-extract/css';

export const indicatorStyle = style({
  flex: '1 0',
  minWidth: '40%',

  display: 'inline-flex',
  justifyContent: 'space-between',

  padding: '2px 4px',
  borderRadius: '4px',

  background: 'black',
  color: 'white',
});

export const indicatorCaptionStyle = style({
  display: 'inline-block',
  textAlign: 'start',

  color: '#ccc',
  paddingRight: '1ch',
  fontVariant: 'small-caps',
});
