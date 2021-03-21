"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var MenuId;
(function (MenuId) {
    MenuId["Basic"] = "basic";
    MenuId["Lighting"] = "lighting";
    MenuId["Media"] = "media";
    MenuId["Macro"] = "macro";
    MenuId["Layers"] = "layers";
    MenuId["Special"] = "special";
    MenuId["Custom"] = "custom";
})(MenuId = exports.MenuId || (exports.MenuId = {}));
var BuiltInKeycodeModule;
(function (BuiltInKeycodeModule) {
    BuiltInKeycodeModule["Default"] = "via/keycodes";
    BuiltInKeycodeModule["QMKLighting"] = "core/keycodes/qmk_lighting";
})(BuiltInKeycodeModule = exports.BuiltInKeycodeModule || (exports.BuiltInKeycodeModule = {}));
var KeyColorType;
(function (KeyColorType) {
    KeyColorType["Alpha"] = "alpha";
    KeyColorType["Mod"] = "mod";
    KeyColorType["Accent"] = "accent";
})(KeyColorType = exports.KeyColorType || (exports.KeyColorType = {}));
