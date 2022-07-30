import {VIAMenu} from './menu-types';
import {
  CustomKeycode,
  KeycodeType,
  KLELayoutDefinition,
  LayoutLabel,
  MatrixInfo,
  VIAKey,
} from './types.common';

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

export enum LightingTypeDefinition {
  None = 'none',
  QMKLighting = 'qmk_backlight',
  QMKRGBLight = 'qmk_rgblight',
  QMKBacklightRGBLight = 'qmk_backlight_rgblight',
  WTRGBBacklight = 'wt_rgb_backlight',
  WTMonoBacklight = 'wt_mono_backlight',
}

export type KeyboardDefinition = {
  name: string;
  vendorId: string;
  productId: string;
  lighting: LightingTypeDefinition;
  matrix: MatrixInfo;
  layouts: {[name: string]: KLELayoutDefinition};
};

export enum CustomFeaturesV2 {
  RotaryEncoder = 'rotary-encoder',
}

export type KeyboardDefinitionV2 = {
  name: string;
  vendorId: string;
  productId: string;
  lighting: LightingTypeDefinitionV2;
  matrix: MatrixInfo;
  customFeatures?: CustomFeaturesV2[];
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

type ColorsNeededV2 = number;
type EffectTupleV2 = [string, ColorsNeededV2];

export type VIALightingTypeDefinition = {
  effects: EffectTupleV2[];
  underglowEffects: EffectTupleV2[];
  keycodes: KeycodeType;
  supportedLightingValues: LightingValue[];
};

export type CustomLightingTypeDefinition =
  Partial<VIALightingTypeDefinition> & {
    extends: LightingTypeDefinition;
  };

export type LightingTypeDefinitionV2 =
  | LightingTypeDefinition
  | CustomLightingTypeDefinition;

export type VIADefinitionV2 = {
  name: string;
  vendorProductId: number;
  lighting: LightingTypeDefinitionV2;
  matrix: MatrixInfo;
  customFeatures?: CustomFeaturesV2[];
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
