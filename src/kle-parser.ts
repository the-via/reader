const invariant = require('invariant');
import {
  Formatting,
  Cursor,
  ColorCount,
  Dimensions,
  KLEElem,
  Rotation,
  Result,
  VIALayout,
  KLELayout,
  KeyColorType,
  Decal,
  VIAKey
} from './types';

type InnerReduceState = Formatting &
  Dimensions &
  Rotation &
  Decal & {
    cursor: Cursor;
    colorCount: ColorCount;
    res: Result[];
  };
type OuterReduceState = {
  cursor: Cursor;
  colorCount: ColorCount;
  prevFormatting: Formatting;
  res: Result[][];
};

export function rawKLEToKLELayout(kle: string): KLELayout {
  const kleArr = kle.split(',\n');
  return kleArr.map(row =>
    JSON.parse(
      row
        .replace(/\n/g, '\\n')
        .replace(/\\/g, '\\\\')
        .replace(/\"\\(?!,)/g, '\\\\')
        .replace(/([{,])([A-Za-z][0-9A-Za-z]?)(:)/g, '$1"$2"$3')
    )
  );
}

export function filterGroups(keys: Result[]) {
  // Currently extract out non x,0 groups i.e. always choose the first option
  return keys.filter(key => key.group.option === 0);
}

// Finds the closest to the top-left corner
export function findPivot(keys: Result[]): Result {
  return [...keys].sort((a, b) => {
    const yDiff = a.y - b.y;
    return yDiff !== 0 ? yDiff : a.x - b.x;
  })[0];
}

type GroupOptionMap<A> = {[group: string]: {[option: string]: A[]}};

function calculateDelta(a: Result, b: Result) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  };
}

export function extractGroups(
  keys: Result[],
  origin: {x: number; y: number},
  colorMap: {[k: string]: KeyColorType}
): GroupOptionMap<VIAKey> {
  const groups = keys.filter(key => key.group.key !== -1);
  const groupedKeys = groups.reduce(
    (p, n) => ({
      ...p,
      [n.group.key]: {
        ...(p[n.group.key] || {}),
        [n.group.option]: ((p[n.group.key] || {})[n.group.option] || []).concat(
          n
        )
      }
    }),
    {} as GroupOptionMap<Result>
  );

  // We need two pivots in order to calculate the true placement
  // 1. The option 0 pivot + the option n pivot for the rest of them
  return Object.entries(groupedKeys).reduce((p, [group, options]) => {
    const zeroPivot = findPivot(options[0]);
    const normalizedOptions = Object.entries(options).reduce(
      (p, [option, results]) => ({
        ...p,
        [option]: (delta =>
          results.map(res => ({
            ...res,
            x: res.x - delta.x,
            y: res.y - delta.y
          })))(calculateDelta(zeroPivot, findPivot(results)))
          .filter(r => !r.d) // Remove decal keys
          .map(r => resultToVIAKey(r, origin, colorMap)) // Resolve key colors and normalize position using origin
      }),
      p
    );
    return {
      ...p,
      [group]: normalizedOptions
    };
  }, {});
}

// Expects pairs to be in the format "x,y" else throws exception
function extractPair(pair: string) {
  const arr = pair.split(',');
  invariant(arr.length === 2, `${pair} is not a pair`);
  const numArr = arr.map(v => parseInt(v, 10));
  if (numArr.some(num => Number.isNaN(num))) {
    throw Error(`Invalid pair: ${pair}`);
  }
  return numArr;
}

