import {VIAMenu} from './menu-types';
import {
  VIAKey,
  ThemeDefinition,
  MatrixInfo,
  CustomKeycode,
  KLELayoutDefinition,
  LayoutLabel,
} from './types.common';

export enum BuiltInKeycodeModule {
  VIAKeycodes = 'via/keycodes',
  QMKLighting = 'via/qmk_lighting',
  WTLighting = 'via/wt_lighting',
}

export const defaultKeycodes: BuiltInKeycodeModule[] = [
  BuiltInKeycodeModule.VIAKeycodes,
];

export enum BuiltInMenuModule {
  Keymap = 'via/keymap',
  Layouts = 'via/layouts',
  Macros = 'via/macros',
  SaveLoad = 'via/save_load',
}

export const defaultMenus: BuiltInMenuModule[] = [
  BuiltInMenuModule.Keymap,
  BuiltInMenuModule.Layouts,
  BuiltInMenuModule.Macros,
  BuiltInMenuModule.SaveLoad,
];

export type KeyboardDefinitionV3 = {
  name: string;
  vendorId: string;
  productId: string;
  firmwareVersion: number;
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

export type VIADefinitionV3 = {
  name: string;
  vendorProductId: number;
  firmwareVersion: number;
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
    optionKeys: {[g: string]: {[o: string]: VIAKey[]}};
  };
};

export type KeyboardDefinitionIndex = {
  generatedAt: number;
  version: string;
  theme: ThemeDefinition;
  vendorProductIds: string[];
};
