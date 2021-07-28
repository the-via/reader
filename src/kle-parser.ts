const invariant = require('invariant');
const inspect = require('util-inspect');
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
  VIAKey,
  OptionalDimensions,
  KLEDimensions,
} from './types';
import {SIGINT} from 'constants';
import {cursorTo} from 'readline';

type InnerReduceState = Formatting &
  OptionalDimensions &
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
  prevRow: Formatting & Rotation;
  res: Result[][];
};

export function rawKLEToKLELayout(kle: string): KLELayout {
  const kleArr = kle.split(',\n');
  return kleArr.map((row) =>
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
  return keys.filter((key) => key.group.option === 0);
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
  // Find the left corner which can be modified by x2, y2
  const [aX2 = 0, aY2 = 0, bX2 = 0, bY2 = 0] = [a.x2, a.y2, b.x2, b.y2];
  return {
    x: b.x - a.x + Math.min(0, bX2) - Math.min(0, aX2),
    y: b.y - a.y + Math.min(0, bY2) - Math.min(0, aY2),
  };
}

function getBoundingBox(key: Result) {
  const {x2 = 0, y2 = 0, x, y, w = 1, h = 1, r = 0, rx = 0, ry = 0} = key;
  const {h2 = h, w2 = w} = key;
  const extraArgs: [number, number, number] = [rx, ry, r];
  const box = {
    xStart: Math.min(x, x + x2),
    yStart: Math.min(y, y + y2),
    xEnd: Math.max(x + w, x + x2 + w2),
    yEnd: Math.max(y + h, y + y2 + h2),
  };

  const rotatedPoints = [
    {x: box.xStart, y: box.yStart},
    {x: box.xEnd, y: box.yStart},
    {x: box.xStart, y: box.yEnd},
    {x: box.xEnd, y: box.yEnd},
  ].map((p) => applyRotation(p.x, p.y, ...extraArgs));
  return {
    xStart: Math.min(...rotatedPoints.map((p) => p.x)),
    xEnd: Math.max(...rotatedPoints.map((p) => p.x)),
    yStart: Math.min(...rotatedPoints.map((p) => p.y)),
    yEnd: Math.max(...rotatedPoints.map((p) => p.y)),
  };
}

function applyRotation(
  x: number,
  y: number,
  xOrigin: number,
  yOrigin: number,
  rotation: number
) {
  const rad = (rotation * Math.PI) / 180;
  const [normX, normY] = [x - xOrigin, y - yOrigin];
  return {
    x: xOrigin + normX * Math.cos(rad) - normY * Math.sin(rad),
    y: yOrigin + normX * Math.sin(rad) + normY * Math.cos(rad),
  };
}

export function extractGroups(
  keys: Result[],
  origin: {x: number; y: number},
  colorMap: {[k: string]: KeyColorType}
): GroupOptionMap<VIAKey> {
  const groups = keys.filter((key) => key.group.key !== -1);
  const groupedKeys = groups.reduce(
    (p, n) => ({
      ...p,
      [n.group.key]: {
        ...(p[n.group.key] || {}),
        [n.group.option]: ((p[n.group.key] || {})[n.group.option] || []).concat(
          n
        ),
      },
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
        [option]: ((delta) =>
          results.map((res) => ({
            ...res,
            x: res.x - delta.x,
            y: res.y - delta.y,
          })))(calculateDelta(zeroPivot, findPivot(results)))
          .filter((r) => !r.d) // Remove decal keys
          .map((r) => resultToVIAKey(r, origin, colorMap)), // Resolve key colors and normalize position using origin
      }),
      p
    );
    return {
      ...p,
      [group]: normalizedOptions,
    };
  }, {});
}

// Expects pairs to be in the format "x,y" else throws exception
function extractPair(pair: string) {
  const arr = pair.split(/[，,]/);
  invariant(arr.length === 2, `${pair} is not a pair`);
  const numArr = arr.map((v) => parseInt(v, 10));
  if (numArr.some((num) => Number.isNaN(num))) {
    throw Error(`Invalid pair: ${pair}`);
  }
  return numArr;
}

function resultToVIAKey(
  result: Result,
  delta: {x: number; y: number},
  colorMap: {[x: string]: KeyColorType}
): VIAKey {
  const {c, d, t, group, ...partialKey} = result;
  return {
    ...partialKey,
    x: result.x - delta.x,
    y: result.y - delta.y,
    rx: result.rx - delta.x,
    ry: result.ry - delta.y,
    color: colorMap[`${c}:${t}`] || KeyColorType.Alpha,
  };
}

