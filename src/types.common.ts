import {VIADefinitionV2} from './types.v2';
import {VIADefinitionV3} from './types.v3';

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

export type Ghosted = {
  g: boolean;
};

export type Stepped = {
  l: boolean;
};

export type Homing = {
  n: boolean;
};

export type Decal = {
  d: boolean;
};

export type TextSize = {
  f: number; // default text size
  f2: number;
  fa: number[];
};

export type Profile = {
  p: string;
};

export type SwitchInfo = {
  sm: string; // switch mount
  sb: string; // switch brand
  st: string; // switch type
};

export type KeyColor = string;
export type LegendColor = string;

export type MatrixPosition = {
  row: number;
  col: number;
  ei?: number;
  li?: number;
};

export type Cursor = {x: number; y: number};
export type Formatting = {c: KeyColor; t: LegendColor};
export type Dimensions = {
  w: number;
  h: number;
};
export type KLEElem =
  | Partial<
      KLEDimensions &
        OptionalDimensions &
        Formatting &
        Ghosted &
        Stepped &
        Homing &
        Decal &
        TextSize &
        Profile &
        SwitchInfo
    >
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

export type VIAKey = Omit<Result, keyof Formatting | 'group'> & {
  color: KeyColorType;
};

export enum KeycodeType {
  QMK = 'qmk',
  WT = 'wt',
  None = 'none',
}

export enum KeyColorType {
  Alpha = 'alpha',
  Mod = 'mod',
  Accent = 'accent',
}

export type KLEMeta = {
  name?: string;
};

export type KLELayoutDefinition = (KLEMeta | (string | KLEElem)[])[];

export type KLELayout = (KLEMeta | KLEElem[])[];

export type MatrixInfo = {
  rows: number;
  cols: number;
};

/* This specifically does not include code */
export type CustomKeycode = {
  name: string;
  title: string;
  shortName?: string;
};

export type LayoutLabel = string | string[];

export type VIALayout = {
  width: number;
  height: number;
  keys: VIAKey[];
  optionKeys: {[g: string]: {[o: string]: VIAKey[]}};
};

export type DefinitionVersionMap = {v2: VIADefinitionV2; v3: VIADefinitionV3};
export type KeyboardDictionary = Record<string, DefinitionVersionMap>;

export type DefinitionVersion =
  keyof KeyboardDictionary[keyof KeyboardDictionary];

export type KeyboardDefinitionIndex = {
  generatedAt: number;
  version: string;
  theme: ThemeDefinition;
  vendorProductIds: {[key in DefinitionVersion]: number[]};
  // The idea here is that anything in 'v2' will have both v2 and v3 defs
  // so 'v3' only contains defs that aren't v2
};
