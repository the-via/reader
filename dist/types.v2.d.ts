import { VIAMenu } from './menu-types';
import { CustomKeycode, KeycodeType, KLELayoutDefinition, LayoutLabel, MatrixInfo, VIAKey } from './types.common';
export declare enum LightingValue {
    BACKLIGHT_USE_SPLIT_BACKSPACE = 1,
    BACKLIGHT_USE_SPLIT_LEFT_SHIFT = 2,
    BACKLIGHT_USE_SPLIT_RIGHT_SHIFT = 3,
    BACKLIGHT_USE_7U_SPACEBAR = 4,
    BACKLIGHT_USE_ISO_ENTER = 5,
    BACKLIGHT_DISABLE_HHKB_BLOCKER_LEDS = 6,
    BACKLIGHT_DISABLE_WHEN_USB_SUSPENDED = 7,
    BACKLIGHT_DISABLE_AFTER_TIMEOUT = 8,
    BACKLIGHT_BRIGHTNESS = 9,
    BACKLIGHT_EFFECT = 10,
    BACKLIGHT_EFFECT_SPEED = 11,
    BACKLIGHT_COLOR_1 = 12,
    BACKLIGHT_COLOR_2 = 13,
    BACKLIGHT_CAPS_LOCK_INDICATOR_COLOR = 14,
    BACKLIGHT_CAPS_LOCK_INDICATOR_ROW_COL = 15,
    BACKLIGHT_LAYER_1_INDICATOR_COLOR = 16,
    BACKLIGHT_LAYER_1_INDICATOR_ROW_COL = 17,
    BACKLIGHT_LAYER_2_INDICATOR_COLOR = 18,
    BACKLIGHT_LAYER_2_INDICATOR_ROW_COL = 19,
    BACKLIGHT_LAYER_3_INDICATOR_COLOR = 20,
    BACKLIGHT_LAYER_3_INDICATOR_ROW_COL = 21,
    BACKLIGHT_CUSTOM_COLOR = 23,
    QMK_RGBLIGHT_BRIGHTNESS = 128,
    QMK_RGBLIGHT_EFFECT = 129,
    QMK_RGBLIGHT_EFFECT_SPEED = 130,
    QMK_RGBLIGHT_COLOR = 131
}
export declare enum LightingTypeDefinition {
    None = "none",
    QMKLighting = "qmk_backlight",
    QMKRGBLight = "qmk_rgblight",
    QMKBacklightRGBLight = "qmk_backlight_rgblight",
    WTRGBBacklight = "wt_rgb_backlight",
    WTMonoBacklight = "wt_mono_backlight"
}
export declare type KeyboardDefinition = {
    name: string;
    vendorId: string;
    productId: string;
    lighting: LightingTypeDefinition;
    matrix: MatrixInfo;
    layouts: {
        [name: string]: KLELayoutDefinition;
    };
};
export declare enum CustomFeaturesV2 {
    RotaryEncoder = "rotary-encoder"
}
export declare type KeyboardDefinitionV2 = {
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
declare type ColorsNeededV2 = number;
declare type EffectTupleV2 = [string, ColorsNeededV2];
export declare type VIALightingTypeDefinition = {
    effects: EffectTupleV2[];
    underglowEffects: EffectTupleV2[];
    keycodes: KeycodeType;
    supportedLightingValues: LightingValue[];
};
export declare type CustomLightingTypeDefinition = Partial<VIALightingTypeDefinition> & {
    extends: LightingTypeDefinition;
};
export declare type LightingTypeDefinitionV2 = LightingTypeDefinition | CustomLightingTypeDefinition;
export declare type VIADefinitionV2 = {
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
        optionKeys: {
            [g: string]: {
                [o: string]: VIAKey[];
            };
        };
    };
};
export {};
