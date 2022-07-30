import { Result, VIALayout, KLELayout, KeyColorType, VIAKey } from './types.common';
export declare function rawKLEToKLELayout(kle: string): KLELayout;
export declare function filterGroups(keys: Result[]): Result[];
export declare function findPivot(keys: Result[]): Result;
declare type GroupOptionMap<A> = {
    [group: string]: {
        [option: string]: A[];
    };
};
export declare function getBoundingBox(key: Result): {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
};
export declare function extractGroups(keys: Result[], origin: {
    x: number;
    y: number;
}, colorMap: {
    [k: string]: KeyColorType;
}): GroupOptionMap<VIAKey>;
export declare function kleLayoutToVIALayout(kle: KLELayout): VIALayout;
export {};
