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
    return {
        x: b.x - a.x,
        y: b.y - a.y
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
    var c = result.c, d = result.d, t = result.t, group = result.group, marginX = result.marginX, marginY = result.marginY, partialKey = __rest(result, ["c", "d", "t", "group", "marginX", "marginY"]);
    return __assign(__assign({}, partialKey), { x: result.x - delta.x, y: result.y - delta.y, color: colorMap[c + ":" + t] || types_1.KeyColorType.Alpha });
}
function kleLayoutToVIALayout(kle) {
    var _a;
    var filteredKLE = kle.filter(function (elem) { return Array.isArray(elem); });
    var parsedKLE = filteredKLE.reduce(function (prev, kle) {
        var parsedRow = kle.reduce(function (_a, n) {
            var _b;
            var _c = _a.cursor, x = _c.x, y = _c.y, marginX = _a.marginX, marginY = _a.marginY, res = _a.res, c = _a.c, h = _a.h, t = _a.t, r = _a.r, d = _a.d, rx = _a.rx, ry = _a.ry, w = _a.w, colorCount = _a.colorCount;
            // Check if object and apply formatting
            if (typeof n !== 'string') {
                var obj = {
                    marginX: marginX,
                    marginY: marginY,
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
                if (typeof n.d === 'boolean') {
                    obj = __assign(__assign({}, obj), { d: n.d });
                }
                if (typeof n.w === 'number') {
                    obj = __assign(__assign({}, obj), { w: n.w });
                }
                if (typeof n.y === 'number') {
                    obj = __assign(__assign({}, obj), { marginY: 100 * n.y, cursor: __assign(__assign({}, obj.cursor), { y: y + n.y }) });
                }
                if (typeof n.x === 'number') {
                    obj = __assign(__assign({}, obj), { marginX: 100 * n.x, cursor: __assign(__assign({}, obj.cursor), { x: x + n.x }) });
                }
                if (typeof n.r === 'number') {
                    obj = __assign(__assign({}, obj), { r: n.r });
                }
                if (typeof n.rx === 'number') {
                    obj = __assign(__assign({}, obj), { rx: n.rx });
                }
                if (typeof n.h === 'number') {
                    obj = __assign(__assign({}, obj), { h: n.h });
                }
                if (typeof n.ry === 'number') {
                    obj = __assign(__assign({}, obj), { ry: n.ry });
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
                    marginX: marginX,
                    marginY: marginY,
                    row: row,
                    col: col,
                    x: x,
                    y: y,
                    r: r,
                    rx: rx,
                    ry: ry,
                    d: d,
                    h: h,
                    w: w,
                    group: {
                        key: group,
                        option: option
                    }
                };
                // Reset carry properties
                return {
                    marginX: 0,
                    marginY: marginY,
                    h: 1,
                    w: 1,
                    c: c,
                    d: false,
                    colorCount: newColorCount,
                    t: t,
                    r: 0,
                    rx: 0,
                    ry: 0,
                    cursor: { x: x + w, y: y },
                    res: __spreadArrays(res, [currKey])
                };
            }
            return {
                marginX: marginX,
                marginY: marginY,
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
        }, __assign(__assign({}, prev.prevFormatting), { cursor: prev.cursor, colorCount: prev.colorCount, marginX: 0, marginY: 0, h: 1, r: 0, rx: 0, ry: 0, w: 1, d: false, res: [] }));
        return {
            cursor: { x: 0, y: parsedRow.cursor.y + 1 },
            colorCount: parsedRow.colorCount,
            prevFormatting: { c: parsedRow.c, t: parsedRow.t },
            res: __spreadArrays(prev.res, [parsedRow.res])
        };
    }, {
        cursor: { x: 0, y: 0 },
        prevFormatting: { c: '#f5f5f5', t: '#444444' },
        res: [],
        colorCount: {}
    });
    var colorCount = parsedKLE.colorCount, res = parsedKLE.res;
    var colorCountKeys = Object.keys(colorCount);
    colorCountKeys.sort(function (a, b) { return colorCount[b] - colorCount[a]; });
    if (colorCountKeys.length > 3) {
        console.error('Please correct layout:', parsedKLE);
    }
    var colorMap = (_a = {},
        _a[colorCountKeys[0]] = types_1.KeyColorType.Alpha,
        _a[colorCountKeys[1]] = types_1.KeyColorType.Mod,
        _a[colorCountKeys[2]] = types_1.KeyColorType.Accent,
        _a);
    var flatRes = res.flat();
    var defaultRes = filterGroups(flatRes);
    var xKeys = defaultRes.map(function (k) { return k.x; });
    var yKeys = defaultRes.map(function (k) { return k.y; });
    var minX = Math.min.apply(Math, xKeys);
    var minY = Math.min.apply(Math, yKeys);
    var width = Math.max.apply(Math, defaultRes.map(function (k) { return k.x + k.w; })) - minX;
    var height = Math.max.apply(Math, yKeys) + 1 - minY;
    var keys = defaultRes
        .filter(function (k) { return k.group.key === -1 && !k.d; }) // Remove option keys and decals
        .map(function (k) { return resultToVIAKey(k, { x: minX, y: minY }, colorMap); });
    var optionKeys = extractGroups(flatRes, { x: minX, y: minY }, colorMap);
    return { width: width, height: height, optionKeys: optionKeys, keys: keys };
}
exports.kleLayoutToVIALayout = kleLayoutToVIALayout;
