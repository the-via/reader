import {kleLayoutToVIALayout} from './kle-parser';
import validate from './validated-types/keyboard-definition.validator';
import validateV2 from './validated-types/keyboard-definition-v2.validator';
import {
  KeyboardDefinition,
  KeyboardDefinitionV2,
  VIADefinition,
  VIADefinitionV2,
  VIALightingTypeDefinition,
  LightingTypeDefinitionV2,
  VIALayout
} from './types';
import {LightingPreset} from './lighting-presets';
export {VIADefinition, KeyboardDefinition};

export function getVendorProductId({
  productId,
  vendorId
}: Pick<KeyboardDefinitionV2, 'productId' | 'vendorId'>): number {
  const parsedVendorId = parseInt(vendorId, 16);
  const parsedProductId = parseInt(productId, 16);
  return parsedVendorId * 65536 + parsedProductId;
}

export function validateLayouts(
  layouts: KeyboardDefinitionV2['layouts']
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
  matrix: VIADefinitionV2['matrix'],
  layouts: VIADefinitionV2['layouts']
) {
  const {rows, cols} = matrix;
  const optionKeys = Object.values(layouts.optionKeys).flatMap(group =>
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

export function keyboardDefinitionV2ToVIADefinitionV2(
  definition: KeyboardDefinitionV2
): VIADefinitionV2 {
  const {
    name,
    customFeatures,
    customMenus,
    customKeycodes,
    lighting,
    matrix,
    layouts
  } = validateV2(definition);

  validateLayouts(layouts);
  const {keymap, ...partialLayout} = layouts;
  const viaLayouts = {
    ...partialLayout,
    ...kleLayoutToVIALayout(layouts.keymap)
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
    vendorProductId: getVendorProductId(definition)
  };
}

export function getLightingDefinition(
  definition: LightingTypeDefinitionV2
): VIALightingTypeDefinition {
  if (typeof definition === 'string') {
    return LightingPreset[definition];
  } else {
    return {...LightingPreset[definition.extends], ...definition};
  }
}

export function keyboardDefinitionToVIADefinition(
  definition: KeyboardDefinition
): VIADefinition {
  const {name, lighting, matrix} = validate(definition);
  const layouts = Object.entries(definition.layouts).reduce(
    (p, [k, v]) => ({...p, [k]: kleLayoutToVIALayout(v)}),
    {}
  );
  return {
    name,
    lighting,
    layouts,
    matrix,
    vendorProductId: getVendorProductId(definition)
  };
}

export function generateVIADefinitionLookupMap(
  definitions: KeyboardDefinition[]
) {
  return definitions
    .map(keyboardDefinitionToVIADefinition)
    .reduce((p, n) => ({...p, [n.vendorProductId]: n}), {});
}

export function generateVIADefinitionV2LookupMap(
  definitions: KeyboardDefinitionV2[]
) {
  return definitions
    .map(keyboardDefinitionV2ToVIADefinitionV2)
    .reduce((p, n) => ({...p, [n.vendorProductId]: n}), {});
}
