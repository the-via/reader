import {VIAMenu} from './menu-types';
import {VIADefinitionV2} from './types.v2';
import {BuiltInKeycodeModule, VIADefinitionV3} from './types.v3';

export function isTypeVIADefinitionV2(
  def: VIADefinitionV2 | VIADefinitionV3
): def is VIADefinitionV2 {
  return (def as VIADefinitionV2).lighting !== undefined;
}

export function isTypeVIADefinitionV3(
  def: VIADefinitionV3 | VIADefinitionV3
): def is VIADefinitionV3 {
  return (def as VIADefinitionV3).firmwareVersion !== undefined;
}

export function isBuiltInKeycodeModule(
  value: any
): value is BuiltInKeycodeModule {
  return Object.values(BuiltInKeycodeModule).includes(
    value as BuiltInKeycodeModule
  );
}

export function isVIAMenu(value: any): value is VIAMenu {
  const viaMenu = value as VIAMenu;
  return viaMenu.label !== undefined && viaMenu.content !== undefined;
}
