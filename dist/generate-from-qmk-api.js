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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var layout_h_parser_1 = require("./layout-h-parser");
var config_h_parser_1 = require("./config-h-parser");
var glob = __importStar(require("glob"));
var _1 = require(".");
var fs = require('fs');
var util = require('util');
var readFile = util.promisify(fs.readFile);
var qmkRepoPath = '../qmk_firmware/keyboards';
function transformQMKFiles(parsedLayout, infoJSON, config) {
    var rows = parsedLayout.rows, cols = parsedLayout.cols, layout = parsedLayout.layout, name = parsedLayout.name;
    var layouts = infoJSON.layouts, keyboard_name = infoJSON.keyboard_name, width = infoJSON.width, height = infoJSON.height;
    var infoJSONLayout = layouts[name].layout;
    var VENDOR_ID = config.VENDOR_ID, PRODUCT_ID = config.PRODUCT_ID;
    var vendorProductId = _1.getVendorProductId({
        vendorId: VENDOR_ID,
        productId: PRODUCT_ID
    });
    return {
        name: keyboard_name,
        matrix: { cols: cols, rows: rows },
        vendorProductId: vendorProductId,
        layouts: {
            width: width,
            height: height,
            keys: infoJSONLayout.map(function (key, idx) { return (__assign(__assign(__assign({}, key), layout[idx]), { label: undefined, r: 0, rx: 0, ry: 0, color: 'alpha', w: key.w || 1, h: key.h || 1 })); })
        }
    };
}
function generateVIADefinition(folder, skipExisting) {
    if (skipExisting === void 0) { skipExisting = false; }
    return __awaiter(this, void 0, void 0, function () {
        var layoutHFileName, infoJSONFileName, layoutH, configH, infoJSONFile, infoJSON, _a, layout, name, infoJSONLayout, config;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(folder);
                    if (skipExisting && fs.existsSync(folder + "/keymaps/via")) {
                        console.log('Skipping', folder);
                    }
                    layoutHFileName = folder + "/" + folder.split('/').reverse()[0] + ".h";
                    infoJSONFileName = folder + "/info.json";
                    return [4 /*yield*/, readFile(layoutHFileName, 'utf8')];
                case 1:
                    layoutH = _b.sent();
                    return [4 /*yield*/, readFile(folder + "/config.h", 'utf8')];
                case 2:
                    configH = _b.sent();
                    return [4 /*yield*/, readFile(infoJSONFileName, 'utf8')];
                case 3:
                    infoJSONFile = _b.sent();
                    infoJSON = JSON.parse(infoJSONFile);
                    _a = layout_h_parser_1.parseLayout(layoutH), layout = _a.layout, name = _a.name;
                    infoJSONLayout = infoJSON.layouts[name].layout;
                    config = config_h_parser_1.parseConfig(configH);
                    if (layout.length === infoJSONLayout.length) {
                        fs.writeFileSync("./qmk_converted_json/" + infoJSON.keyboard_name + ".json", JSON.stringify(transformQMKFiles(layout_h_parser_1.parseLayout(layoutH), infoJSON, config), null, 2));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function processFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var paths, folders, failedFiles, i, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paths = glob.sync(qmkRepoPath + "/**/info.json", { absolute: true });
                    folders = paths.map(function (path) { return path.replace(/\/info\.json$/, ''); });
                    failedFiles = [];
                    if (!fs.existsSync('qmk_converted_json')) {
                        fs.mkdirSync('qmk_converted_json');
                    }
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < folders.length)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, generateVIADefinition(folders[i])];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    if (folders[i].indexOf('prophet') !== -1) {
                        failedFiles.push([
                            e_1,
                            folders[i] + "/" + folders[i].split('/').reverse()[0] + ".h"
                        ]);
                    }
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log(failedFiles);
                    return [2 /*return*/];
            }
        });
    });
}
processFiles();
