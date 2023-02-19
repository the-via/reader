import validateV3 from './validated-types/keyboard-definition-v3.validator';
import validateV2 from './validated-types/keyboard-definition-v2.validator';
import {KeyboardDefinitionV3, VIADefinitionV3} from './types.v3';
import {
  KeyboardDefinitionV2,
  LightingTypeDefinitionV2,
  VIADefinitionV2,
  VIALightingTypeDefinition,
} from './types.v2';
import {LightingPreset} from './lighting-presets';
import {
  validateCommonMenus,
  validateKeyBounds,
  validateLayouts,
} from './validate';

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
  if (vendorId.toUpperCase() === '0XFEED') {
    throw new Error(`'0xFEED' is not a valid vendorId.`);
  }

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

  const viaLayout = validateLayouts(layouts);
  const {keymap, ...partialLayout} = layouts;
  const viaLayouts = {
    ...partialLayout,
    ...viaLayout,
  };
  validateKeyBounds(matrix, viaLayouts);
  validateCommonMenus(menus ?? []);

  return {
    name,
    vendorProductId: getVendorProductId(definition),
    firmwareVersion: firmwareVersion ?? 0,
    menus: menus ?? [],
    keycodes: keycodes ?? [],
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

  const viaLayout = validateLayouts(layouts);
  const {keymap, ...partialLayout} = layouts;
  const viaLayouts = {
    ...partialLayout,
    ...viaLayout,
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