export function kleLayoutToVIALayout(kle: KLELayout): VIALayout {
  const filteredKLE = kle.filter((elem) => Array.isArray(elem)) as KLEElem[][];
  const parsedKLE = filteredKLE.reduce<OuterReduceState>(
    (prev: OuterReduceState, kle: KLEElem[]) => {
      const parsedRow = kle.reduce<InnerReduceState>(
        (
          {
            cursor: {x, y},
            res,
            c,
            h,
            t,
            r,
            d,
            rx,
            ry,
            w,
            y2,
            x2,
            w2,
            h2,
            colorCount,
          }: InnerReduceState,
          n
        ) => {
          // Check if object and apply formatting
          if (typeof n !== 'string') {
            let obj: InnerReduceState = {
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
              cursor: {x, y},
            };
            obj = (
              ['y2', 'x2', 'w2', 'h2', 'r', 'rx', 'ry', 'h', 'w'] as (
                | keyof OptionalDimensions
                | keyof KLEDimensions
              )[]
            ).reduce(
              (p, prop) =>
                typeof n[prop] === 'number' ? {...p, [prop]: n[prop]} : p,
              obj
            );
            if (typeof n.d === 'boolean') {
              obj = {...obj, d: n.d};
            }
            if (typeof n.ry === 'number' || typeof n.rx === 'number') {
              obj = {
                ...obj,
                cursor: {...obj.cursor, y: obj.ry},
              };
            }
            if (typeof n.y === 'number') {
              obj = {
                ...obj,
                cursor: {...obj.cursor, y: obj.cursor.y + n.y},
              };
            }
            if (typeof n.x === 'number') {
              obj = {
                ...obj,
                cursor: {...obj.cursor, x: x + n.x},
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
            // Ignore row,col + requirement if key is a decal key
            const [row, col] = d ? [0, 0] : extractPair(labels[0]);
            const groupLabel = labels[3] || '-1,0';
            const [group, option] = extractPair(groupLabel);
            const newColorCount = {
              ...colorCount,
              [colorCountKey]:
                colorCount[colorCountKey] === undefined
                  ? 1
                  : colorCount[colorCountKey] + 1,
            };
            const currKey = {
              c,
              t,
              row,
              col,
              x: x + rx,
              y,
              r,
              rx,
              ry,
              d,
              h,
              w,
              w2,
              y2,
              x2,
              h2,
              group: {
                key: group,
                option,
              },
            };

            // Reset carry properties
            return {
              h: 1,
              w: 1,
              r,
              rx,
              ry,
              c,
              d: false,
              colorCount: newColorCount,
              t,
              cursor: {x: x + w, y},
              res: [...res, currKey],
            };
          }
          return {
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
            cursor: {x, y},
          };
        },
        {
          ...prev.prevRow,
          cursor: prev.cursor,
          colorCount: prev.colorCount,
          h: 1,
          w: 1,
          d: false,
          res: [],
        }
      );
      return {
        cursor: {x: 0, y: parsedRow.cursor.y + 1},
        colorCount: parsedRow.colorCount,
        prevRow: {
          c: parsedRow.c,
          t: parsedRow.t,
          r: parsedRow.r,
          rx: parsedRow.rx,
          ry: parsedRow.ry,
        },
        res: [...prev.res, parsedRow.res],
      };
    },
    {
      cursor: {x: 0, y: 0},
      prevRow: {c: '#cccccc', t: '#000000', r: 0, rx: 0, ry: 0},
      res: [],
      colorCount: {},
    }
  );

  const {colorCount, res} = parsedKLE;
  const colorCountKeys = Object.keys(colorCount);
  colorCountKeys.sort((a, b) => colorCount[b] - colorCount[a]);
  if (colorCountKeys.length > 3) {
    throw new Error(
      'Please correct layout, too many colors:' +
        '\n' +
        inspect(colorCount, false, null, true)
    );
  }

  const colorMap = {
    [colorCountKeys[0]]: KeyColorType.Alpha,
    [colorCountKeys[1]]: KeyColorType.Mod,
    [colorCountKeys[2]]: KeyColorType.Accent,
  };

  const flatRes = res.flat();
  const defaultRes = filterGroups(flatRes);
  const boundingBoxes = defaultRes.map(getBoundingBox);
  const minX = Math.min(...boundingBoxes.map((b) => b.xStart));
  const minY = Math.min(...boundingBoxes.map((b) => b.yStart));
  const width = Math.max(...boundingBoxes.map((b) => b.xEnd)) - minX;
  const height = Math.max(...boundingBoxes.map((b) => b.yEnd)) - minY;
  const keys = defaultRes
    .filter((k) => k.group.key === -1 && !k.d) // Remove option keys and decals
    .map((k) => resultToVIAKey(k, {x: minX, y: minY}, colorMap));
  const optionKeys = extractGroups(flatRes, {x: minX, y: minY}, colorMap);

  return {width, height, optionKeys, keys};
}
