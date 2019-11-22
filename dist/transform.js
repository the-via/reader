"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var kle_parser_1 = require("./kle-parser");
var keyboard_definition_validator_1 = __importDefault(require("./keyboard.definition.validator"));
function getVendorProductId(_a) {
    var productId = _a.productId, vendorId = _a.vendorId;
    var parsedVendorId = parseInt(vendorId, 16);
    var parsedProductId = parseInt(productId, 16);
    return parsedVendorId * 65536 + parsedProductId;
}
exports.getVendorProductId = getVendorProductId;
function keyboardDefinitionToVIADefinition(definition) {
    var _a = keyboard_definition_validator_1.default(definition), name = _a.name, lighting = _a.lighting, matrix = _a.matrix;
    var layouts = Object.entries(definition.layouts).reduce(function (p, _a) {
        var _b;
        var k = _a[0], v = _a[1];
        return (__assign(__assign({}, p), (_b = {}, _b[k] = kle_parser_1.kleLayoutToVIALayout(v), _b)));
    }, {});
    return {
        name: name,
        lighting: lighting,
        layouts: layouts,
        matrix: matrix,
        vendorProductId: getVendorProductId(definition)
    };
}
exports.keyboardDefinitionToVIADefinition = keyboardDefinitionToVIADefinition;
function generateVIADefinitionLookupMap(definitions) {
    return definitions
        .map(keyboardDefinitionToVIADefinition)
        .reduce(function (p, n) {
        var _a;
        return (__assign(__assign({}, p), (_a = {}, _a[n.vendorProductId] = n, _a)));
    }, {});
}
exports.generateVIADefinitionLookupMap = generateVIADefinitionLookupMap;
