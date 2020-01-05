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
var LS;
(function (LS) {
    LS[LS["START"] = 1] = "START";
    LS[LS["DEFINE"] = 2] = "DEFINE";
    LS[LS["LAYOUT1D_START"] = 3] = "LAYOUT1D_START";
    LS[LS["LAYOUT1D_END"] = 4] = "LAYOUT1D_END";
    LS[LS["LAYOUT2D_START"] = 5] = "LAYOUT2D_START";
    LS[LS["LAYOUT2D_ROW_START"] = 6] = "LAYOUT2D_ROW_START";
    LS[LS["LAYOUT2D_COL_START"] = 7] = "LAYOUT2D_COL_START";
    LS[LS["LAYOUT2D_COL_CONTINUE"] = 8] = "LAYOUT2D_COL_CONTINUE";
    LS[LS["LAYOUT2D_COL_END"] = 9] = "LAYOUT2D_COL_END";
    LS[LS["LAYOUT2D_ROW_END"] = 10] = "LAYOUT2D_ROW_END";
    LS[LS["LAYOUT2D_END"] = 11] = "LAYOUT2D_END";
    LS[LS["SKIP"] = 12] = "SKIP";
})(LS || (LS = {}));
function error(state, nextToken) {
    console.error('Current State', state, 'Next: ', nextToken);
}
function tokenizer(state, next) {
    var tnext = next.trim();
    var prev = state.prev, res = state.res;
    // skip empty strings
    if (tnext === '') {
        return state;
    }
    if (prev === LS.SKIP) {
        return state;
    }
    if (prev === LS.LAYOUT2D_ROW_END) {
        return state;
    }
    if (prev === LS.START) {
        // skip
        if (tnext === '#define') {
            return __assign(__assign({}, state), { prev: LS.DEFINE });
        }
        return __assign({}, state);
    }
    else if (prev === LS.DEFINE) {
        var parenIdx = tnext.indexOf('(');
        var length = tnext.length;
        // If the ( is the last character of the token we're good :)
        if (parenIdx === length - 1) {
            var name = tnext.slice(0, length - 1);
            return __assign(__assign({}, state), { prev: LS.LAYOUT1D_START, res: {
                    name: name,
                    layout1D: [],
                    layout2D: []
                } });
        }
        else {
            //Skip to next
            return __assign({}, state);
        }
    }
    else if (prev === LS.LAYOUT1D_START) {
        var commaIdx = tnext.indexOf(',');
        if (commaIdx === 0) {
            return tokenizer(state, tnext.slice(1));
        }
        var parenIdx = tnext.indexOf(')');
        var length = tnext.length;
        if (parenIdx === 0) {
            return tokenizer(__assign(__assign({}, state), { prev: LS.LAYOUT1D_END, res: __assign(__assign({}, res), { layout2D: [[]] }) }), tnext.slice(1));
        }
        else if (commaIdx === length - 1) {
            var keycode = tnext.slice(0, length - 1);
            var layout1D = res.layout1D;
            return __assign(__assign({}, state), { prev: LS.LAYOUT1D_START, res: __assign(__assign({}, res), { layout1D: __spreadArrays(layout1D, [keycode]) }) });
        }
        else if (parenIdx === length - 1) {
            var keycode = tnext.slice(0, length - 1);
            var layout1D = res.layout1D;
            return __assign(__assign({}, state), { prev: LS.LAYOUT1D_END, res: __assign(__assign({}, res), { layout1D: __spreadArrays(layout1D, [keycode]), layout2D: [[]] }) });
        }
        else if (parenIdx === -1 && commaIdx === -1) {
            var keycode = tnext;
            var layout1D = res.layout1D;
            return __assign(__assign({}, state), { prev: LS.LAYOUT1D_START, res: __assign(__assign({}, res), { layout1D: __spreadArrays(layout1D, [keycode]), layout2D: [[]] }) });
        }
    }
    else if (prev === LS.LAYOUT1D_END) {
        if (tnext[0] === '{') {
            return tokenizer(__assign(__assign({}, state), { prev: LS.LAYOUT2D_START }), tnext.slice(1));
        }
    }
    else if (prev === LS.LAYOUT2D_START) {
        if (tnext[0] === '{') {
            return tokenizer(__assign(__assign({}, state), { prev: LS.LAYOUT2D_COL_START }), tnext.slice(1));
        }
    }
    else if (prev === LS.LAYOUT2D_COL_END) {
        if (tnext[0] === ',') {
            return tokenizer(__assign(__assign({}, state), { prev: LS.LAYOUT2D_COL_END }), tnext.slice(1));
        }
        else if (tnext[0] === '}') {
            return __assign(__assign({}, state), { prev: LS.SKIP });
        }
        else if (tnext[0] === '{') {
            return tokenizer(__assign(__assign({}, state), { prev: LS.LAYOUT2D_COL_START, res: __assign(__assign({}, res), { layout2D: __spreadArrays(res.layout2D, [[]]) }) }), tnext.slice(1));
        }
    }
    else if (prev === LS.LAYOUT2D_COL_START) {
        var commaIdx = tnext.indexOf(',');
        var bracketIdx = tnext.indexOf('}');
        if (commaIdx === 0) {
            return tokenizer(state, tnext.slice(1));
        }
        if (bracketIdx === 0) {
            var layout2D = res.layout2D;
            return tokenizer(__assign(__assign({}, state), { prev: LS.LAYOUT2D_COL_END, res: __assign(__assign({}, res), { layout2D: __spreadArrays(layout2D) }) }), tnext.slice(bracketIdx + 1));
        }
        else if (bracketIdx > 0) {
            var layout2D = res.layout2D;
            var lastRow = layout2D[layout2D.length - 1];
            layout2D[layout2D.length - 1] = __spreadArrays(lastRow, [tnext.slice(0, bracketIdx)]);
            return tokenizer(__assign(__assign({}, state), { prev: LS.LAYOUT2D_COL_END, res: __assign(__assign({}, res), { layout2D: __spreadArrays(layout2D) }) }), tnext.slice(bracketIdx + 1));
        }
        else if (commaIdx !== -1) {
            var layout2D = res.layout2D;
            var lastRow = layout2D[layout2D.length - 1];
            layout2D[layout2D.length - 1] = __spreadArrays(lastRow, [tnext.slice(0, commaIdx)]);
            return tokenizer(__assign(__assign({}, state), { prev: LS.LAYOUT2D_COL_START, res: __assign(__assign({}, res), { layout2D: layout2D }) }), tnext.slice(commaIdx));
        }
        else if (bracketIdx === -1 && commaIdx === -1) {
            var layout2D = res.layout2D;
            var lastRow = layout2D[layout2D.length - 1];
            layout2D[layout2D.length - 1] = __spreadArrays(lastRow, [tnext]);
            return __assign(__assign({}, state), { prev: LS.LAYOUT2D_COL_START, res: __assign(__assign({}, res), { layout2D: layout2D }) });
        }
    }
    error(state, tnext);
    throw "Bad Token found: " + state + ":" + tnext + " ";
}
function parseLayout(layout) {
    var tokens = layout.split(/[\\]?\s+/g);
    var res = tokens.reduce(tokenizer, {
        prev: LS.START,
        res: {}
    }).res;
    var layout1D = res.layout1D, layout2D = res.layout2D, name = res.name;
    var _a = [layout2D.length, layout2D[0].length], rows = _a[0], cols = _a[1];
    var indexMap = Object.assign.apply(Object, __spreadArrays([{}], layout2D.map(function (arr, i) {
        return Object.assign.apply(Object, __spreadArrays([{}], arr.map(function (val, j) {
            var _a;
            return (_a = {},
                _a[val] = { col: j, row: i },
                _a);
        })));
    })));
    return { name: name, rows: rows, cols: cols, layout: layout1D.map(function (val) { return indexMap[val]; }) };
}
exports.parseLayout = parseLayout;
