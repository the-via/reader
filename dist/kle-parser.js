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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant = require('invariant');
var util = require('util');
var types_1 = require("./types");
function rawKLEToKLELayout(kle) {
    var kleArr = kle.split(',\n');
    return kleArr.map(function (row) {
        return JSON.parse(row
            .replace(/\n/g, '\\n')
            .replace(/\\/g, '\\\\')
            .replace(/\"\\(?!,)/g, '\\\\')
            .replace(/([{,])([A-Za-z][0-9A-Za-z]?)(:)/g, '$1"$2"$3'));
    });
}
exports.rawKLEToKLELayout = rawKLEToKLELayout;
function filterGroups(keys) {
    // Currently extract out non x,0 groups i.e. always choose the first option
    return keys.filter(function (key) { return key.group.option === 0; });
}
exports.filterGroups = filterGroups;
// Finds the closest to the top-left corner
function findPivot(keys) {
    return __spreadArrays(keys).sort(function (a, b) {
        var yDiff = a.y - b.y;
        return yDiff !== 0 ? yDiff : a.x - b.x;
    })[0];
}
exports.findPivot = findPivot;
function calculateDelta(a, b) {
    // Find the left corner which can be modified by x2, y2
    var _a = [a.x2, a.y2, b.x2, b.y2], _b = _a[0], aX2 = _b === void 0 ? 0 : _b, _c = _a[1], aY2 = _c === void 0 ? 0 : _c, _d = _a[2], bX2 = _d === void 0 ? 0 : _d, _e = _a[3], bY2 = _e === void 0 ? 0 : _e;
    return {
        x: b.x - a.x + Math.min(0, bX2) - Math.min(0, aX2),
        y: b.y - a.y + Math.min(0, bY2) - Math.min(0, aY2)
    };
}
function getBoundingBox(key) {
    var _a = key.x2, x2 = _a === void 0 ? 0 : _a, _b = key.y2, y2 = _b === void 0 ? 0 : _b, x = key.x, y = key.y, _c = key.w, w = _c === void 0 ? 1 : _c, _d = key.h, h = _d === void 0 ? 1 : _d, _e = key.r, r = _e === void 0 ? 0 : _e, _f = key.rx, rx = _f === void 0 ? 0 : _f, _g = key.ry, ry = _g === void 0 ? 0 : _g;
    var _h = key.h2, h2 = _h === void 0 ? h : _h, _j = key.w2, w2 = _j === void 0 ? w : _j;
    var extraArgs = [rx, ry, r];
    var box = {
        xStart: Math.min(x, x + x2),
        yStart: Math.min(y, y + y2),
        xEnd: Math.max(x + w, x + x2 + w2),
        yEnd: Math.max(y + h, y + y2 + h2)
    };
    var rotatedPoints = [
        { x: box.xStart, y: box.yStart },
        { x: box.xEnd, y: box.yStart },
        { x: box.xStart, y: box.yEnd },
        { x: box.xEnd, y: box.yEnd }
    ].map(function (p) { return applyRotation.apply(void 0, __spreadArrays([p.x, p.y], extraArgs)); });
    return {
        xStart: Math.min.apply(Math, rotatedPoints.map(function (p) { return p.x; })),
        xEnd: Math.max.apply(Math, rotatedPoints.map(function (p) { return p.x; })),
        yStart: Math.min.apply(Math, rotatedPoints.map(function (p) { return p.y; })),
        yEnd: Math.max.apply(Math, rotatedPoints.map(function (p) { return p.y; }))
    };
}
function applyRotation(x, y, xOrigin, yOrigin, rotation) {
    var rad = (rotation * Math.PI) / 180;
    var _a = [x - xOrigin, y - yOrigin], normX = _a[0], normY = _a[1];
    return {
        x: xOrigin + normX * Math.cos(rad) - normY * Math.sin(rad),
        y: yOrigin + normX * Math.sin(rad) + normY * Math.cos(rad)
    };
}
function extractGroups(keys, origin, colorMap) {
    var groups = keys.filter(function (key) { return key.group.key !== -1; });
    var groupedKeys = groups.reduce(function (p, n) {
        var _a, _b;
        return (__assign(__assign({}, p), (_a = {}, _a[n.group.key] = __assign(__assign({}, (p[n.group.key] || {})), (_b = {}, _b[n.group.option] = ((p[n.group.key] || {})[n.group.option] || []).concat(n), _b)), _a)));
    }, {});
    // We need two pivots in order to calculate the true placement
    // 1. The option 0 pivot + the option n pivot for the rest of them
    return Object.entries(groupedKeys).reduce(function (p, _a) {
        var _b;
        var group = _a[0], options = _a[1];
        var zeroPivot = findPivot(options[0]);
        var normalizedOptions = Object.entries(options).reduce(function (p, _a) {
            var _b;
            var option = _a[0], results = _a[1];
            return (__assign(__assign({}, p), (_b = {}, _b[option] = (function (delta) {
                return results.map(function (res) { return (__assign(__assign({}, res), { x: res.x - delta.x, y: res.y - delta.y })); });
            })(calculateDelta(zeroPivot, findPivot(results)))
                .filter(function (r) { return !r.d; }) // Remove decal keys
                .map(function (r) { return resultToVIAKey(r, origin, colorMap); }) // Resolve key colors and normalize position using origin
            , _b)));
        }, p);
        return __assign(__assign({}, p), (_b = {}, _b[group] = normalizedOptions, _b));
    }, {});
}
exports.extractGroups = extractGroups;
// Expects pairs to be in the format "x,y" else throws exception
function extractPair(pair) {
    var arr = pair.split(/[，,]/);
    invariant(arr.length === 2, pair + " is not a pair");
    var numArr = arr.map(function (v) { return parseInt(v, 10); });
    if (numArr.some(function (num) { return Number.isNaN(num); })) {
        throw Error("Invalid pair: " + pair);
    }
    return numArr;
}
function resultToVIAKey(result, delta, colorMap) {
    var c = result.c, d = result.d, t = result.t, group = result.group, partialKey = __rest(result, ["c", "d", "t", "group"]);
    return __assign(__assign({}, partialKey), { x: result.x - delta.x, y: result.y - delta.y, rx: result.rx - delta.x, ry: result.ry - delta.y, color: colorMap[c + ":" + t] || types_1.KeyColorType.Alpha });
}
function kleLayoutToVIALayout(kle) {
    var _a;
    var filteredKLE = kle.filter(function (elem) { return Array.isArray(elem); });
    var parsedKLE = filteredKLE.reduce(function (prev, kle) {
        var parsedRow = kle.reduce(function (_a, n) {
            var _b;
            var _c = _a.cursor, x = _c.x, y = _c.y, res = _a.res, c = _a.c, h = _a.h, t = _a.t, r = _a.r, d = _a.d, rx = _a.rx, ry = _a.ry, w = _a.w, y2 = _a.y2, x2 = _a.x2, w2 = _a.w2, h2 = _a.h2, colorCount = _a.colorCount;
            // Check if object and apply formatting
            if (typeof n !== 'string') {
                var obj = {
                    colorCount: colorCount,
                    c: c,
                    t: t,
                    h: h,
                    r: r,
                    rx: rx,
                    ry: ry,
                    res: res,
                    d: d,
                    w: w,
                    cursor: { x: x, y: y }
                };
                obj = ['y2', 'x2', 'w2', 'h2', 'r', 'rx', 'ry', 'h', 'w'].reduce(function (p, prop) {
                    var _a;
                    return typeof n[prop] === 'number' ? __assign(__assign({}, p), (_a = {}, _a[prop] = n[prop], _a)) : p;
                }, obj);
                if (typeof n.d === 'boolean') {
                    obj = __assign(__assign({}, obj), { d: n.d });
                }
                if (typeof n.ry === 'number' || typeof n.rx === 'number') {
                    obj = __assign(__assign({}, obj), { cursor: __assign(__assign({}, obj.cursor), { y: obj.ry }) });
                }
                if (typeof n.y === 'number') {
                    obj = __assign(__assign({}, obj), { cursor: __assign(__assign({}, obj.cursor), { y: obj.cursor.y + n.y }) });
                }
                if (typeof n.x === 'number') {
                    obj = __assign(__assign({}, obj), { cursor: __assign(__assign({}, obj.cursor), { x: x + n.x }) });
                }
                if (typeof n.c === 'string') {
                    obj = __assign(__assign({}, obj), { c: n.c });
                }
                if (typeof n.t === 'string') {
                    obj = __assign(__assign({}, obj), { t: n.t });
                }
                return obj;
            }
            else if (typeof n === 'string') {
                var colorCountKey = c + ":" + t;
                var labels = n.split('\n');
                var _d = extractPair(labels[0]), row = _d[0], col = _d[1];
                var groupLabel = labels[3] || '-1,0';
                var _e = extractPair(groupLabel), group = _e[0], option = _e[1];
                var newColorCount = __assign(__assign({}, colorCount), (_b = {}, _b[colorCountKey] = colorCount[colorCountKey] === undefined
                    ? 1
                    : colorCount[colorCountKey] + 1, _b));
                var currKey = {
                    c: c,
                    t: t,
                    row: row,
                    col: col,
                    x: x + rx,
                    y: y,
                    r: r,
                    rx: rx,
                    ry: ry,
                    d: d,
                    h: h,
                    w: w,
                    w2: w2,
                    y2: y2,
                    x2: x2,
                    h2: h2,
                    group: {
                        key: group,
                        option: option
                    }
                };
                // Reset carry properties
                return {
                    h: 1,
                    w: 1,
                    r: r,
                    rx: rx,
                    ry: ry,
                    c: c,
                    d: false,
                    colorCount: newColorCount,
                    t: t,
                    cursor: { x: x + w, y: y },
                    res: __spreadArrays(res, [currKey])
                };
            }
            return {
                c: c,
                t: t,
                h: h,
                d: d,
                r: r,
                w: w,
                rx: rx,
                ry: ry,
                res: res,
                colorCount: colorCount,
                cursor: { x: x, y: y }
            };
        }, __assign(__assign({}, prev.prevRow), { cursor: prev.cursor, colorCount: prev.colorCount, h: 1, w: 1, d: false, res: [] }));
        return {
            cursor: { x: 0, y: parsedRow.cursor.y + 1 },
            colorCount: parsedRow.colorCount,
            prevRow: {
                c: parsedRow.c,
                t: parsedRow.t,
                r: parsedRow.r,
                rx: parsedRow.rx,
                ry: parsedRow.ry
            },
            res: __spreadArrays(prev.res, [parsedRow.res])
        };
    }, {
        cursor: { x: 0, y: 0 },
        prevRow: { c: '#cccccc', t: '#000000', r: 0, rx: 0, ry: 0 },
        res: [],
        colorCount: {}
    });
    var colorCount = parsedKLE.colorCount, res = parsedKLE.res;
    var colorCountKeys = Object.keys(colorCount);
    colorCountKeys.sort(function (a, b) { return colorCount[b] - colorCount[a]; });
    if (colorCountKeys.length > 3) {
        throw new Error('Please correct layout, too many colors:' +
            '\n' +
            util.inspect(colorCount, false, null, true));
    }
    var colorMap = (_a = {},
        _a[colorCountKeys[0]] = types_1.KeyColorType.Alpha,
        _a[colorCountKeys[1]] = types_1.KeyColorType.Mod,
        _a[colorCountKeys[2]] = types_1.KeyColorType.Accent,
        _a);
    var flatRes = res.flat();
    var defaultRes = filterGroups(flatRes);
    var boundingBoxes = defaultRes.map(getBoundingBox);
    var minX = Math.min.apply(Math, boundingBoxes.map(function (b) { return b.xStart; }));
    var minY = Math.min.apply(Math, boundingBoxes.map(function (b) { return b.yStart; }));
    var width = Math.max.apply(Math, boundingBoxes.map(function (b) { return b.xEnd; })) - minX;
    var height = Math.max.apply(Math, boundingBoxes.map(function (b) { return b.yEnd; })) - minY;
    var keys = defaultRes
        .filter(function (k) { return k.group.key === -1 && !k.d; }) // Remove option keys and decals
        .map(function (k) { return resultToVIAKey(k, { x: minX, y: minY }, colorMap); });
    var optionKeys = extractGroups(flatRes, { x: minX, y: minY }, colorMap);
    return { width: width, height: height, optionKeys: optionKeys, keys: keys };
}
exports.kleLayoutToVIALayout = kleLayoutToVIALayout;
