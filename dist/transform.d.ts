import { KeyboardDefinition, VIADefinition } from './types';
export { VIADefinition, KeyboardDefinition };
export declare function getVendorProductId({ productId, vendorId }: KeyboardDefinition): number;
export declare function keyboardDefinitionToVIADefinition(definition: KeyboardDefinition): VIADefinition;
export declare function generateVIADefinitionLookupMap(definitions: KeyboardDefinition[]): {};
