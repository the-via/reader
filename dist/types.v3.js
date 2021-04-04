"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeycodeType;
(function (KeycodeType) {
    KeycodeType["QMK"] = "qmk";
    KeycodeType["WT"] = "wt";
    KeycodeType["None"] = "none";
})(KeycodeType = exports.KeycodeType || (exports.KeycodeType = {}));
var BuiltInKeycodeModule;
(function (BuiltInKeycodeModule) {
    BuiltInKeycodeModule["VIAKeycodes"] = "via/keycodes";
    BuiltInKeycodeModule["QMKLighting"] = "via/qmk_lighting";
    BuiltInKeycodeModule["WTLighting"] = "via/wt_lighting";
})(BuiltInKeycodeModule = exports.BuiltInKeycodeModule || (exports.BuiltInKeycodeModule = {}));
exports.defaultKeycodes = [
    BuiltInKeycodeModule.VIAKeycodes,
];
var BuiltInMenuModule;
(function (BuiltInMenuModule) {
    BuiltInMenuModule["Keymap"] = "via/keymap";
    BuiltInMenuModule["Layouts"] = "via/layouts";
    BuiltInMenuModule["Macros"] = "via/macros";
    BuiltInMenuModule["SaveLoad"] = "via/save_load";
})(BuiltInMenuModule = exports.BuiltInMenuModule || (exports.BuiltInMenuModule = {}));
exports.defaultMenus = [
    BuiltInMenuModule.Keymap,
    BuiltInMenuModule.Layouts,
    BuiltInMenuModule.Macros,
    BuiltInMenuModule.SaveLoad,
];
var KeyColorType;
(function (KeyColorType) {
    KeyColorType["Alpha"] = "alpha";
    KeyColorType["Mod"] = "mod";
    KeyColorType["Accent"] = "accent";
})(KeyColorType = exports.KeyColorType || (exports.KeyColorType = {}));
