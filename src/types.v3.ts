import {VIAMenu} from './menu-types';

export type Rotation = {
  r: number;
  rx: number;
  ry: number;
};
export type KLEDimensions = Rotation & {
  a: number;
  x: number;
  w: number;
  h: number;
  y: number;
};

export type OptionalDimensions = Partial<{
  x2: number;
  y2: number;
  h2: number;
  w2: number;
}>;

export type Decal = {
  d: boolean;
};

type OtherKLEProps = {[key: string]: any};
export type KeyColor = string;
export type LegendColor = string;
export type MatrixPosition = {row: number; col: number};

export type Cursor = {x: number; y: number};
export type Formatting = {c: KeyColor; t: LegendColor};
export type Dimensions = {
  w: number;
  h: number;
};
export type KLEElem =
  | (KLEDimensions & Formatting & Decal & OptionalDimensions)
  | OtherKLEProps
  | string;
export type ColorCount = {[key: string]: number};
export type ParsedKLE = {
  res: Result[][];
  colorMap: {[k: string]: string};
};

export type GroupMeta = {
  group: {
    key: number;
    option: number;
  };
};

export type ThemeDefinition = {
  [key in KeyColorType]: Formatting;
};

export type Result = {h: number; w: number} & Formatting &
  Dimensions &
  OptionalDimensions &
  Cursor &
  Rotation &
  MatrixPosition &
  Decal &
  GroupMeta;

export type VIAKey = Omit<Result, keyof Formatting | 'group' | 'd'> & {
  color: KeyColorType;
};

export enum KeycodeType {
  QMK = 'qmk',
  WT = 'wt',
  None = 'none',
}

export type KLEFormattingObject = Partial<{
  c: string;
  t: string;
  x: number;
  y: number;
  w: number;
  a: number;
}>;

export type KLELayoutDefinition = (
  | KLEMeta
  | (string | KLEFormattingObject)[]
)[];

export type MatrixInfo = {
  rows: number;
  cols: number;
};

/* This specifically does not include code */
export type CustomKeycode = {
  name: string;
  title: string;
  shortName?: string;
  hexValue: string;
};

export enum CustomFeatures {
  RotaryEncoder = 'rotary-encoder',
}

export enum MenuId {
  Basic = 'basic',
  Lighting = 'lighting',
  Media = 'media',
  Macro = 'macro',
  Layers = 'layers',
  Special = 'special',
  Custom = 'custom',
}

export enum BuiltInKeycodeModule {
  Default = 'via/keycodes',
  QMKLighting = 'core/keycodes/qmk_lighting',
}

export type KeyboardDefinitionV3 = {
  name: string;
  vendorId: string;
  productId: string;
  matrix: MatrixInfo;
  menus: string[];
  customMenus?: VIAMenu[];
  keycodes?: (
    | BuiltInKeycodeModule
    | {menu: MenuId; keycodes: CustomKeycode[]}
  )[];
  layouts: {
    keymap: KLELayoutDefinition;
    labels?: LayoutLabel[];
    presets?: {
      [preset: string]: number[];
    };
  };
};

type LayoutLabel = string | string[];

export enum KeyColorType {
  Alpha = 'alpha',
  Mod = 'mod',
  Accent = 'accent',
}

export type KLEMeta = {
  name?: string;
};

export type KLELayout = (KLEMeta | KLEElem[])[];

export type VIALayout = {
  width: number;
  height: number;
  keys: VIAKey[];
  optionKeys: {[g: string]: {[o: string]: VIAKey[]}};
};

export type VIADefinitionV3 = {
  name: string;
  vendorProductId: number;
  matrix: MatrixInfo;
  menus: string[];
  customMenus?: VIAMenu[];
  keycodes?: (
    | BuiltInKeycodeModule
    | {menu: MenuId; keycodes: CustomKeycode[]}
  )[];
  layouts: {
    width: number;
    height: number;
    presets?: {
      [preset: string]: number[];
    };
    labels?: LayoutLabel[];
    keys: VIAKey[];
    optionKeys: {[g: string]: {[o: string]: VIAKey[]}};
  };
};
