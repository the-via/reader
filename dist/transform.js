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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var kle_parser_1 = require("./kle-parser");
var keyboard_definition_validator_1 = __importDefault(require("./validated-types/keyboard-definition.validator"));
var keyboard_definition_v2_validator_1 = __importDefault(require("./validated-types/keyboard-definition-v2.validator"));
var lighting_presets_1 = require("./lighting-presets");
function getVendorProductId(_a) {
    var productId = _a.productId, vendorId = _a.vendorId;
    var parsedVendorId = parseInt(vendorId, 16);
    var parsedProductId = parseInt(productId, 16);
    return parsedVendorId * 65536 + parsedProductId;
}
exports.getVendorProductId = getVendorProductId;
function validateLayouts(layouts) {
    var _a = layouts.labels, labels = _a === void 0 ? [] : _a, keymap = layouts.keymap;
    var viaLayout = kle_parser_1.kleLayoutToVIALayout(keymap);
    var missingLabels = labels.filter(function (_, idx) {
        return viaLayout.optionKeys[idx] === undefined ||
            viaLayout.optionKeys[idx][0] === undefined;
    });
    if (missingLabels.length > 0) {
        throw new Error("The KLE is missing the group keys for: " + missingLabels.join(','));
    }
    return viaLayout;
}
exports.validateLayouts = validateLayouts;
function validateKeyBounds(matrix, layouts) {
    var rows = matrix.rows, cols = matrix.cols;
    var optionKeys = Object.values(layouts.optionKeys).flatMap(function (group) {
        return Object.values(group).flat();
    });
    var oobKeys = layouts.keys
        .concat(optionKeys)
        .filter(function (_a) {
        var row = _a.row, col = _a.col;
        return row >= rows || col >= cols;
    });
    if (oobKeys.length !== 0) {
        throw new Error("The following keys reference a row or column outside of dimension defined in the matrix property: " + oobKeys
            .map(function (_a) {
            var row = _a.row, col = _a.col;
            return "(" + row + "," + col + ")";
        })
            .join(','));
    }
}
exports.validateKeyBounds = validateKeyBounds;
function keyboardDefinitionV2ToVIADefinitionV2(definition) {
    var _a = keyboard_definition_v2_validator_1.default(definition), name = _a.name, customFeatures = _a.customFeatures, customMenus = _a.customMenus, customKeycodes = _a.customKeycodes, lighting = _a.lighting, matrix = _a.matrix, layouts = _a.layouts;
    validateLayouts(layouts);
    var keymap = layouts.keymap, partialLayout = __rest(layouts, ["keymap"]);
    var viaLayouts = __assign(__assign({}, partialLayout), kle_parser_1.kleLayoutToVIALayout(layouts.keymap));
    validateKeyBounds(matrix, viaLayouts);
    return {
        name: name,
        lighting: lighting,
        layouts: viaLayouts,
        matrix: matrix,
        customFeatures: customFeatures,
        customKeycodes: customKeycodes,
        customMenus: customMenus,
        vendorProductId: getVendorProductId(definition)
    };
}
exports.keyboardDefinitionV2ToVIADefinitionV2 = keyboardDefinitionV2ToVIADefinitionV2;
function getLightingDefinition(definition) {
    if (typeof definition === 'string') {
        return lighting_presets_1.LightingPreset[definition];
    }
    else {
        return __assign(__assign({}, lighting_presets_1.LightingPreset[definition.extends]), definition);
    }
}
exports.getLightingDefinition = getLightingDefinition;
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
function generateVIADefinitionV2LookupMap(definitions) {
    return definitions
        .map(keyboardDefinitionV2ToVIADefinitionV2)
        .reduce(function (p, n) {
        var _a;
        return (__assign(__assign({}, p), (_a = {}, _a[n.vendorProductId] = n, _a)));
    }, {});
}
exports.generateVIADefinitionV2LookupMap = generateVIADefinitionV2LookupMap;
