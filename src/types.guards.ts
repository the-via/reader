import {VIAMenu} from './menu-types';
import {BuiltInKeycodeModule, BuiltInMenuModule} from './types.v3';

export function isBuiltInKeycodeModule(
  value: BuiltInMenuModule | VIAMenu | string
): value is BuiltInKeycodeModule {
  return Object.values(BuiltInKeycodeModule).includes(
    value as BuiltInKeycodeModule
  );
}

export function isVIAMenu(
  value: BuiltInMenuModule | VIAMenu | string
): value is VIAMenu {
  const viaMenu = value as VIAMenu;
  return viaMenu.label !== undefined && viaMenu.content !== undefined;
}
