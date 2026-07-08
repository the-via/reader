import {VIAMenu} from './menu-types';

export function isVIAMenu<ExtraControl = never>(
  value: VIAMenu<ExtraControl> | string
): value is VIAMenu<ExtraControl> {
  const viaMenu = value as VIAMenu<ExtraControl>;
  return viaMenu.label !== undefined && viaMenu.content !== undefined;
}
