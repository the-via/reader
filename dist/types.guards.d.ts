import { VIAMenu } from './menu-types';
import { BuiltInKeycodeModule, BuiltInMenuModule } from './types.v3';
export declare function isBuiltInKeycodeModule(value: BuiltInMenuModule | VIAMenu | string): value is BuiltInKeycodeModule;
export declare function isVIAMenu(value: BuiltInMenuModule | VIAMenu | string): value is VIAMenu;
