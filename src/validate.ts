import {commonMenus} from './common-menus';
import {kleLayoutToVIALayout} from './kle-parser';
import {VIALayout} from './types.common';
import {KeyboardDefinitionV3, VIADefinitionV3} from './types.v3';
import {CommandDef, VIAMenu, VIAControlItem} from './menu-types';

export const validateLayouts = (
  layouts: KeyboardDefinitionV3['layouts']
): VIALayout => {
  const {labels = [], keymap} = layouts;
  const viaLayout = kleLayoutToVIALayout(keymap);
  const missingLabels = labels.filter(
    (_, idx) =>
      viaLayout.optionKeys[idx] === undefined ||
      viaLayout.optionKeys[idx][0] === undefined
  );
  if (missingLabels.length > 0) {
    throw new Error(
      `The KLE is missing the group keys for: ${missingLabels.join(',')}`
    );
  }
  return viaLayout;
};

export const validateKeyBounds = (
  matrix: VIADefinitionV3['matrix'],
  layouts: VIADefinitionV3['layouts']
): void => {
  const {rows, cols} = matrix;
  const optionKeys = Object.values(layouts.optionKeys).flatMap((group) =>
    Object.values(group).flat()
  );
  const oobKeys = layouts.keys
    .concat(optionKeys)
    .filter(({row, col}) => row >= rows || col >= cols);
  if (oobKeys.length !== 0) {
    throw new Error(
      `The following keys reference a row or column outside of dimension defined in the matrix property: ${oobKeys
        .map(({row, col}) => `(${row},${col})`)
        .join(',')}`
    );
  }
};

export const validateCommonMenus = (menus: VIADefinitionV3['menus']) => {
  const lookupFailedKeys = (menus || []).filter((menu) => {
    if (typeof menu === 'string') {
      return !Object.keys(commonMenus).includes(menu);
    }
    return false;
  });
  if (lookupFailedKeys.length) {
    throw Error(
      `Common menus not for found for: ${lookupFailedKeys.join(', ')}`
    );
  }
};

type RangeItem = Extract<VIAControlItem, {type: 'range'}>;

const commandEquals = (left: CommandDef, right: CommandDef) =>
  left.every((value, index) => value === right[index]);

const collectRangeItems = (value: unknown, ranges: Map<string, RangeItem>) => {
  if (!value || typeof value !== 'object') {
    return;
  }

  if ('type' in value && value.type === 'range' && 'content' in value) {
    const range = value as RangeItem;
    const id = range.content[0];
    const existing = ranges.get(id);
    if (existing && !commandEquals(existing.content, range.content)) {
      throw new Error(
        `Range command '${id}' is declared more than once with different command definitions.`
      );
    }
    ranges.set(id, range);
    return;
  }

  if ('content' in value && Array.isArray(value.content)) {
    value.content.forEach((child) => collectRangeItems(child, ranges));
  }
};

const canRangesSatisfyConstraint = (
  range: RangeItem,
  reference: RangeItem,
  operator: '<' | '<=' | '>' | '>=',
  offset: number
) => {
  const [min, max] = range.options;
  const [referenceMin, referenceMax] = reference.options;
  switch (operator) {
    case '>':
      return max > referenceMin + offset;
    case '>=':
      return max >= referenceMin + offset;
    case '<':
      return min < referenceMax + offset;
    case '<=':
      return min <= referenceMax + offset;
  }
};

export const validateMenuConstraints = (
  menus: readonly (VIAMenu<any> | string)[]
): void => {
  const ranges = new Map<string, RangeItem>();
  menus.forEach((menu) => {
    if (typeof menu !== 'string') {
      collectRangeItems(menu, ranges);
    }
  });

  ranges.forEach((range, id) => {
    range.constraints?.forEach((constraint) => {
      const referenceId =
        typeof constraint.reference === 'string'
          ? constraint.reference
          : constraint.reference[0];
      const reference = ranges.get(referenceId);

      if (!reference) {
        throw new Error(
          `Range constraint on '${id}' references unknown range '${referenceId}'.`
        );
      }

      if (
        Array.isArray(constraint.reference) &&
        !commandEquals(constraint.reference, reference.content)
      ) {
        throw new Error(
          `Range constraint reference '${referenceId}' does not match its declared command definition.`
        );
      }

      const offset = constraint.offset ?? 0;
      if (!Number.isInteger(offset)) {
        throw new Error(
          `Range constraint offset on '${id}' must be an integer.`
        );
      }

      if (
        !canRangesSatisfyConstraint(
          range,
          reference,
          constraint.operator,
          offset
        )
      ) {
        throw new Error(
          `Range constraint on '${id}' cannot be satisfied within the declared ranges.`
        );
      }
    });
  });
};
