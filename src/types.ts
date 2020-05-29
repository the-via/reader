import {VIAMenu} from './menu-types';
export enum LightingValue {
  BACKLIGHT_USE_SPLIT_BACKSPACE = 0x01,
  BACKLIGHT_USE_SPLIT_LEFT_SHIFT = 0x02,
  BACKLIGHT_USE_SPLIT_RIGHT_SHIFT = 0x03,
  BACKLIGHT_USE_7U_SPACEBAR = 0x04,
  BACKLIGHT_USE_ISO_ENTER = 0x05,
  BACKLIGHT_DISABLE_HHKB_BLOCKER_LEDS = 0x06,
  BACKLIGHT_DISABLE_WHEN_USB_SUSPENDED = 0x07,
  BACKLIGHT_DISABLE_AFTER_TIMEOUT = 0x08,
  BACKLIGHT_BRIGHTNESS = 0x09,
  BACKLIGHT_EFFECT = 0x0a,
  BACKLIGHT_EFFECT_SPEED = 0x0b,
  BACKLIGHT_COLOR_1 = 0x0c,
  BACKLIGHT_COLOR_2 = 0x0d,
  BACKLIGHT_CAPS_LOCK_INDICATOR_COLOR = 0x0e,
  BACKLIGHT_CAPS_LOCK_INDICATOR_ROW_COL = 0x0f,
  BACKLIGHT_LAYER_1_INDICATOR_COLOR = 0x10,
  BACKLIGHT_LAYER_1_INDICATOR_ROW_COL = 0x11,
  BACKLIGHT_LAYER_2_INDICATOR_COLOR = 0x12,
  BACKLIGHT_LAYER_2_INDICATOR_ROW_COL = 0x13,
  BACKLIGHT_LAYER_3_INDICATOR_COLOR = 0x14,
  BACKLIGHT_LAYER_3_INDICATOR_ROW_COL = 0x15,
  BACKLIGHT_CUSTOM_COLOR = 0x17,
  // QMK RGBLIGHT
  QMK_RGBLIGHT_BRIGHTNESS = 0x80,
  QMK_RGBLIGHT_EFFECT = 0x81,
  QMK_RGBLIGHT_EFFECT_SPEED = 0x82,
  QMK_RGBLIGHT_COLOR = 0x83
}

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
type Margin = number;
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

export enum LightingTypeDefinition {
  None = 'none',
  QMKLighting = 'qmk_backlight',
  QMKRGBLight = 'qmk_rgblight',
  QMKBacklightRGBLight = 'qmk_backlight_rgblight',
  WTRGBBacklight = 'wt_rgb_backlight',
  WTMonoBacklight = 'wt_mono_backlight'
}

export enum KeycodeType {
  QMK = 'qmk',
  WT = 'wt',
  None = 'none'
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

export type KeyboardDefinition = {
  name: string;
  vendorId: string;
  productId: string;
  lighting: LightingTypeDefinition;
  matrix: MatrixInfo;
  layouts: {[name: string]: KLELayoutDefinition};
};

/* This specifically does not include code */
export type CustomKeycode = {
  name: string;
  title: string;
  shortName?: string;
};

export enum CustomFeatures {
  RotaryEncoder = 'rotary-encoder'
}

export type KeyboardDefinitionV2 = {
  name: string;
  vendorId: string;
  productId: string;
  lighting: LightingTypeDefinitionV2;
  matrix: MatrixInfo;
  customFeatures?: CustomFeatures[];
  customKeycodes?: CustomKeycode[];
  customMenus?: VIAMenu[];
  layouts: {
    keymap: KLELayoutDefinition;
    labels?: LayoutLabel[];
    presets?: {
      [preset: string]: number[];
    };
  };
};

type ColorsNeeded = number;
type EffectTuple = [string, ColorsNeeded];
type LayoutLabel = string | string[];

export type VIALightingTypeDefinition = {
  effects: EffectTuple[];
  underglowEffects: EffectTuple[];
  keycodes: KeycodeType;
  supportedLightingValues: LightingValue[];
};

export type CustomLightingTypeDefinition = Partial<
  VIALightingTypeDefinition
> & {
  extends: LightingTypeDefinition;
};

export type LightingTypeDefinitionV2 =
  | LightingTypeDefinition
  | CustomLightingTypeDefinition;

export enum KeyColorType {
  Alpha = 'alpha',
  Mod = 'mod',
  Accent = 'accent'
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

export type VIADefinition = {
  name: string;
  vendorProductId: number;
  lighting: LightingTypeDefinition;
  matrix: MatrixInfo;
  layouts: {
    [layoutName: string]: VIALayout;
  };
};

export type VIADefinitionV2 = {
  name: string;
  vendorProductId: number;
  lighting: LightingTypeDefinitionV2;
  matrix: MatrixInfo;
  customFeatures?: CustomFeatures[];
  customKeycodes?: CustomKeycode[];
  customMenus?: VIAMenu[];
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
