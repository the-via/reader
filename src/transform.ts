import {kleLayoutToVIALayout} from './kle-parser';
import validate from './keyboard.definition.validator';
import {KeyboardDefinition, VIADefinition} from './types';
export {VIADefinition, KeyboardDefinition};

export function getVendorProductId({productId, vendorId}: KeyboardDefinition): number {
  const parsedVendorId = parseInt(vendorId, 16);
  const parsedProductId = parseInt(productId, 16);
  return parsedVendorId * 65536 + parsedProductId;
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
