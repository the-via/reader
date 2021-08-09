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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConfig = void 0;
var LS;
(function (LS) {
    LS[LS["START"] = 1] = "START";
    LS[LS["DEFINE"] = 2] = "DEFINE";
    LS["DEFINE_VAL"] = "define_val";
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
    var _a;
    var tnext = next.trim();
    var prev = state.prev, res = state.res;
    // skip empty strings
    if (tnext === '') {
        return state;
    }
    if (prev === LS.SKIP) {
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
        return __assign(__assign({}, state), { prev: LS.DEFINE_VAL, defineKey: tnext });
    }
    else if (prev === LS.DEFINE_VAL) {
        return __assign(__assign({}, state), { prev: LS.START, defineKey: undefined, res: __assign(__assign({}, res), (_a = {}, _a[state.defineKey || ''] = tnext, _a)) });
    }
    error(state, tnext);
    throw "Bad Token found: " + state + ":" + tnext + " ";
}
function parseConfig(config) {
    var tokens = config.split(/[\\]?\s+/g);
    var res = tokens.reduce(tokenizer, {
        prev: LS.START,
        res: {}
    }).res;
    return res;
}
exports.parseConfig = parseConfig;
