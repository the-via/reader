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
});
