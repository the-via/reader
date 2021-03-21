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
  QMK_RGBLIGHT_COLOR = 0x83,
}

export type RotationV2 = {
  r: number;
  rx: number;
  ry: number;
};
export type KLEDimensionsV2 = RotationV2 & {
  a: number;
  x: number;
  w: number;
  h: number;
  y: number;
};

export type OptionalDimensionsV2 = Partial<{
  x2: number;
  y2: number;
  h2: number;
  w2: number;
}>;

export type DecalV2 = {
  d: boolean;
};

type OtherKLEPropsV2 = {[key: string]: any};
export type KeyColorV2 = string;
export type LegendColorV2 = string;
type Margin = number;
export type MatrixPositionV2 = {row: number; col: number};

export type CursorV2 = {x: number; y: number};
export type FormattingV2 = {c: KeyColorV2; t: LegendColorV2};
export type DimensionsV2 = {
  w: number;
  h: number;
};
export type KLEElemV2 =
  | (KLEDimensionsV2 & FormattingV2 & DecalV2 & OptionalDimensionsV2)
  | OtherKLEPropsV2
  | string;
export type ColorCountV2 = {[key: string]: number};
export type ParsedKLEV2 = {
  res: ResultV2[][];
  colorMap: {[k: string]: string};
};

export type GroupMetaV2 = {
  group: {
    key: number;
    option: number;
  };
};

export type ThemeDefinitionV2 = {
  [key in KeyColorTypeV2]: FormattingV2;
};

export type ResultV2 = {h: number; w: number} & FormattingV2 &
  DimensionsV2 &
  OptionalDimensionsV2 &
  CursorV2 &
  RotationV2 &
  MatrixPositionV2 &
  DecalV2 &
  GroupMetaV2;

export type VIAKeyV2 = Omit<ResultV2, keyof FormattingV2 | 'group' | 'd'> & {
  color: KeyColorTypeV2;
};

export enum LightingTypeDefinition {
  None = 'none',
  QMKLighting = 'qmk_backlight',
  QMKRGBLight = 'qmk_rgblight',
  QMKBacklightRGBLight = 'qmk_backlight_rgblight',
  WTRGBBacklight = 'wt_rgb_backlight',
  WTMonoBacklight = 'wt_mono_backlight',
}

export enum KeycodeTypeV2 {
  QMK = 'qmk',
  WT = 'wt',
  None = 'none',
}

export type KLEFormattingObjectV2 = Partial<{
  c: string;
  t: string;
  x: number;
  y: number;
  w: number;
  a: number;
}>;

export type KLELayoutDefinitionV2 = (
  | KLEMetaV2
  | (string | KLEFormattingObjectV2)[]
)[];

export type MatrixInfoV2 = {
  rows: number;
  cols: number;
};

export type KeyboardDefinition = {
  name: string;
  vendorId: string;
  productId: string;
  lighting: LightingTypeDefinition;
  matrix: MatrixInfoV2;
  layouts: {[name: string]: KLELayoutDefinitionV2};
};

/* This specifically does not include code */
export type CustomKeycodeV2 = {
  name: string;
  title: string;
  shortName?: string;
};

export enum CustomFeaturesV2 {
  RotaryEncoder = 'rotary-encoder',
}

export type KeyboardDefinitionV2 = {
  name: string;
  vendorId: string;
  productId: string;
  lighting: LightingTypeDefinitionV2;
  matrix: MatrixInfoV2;
  customFeatures?: CustomFeaturesV2[];
  customKeycodes?: CustomKeycodeV2[];
  customMenus?: VIAMenu[];
  layouts: {
    keymap: KLELayoutDefinitionV2;
    labels?: LayoutLabelV2[];
    presets?: {
      [preset: string]: number[];
    };
  };
};

type ColorsNeededV2 = number;
type EffectTupleV2 = [string, ColorsNeededV2];
type LayoutLabelV2 = string | string[];

export type VIALightingTypeDefinition = {
  effects: EffectTupleV2[];
  underglowEffects: EffectTupleV2[];
  keycodes: KeycodeTypeV2;
  supportedLightingValues: LightingValue[];
};

export type CustomLightingTypeDefinition = Partial<VIALightingTypeDefinition> & {
  extends: LightingTypeDefinition;
};

export type LightingTypeDefinitionV2 =
  | LightingTypeDefinition
  | CustomLightingTypeDefinition;

export enum KeyColorTypeV2 {
  Alpha = 'alpha',
  Mod = 'mod',
  Accent = 'accent',
}

export type KLEMetaV2 = {
  name?: string;
};

export type KLELayoutV2 = (KLEMetaV2 | KLEElemV2[])[];

export type VIALayoutV2 = {
  width: number;
  height: number;
  keys: VIAKeyV2[];
  optionKeys: {[g: string]: {[o: string]: VIAKeyV2[]}};
};

export type VIADefinitionV2 = {
  name: string;
  vendorProductId: number;
  lighting: LightingTypeDefinitionV2;
  matrix: MatrixInfoV2;
  customFeatures?: CustomFeaturesV2[];
  customKeycodes?: CustomKeycodeV2[];
  customMenus?: VIAMenu[];
  layouts: {
    width: number;
    height: number;
    presets?: {
      [preset: string]: number[];
    };
    labels?: LayoutLabelV2[];
    keys: VIAKeyV2[];
    optionKeys: {[g: string]: {[o: string]: VIAKeyV2[]}};
  };
};
