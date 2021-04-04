import {kleLayoutToVIALayout} from './kle-parser';
import validateV3 from './validated-types/keyboard-definition-v3.validator';
import {
  defaultKeycodes,
  defaultMenus,
  KeyboardDefinitionV3,
  VIADefinitionV3,
  VIALayout,
} from './types.v3';
export {VIADefinitionV3, KeyboardDefinitionV3};

function getHexHint(value: string) {
  const borkedHexPattern = /^[Oo]x/;
  return value.match(borkedHexPattern)
    ? `Did you mean '${value.replace(borkedHexPattern, '0x')}' instead?`
    : '';
}

export function getVendorProductId({
  productId,
  vendorId,
}: Pick<KeyboardDefinitionV3, 'productId' | 'vendorId'>): number {
  const parsedVendorId = parseInt(vendorId, 16);
  const parsedProductId = parseInt(productId, 16);

  if (isNaN(parsedVendorId)) {
    throw new Error(
      `vendorId could not be parsed: '${vendorId}'. ${getHexHint(vendorId)}`
    );
  }

  if (isNaN(parsedProductId)) {
    throw new Error(
      `productId could not be parsed: '${productId}'. ${getHexHint(productId)}`
    );
  }

  return parsedVendorId * 65536 + parsedProductId;
}

export function validateLayouts(
  layouts: KeyboardDefinitionV3['layouts']
): VIALayout {
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
}

export function validateKeyBounds(
  matrix: VIADefinitionV3['matrix'],
  layouts: VIADefinitionV3['layouts']
) {
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
}

export function keyboardDefinitionV3ToVIADefinitionV3(
  definition: KeyboardDefinitionV3
): VIADefinitionV3 {
  const {
    name,
    menus,
    keycodes,
    customKeycodes,
    matrix,
    layouts,
    firmwareVersion,
  } = validateV3(definition);

  validateLayouts(layouts);
  const {keymap, ...partialLayout} = layouts;
  const viaLayouts = {
    ...partialLayout,
    ...kleLayoutToVIALayout(layouts.keymap),
  };
  validateKeyBounds(matrix, viaLayouts);
  return {
    name,
    vendorProductId: getVendorProductId(definition),
    firmwareVersion,
    menus: menus ?? defaultMenus,
    keycodes: keycodes ?? defaultKeycodes,
    customKeycodes,
    matrix,
    layouts: viaLayouts,
  };
}

export function generateVIADefinitionV3LookupMap(
  definitions: KeyboardDefinitionV3[]
): Record<string, VIADefinitionV3> {
  return definitions
    .map(keyboardDefinitionV3ToVIADefinitionV3)
    .reduce((p, n) => ({...p, [n.vendorProductId]: n}), {});
}
