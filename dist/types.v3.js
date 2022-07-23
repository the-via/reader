"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMenus = exports.BuiltInMenuModule = exports.defaultKeycodes = exports.BuiltInKeycodeModule = void 0;
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
    BuiltInMenuModule["Macros"] = "via/macros";
    BuiltInMenuModule["SaveLoad"] = "via/save_load";
})(BuiltInMenuModule = exports.BuiltInMenuModule || (exports.BuiltInMenuModule = {}));
exports.defaultMenus = [
    BuiltInMenuModule.Keymap,
    BuiltInMenuModule.Macros,
    BuiltInMenuModule.SaveLoad,
];
