import { style } from '@vanilla-extract/css';

export const titleButtonWrapperStyle = style({
  border: 'none',
  borderRadius: 8,

  width: 24,
  height: 24,
  margin: 4,

  WebkitAppRegion: 'no-drag',
  cursor: 'pointer',
});

export const titleButtonStyle = style({
  width: 16,
  height: 16,
  margin: 4,
});
