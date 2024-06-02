import { style } from '@vanilla-extract/css';

import type { PropertiesFallback } from 'csstype';

declare module '@vanilla-extract/css' {
  interface CSSProperties
    extends PropertiesFallback<number | (string & Record<never, never>)> {
    // Add a missing property
    size?: number;

    // Add a CSS Custom Property
    WebkitAppRegion?: 'drag' | 'no-drag';
  }
}

export const titlebarStyle = style({
  WebkitAppRegion: 'drag',

  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,

  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,

  height: 32,

  display: 'flex',
  background: '#7f7f7f',
});

export const titleButtonStyle = style({
  border: 'none',
  borderRadius: 8,
  background: '#c33',

  width: 24,
  height: 24,
  margin: 4,

  WebkitAppRegion: 'no-drag',
  cursor: 'pointer',
});

export const titleStyle = style({
  position: 'relative',
  width: '100%',
  height: '100%',

  textAlign: 'center',
  lineHeight: '32px',

  userSelect: 'none',
});
