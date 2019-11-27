import { Result, VIALayout, KLELayout } from './types';
export declare function rawKLEToKLELayout(kle: string): KLELayout;
export declare function filterGroups(keys: Result[]): Result[];
export declare function kleLayoutToVIALayout(kle: KLELayout): VIALayout;
