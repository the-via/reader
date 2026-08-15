import {describe, expect, test} from 'vitest';
import {VIAMenu, validateMenuConstraints} from '../src';

const makeMenus = (constraints: unknown): VIAMenu[] =>
  [
    {
      label: 'Thresholds',
      content: [
        {
          label: 'General',
          content: [
            {
              label: 'Actuation',
              type: 'range',
              options: [1, 255],
              constraints,
              content: ['id_actuation', 0, 1],
            },
            {
              label: 'Release',
              type: 'range',
              options: [1, 255],
              content: ['id_release', 0, 2],
            },
          ],
        },
      ],
    },
  ] as VIAMenu[];

const makeRangeMenus = (
  ranges: Array<{
    id: string;
    options: [number, number];
    constraints?: unknown;
  }>
): VIAMenu[] =>
  [
    {
      label: 'Thresholds',
      content: [
        {
          label: 'General',
          content: ranges.map(({id, options, constraints}, index) => ({
            label: id,
            type: 'range',
            options,
            constraints,
            content: [id, 0, index],
          })),
        },
      ],
    },
  ] as VIAMenu[];

describe('validateMenuConstraints', () => {
  test('accepts an identifier reference', () => {
    expect(() =>
      validateMenuConstraints(
        makeMenus([
          {
            operator: '>=',
            reference: 'id_release',
            offset: 50,
            onViolation: 'push',
          },
        ])
      )
    ).not.toThrow();
  });

  test('accepts a matching command reference', () => {
    expect(() =>
      validateMenuConstraints(
        makeMenus([
          {
            operator: '>=',
            reference: ['id_release', 0, 2],
            offset: 50,
          },
        ])
      )
    ).not.toThrow();
  });

  test('rejects an unknown range reference', () => {
    expect(() =>
      validateMenuConstraints(
        makeMenus([{operator: '>=', reference: 'id_missing'}])
      )
    ).toThrow("references unknown range 'id_missing'");
  });

  test('rejects a mismatched command reference', () => {
    expect(() =>
      validateMenuConstraints(
        makeMenus([{operator: '>=', reference: ['id_release', 0, 99]}])
      )
    ).toThrow('does not match its declared command definition');
  });

  test('rejects a relationship that cannot fit the ranges', () => {
    expect(() =>
      validateMenuConstraints(
        makeMenus([{operator: '>=', reference: 'id_release', offset: 255}])
      )
    ).toThrow('cannot be satisfied within the declared ranges');
  });

  test('rejects a fractional offset', () => {
    expect(() =>
      validateMenuConstraints(
        makeMenus([{operator: '>=', reference: 'id_release', offset: 0.5}])
      )
    ).toThrow('must be an integer');
  });

  test('accepts a globally satisfiable cascade with reciprocal constraints', () => {
    const menus = makeRangeMenus([
      {
        id: 'shallowRelease',
        options: [1, 100],
        constraints: [
          {
            operator: '<=',
            reference: 'shallowPress',
            offset: -30,
            onViolation: 'push',
          },
        ],
      },
      {
        id: 'shallowPress',
        options: [1, 100],
        constraints: [
          {
            operator: '>=',
            reference: 'shallowRelease',
            offset: 30,
            onViolation: 'push',
          },
          {
            operator: '<=',
            reference: 'deepRelease',
            offset: -30,
            onViolation: 'push',
          },
        ],
      },
      {
        id: 'deepRelease',
        options: [1, 100],
        constraints: [
          {
            operator: '>=',
            reference: 'shallowPress',
            offset: 30,
            onViolation: 'push',
          },
          {
            operator: '<=',
            reference: 'deepPress',
            offset: -30,
            onViolation: 'push',
          },
        ],
      },
      {
        id: 'deepPress',
        options: [1, 100],
        constraints: [
          {
            operator: '>=',
            reference: 'deepRelease',
            offset: 30,
            onViolation: 'push',
          },
        ],
      },
    ]);

    expect(() => validateMenuConstraints(menus)).not.toThrow();
  });

  test('rejects a cascade whose cumulative offsets exceed the ranges', () => {
    const menus = makeRangeMenus([
      {id: 'a', options: [1, 100]},
      {
        id: 'b',
        options: [1, 100],
        constraints: [{operator: '>=', reference: 'a', offset: 40}],
      },
      {
        id: 'c',
        options: [1, 100],
        constraints: [{operator: '>=', reference: 'b', offset: 40}],
      },
      {
        id: 'd',
        options: [1, 100],
        constraints: [{operator: '>=', reference: 'c', offset: 40}],
      },
    ]);

    expect(() => validateMenuConstraints(menus)).toThrow(
      'cannot be satisfied within the declared ranges'
    );
  });

  test('rejects a contradictory constraint cycle', () => {
    const menus = makeRangeMenus([
      {
        id: 'a',
        options: [1, 100],
        constraints: [{operator: '>=', reference: 'b', offset: 1}],
      },
      {
        id: 'b',
        options: [1, 100],
        constraints: [{operator: '>=', reference: 'a', offset: 1}],
      },
    ]);

    expect(() => validateMenuConstraints(menus)).toThrow(
      'cannot be satisfied within the declared ranges'
    );
  });
});
