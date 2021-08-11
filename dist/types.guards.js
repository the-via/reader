"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTypeVIADefinitionV3 = exports.isTypeVIADefinitionV2 = void 0;
function isTypeVIADefinitionV2(def) {
    return def.lighting !== undefined;
}
exports.isTypeVIADefinitionV2 = isTypeVIADefinitionV2;
function isTypeVIADefinitionV3(def) {
    return def.firmwareVersion !== undefined;
}
exports.isTypeVIADefinitionV3 = isTypeVIADefinitionV3;
