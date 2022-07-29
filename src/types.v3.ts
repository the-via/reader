import {VIAMenu} from './menu-types';
import {
  VIAKey,
  MatrixInfo,
  CustomKeycode,
  KLELayoutDefinition,
  LayoutLabel,
} from './types.common';

export enum BuiltInKeycodeModule {
  QMKLighting = 'qmk_lighting',
  WTLighting = 'wt_lighting',
}

export const defaultKeycodes: BuiltInKeycodeModule[] = [];

export type KeyboardDefinitionV3 = {
  name: string;
  vendorId: string;
  productId: string;
  firmwareVersion?: number;
  matrix: MatrixInfo;
  menus?: (VIAMenu | string)[];
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
  menus: (VIAMenu | string)[];
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