function resultToVIAKey(
  result: Result,
  delta: {x: number; y: number},
  colorMap: {[x: string]: KeyColorType}
): VIAKey {
  const {c, d, t, group, marginX, marginY, ...partialKey} = result;
  return {
    ...partialKey,
    x: result.x - delta.x,
    y: result.y - delta.y,
    color: colorMap[`${c}:${t}`] || KeyColorType.Alpha
  };
}
export function kleLayoutToVIALayout(kle: KLELayout): VIALayout {
  const filteredKLE = kle.filter(elem => Array.isArray(elem)) as KLEElem[][];
  const parsedKLE = filteredKLE.reduce<OuterReduceState>(
    (prev: OuterReduceState, kle: KLEElem[]) => {
      const parsedRow = kle.reduce<InnerReduceState>(
        (
          {
            cursor: {x, y},
            marginX,
            marginY,
            res,
            c,
            h,
            t,
            r,
            d,
            rx,
            ry,
            w,
            colorCount
          }: InnerReduceState,
          n
        ) => {
          // Check if object and apply formatting
          if (typeof n !== 'string') {
            let obj: InnerReduceState = {
              marginX,
              marginY,
              colorCount,
              c,
              t,
              h,
              r,
              rx,
              ry,
              res,
              d,
              w,
              cursor: {x, y}
            };
            if (typeof n.d === 'boolean') {
              obj = {...obj, d: n.d};
            }
            if (typeof n.w === 'number') {
              obj = {...obj, w: n.w};
            }
            if (typeof n.y === 'number') {
              obj = {
                ...obj,
                marginY: 100 * n.y,
                cursor: {...obj.cursor, y: y + n.y}
              };
            }
            if (typeof n.x === 'number') {
              obj = {
                ...obj,
                marginX: 100 * n.x,
                cursor: {...obj.cursor, x: x + n.x}
              };
            }
            if (typeof n.r === 'number') {
              obj = {
                ...obj,
                r: n.r
              };
            }
            if (typeof n.rx === 'number') {
              obj = {
                ...obj,
                rx: n.rx
              };
            }
            if (typeof n.h === 'number') {
              obj = {
                ...obj,
                h: n.h
              };
            }
            if (typeof n.ry === 'number') {
              obj = {
                ...obj,
                ry: n.ry
              };
            }
            if (typeof n.c === 'string') {
              obj = {...obj, c: n.c};
            }
            if (typeof n.t === 'string') {
              obj = {...obj, t: n.t};
            }
            return obj as InnerReduceState;
          } else if (typeof n === 'string') {
            const colorCountKey = `${c}:${t}`;
            const labels = n.split('\n');
            const [row, col] = extractPair(labels[0]);
            const groupLabel = labels[3] || '-1,0';
            const [group, option] = extractPair(groupLabel);
            const newColorCount = {
              ...colorCount,
              [colorCountKey]:
                colorCount[colorCountKey] === undefined
                  ? 1
                  : colorCount[colorCountKey] + 1
            };
            const currKey = {
              c,
              t,
              marginX,
              marginY,
              row,
              col,
              x,
              y,
              r,
              rx,
              ry,
              d,
              h,
              w,
              group: {
                key: group,
                option
              }
            };

            // Reset carry properties
            return {
              marginX: 0,
              marginY,
              h: 1,
              w: 1,
              c,
              d: false,
              colorCount: newColorCount,
              t,
              r: 0,
              rx: 0,
              ry: 0,
              cursor: {x: x + w, y},
              res: [...res, currKey]
            };
          }
          return {
            marginX,
            marginY,
            c,
            t,
            h,
            d,
            r,
            w,
            rx,
            ry,
            res,
            colorCount,
            cursor: {x, y}
          };
        },
        {
          ...prev.prevFormatting,
          cursor: prev.cursor,
          colorCount: prev.colorCount,
          marginX: 0,
          marginY: 0,
          h: 1,
          r: 0,
          rx: 0,
          ry: 0,
          w: 1,
          d: false,
          res: []
        }
      );
      return {
        cursor: {x: 0, y: parsedRow.cursor.y + 1},
        colorCount: parsedRow.colorCount,
        prevFormatting: {c: parsedRow.c, t: parsedRow.t},
        res: [...prev.res, parsedRow.res]
      };
    },
    {
      cursor: {x: 0, y: 0},
      prevFormatting: {c: '#f5f5f5', t: '#444444'},
      res: [],
      colorCount: {}
    }
  );

  const {colorCount, res} = parsedKLE;
  const colorCountKeys = Object.keys(colorCount);
  colorCountKeys.sort((a, b) => colorCount[b] - colorCount[a]);
  if (colorCountKeys.length > 3) {
    console.error('Please correct layout:', parsedKLE);
  }

  const colorMap = {
    [colorCountKeys[0]]: KeyColorType.Alpha,
    [colorCountKeys[1]]: KeyColorType.Mod,
    [colorCountKeys[2]]: KeyColorType.Accent
  };

  const flatRes = res.flat();
  const defaultRes = filterGroups(flatRes);
  const xKeys = defaultRes.map(k => k.x);
  const yKeys = defaultRes.map(k => k.y);
  const minX = Math.min(...xKeys);
  const minY = Math.min(...yKeys);
  const width = Math.max(...defaultRes.map(k => k.x + k.w)) - minX;
  const height = Math.max(...yKeys) + 1 - minY;
  const keys = defaultRes
    .filter(k => k.group.key === -1 && !k.d) // Remove option keys and decals
    .map(k => resultToVIAKey(k, {x: minX, y: minY}, colorMap));
  const optionKeys = extractGroups(flatRes, {x: minX, y: minY}, colorMap);

  return {width, height, optionKeys, keys};
}
