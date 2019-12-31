"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BacklightConfig;
(function (BacklightConfig) {
    BacklightConfig[BacklightConfig["USE_SPLIT_BACKSPACE"] = 1] = "USE_SPLIT_BACKSPACE";
    BacklightConfig[BacklightConfig["USE_SPLIT_LEFT_SHIFT"] = 2] = "USE_SPLIT_LEFT_SHIFT";
    BacklightConfig[BacklightConfig["USE_SPLIT_RIGHT_SHIFT"] = 3] = "USE_SPLIT_RIGHT_SHIFT";
    BacklightConfig[BacklightConfig["USE_7U_SPACEBAR"] = 4] = "USE_7U_SPACEBAR";
    BacklightConfig[BacklightConfig["USE_ISO_ENTER"] = 5] = "USE_ISO_ENTER";
    BacklightConfig[BacklightConfig["DISABLE_HHKB_BLOCKER_LEDS"] = 6] = "DISABLE_HHKB_BLOCKER_LEDS";
    BacklightConfig[BacklightConfig["DISABLE_WHEN_USB_SUSPENDED"] = 7] = "DISABLE_WHEN_USB_SUSPENDED";
    BacklightConfig[BacklightConfig["DISABLE_AFTER_TIMEOUT"] = 8] = "DISABLE_AFTER_TIMEOUT";
    BacklightConfig[BacklightConfig["BRIGHTNESS"] = 9] = "BRIGHTNESS";
    BacklightConfig[BacklightConfig["EFFECT"] = 10] = "EFFECT";
    BacklightConfig[BacklightConfig["EFFECT_SPEED"] = 11] = "EFFECT_SPEED";
    BacklightConfig[BacklightConfig["COLOR_1"] = 12] = "COLOR_1";
    BacklightConfig[BacklightConfig["COLOR_2"] = 13] = "COLOR_2";
    BacklightConfig[BacklightConfig["CAPS_LOCK_INDICATOR_COLOR"] = 14] = "CAPS_LOCK_INDICATOR_COLOR";
    BacklightConfig[BacklightConfig["CAPS_LOCK_INDICATOR_ROW_COL"] = 15] = "CAPS_LOCK_INDICATOR_ROW_COL";
    BacklightConfig[BacklightConfig["LAYER_1_INDICATOR_COLOR"] = 16] = "LAYER_1_INDICATOR_COLOR";
    BacklightConfig[BacklightConfig["LAYER_1_INDICATOR_ROW_COL"] = 17] = "LAYER_1_INDICATOR_ROW_COL";
    BacklightConfig[BacklightConfig["LAYER_2_INDICATOR_COLOR"] = 18] = "LAYER_2_INDICATOR_COLOR";
    BacklightConfig[BacklightConfig["LAYER_2_INDICATOR_ROW_COL"] = 19] = "LAYER_2_INDICATOR_ROW_COL";
    BacklightConfig[BacklightConfig["LAYER_3_INDICATOR_COLOR"] = 20] = "LAYER_3_INDICATOR_COLOR";
    BacklightConfig[BacklightConfig["LAYER_3_INDICATOR_ROW_COL"] = 21] = "LAYER_3_INDICATOR_ROW_COL";
    BacklightConfig[BacklightConfig["CUSTOM_COLOR"] = 23] = "CUSTOM_COLOR";
})(BacklightConfig = exports.BacklightConfig || (exports.BacklightConfig = {}));
var LightingTypeDefinition;
(function (LightingTypeDefinition) {
    LightingTypeDefinition["None"] = "none";
    LightingTypeDefinition["QMKLighting"] = "qmk_backlight";
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
