import {kleLayoutToVIALayout} from './kle-parser';
import validateV3 from './validated-types/keyboard-definition-v3.validator';
import validateV2 from './validated-types/keyboard-definition-v2.validator';
import {
  defaultKeycodes,
  defaultMenus,
  KeyboardDefinitionV3,
  VIADefinitionV3,
} from './types.v3';
import {VIALayout} from './types.common';
import {
  KeyboardDefinitionV2,
  LightingTypeDefinitionV2,
  VIADefinitionV2,
  VIALightingTypeDefinition,
} from './types.v2';
import {LightingPreset} from './lighting-presets';

export {VIADefinitionV3, KeyboardDefinitionV3};

const getHexHint = (value: string) => {
  const borkedHexPattern = /^[Oo]x/;
  return value.match(borkedHexPattern)
    ? `Did you mean '${value.replace(borkedHexPattern, '0x')}' instead?`
    : '';
};

export const getVendorProductId = ({
  productId,
  vendorId,
}: Pick<KeyboardDefinitionV3, 'productId' | 'vendorId'>): number => {
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
};

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
) => {
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

export const keyboardDefinitionV3ToVIADefinitionV3 = (
  definition: KeyboardDefinitionV3
): VIADefinitionV3 => {
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
};

export const keyboardDefinitionV2ToVIADefinitionV2 = (
  definition: KeyboardDefinitionV2
): VIADefinitionV2 => {
  const {
    name,
    customFeatures,
    customMenus,
    customKeycodes,
    lighting,
    matrix,
    layouts,
  } = validateV2(definition);

  validateLayouts(layouts);
  const {keymap, ...partialLayout} = layouts;
  const viaLayouts = {
    ...partialLayout,
    ...kleLayoutToVIALayout(layouts.keymap),
  };
  validateKeyBounds(matrix, viaLayouts);
  return {
    name,
    lighting,
    layouts: viaLayouts,
    matrix,
    customFeatures,
    customKeycodes,
    customMenus,
    vendorProductId: getVendorProductId(definition),
  };
};

export const getLightingDefinition = (
  definition: LightingTypeDefinitionV2
): VIALightingTypeDefinition =>
  typeof definition === 'string'
    ? LightingPreset[definition]
    : {...LightingPreset[definition.extends], ...definition};

export const generateVIADefinitionLookupMap = <
  TInput extends KeyboardDefinitionV2 | KeyboardDefinitionV3,
  TOutput extends VIADefinitionV2 | VIADefinitionV3
>(
  definitions: TInput[],
  mapper: (definition: TInput) => TOutput
): Record<number, TOutput> =>
  definitions
    .map(mapper)
    .reduce((p, n) => ({...p, [n.vendorProductId]: n}), {});
