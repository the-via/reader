import {VIAMenu} from './menu-types';

export function isVIAMenu<ExtraItem = never>(
  value: VIAMenu<ExtraItem> | string
): value is VIAMenu<ExtraItem> {
  const viaMenu = value as VIAMenu<ExtraItem>;
  return viaMenu.label !== undefined && viaMenu.content !== undefined;
}
