import { VIAMenu } from './menu-types';
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
export declare type RotationV2 = {
    r: number;
    rx: number;
    ry: number;
};
export declare type KLEDimensionsV2 = RotationV2 & {
    a: number;
    x: number;
    w: number;
    h: number;
    y: number;
};
export declare type OptionalDimensionsV2 = Partial<{
    x2: number;
    y2: number;
    h2: number;
    w2: number;
}>;
export declare type DecalV2 = {
    d: boolean;
};
declare type OtherKLEPropsV2 = {
    [key: string]: any;
};
export declare type KeyColorV2 = string;
export declare type LegendColorV2 = string;
export declare type MatrixPositionV2 = {
    row: number;
    col: number;
};
export declare type CursorV2 = {
    x: number;
    y: number;
};
export declare type FormattingV2 = {
    c: KeyColorV2;
    t: LegendColorV2;
};
export declare type DimensionsV2 = {
    w: number;
    h: number;
};
export declare type KLEElemV2 = (KLEDimensionsV2 & FormattingV2 & DecalV2 & OptionalDimensionsV2) | OtherKLEPropsV2 | string;
export declare type ColorCountV2 = {
    [key: string]: number;
};
export declare type ParsedKLEV2 = {
    res: ResultV2[][];
    colorMap: {
        [k: string]: string;
    };
};
export declare type GroupMetaV2 = {
    group: {
        key: number;
        option: number;
    };
};
export declare type ThemeDefinitionV2 = {
    [key in KeyColorTypeV2]: FormattingV2;
};
export declare type ResultV2 = {
    h: number;
    w: number;
} & FormattingV2 & DimensionsV2 & OptionalDimensionsV2 & CursorV2 & RotationV2 & MatrixPositionV2 & DecalV2 & GroupMetaV2;
export declare type VIAKeyV2 = Omit<ResultV2, keyof FormattingV2 | 'group' | 'd'> & {
    color: KeyColorTypeV2;
};
export declare enum LightingTypeDefinition {
    None = "none",
    QMKLighting = "qmk_backlight",
    QMKRGBLight = "qmk_rgblight",
    QMKBacklightRGBLight = "qmk_backlight_rgblight",
    WTRGBBacklight = "wt_rgb_backlight",
    WTMonoBacklight = "wt_mono_backlight"
}
export declare enum KeycodeTypeV2 {
    QMK = "qmk",
    WT = "wt",
    None = "none"
}
export declare type KLEFormattingObjectV2 = Partial<{
    c: string;
    t: string;
    x: number;
    y: number;
    w: number;
    a: number;
}>;
export declare type KLELayoutDefinitionV2 = (KLEMetaV2 | (string | KLEFormattingObjectV2)[])[];
export declare type MatrixInfoV2 = {
    rows: number;
    cols: number;
};
export declare type KeyboardDefinition = {
    name: string;
    vendorId: string;
    productId: string;
    lighting: LightingTypeDefinition;
    matrix: MatrixInfoV2;
    layouts: {
        [name: string]: KLELayoutDefinitionV2;
    };
};
export declare type CustomKeycodeV2 = {
    name: string;
    title: string;
    shortName?: string;
};
export declare enum CustomFeaturesV2 {
    RotaryEncoder = "rotary-encoder"
}
export declare type KeyboardDefinitionV2 = {
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
declare type ColorsNeededV2 = number;
declare type EffectTupleV2 = [string, ColorsNeededV2];
declare type LayoutLabelV2 = string | string[];
export declare type VIALightingTypeDefinition = {
    effects: EffectTupleV2[];
    underglowEffects: EffectTupleV2[];
    keycodes: KeycodeTypeV2;
    supportedLightingValues: LightingValue[];
};
export declare type CustomLightingTypeDefinition = Partial<VIALightingTypeDefinition> & {
    extends: LightingTypeDefinition;
};
export declare type LightingTypeDefinitionV2 = LightingTypeDefinition | CustomLightingTypeDefinition;
export declare enum KeyColorTypeV2 {
    Alpha = "alpha",
    Mod = "mod",
    Accent = "accent"
}
export declare type KLEMetaV2 = {
    name?: string;
};
export declare type KLELayoutV2 = (KLEMetaV2 | KLEElemV2[])[];
export declare type VIALayoutV2 = {
    width: number;
    height: number;
    keys: VIAKeyV2[];
    optionKeys: {
        [g: string]: {
            [o: string]: VIAKeyV2[];
        };
    };
};
export declare type VIADefinitionV2 = {
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
        optionKeys: {
            [g: string]: {
                [o: string]: VIAKeyV2[];
            };
        };
    };
};
export {};
