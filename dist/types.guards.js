"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVIAMenu = void 0;
function isVIAMenu(value) {
    var viaMenu = value;
    return viaMenu.label !== undefined && viaMenu.content !== undefined;
}
exports.isVIAMenu = isVIAMenu;
