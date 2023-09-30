import {ThemeDefinition} from './types.common';
export const THEMES: {[theme: string]: ThemeDefinition} = {
  PROTOLIVIA: {
    alpha: {
      c: '#505557',
      t: '#aeb0b0',
    },
    mod: {
      c: '#6b7173',
      t: '#aeb0b0',
    },
    accent: {
      c: '#afb0ae',
      t: '#505557',
    },
  },
  OLIVIA: {
    alpha: {
      c: '#f0f0f0',
      t: '#363434',
    },
    mod: {
      c: '#363434',
      t: '#E8C4B8',
    },
    accent: {
      c: '#E8C4B8',
      t: '#363434',
    },
  },
  OLIVIA_DARK: {
    alpha: {
      c: '#363434',
      t: '#E8C4B8',
    },
    mod: {
      c: '#363434',
      t: '#E8C4B8',
    },
    accent: {
      c: '#E8C4B8',
      t: '#363434',
    },
  },
  OLIVE: {
    alpha: {
      t: '#66665A',
      c: '#D9D7C4',
    },
    mod: {
      c: '#66665A',
      t: '#9DA183',
    },
    accent: {
      c: '#9DA183',
      t: '#66665A',
    },
  },
  OLIVE_DARK: {
    alpha: {
      c: '#66665A',
      t: '#9DA183',
    },
    mod: {
      c: '#66665A',
      t: '#9DA183',
    },
    accent: {
      c: '#9DA183',
      t: '#66665A',
    },
  },
  OLNY: {
    alpha: {
      c: '#c20018',
      t: '#cfa174',
    },
    mod: {
      c: '#c20018',
      t: '#cfa174',
    },
    accent: {
      t: '#c20018',
      c: '#cfa174',
    },
  },  
  BoW: {
    alpha: {
      c: '#FFFFFF',
      t: '#000000',
    },
    mod: {
      c: '#000000',
      t: '#FFFFFF',
    },
    accent: {
      t: '#FFFFFF',
      c: '#000000',
    },
  },
  WoB: {
    alpha: {
      c: '#000000',
      t: '#FFFFFF',
    },
    mod: {
      c: '#FFFFFF',
      t: '#000000',
    },
    accent: {
      t: '#000000',
      c: '#FFFFFF',
    },
  },
  EVA: {
    alpha: {
      c: '#67489e',
      t: '#6ab751',
    },
    mod: {
      c: '#FFFFFF',
      t: '#6ab751',
    },
    accent: {
      t: '#67489e',
      c: '#6ab751',
    },
  },
};

export const getTheme = () => THEMES.OLIVIA_DARK;
