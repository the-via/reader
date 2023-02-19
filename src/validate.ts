import {commonMenus} from './common-menus';
import {kleLayoutToVIALayout} from './kle-parser';
import {VIALayout} from './types.common';
import {KeyboardDefinitionV3, VIADefinitionV3} from './types.v3';

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
