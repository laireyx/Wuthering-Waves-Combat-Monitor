import { style } from '@vanilla-extract/css';

export const modalDialogStyle = style({
  border: 'none',
  background: 'none',

  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,

  padding: 0,

  selectors: {
    '&::backdrop': {
      background: 'rgba(0, 0, 0, 0.8)',
    },
  },
});
