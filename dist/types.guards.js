"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVIAMenu = exports.isBuiltInKeycodeModule = void 0;
var types_v3_1 = require("./types.v3");
function isBuiltInKeycodeModule(value) {
    return Object.values(types_v3_1.BuiltInKeycodeModule).includes(value);
}
exports.isBuiltInKeycodeModule = isBuiltInKeycodeModule;
function isVIAMenu(value) {
    var viaMenu = value;
    return viaMenu.label !== undefined && viaMenu.content !== undefined;
}
exports.isVIAMenu = isVIAMenu;
