import { VIAMenu } from './menu-types';
import { VIAKey, MatrixInfo, CustomKeycode, KLELayoutDefinition, LayoutLabel } from './types.common';
export declare enum BuiltInKeycodeModule {
    VIAKeycodes = "via/keycodes",
    QMKLighting = "via/qmk_lighting",
    WTLighting = "via/wt_lighting"
}
export declare const defaultKeycodes: BuiltInKeycodeModule[];
export declare enum BuiltInMenuModule {
    Keymap = "via/keymap",
    Macros = "via/macros",
    SaveLoad = "via/save_load"
}
export declare const defaultMenus: BuiltInMenuModule[];
export declare type KeyboardDefinitionV3 = {
    name: string;
    vendorId: string;
    productId: string;
    firmwareVersion?: number;
    matrix: MatrixInfo;
    menus?: (BuiltInMenuModule | VIAMenu | string)[];
    keycodes?: BuiltInKeycodeModule[];
    customKeycodes?: CustomKeycode[];
    layouts: {
        keymap: KLELayoutDefinition;
        labels?: LayoutLabel[];
        presets?: {
            [preset: string]: number[];
        };
    };
};
export declare type VIADefinitionV3 = {
    name: string;
    vendorProductId: number;
    firmwareVersion?: number;
    matrix: MatrixInfo;
    menus: (BuiltInMenuModule | VIAMenu | string)[];
    keycodes: BuiltInKeycodeModule[];
    customKeycodes?: CustomKeycode[];
    layouts: {
        width: number;
        height: number;
        presets?: {
            [preset: string]: number[];
        };
        labels?: LayoutLabel[];
        keys: VIAKey[];
        optionKeys: {
            [g: string]: {
                [o: string]: VIAKey[];
            };
        };
    };
};
