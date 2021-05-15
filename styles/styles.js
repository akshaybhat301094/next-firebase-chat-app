import { Theme } from './colors';
import { css, cx } from '@emotion/css';

export const setThemeMode = (mode) => {
  return {
    home_wrapper: css`
      background: ${Theme[mode].containerColor};
      height: 100vh;
    `,
  };
};
