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

type OtherKLEProps = { [key: string]: any };
export type KeyColor = string;
export type LegendColor = string;
type Margin = number;
type Size = number;
export type MatrixPosition = { row: number; col: number };

export type Cursor = { x: number; y: number };
export type Formatting = { c: KeyColor; t: LegendColor };
export type Dimensions = {
  marginX: Margin;
  marginY: Margin;
  size: Size;
  h: number;
};
export type KLEElem = (KLEDimensions & Formatting) | OtherKLEProps | string;
export type ColorCount = { [key: string]: number };
export type ParsedKLE = {
  res: Result[][];
  colorMap: { [k: string]: string };
};

export type GroupMeta = {
  group: {
    key: number;
    option: number;
  }
};

export type Result = { h: number; w: number } & Formatting &
  Dimensions &
  Cursor &
  Rotation &
  MatrixPosition &
  GroupMeta;

export type VIAKey = Omit<Result, keyof Formatting | 'group' | 'marginX' | 'marginY' | 'size'> & { color: KeyColorType };

export enum LightingTypeDefinition {
  None = "none",
  QMKLighting = "qmk_backlight",
  WTRGBBacklight = "wt_rgb_backlight",
  WTMonoBacklight = "wt_mono_backlight"
}

export type KLEFormattingObject = Partial<{
  c: string;
  t: string;
  x: number;
  y: number;
  w: number;
  a: number;
}>;

export type KLELayoutDefinition = (KLEMeta | ((string | KLEFormattingObject)[]))[];

export type MatrixInfo = {
  rows: number;
  cols: number;
};

export type KeyboardDefinition = {
  name: string;
  vendorId: string;
  productId: string;
  lighting: LightingTypeDefinition;
  matrix: MatrixInfo;
  layouts: { [name: string]: KLELayoutDefinition };
};

export enum KeyColorType {
  Alpha = "alpha",
  Mod = "mod",
  Accent = "accent"
}

export type KLEMeta = {
  name?: string;
}

export type KLELayout = (KLEMeta | (KLEElem[]))[];

export type VIALayout = {
  width: number;
  height: number;
  keys: VIAKey[];
};

export type VIADefinition = {
  name: string;
  vendorProductId: number;
  lighting: LightingTypeDefinition;
  matrix: MatrixInfo;
  layouts: {
    [layoutName: string]: VIALayout;
  };
};
