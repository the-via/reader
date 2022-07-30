import {VIAMenu} from './menu-types';

export function isVIAMenu(value: VIAMenu | string): value is VIAMenu {
  const viaMenu = value as VIAMenu;
  return viaMenu.label !== undefined && viaMenu.content !== undefined;
}
