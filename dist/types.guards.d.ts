import { VIAMenu } from './menu-types';
import { VIADefinitionV2 } from './types.v2';
import { BuiltInKeycodeModule, BuiltInMenuModule, VIADefinitionV3 } from './types.v3';
export declare function isTypeVIADefinitionV2(def: VIADefinitionV2 | VIADefinitionV3): def is VIADefinitionV2;
export declare function isTypeVIADefinitionV3(def: VIADefinitionV3 | VIADefinitionV3): def is VIADefinitionV3;
export declare function isBuiltInKeycodeModule(value: BuiltInMenuModule | VIAMenu | string): value is BuiltInKeycodeModule;
export declare function isVIAMenu(value: BuiltInMenuModule | VIAMenu | string): value is VIAMenu;
