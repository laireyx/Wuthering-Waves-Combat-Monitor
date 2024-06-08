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
  justifyContent: 'flex-end',
  background: '#7f7f7f',
});

export const titleStyle = style({
  position: 'absolute',
  left: 64,
  right: 64,

  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  textAlign: 'center',
  lineHeight: '32px',

  userSelect: 'none',
});

export const configButtonStyle = style({
  background: '#555',
  color: '#ccc',
});

export const shutdownButtonStyle = style({
  background: '#c33',
  color: '#fff',
});
