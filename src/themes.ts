import {ThemeDefinition} from './types';
export const THEMES: {[theme: string]: ThemeDefinition} = {
  PBT_HEAVY_INDUSTRY: {
    alpha: {
      c: '#f7f2ea',
      t: '#000000'
    },
    mod: {
      c: '#C2C7CA',
      t: '#000000'
    },
    accent: {
      c: '#FFC700',
      t: '#000000'
    }
  },
  OLIVIA: {
    alpha: {
      c: '#f0f0f0',
      t: '#363434'
    },
    mod: {
      c: '#363434',
      t: '#E8C4B8'
    },
    accent: {
      c: '#E8C4B8',
      t: '#363434'
    }
  },
  OLIVIA_DARK: {
    alpha: {
      c: '#363434',
      t: '#E8C4B8'
    },
    mod: {
      c: '#363434',
      t: '#E8C4B8'
    },
    accent: {
      c: '#E8C4B8',
      t: '#363434'
    }
  }
};

export const getTheme = () => THEMES.OLIVIA_DARK;
