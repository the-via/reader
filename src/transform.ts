import {kleLayoutToVIALayout} from './kle-parser';
import validate from './validated-types/keyboard-definition.validator';
import validateV2 from './validated-types/keyboard-definition-v2.validator';
import {
  KeyboardDefinition,
  KeyboardDefinitionV2,
  VIADefinition,
  VIADefinitionV2
} from './types';
export {VIADefinition, KeyboardDefinition};

export function getVendorProductId({
  productId,
  vendorId
}: KeyboardDefinition | KeyboardDefinitionV2): number {
  const parsedVendorId = parseInt(vendorId, 16);
  const parsedProductId = parseInt(productId, 16);
  return parsedVendorId * 65536 + parsedProductId;
}

export function keyboardDefinitionV2ToVIADefinitionV2(
  definition: KeyboardDefinitionV2
): VIADefinitionV2 {
  const {name, lighting, matrix, layouts} = validateV2(definition);
  const {keymap, ...partialLayout} = layouts;
  return {
    name,
    lighting,
    layouts: {...partialLayout, ...kleLayoutToVIALayout(layouts.keymap)},
    matrix,
    vendorProductId: getVendorProductId(definition)
  };
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
