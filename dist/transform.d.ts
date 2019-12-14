import { KeyboardDefinition, KeyboardDefinitionV2, VIADefinition, VIADefinitionV2 } from './types';
export { VIADefinition, KeyboardDefinition };
export declare function getVendorProductId({ productId, vendorId }: KeyboardDefinition | KeyboardDefinitionV2): number;
export declare function keyboardDefinitionV2ToVIADefinitionV2(definition: KeyboardDefinitionV2): VIADefinitionV2;
export declare function keyboardDefinitionToVIADefinition(definition: KeyboardDefinition): VIADefinition;
export declare function generateVIADefinitionLookupMap(definitions: KeyboardDefinition[]): {};
export declare function generateVIADefinitionV2LookupMap(definitions: KeyboardDefinitionV2[]): {};
