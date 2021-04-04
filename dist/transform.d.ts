import { KeyboardDefinitionV3, VIADefinitionV3, VIALayout } from './types.v3';
export { VIADefinitionV3, KeyboardDefinitionV3 };
export declare function getVendorProductId({ productId, vendorId, }: Pick<KeyboardDefinitionV3, 'productId' | 'vendorId'>): number;
export declare function validateLayouts(layouts: KeyboardDefinitionV3['layouts']): VIALayout;
export declare function validateKeyBounds(matrix: VIADefinitionV3['matrix'], layouts: VIADefinitionV3['layouts']): void;
export declare function keyboardDefinitionV3ToVIADefinitionV3(definition: KeyboardDefinitionV3): VIADefinitionV3;
export declare function generateVIADefinitionV3LookupMap(definitions: KeyboardDefinitionV3[]): Record<string, VIADefinitionV3>;
