"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LightingValue;
(function (LightingValue) {
    LightingValue[LightingValue["USE_SPLIT_BACKSPACE"] = 1] = "USE_SPLIT_BACKSPACE";
    LightingValue[LightingValue["USE_SPLIT_LEFT_SHIFT"] = 2] = "USE_SPLIT_LEFT_SHIFT";
    LightingValue[LightingValue["USE_SPLIT_RIGHT_SHIFT"] = 3] = "USE_SPLIT_RIGHT_SHIFT";
    LightingValue[LightingValue["USE_7U_SPACEBAR"] = 4] = "USE_7U_SPACEBAR";
    LightingValue[LightingValue["USE_ISO_ENTER"] = 5] = "USE_ISO_ENTER";
    LightingValue[LightingValue["DISABLE_HHKB_BLOCKER_LEDS"] = 6] = "DISABLE_HHKB_BLOCKER_LEDS";
    LightingValue[LightingValue["DISABLE_WHEN_USB_SUSPENDED"] = 7] = "DISABLE_WHEN_USB_SUSPENDED";
    LightingValue[LightingValue["DISABLE_AFTER_TIMEOUT"] = 8] = "DISABLE_AFTER_TIMEOUT";
    LightingValue[LightingValue["BRIGHTNESS"] = 9] = "BRIGHTNESS";
    LightingValue[LightingValue["EFFECT"] = 10] = "EFFECT";
    LightingValue[LightingValue["EFFECT_SPEED"] = 11] = "EFFECT_SPEED";
    LightingValue[LightingValue["COLOR_1"] = 12] = "COLOR_1";
    LightingValue[LightingValue["COLOR_2"] = 13] = "COLOR_2";
    LightingValue[LightingValue["CAPS_LOCK_INDICATOR_COLOR"] = 14] = "CAPS_LOCK_INDICATOR_COLOR";
    LightingValue[LightingValue["CAPS_LOCK_INDICATOR_ROW_COL"] = 15] = "CAPS_LOCK_INDICATOR_ROW_COL";
    LightingValue[LightingValue["LAYER_1_INDICATOR_COLOR"] = 16] = "LAYER_1_INDICATOR_COLOR";
    LightingValue[LightingValue["LAYER_1_INDICATOR_ROW_COL"] = 17] = "LAYER_1_INDICATOR_ROW_COL";
    LightingValue[LightingValue["LAYER_2_INDICATOR_COLOR"] = 18] = "LAYER_2_INDICATOR_COLOR";
    LightingValue[LightingValue["LAYER_2_INDICATOR_ROW_COL"] = 19] = "LAYER_2_INDICATOR_ROW_COL";
    LightingValue[LightingValue["LAYER_3_INDICATOR_COLOR"] = 20] = "LAYER_3_INDICATOR_COLOR";
    LightingValue[LightingValue["LAYER_3_INDICATOR_ROW_COL"] = 21] = "LAYER_3_INDICATOR_ROW_COL";
    LightingValue[LightingValue["CUSTOM_COLOR"] = 23] = "CUSTOM_COLOR";
})(LightingValue = exports.LightingValue || (exports.LightingValue = {}));
var LightingTypeDefinition;
(function (LightingTypeDefinition) {
    LightingTypeDefinition["None"] = "none";
    LightingTypeDefinition["QMKLighting"] = "qmk_backlight";
    LightingTypeDefinition["QMKUnderglow"] = "qmk_underglow";
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
