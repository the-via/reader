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
Object.defineProperty(exports, "__esModule", { value: true });
var layout_h_parser_1 = require("./src/layout-h-parser");
var fs = require('fs');
var all = require('./filtered.json');
var util = require('util');
var readFile = util.promisify(fs.readFile);
var path = '../qmk_firmware/keyboards/';
function processFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var processedFiles, failedFiles, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    processedFiles = [];
                    failedFiles = [];
                    _loop_1 = function (i) {
                        var f, _a, rows, cols, layout_1, name, e_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, readFile("" + path + all[i].folder + "/" + all[i].folder.split('/').reverse()[0] + ".h", 'utf8')];
                                case 1:
                                    f = _b.sent();
                                    _a = layout_h_parser_1.parseLayout(f), rows = _a.rows, cols = _a.cols, layout_1 = _a.layout, name = _a.name;
                                    if (layout_1.length === (all[i].layouts[name].layout || []).length) {
                                        fs.writeFileSync("./qmk_converted_json/" + all[i].name + ".json", JSON.stringify(__assign(__assign({}, all[i]), { matrix: { cols: cols, rows: rows }, layouts: all[i].layouts[name].layout.map(function (key, idx) { return (__assign(__assign({}, key), layout_1[idx])); }) }), null, 2));
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _b.sent();
                                    failedFiles.push("" + path + all[i].folder + "/" + all[i].folder.split('/').reverse()[0] + ".h");
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < all.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log(failedFiles);
                    return [2 /*return*/];
            }
        });
    });
}
processFiles();
