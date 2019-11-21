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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function parseKLE(kle) {
    var kleArr = kle.split(',\n');
    return kleArr.map(function (row) {
        return JSON.parse(row
            .replace(/\n/g, '\\n')
            .replace(/\\/g, '\\\\')
            .replace(/\"\\(?!,)/g, '\\\\')
            .replace(/([{,])([A-Za-z][0-9A-Za-z]?)(:)/g, '$1"$2"$3'));
    });
}
exports.parseKLE = parseKLE;
function generateParsedKLE(kle) {
    var _a;
    var parsedKLE = kle.reduce(function (prev, kle) {
        var parsedRow = kle.reduce(function (_a, n) {
            var _b;
            var _c = _a.cursor, x = _c.x, y = _c.y, size = _a.size, marginX = _a.marginX, marginY = _a.marginY, res = _a.res, c = _a.c, h = _a.h, t = _a.t, r = _a.r, rx = _a.rx, ry = _a.ry, colorCount = _a.colorCount;
            // Check if object and apply formatting
            if (typeof n !== 'string') {
                var obj = {
                    size: size,
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
                    cursor: { x: x, y: y }
                };
                if (n.w > 1) {
                    obj = __assign(__assign({}, obj), { size: 100 * n.w });
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
                var _d = n.split(',').map(function (num) { return parseInt(num, 10); }), row = _d[0], col = _d[1];
                var newColorCount = __assign(__assign({}, colorCount), (_b = {}, _b[colorCountKey] = colorCount[colorCountKey] === undefined
                    ? 1
                    : colorCount[colorCountKey] + 1, _b));
                var currKey = {
                    c: c,
                    t: t,
                    size: size,
                    marginX: marginX,
                    marginY: marginY,
                    row: row,
                    col: col,
                    x: x,
                    y: y,
                    r: r,
                    rx: rx,
                    ry: ry,
                    h: h,
                    w: size / 100
                };
                // Reset carry properties
                return {
                    marginX: 0,
                    marginY: marginY,
                    size: 100,
                    h: 1,
                    c: c,
                    colorCount: newColorCount,
                    t: t,
                    r: 0,
                    rx: 0,
                    ry: 0,
                    cursor: { x: x + size / 100, y: y },
                    res: __spreadArrays(res, [currKey])
                };
            }
            return {
                marginX: marginX,
                marginY: marginY,
                size: size,
                c: c,
                t: t,
                h: h,
                r: r,
                rx: rx,
                ry: ry,
                res: res,
                colorCount: colorCount,
                cursor: { x: x, y: y }
            };
        }, __assign(__assign({}, prev.prevFormatting), { cursor: prev.cursor, colorCount: prev.colorCount, marginX: 0, marginY: 0, size: 100, h: 1, r: 0, rx: 0, ry: 0, res: [] }));
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
        _a[colorCountKeys[0]] = 'alpha',
        _a[colorCountKeys[1]] = 'mod',
        _a[colorCountKeys[2]] = 'accent',
        _a);
    var flatRes = res.flat();
    var xKeys = flatRes.map(function (k) { return k.x; });
    var yKeys = flatRes.map(function (k) { return k.y; });
    var minX = Math.min.apply(Math, xKeys);
    var minY = Math.min.apply(Math, yKeys);
    var width = Math.max.apply(Math, flatRes.map(function (k) { return k.x + k.w; })) - minX;
    var height = Math.max.apply(Math, yKeys) + 1 - minY;
    var keys = flatRes.map(function (k) { return (__assign(__assign({}, k), { c: undefined, t: undefined, label: undefined, size: undefined, marginX: undefined, marginY: undefined, x: k.x - minX, y: k.y - minY, color: colorMap[k.c + ":" + k.t] || 'alpha' })); });
    return { width: width, height: height, keys: keys };
}
exports.generateParsedKLE = generateParsedKLE;
