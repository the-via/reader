"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LightingValue;
(function (LightingValue) {
    LightingValue[LightingValue["BACKLIGHT_USE_SPLIT_BACKSPACE"] = 1] = "BACKLIGHT_USE_SPLIT_BACKSPACE";
    LightingValue[LightingValue["BACKLIGHT_USE_SPLIT_LEFT_SHIFT"] = 2] = "BACKLIGHT_USE_SPLIT_LEFT_SHIFT";
    LightingValue[LightingValue["BACKLIGHT_USE_SPLIT_RIGHT_SHIFT"] = 3] = "BACKLIGHT_USE_SPLIT_RIGHT_SHIFT";
    LightingValue[LightingValue["BACKLIGHT_USE_7U_SPACEBAR"] = 4] = "BACKLIGHT_USE_7U_SPACEBAR";
    LightingValue[LightingValue["BACKLIGHT_USE_ISO_ENTER"] = 5] = "BACKLIGHT_USE_ISO_ENTER";
    LightingValue[LightingValue["BACKLIGHT_DISABLE_HHKB_BLOCKER_LEDS"] = 6] = "BACKLIGHT_DISABLE_HHKB_BLOCKER_LEDS";
    LightingValue[LightingValue["BACKLIGHT_DISABLE_WHEN_USB_SUSPENDED"] = 7] = "BACKLIGHT_DISABLE_WHEN_USB_SUSPENDED";
    LightingValue[LightingValue["BACKLIGHT_DISABLE_AFTER_TIMEOUT"] = 8] = "BACKLIGHT_DISABLE_AFTER_TIMEOUT";
    LightingValue[LightingValue["BACKLIGHT_BRIGHTNESS"] = 9] = "BACKLIGHT_BRIGHTNESS";
    LightingValue[LightingValue["BACKLIGHT_EFFECT"] = 10] = "BACKLIGHT_EFFECT";
    LightingValue[LightingValue["BACKLIGHT_EFFECT_SPEED"] = 11] = "BACKLIGHT_EFFECT_SPEED";
    LightingValue[LightingValue["BACKLIGHT_COLOR_1"] = 12] = "BACKLIGHT_COLOR_1";
    LightingValue[LightingValue["BACKLIGHT_COLOR_2"] = 13] = "BACKLIGHT_COLOR_2";
    LightingValue[LightingValue["BACKLIGHT_CAPS_LOCK_INDICATOR_COLOR"] = 14] = "BACKLIGHT_CAPS_LOCK_INDICATOR_COLOR";
    LightingValue[LightingValue["BACKLIGHT_CAPS_LOCK_INDICATOR_ROW_COL"] = 15] = "BACKLIGHT_CAPS_LOCK_INDICATOR_ROW_COL";
    LightingValue[LightingValue["BACKLIGHT_LAYER_1_INDICATOR_COLOR"] = 16] = "BACKLIGHT_LAYER_1_INDICATOR_COLOR";
    LightingValue[LightingValue["BACKLIGHT_LAYER_1_INDICATOR_ROW_COL"] = 17] = "BACKLIGHT_LAYER_1_INDICATOR_ROW_COL";
    LightingValue[LightingValue["BACKLIGHT_LAYER_2_INDICATOR_COLOR"] = 18] = "BACKLIGHT_LAYER_2_INDICATOR_COLOR";
    LightingValue[LightingValue["BACKLIGHT_LAYER_2_INDICATOR_ROW_COL"] = 19] = "BACKLIGHT_LAYER_2_INDICATOR_ROW_COL";
    LightingValue[LightingValue["BACKLIGHT_LAYER_3_INDICATOR_COLOR"] = 20] = "BACKLIGHT_LAYER_3_INDICATOR_COLOR";
    LightingValue[LightingValue["BACKLIGHT_LAYER_3_INDICATOR_ROW_COL"] = 21] = "BACKLIGHT_LAYER_3_INDICATOR_ROW_COL";
    LightingValue[LightingValue["BACKLIGHT_CUSTOM_COLOR"] = 23] = "BACKLIGHT_CUSTOM_COLOR";
    // QMK RGBLIGHT
    LightingValue[LightingValue["QMK_RGBLIGHT_BRIGHTNESS"] = 128] = "QMK_RGBLIGHT_BRIGHTNESS";
    LightingValue[LightingValue["QMK_RGBLIGHT_EFFECT"] = 129] = "QMK_RGBLIGHT_EFFECT";
    LightingValue[LightingValue["QMK_RGBLIGHT_EFFECT_SPEED"] = 130] = "QMK_RGBLIGHT_EFFECT_SPEED";
    LightingValue[LightingValue["QMK_RGBLIGHT_COLOR"] = 131] = "QMK_RGBLIGHT_COLOR";
})(LightingValue = exports.LightingValue || (exports.LightingValue = {}));
var LightingTypeDefinition;
(function (LightingTypeDefinition) {
    LightingTypeDefinition["None"] = "none";
    LightingTypeDefinition["QMKLighting"] = "qmk_backlight";
    LightingTypeDefinition["QMKRGBLight"] = "qmk_rgblight";
    LightingTypeDefinition["QMKBacklightRGBLight"] = "qmk_backlight_rgblight";
    LightingTypeDefinition["WTRGBBacklight"] = "wt_rgb_backlight";
    LightingTypeDefinition["WTMonoBacklight"] = "wt_mono_backlight";
})(LightingTypeDefinition = exports.LightingTypeDefinition || (exports.LightingTypeDefinition = {}));
var KeycodeType;
(function (KeycodeType) {
    KeycodeType["QMK"] = "qmk";
    KeycodeType["WT"] = "wt";
    KeycodeType["None"] = "none";
})(KeycodeType = exports.KeycodeType || (exports.KeycodeType = {}));
var CustomFeatures;
(function (CustomFeatures) {
    CustomFeatures["RotaryEncoder"] = "rotary-encoder";
})(CustomFeatures = exports.CustomFeatures || (exports.CustomFeatures = {}));
var KeyColorType;
(function (KeyColorType) {
    KeyColorType["Alpha"] = "alpha";
    KeyColorType["Mod"] = "mod";
    KeyColorType["Accent"] = "accent";
})(KeyColorType = exports.KeyColorType || (exports.KeyColorType = {}));
